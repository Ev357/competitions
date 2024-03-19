import type { Config } from "tailwindcss";
import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons";

export default <Partial<Config>>{
  darkMode: "selector",
  theme: {
    extend: {
      fontFamily: {
        geist: ["Geist"],
      },
    },
  },
  plugins: [
    iconsPlugin({
      collections: getIconCollections(["heroicons", "mdi"]),
    }),
  ],
};
