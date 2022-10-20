import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import preact from "@astrojs/preact";
import netlify from "@astrojs/netlify/functions";

export default defineConfig({
  integrations: [
    preact(), 
    react(),
    tailwind({
    config: {
      path: "./../../packages/ui/tailwind.config.cjs"
    }
  })],
  output: "server",
  adapter: netlify()
});