// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import remarkAlert from 'remark-github-blockquote-alert';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  experimental: {
    contentIntellisense: true,
  },

  markdown: {
    remarkPlugins: [remarkAlert],
    shikiConfig: {
      theme: 'dracula',
    },
  },

  vite: {
      // @ts-ignore
      plugins: [tailwindcss()],
    },

  adapter: vercel(),
});