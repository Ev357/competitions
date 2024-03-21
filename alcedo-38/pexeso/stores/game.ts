import type { CardType } from "@/components/Card.vue";

interface Play {
  name: string;
  timeOffset: number;
  timeEnd?: number;
}

interface GameStore {
  cards: Set<CardType>;
  plays: Set<Play>;
  currentPlay: Play | undefined;
  playIsActive: boolean;
  buffer: CardType[];
}

export const useGameStore = defineStore("carouselStore", {
  state: () =>
    <GameStore>{
      cards: useGenerateCards(),
      plays: new Set(),
      currentPlay: undefined,
      playIsActive: false,
      buffer: [],
    },
  getters: {
    time: (state) => {
      if (!state.playIsActive || !state.currentPlay) return;
      return useTimestamp({ offset: state.currentPlay.timeOffset });
    },
  },
  actions: {
    generateCards() {
      this.cards = useGenerateCards();
    },
    async openCard(card: CardType) {
      if (!this.playIsActive) {
        this.startGame();
      }
      if (card.isOpen || this.buffer.length > 1) return;

      card.isOpen = true;
      this.buffer.push(card);
      if (this.buffer.length > 1) {
        if (this.buffer[0].value !== this.buffer[1].value) {
          await useDelay(1000);
          this.buffer.forEach((card) => {
            card.isOpen = false;
          });
        }

        this.endRound();
      }
    },
    startGame() {
      this.playIsActive = true;
      const timestamp = useTimestamp();
      this.currentPlay = {
        name: `Player ${this.plays.size + 1}`,
        timeOffset: -timestamp.value,
      };
    },
    endGame() {
      if (!this.currentPlay) return;
      this.playIsActive = false;
      this.plays.add(this.currentPlay);
      this.currentPlay = undefined;
    },
    endRound() {
      this.buffer = [];
    },
  },
});
