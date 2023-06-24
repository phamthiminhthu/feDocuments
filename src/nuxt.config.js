// import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  server: {
    port: 3000,
    host: "0.0.0.0",
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - app",
    title: "app",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Lato:400,700",
      },
    ],
    script: [],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/main.css", "@/assets/css/fonts.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~plugins/axios",
    { src: "~/plugins/pdfjs.js", mode: "client" }
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  //Modules: nuxtjs/proxy
  modules: [
    "@nuxtjs/proxy",
    ["@nuxtjs/axios", { baseURL: "http://localhost:8080/api/v1" }],
    "cookie-universal-nuxt",
  ],

  router: {
    prefetchLinks: false,
    middleware: ["auth"],
    fallback: true,
  },

  // proxy: {
  //   '/api': {
  //     target: 'http://localhost:8080',
  //     pathRewrite: { '^/api/': '/api/v1' },
  //     changeOrigin: true,
  //   },
  // },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: "http://localhost:8080/api/v1",
    headers: {
      common: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      themes: {
        light: {
          primary: "#757575", // Replace with your desired primary text color
        },
      },
    },
  },
  fontawesome: {
    component: "Fa",
    suffix: false,
    icons: {
      solid: true,
      brands: true,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
    extend(config, { isClient }) {
      if (isClient) {
        config.module.rules.push({
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            compact: false,
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-optional-chaining'],
          },
        });
        config.optimization.splitChunks.maxSize = 200000;
      }
    }
  },
};
