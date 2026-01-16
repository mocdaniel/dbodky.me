// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import remarkAlert from 'remark-github-blockquote-alert';

import vercel from '@astrojs/vercel';

import astroExpressiveCode from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig({
  site: 'https://dbodky.me/',
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
  integrations: [
    astroExpressiveCode({
      themes: ['dracula'],
    }),
  ],
});