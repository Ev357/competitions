<template>
  <div class="flex w-fit flex-col gap-2 p-2">
    <div class="flex flex-wrap gap-2">
      <ClientOnly>
        <UCard class="grid w-fit grid-cols-7 gap-2 p-2">
          <UButton
            v-for="bet in bets"
            :key="bet.value"
            :disabled="bet.state === 'chosen' || gameOver"
            :class="{
              '!border-blue-500 shadow-inner shadow-gray-500':
                bet.state === 'chosen',
              '!bg-yellow-400': gameOver && bet.type === 'winning',
              '!bg-orange-500': gameOver && bet.type === 'additional',
            }"
            class="border-4 border-transparent"
            @click="chooseBet(bet.value)"
          >
            {{ bet.value }}
          </UButton>
        </UCard>
        <template #fallback>
          <USkeleton class="h-52 w-96 rounded-xl" />
        </template>
      </ClientOnly>
      <UCard class="flex w-fit flex-col gap-2 p-2">
        <div class="flex gap-2">
          <UButton
            variant="secondary"
            :disabled="gameOver"
            @click="randomBet()"
          >
            Random bet
          </UButton>
          <UInput
            v-model="randomBetCount"
            type="number"
            placeholder="Count"
            min="1"
            max="5"
            class="min-w-24"
          />
        </div>
        <UButton variant="secondary" @click="resetGame()">Reset game</UButton>
      </UCard>
    </div>
    <UCard v-if="gameOver">
      <UCardContent class="p-2">
        <p>Prize: {{ prize }}</p>
        <p>Right guesses: {{ winningBetCount }}</p>
        <p>Additional bet guessed: {{ additionalBetExists }}</p>
      </UCardContent>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

type BetType = "winning" | "default" | "additional" | "chosen";
type BetState = "default" | "chosen";
interface Bet {
  value: number;
  type: BetType;
  state: BetState;
}

const getBets = () => {
  const bets: Bet[] = [];
  for (let i = 1; i <= 35; i++) {
    bets.push({ value: i, type: "default", state: "default" });
  }

  let i = 0;
  while (i < 5) {
    const index = Math.floor(Math.random() * bets.length);
    if (bets[index].type === "default") {
      bets[index].type = "winning";
      i++;
    }
  }

  let additionalBetChosen = false;
  while (!additionalBetChosen) {
    const index = Math.floor(Math.random() * bets.length);
    if (bets[index].type === "default") {
      bets[index].type = "additional";
      additionalBetChosen = true;
    }
  }

  return bets;
};

const bets = ref<Bet[]>(getBets());
const betCount = ref(0);
const randomBetCount = ref(1);

const gameOver = computed(() => betCount.value >= 5);

const chooseBet = (value: number) => {
  if (betCount.value < 5) {
    const selectedBet = bets.value.find((bet) => bet.value === value);
    if (!selectedBet) return;

    selectedBet.state = "chosen";
    betCount.value++;
  }
};

const chosenBets = computed(() =>
  bets.value.filter((bet) => bet.state === "chosen"),
);

const winningBetCount = computed(() =>
  chosenBets.value.reduce((winningBetCount, bet) => {
    if (bet.type === "winning") {
      winningBetCount++;
    }

    return winningBetCount;
  }, 0),
);

const additionalBetExists = computed(() =>
  chosenBets.value.some((bet) => bet.type === "additional"),
);

const prize = computed(() => {
  switch (winningBetCount.value) {
    case 5:
      return "First prize";
    case 4:
      if (additionalBetExists.value) {
        return "Second prize";
      }
      return "Third prize";
    case 3:
      return "Fourth prize";
    case 2:
      return "Fifth prize";
    default:
      return "No prize";
  }
});

const resetGame = () => {
  bets.value = getBets();
  betCount.value = 0;
};

const randomBet = () => {
  let randomBetCounts = 0;
  while (randomBetCounts < randomBetCount.value) {
    const index = Math.floor(Math.random() * bets.value.length);
    const bet = bets.value[index];

    if (bet.state === "default") {
      chooseBet(bet.value);
      randomBetCounts++;
    }
  }
};

useHead({
  title: t("APP_NAME"),
});
</script>
