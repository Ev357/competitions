<template>
  <div
    class="flex min-h-screen flex-col bg-white px-10 pt-14 font-sans text-black antialiased dark:bg-black dark:text-white"
  >
    <div class="spotlight fixed left-0 right-0"></div>
    <h1 class="mb-6 text-6xl font-medium sm:text-8xl" v-text="statusCode"></h1>
    <p class="mb-8 text-xl font-light leading-tight sm:text-2xl">
      {{
        online
          ? description || $t("ERROR.APPLICATION")
          : $t("ERROR.OFFLINE_MESSAGE")
      }}
    </p>
    <div
      class="h-auto flex-1 overflow-y-auto rounded-t-md bg-black/5 bg-white dark:bg-white/10"
    >
      <pre
        class="z-10 p-8 text-xl font-light leading-tight"
        v-html="useDOMPurify(stack)"
      ></pre>
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
    stack: string;
  }>(),
  {
    appName: "",
    version: "",
    statusCode: 500,
  },
);

const { statusCode, statusMessage, appName } = toRefs(props);

const { t } = useI18n();
const online = useOnline();

useHead({
  title: `${statusCode.value} - ${
    online.value
      ? statusMessage.value || t("ERROR.SERVER_ERROR")
      : t("ERROR.OFFLINE")
  } | ${appName.value || t("APP_NAME")}`,
});
</script>

<style scoped lang="scss">
.spotlight {
  background: linear-gradient(45deg, #00dc82 0%, #36e4da 50%, #0047e1 100%);
  opacity: 0.8;
  filter: blur(30vh);
  height: 60vh;
  bottom: -40vh;
}
</style>
