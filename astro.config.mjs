// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import remarkAlert from 'remark-github-blockquote-alert';

import vercel from '@astrojs/vercel';

import astroExpressiveCode from 'astro-expressive-code';
import { remarkReadingTime } from './remark-reading-time.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://dbodky.me/',
  experimental: {
    contentIntellisense: true,
  },

  markdown: {
    remarkPlugins: [remarkAlert, remarkReadingTime],
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