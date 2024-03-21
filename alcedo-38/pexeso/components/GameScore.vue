<template>
  <UCard class="h-full w-44 p-2">
    <template v-if="playIsActive && currentPlay">
      <p>Name: {{ currentPlay.name }}</p>
      <p>Time: {{ formattedTime }}</p>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import moment from "moment";

const gameStore = useGameStore();
const { playIsActive, currentPlay } = storeToRefs(useGameStore());

const formattedTime = computed(() => {
  if (!gameStore.time) return;

  return moment("2000-01-01 00:00:00")
    .add(moment.duration(1000))
    .format("HH:mm:ss");
});
</script>
