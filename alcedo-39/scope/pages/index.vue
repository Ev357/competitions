<template>
  <div class="grid w-full max-w-sm items-center gap-1.5 text-white">
    <ULabel for="file" class="text-white">File</ULabel>
    <UInput
      id="file"
      v-model="file"
      type="file"
      class="text-white"
      @change="readSomeFile"
    />
    <div v-if="data && parsedScope" class="bg-white">
      <VisXYContainer
        :data="data"
        :x-domain="[0, parsedScope.lengthZaznam]"
        :y-domain="[-parsedScope.rozsah, parsedScope.rozsah]"
        width="1500"
        height="500"
      >
        <VisLine :x="x" :y="y" />
        <VisAxis type="x" label="Čas v sekundách" />
        <VisAxis type="y" label="Volty" />
      </VisXYContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VisXYContainer, VisLine, VisAxis } from "@unovis/vue";

type DataRecord = { x: number; y: number };

const { t } = useI18n();

const file = ref();
const fileContent = ref<string>();

const x = (d: DataRecord) => d.x;
const y = (d: DataRecord) => d.y;

const parsedScope = computed(() => {
  if (!fileContent.value) return;
  return useParseScope(fileContent.value);
});

const data = computed(() => {
  if (!parsedScope.value) return;
  return useParseData(parsedScope.value);
});

const readSomeFile = (event: Event) => {
  if (!event.target) return;
  const target = event.target as HTMLInputElement;
  if (!target.files) return;
  const file = target.files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    if (!event.target?.result) return;
    fileContent.value = event.target.result.toString();
  };

  reader.readAsText(file);
};

useHead({
  title: t("APP_NAME"),
});
</script>
