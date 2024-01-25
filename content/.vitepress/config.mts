import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'

const isDev = process.env.NODE_ENV !== 'production'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: "Vue Cheatsheet",
  description: "The one and only cheatsheet you need for Vue.js by ThemeSelection",
  themeConfig: {
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Freebies', link: 'https://themeselection.com/item/category/freebies/' },
      { text: 'Templates', link: 'https://themeselection.com/item/category/admin-templates/' },
      { text: 'UI Kits', link: 'https://themeselection.com/item/category/ui-kits/' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Contributing', link: '/contributing' },
          { text: 'Changelog', link: '/changelog' },
        ],
      },
      {
        text: 'Vue',
        items: [
          { text: 'Basic', link: '/basic' },
          { text: 'Reactivity', link: '/reactivity' },
          { text: 'Forms', link: '/forms' },
          { text: 'Component', link: '/component' },
          { text: 'Built-in Components', link: '/built-in-components' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/themeselection/vue-cheatsheet' },
      { icon: 'twitter', link: 'https://twitter.com/Theme_Selection' }
    ],
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPFooter\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/Footer.vue', import.meta.url)
          )
        }
      ]
    }
  },
  markdown: {
    // ℹ️ We only enabled this in development so that we can highlight code lines by seeing line number without calculating it in our editor.
    lineNumbers: false,
    toc: { level: [1, 2,] },

    theme: 'dracula',
    math: true,
  },
})
