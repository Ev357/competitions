<template>
  <div
    class="size-28 rounded-full border"
    :class="{
      'bg-red-500': color === 'red' && isOn,
      'bg-yellow-500': color === 'yellow' && isOn,
      'bg-green-500': color === 'green' && isOn,
      'bg-white': !isOn,
    }"
  ></div>
</template>

<script setup lang="ts">
defineProps<{
  color: "red" | "yellow" | "green";
  isOn: boolean;
}>();
</script>
