import { resolve } from 'path'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Abeona-Nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
   // Global CSS: https://go.nuxtjs.dev/config-css
   css: [
    "@/assets/scss/style.scss"
  ],

  ssr: false,

  alias: {
    'images': resolve(__dirname, './assets/images'),
    'icons': resolve(__dirname, './assets/images/icons'),
    'style': resolve(__dirname, './assets/styles'),
  },
  
  router: {
    linkActiveClass: 'link-active',
    linkExactActiveClass: 'exact-active',
  },

  // loading: '~/components/Loading.vue',
  loading: {
    color: '#00D68F',
    height: '3px'
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/i18n',
    'cookie-universal-nuxt',
    '@nuxtjs/moment',
    '@nuxtjs/toast',
    'vue-scrollto/nuxt',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/helpers' },
    { src: '~/plugins/axios' },
    { src: '~/plugins/global-components'},
    { src: "~/plugins/vue-select" },
    { src: "~/plugins/vClickOutside" },
    { src: "~/plugins/vue-scrollto" },
    { src: "~/plugins/vuelidate" },
    { src: '~/plugins/full-calendar', ssr: false},
    { src: "~/plugins/vue-ellipse",mode: 'client'},
    { src: "~/plugins/vue-treeselect",mode: 'client',ssr: false},
    { src: "~/plugins/vue-datepicker",mode: 'client',ssr: false},
  ],
  axios: {
    // Do away with the baseUrl when using proxy
    proxy: true,
    // baseURL: 'https://stg.abeona.pickvisa.com'
   },
   proxy: {
     // Simple proxy
     "/api/": {
       target: "https://stg.abeona.pickvisa.com/",
       pathRewrite: { "^api/": "" },
      //  changeOrigin: true
     }
   },


   auth: {
    localStorage: false,
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
          maxAge: 60 * 60 * 24 * 30,
          type: 'Token'
        },
        user: {
          property: false,
          autoFetch: true
        },
        endpoints: {
          login: { url: 'api/v1/login', method: 'post' },
          logout: false,
          user: false
        },
       
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/'
    }
  },

  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.js',
        iso: 'en-en'
      },
      {
        code: 'ru',
        file: 'ru.js',
        iso: 'ru-ru'
      },
      {
        code: 'az',
        file: 'az.js',
        iso: 'az-az'
      }
    ],
    langDir: 'locales/',
    strategy: 'prefix_except_default',
    baseUrl: 'localhost:3000',
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
    },
    detectBrowserLanguage: false
  },

  // server: {
  //   port: 3000,
  //   host: '0.0.0.0'
  // },
  
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        if (type === 'script' || type === 'style') {
          return true
        }
        if (type === 'font') {
          // only preload woff2 fonts
          return /\.woff2$/.test(file)
        }
      }
    }
  },
  
  toast: {
    position: "top-right",
    keepOnHover: true,
    duration: 3000
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
