import type { CardType } from "@/components/Card.vue";

export const useGenerateCards = () => {
  const { matchCardCount } = useSettings();
  const cards = ref<CardType[]>([]);

  for (let value = 0, id = 0; value < matchCardCount; value++) {
    for (let i = 0; i < 2; i++) {
      cards.value.push({
        id,
        value,
        image: `/cards/${value}.jpg`,
        state: "closed",
      });
      id++;
    }
  }

  const shuffledCards = computed(() => useShuffleArray(cards.value));

  return shuffledCards;
};
