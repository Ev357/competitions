import type { ImageModifiers } from "@nuxt/image";

interface Settings {
  matchCardCount: number;
  imageQuality: number;
  blurredImageModifiers: Partial<ImageModifiers>;
}

export const useSettings = () =>
  ({
    matchCardCount: 8,
    imageQuality: 600,
    blurredImageModifiers: {
      h: 10,
      w: 20,
      blur: 4,
      q: 30,
    },
  }) as const satisfies Settings;
