
import { defineConfig } from "@lingui/conf";

export default defineConfig({
  locales: ["en", "cs"],
  sourceLocale: "en",
  catalogs: [
    {
      path: "src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: "po",
});
