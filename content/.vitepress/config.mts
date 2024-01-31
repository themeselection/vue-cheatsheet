import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'

const isDev = process.env.NODE_ENV !== 'production'

const gtmConfig = {
  headScript: `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5DDHKGP');</script>
<!-- End Google Tag Manager -->`,
  bodyNoScript: `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5DDHKGP"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`,
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: 'Vue Cheatsheet',
  lastUpdated: true,
  description: "The one and only cheatsheet you need for Vue.js by ThemeSelection",
  head: [
    ['link', { rel: 'icon', href: '/logos/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/logos/apple-icon-57x57.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/logos/apple-icon-60x60.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/logos/apple-icon-72x72.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/logos/apple-icon-76x76.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/logos/apple-icon-114x114.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/logos/apple-icon-120x120.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/logos/apple-icon-144x144.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/logos/apple-icon-152x152.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/logos/apple-icon-180x180.png' }],
    ['link', { rel: 'icon', href: '/logos/android-icon-192x192.png' }],
    ['link', { rel: 'icon', href: '/logos/favicon-32x32.png' }],
    ['link', { rel: 'icon', href: '/logos/favicon-96x96.png' }],
    ['link', { rel: 'icon', href: '/logos/favicon-16x16.png' }],
    ['link', { rel: 'manifest', href: '/logos/manifest.json' }],
  ],
  themeConfig: {
    logo: '/vue-cheatsheet-logo.png',
    
    siteTitle: false,
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
          { text: 'Basic', link: '/vue/basic.md' },
          { text: 'Reactivity', link: '/vue/reactivity' },
          { text: 'Forms', link: '/vue/forms' },
          { text: 'Component', link: '/vue/component' },
          { text: 'Composable', link: '/vue/composable' },
          { text: 'Built-in Components', link: '/vue/built-in-components' },
        ]
      },
      {
        text: 'Vue Router',
        items: [
          { text: 'Basic', link: '/vue-router/basic.md' },
          { text: 'Advanced', link: '/vue-router/advanced.md' },
        ]
      },
      {
        text: 'Pinia',
        items: [
          { text: 'Basic', link: '/pinia/basic.md' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/themeselection/vue-cheatsheet' },
      { icon: 'twitter', link: 'https://twitter.com/Theme_Selection' }
    ],

    editLink: {
      pattern: 'https://github.com/themeselection/vue-cheatsheet/edit/main/content/:path'
    }
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

    theme: {
      light: 'github-light',
      dark: 'dracula'
    },
    math: true,
  },
  transformHtml: async (code, id, ctx) => {
    return code
      .replace('<head>', `<head>\n${gtmConfig.headScript}`)
      .replace('<body>', `<body>\n${gtmConfig.bodyNoScript}`)
  }
})
