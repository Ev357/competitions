<template>
  <div
    class="grid min-h-screen place-content-center overflow-hidden bg-white font-sans text-black antialiased dark:bg-black dark:text-white"
  >
    <div class="spotlight fixed left-0 right-0 z-10"></div>
    <div class="max-w-520px z-20 text-center">
      <h1 class="sm:text-10xl mb-8 text-8xl font-medium">{{ statusCode }}</h1>
      <p
        class="mb-16 px-8 text-xl font-light leading-tight sm:px-0 sm:text-4xl"
      >
        {{ description || $t("ERROR.PAGE_NOT_FOUND_DESCRIPTION") }}
      </p>
      <div class="flex w-full items-center justify-center">
        <NuxtLinkLocale
          :to="backUrl"
          class="gradient-border text-md cursor-pointer px-4 py-2 sm:px-6 sm:py-3 sm:text-xl"
        >
          {{ backMessage || $t("ERROR.BACK_HOME") }}
        </NuxtLinkLocale>
      </div>
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
    backMessage: string;
    backUrl: string;
  }>(),
  {
    appName: "",
    version: "",
    statusCode: 404,
    backUrl: "/",
  },
);
const { statusCode, statusMessage, appName } = toRefs(props);

const { t } = useI18n();

useHead({
  title: `${statusCode.value} - ${
    statusMessage.value || t("ERROR.NOT_FOUND")
  } | ${appName.value || t("APP_NAME")}`,
});
</script>

<style scoped lang="scss">
.spotlight {
  background: linear-gradient(45deg, #00dc82 0%, #36e4da 50%, #0047e1 100%);
  filter: blur(20vh);
  height: 40vh;
  bottom: -30vh;
}
.gradient-border {
  position: relative;
  border-radius: 0.5rem;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
@media (prefers-color-scheme: light) {
  .gradient-border {
    background-color: rgba(255, 255, 255, 0.3);
  }
  .gradient-border::before {
    background: linear-gradient(
      90deg,
      #e2e2e2 0%,
      #e2e2e2 25%,
      #00dc82 50%,
      #36e4da 75%,
      #0047e1 100%
    );
  }
}
@media (prefers-color-scheme: dark) {
  .gradient-border {
    background-color: rgba(20, 20, 20, 0.3);
  }
  .gradient-border::before {
    background: linear-gradient(
      90deg,
      #303030 0%,
      #303030 25%,
      #00dc82 50%,
      #36e4da 75%,
      #0047e1 100%
    );
  }
}
.gradient-border::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 0.5rem;
  padding: 2px;
  width: 100%;
  background-size: 400% auto;
  opacity: 0.5;
  transition:
    background-position 0.3s ease-in-out,
    opacity 0.2s ease-in-out;
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
.gradient-border:hover::before {
  background-position: -50% 0;
  opacity: 1;
}
</style>
