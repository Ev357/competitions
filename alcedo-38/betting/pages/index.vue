<template>
  <NuxtWelcome />
</template>

<script setup lang="ts">
const { t } = useI18n();

useHead({
  title: t("APP_NAME"),
});
</script>
