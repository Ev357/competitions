<template>
  <p class="w-12 text-7xl text-white">{{ seconds.formatted }}</p>
</template>

<script setup lang="ts">
// Computed value that calculates the remaining time
const seconds = computed(() => {
  const time = (counter.value - useTimestamp().value) / 1000;
  if (time > 0) {
    return {
      real: time,
      formatted: time.toFixed(0),
    };
  }

  return {
    real: 0,
    formatted: 0,
  };
});
const counter = defineModel<number>({ required: true });
</script>
