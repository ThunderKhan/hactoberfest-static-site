import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
// @ts-ignore -- Vite executes this config in Node; the frontend does not need @types/node at runtime.
import { readFileSync } from "node:fs";

const heroBase64 = [0, 1, 2, 3, 4]
  .map((index) =>
    readFileSync(
      new URL(`./public/hero-bg/part-${String(index).padStart(2, "0")}.b64`, import.meta.url),
      "utf8",
    ).trim(),
  )
  .join("");

function inlineHeroBackground(): Plugin {
  return {
    name: "inline-hero-background",
    transformIndexHtml() {
      return [
        {
          tag: "style",
          attrs: { id: "hero-background-source" },
          children: `:root{--hero-bg-image:url("data:image/webp;base64,${heroBase64}")}`,
          injectTo: "head-prepend",
        },
      ];
    },
  };
}

export default defineConfig({
  plugins: [react(), inlineHeroBackground()],
});
