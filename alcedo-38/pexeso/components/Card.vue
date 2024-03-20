<template>
  <UButton class="size-44 overflow-clip border p-0" variant="ghost">
    <NuxtImg
      v-show="card.state === 'opened'"
      :src="card.image"
      :placeholder="blurredImage"
      class="size-full object-cover"
      :width="imageQuality"
      :height="imageQuality"
    />
  </UButton>
</template>

<script setup lang="ts">
export type CardState = "closed" | "opened";
export interface CardType {
  id: number;
  value: number;
  image: string;
  state: CardState;
}

const props = defineProps<{ card: CardType }>();

const { card } = toRefs(props);

const { imageQuality, blurredImageModifiers } = useSettings();

const imgTransformer = useImage();

const blurredImage = imgTransformer(card.value.image, blurredImageModifiers);
</script>
