<template>
  <div
    class="grid min-h-screen place-content-center overflow-hidden bg-white font-sans text-black antialiased dark:bg-black dark:text-white"
  >
    <div class="spotlight fixed -bottom-1/2 left-0 right-0 h-1/2"></div>
    <div class="max-w-520px text-center">
      <h1 class="sm:text-10xl mb-8 text-8xl font-medium">{{ statusCode }}</h1>
      <p
        class="mb-16 px-8 text-xl font-light leading-tight sm:px-0 sm:text-4xl"
      >
        {{ description || $t("ERROR.PAGE_TEMPORARILY_UNAVAILABLE") }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    appName?: string;
    version?: string;
    statusCode: number;
    statusMessage: string;
    description: string;
  }>(),
  {
    appName: "",
    version: "",
    statusCode: 500,
  },
);
const { statusCode, statusMessage, appName } = toRefs(props);

const { t } = useI18n();

useHead({
  title: `${statusCode.value} - ${
    statusMessage.value || t("ERROR.SERVER_ERROR")
  } | ${appName.value || t("APP_NAME")}`,
});
</script>

<style scoped lang="scss">
.spotlight {
  background: linear-gradient(45deg, #00dc82 0%, #36e4da 50%, #0047e1 100%);
  filter: blur(20vh);
}
</style>
