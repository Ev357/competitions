<template>
  <ErrorTemplate
    v-bind="{
      statusCode,
      statusMessage,
      description,
      stack,
      backUrl,
      backMessage,
    }"
  />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import type { NuxtError } from "nuxt/app";

interface ErrorType extends NuxtError {
  url: string;
  description: string;
}

const { t } = useI18n();

const props = defineProps<{
  error: ErrorType;
}>();

const { error } = toRefs(props);

const stacktrace = (error.value.stack || "")
  .split("\n")
  .splice(1)
  .map((line: string) => {
    const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
    return {
      text,
      internal:
        (line.includes("node_modules") && !line.includes(".cache")) ||
        line.includes("internal") ||
        line.includes("new Promise"),
    };
  })
  .map(
    (i) =>
      `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`,
  )
  .join("\n");

const statusCode = Number(error.value.statusCode || 500);
const is404 = statusCode === 404;

const statusMessage =
  error.value.statusMessage ??
  (is404 ? t("ERROR.PAGE_NOT_FOUND") : t("ERROR.INTERNAL_ERROR"));

const getDescription = () => {
  const description: string = error.value.message || error.value.toString();
  return description.startsWith("Page not found")
    ? t("ERROR.PAGE_NOT_FOUND_URL", { url: error.value.url })
    : description;
};
const description = getDescription();

const stack =
  import.meta.dev && !is404
    ? error.value.description || `<pre>${stacktrace}</pre>`
    : undefined;

const backUrl = "/";
const backMessage = t("ERROR.BACK_HOME");

const Error404 = defineAsyncComponent(() =>
  import("./components/Error/404.vue").then((r) => r.default || r),
);

const Error = import.meta.dev
  ? defineAsyncComponent(() =>
      import("./components/Error/Dev.vue").then((r) => r.default || r),
    )
  : defineAsyncComponent(() =>
      import("./components/Error/500.vue").then((r) => r.default || r),
    );

const ErrorTemplate = is404 ? Error404 : Error;
</script>
