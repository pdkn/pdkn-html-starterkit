import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import react from '@astrojs/react';
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), react(),
  // Enable React for the Algolia search component.
  mdx(), tailwind({
    config: {
      path: "./../../packages/ui/tailwind.config.cjs"
    }
  })],
  output: "server",
  adapter: netlify(),
  site: `http://docs.mysite.io`
});