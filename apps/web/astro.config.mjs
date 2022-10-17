import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import netlify from "@astrojs/netlify/functions";

export default defineConfig({
  integrations: [
    preact(), 
    tailwind({
    config: {
      path: "./../../packages/ui/tailwind.config.cjs"
    }
  })],
  output: "server",
  adapter: netlify()
});