import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import preact from "@astrojs/preact";
import partytown from "@astrojs/partytown";

// https://astro.build/config
import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), partytown(), tailwind({
    config: {
      path: "../../packages/ui/tailwind.config.cjs"
    }
  })],
  // output: "server",
  // adapter: netlify()
});