import webpack from 'webpack'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'The Closing Institute',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      {
        hid: 'theme-color',
        name: 'theme-color',
        content: '#00aeef'
      },
      {
        hid: 'robots',
        name: 'robots',
        content: 'noindex'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    link: [
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          '//cdn.materialdesignicons.com/4.5.95/css/materialdesignicons.min.css'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#00aeef' },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/scss/bootstrap.scss',
    '@/assets/style.css',
    '~/assets/scss/app.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '@/plugins/vue-tables-2.js'
    },
    {
      src: '@/plugins/grid.js'
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://auth.nuxtjs.org/
    '@nuxtjs/auth'
  ],
  /*
   ** Environment variables
   */
  env: {
    restURL: 'https://members.theclosinginstitute.com/wp-json'
  },
  /*
   ** Nuxt.js router
   */
  router: {
    // required auth on every page
    middleware: ['auth'],
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'https://members.theclosinginstitute.com/wp-json',
    withCredentials: true
  },
  /*
   ** Auth module configuration
   ** See https://auth.nuxtjs.org/api/options
   */
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/jwt-auth/v1/token',
            method: 'post',
            propertyName: 'token'
          },
          user: {
            url: '/wp/v2/users/me',
            method: 'get',
            propertyName: ''
          },
          logout: false
        }
      }
    }
  },
  // routes: $axios => {
  //   return $axios.$get('/wp/v2/teams?per_page=100').then(response => {
  //     return response.data.map(team => {
  //       return '/teams/' + team.slug
  //     })
  //   })
  // },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery'
      })
    ],
    vendor: ['vue-tables-2']
  }
}
