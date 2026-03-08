// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare(),

  vite: {
      plugins: [tailwindcss()],
  },

  env: {
  schema: {
    R2_ACCOUNT_ID: envField.string({ context: "server", access: "secret" }),
    R2_ACCESS_KEY_ID: envField.string({ context: "server", access: "secret" }),
    R2_SECRET_ACCESS_KEY: envField.string({ context: "server", access: "secret" }),
    R2_BUCKET_NAME: envField.string({ context: "server", access: "secret" }),
    R2_PUBLIC_URL: envField.string({ context: "server", access: "public", optional: true }),
  },
},

  integrations: [vue()],
});