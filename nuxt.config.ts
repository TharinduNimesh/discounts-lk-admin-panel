// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt'],
  ssr: false,
  vite: {
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['lord-icon'].includes(tag),
        },
      },
    }
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      edgeUrl: process.env.EDGE_API_URL,
    }
  }
})