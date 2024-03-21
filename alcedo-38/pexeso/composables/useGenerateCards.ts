import type { CardType } from "@/components/Card.vue";

export const useGenerateCards = () => {
  const { matchCardCount } = useSettings();
  const cards = new Set<CardType>();

  for (let value = 0, id = 0; value < matchCardCount; value++) {
    for (let i = 0; i < 2; i++) {
      cards.add({
        id,
        value,
        image: `/cards/${value}.jpg`,
        isOpen: false,
        state: "default",
      });
      id++;
    }
  }

  const shuffledCards = new Set(useShuffleArray([...cards]));

  return shuffledCards;
};
