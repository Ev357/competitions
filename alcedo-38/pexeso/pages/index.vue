<template>
  <div class="flex size-full items-center justify-center">
    <div class="flex h-fit w-full justify-center p-2">
      <div class="flex gap-2">
        <Game />
        <GameScore />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

useHead({
  title: t("APP_NAME"),
});
</script>
