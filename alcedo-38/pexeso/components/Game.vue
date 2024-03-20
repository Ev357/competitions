<template>
  <UCard class="grid w-fit grid-cols-4 gap-2 p-2">
    <ClientOnly>
      <Card v-for="(card, key) in cards" :key :card @click="openCard(card)" />
      <template #fallback>
        <USkeleton v-for="card in cards" :key="card.id" class="size-44" />
      </template>
    </ClientOnly>
  </UCard>
</template>

<script setup lang="ts">
import type { CardType } from "./Card.vue";

const cards = useGenerateCards();

const openCard = (card: CardType) => {
  if (card.state === "closed") {
    card.state = "opened";
    return;
  }

  card.state = "closed";
};
</script>
