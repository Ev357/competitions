<template>
  <div class="flex size-full items-center justify-center p-2">
    <Game />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

useHead({
  title: t("APP_NAME"),
});
</script>
