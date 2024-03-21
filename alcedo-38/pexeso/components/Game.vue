<template>
  <UCard class="grid w-fit grid-cols-4 gap-2 p-2">
    <ClientOnly>
      <Card
        v-for="card in cards"
        :key="card.id"
        :card
        @click="openCard(card)"
      />
      <template #fallback>
        <USkeleton v-for="card in cards" :key="card.id" class="size-44" />
      </template>
    </ClientOnly>
  </UCard>
</template>

<script setup lang="ts">
const { openCard } = useGameStore();
const { cards } = storeToRefs(useGameStore());
</script>
