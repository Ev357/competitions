// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "@nuxtjs/eslint-module",
    "@nuxt/image",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
    "shadcn-nuxt",
  ],
  eslint: {
    lintOnStart: false,
    emitError: false,
  },
  i18n: {
    lazy: true,
    langDir: "lang",
    strategy: "prefix_except_default",
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        name: "English",
        file: "en.json",
      },
      {
        code: "cs",
        name: "Čeština",
        file: "cs.json",
      },
    ],
  },
  colorMode: {
    classSuffix: "",
  },
  shadcn: {
    prefix: "U",
    componentDir: "./components/ui",
  },
});
