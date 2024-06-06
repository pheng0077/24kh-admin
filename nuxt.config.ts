// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },

  devtools: { enabled: true },
  experimental: {
    typedPages: true,
  },

  srcDir: 'src/',
  ssr: false,

  typescript: {
    shim: false,
  },

  build: {
    transpile: ['shadcn-nuxt'],
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@morev/vue-transitions/nuxt',
    "@nuxt/image"
  ],

  image: {
    format: ['webp'],
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      'xxl': 1536,
      '2xl': 1536
    },
    quality: 80,
  },

  colorMode: {
    classSuffix: ''
  },

  pinia: {
    disableVuex: true,
    storesDirs: ['./src/stores/**'],
  },

  shadcn: {
    prefix: 'UI',
    /**
     * Directory that the component lives in.
     * @default "./src/components/ui"
     */
    componentDir: './src/components/ui',
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || 'http://localhost:4000/api/v1',
    }
  }
})