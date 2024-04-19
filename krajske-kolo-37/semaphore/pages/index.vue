<template>
  <div class="absolute inset-0 flex items-center justify-center">
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-12">
        <div class="flex flex-col gap-2 border p-2">
          <Color color="red" :is-on="red" />
          <Color color="yellow" :is-on="yellow" />
          <Color color="green" :is-on="green" />
        </div>
        <div>
          <Counter v-model="counter" />
        </div>
      </div>
      <div class="flex items-center gap-2">
        <Switch
          id="airplane-mode"
          :checked="offMode"
          @update:checked="offMode = !offMode"
        />
        <Label for="airplane-mode" class="text-xl text-white">Off Mode</Label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";

const { t } = useI18n();

// Variable initialization
const red = ref(false);
const yellow = ref(false);
const green = ref(false);
const counter = ref(0);
const offMode = ref(false);
const speed = 1000;

// Start loop on mount
onMounted(() => {
  doLoop();
});

// Function that sets the timer
const setTimer = async (ms: number) => {
  counter.value = useTimestamp().value + ms;
  await useDelay(ms);
};

// Recursive function that does the main semaphore effect
const doLoop = async () => {
  red.value = true;
  await setTimer(12 * speed);
  yellow.value = true;
  await setTimer(4 * speed);
  green.value = true;
  red.value = false;
  yellow.value = false;
  await setTimer(12 * speed);
  yellow.value = true;
  green.value = false;
  await setTimer(6 * speed);
  yellow.value = false;

  if (!offMode.value) {
    doLoop();
    return;
  }

  doOffLoop();
};

// Recursive function that does the off mode semaphore effect
const doOffLoop = async () => {
  yellow.value = true;
  await setTimer(2 * speed);
  yellow.value = false;
  await setTimer(2 * speed);

  if (offMode.value) {
    doOffLoop();
    return;
  }

  doLoop();
};

useHead({
  title: t("APP_NAME"),
});
</script>
