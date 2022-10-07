import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'
import { default as Adal, AxiosAuthHttp } from 'vue-adal'
import axios from 'axios'
import i18n from '@/libs/i18n'
import router from './router'
import store from './store'
import App from './App.vue'

// Global Components
import './global-components'

// 3rd party plugins
import '@axios'
import '@/libs/acl'
import '@/libs/portal-vue'
import '@/libs/clipboard'
import '@/libs/toastification'
import '@/libs/sweet-alerts'
import '@/libs/vue-select'
import '@/libs/tour'

// Axios Mock Adapter
import '@/@fake-db/db'



Vue.config.productionTip = false
const graphApiBase = 'https://graph.windows.net'
const graphApiResource = '00000003-0000-0000-c000-000000000000'
 // vue-adal
// Vue.use(Adal, {
//   config: {
//     tenant: '4c8530d7-7439-46ec-94b8-d3aca090a883',
//     clientId: '75a334b0-0fb7-449c-bd4e-0069bf121d82',
//     redirectUri: 'http://localhost:8080/',
//     cacheLocation: 'localStorage',
//   },
//   requireAuthOnInitialize: true,
//   router,
// })
// Vue.use({
//   install(vue, opts = {}) {

  //   const data = {
  //     id: 1,
  //     fullName: 'John Doe',
  //     username: 'johndoe',
  //     password: 'admin',
  //     // eslint-disable-next-line global-require
  //     avatar: '',
  //     email: 'admin@demo.com',
  //     role: 'admin',
  //     ability: [
  //       {
  //         action: 'manage',
  //         subject: 'all',
  //       },
  //     ],
  //     extras: {
  //       eCommerceCartItemsCount: 5,
  //     },
  // }
  // localStorage.setItem('userData',JSON.stringify(data))
//     // Configures an axios http client with a interceptor to auto-acquire tokens
    // vue.prototype.$graphApi = AxiosAuthHttp.createNewClient({
    //   // Required Params
    //   axios: axios,
    //   resourceId: graphApiResource, // Resource id to get a token against
    //   // Optional Params
    //   router: router, // Enables a router hook to auto-acquire a token for the specific resource
    //   baseUrl: graphApiBase, // Base url to configure the client with
    //   onTokenSuccess(http, context, token) { // Token success hook
        // When an attempt to retrieve a token is successful, this will get called.
        // This enables modification of the client after a successful call.
        

        // if (context.user) {
        //   console.log(context.user)
        //   // Setup the client to talk with the Microsoft Graph API
        //   // console.log(axios.default.headers)
        //   http.defaults.baseURL = `${graphApiBase}/${context.user.profile.tid}`
//           const server = 'localhost'  // 164.92.86.15 or  localhost
//           // axios.post(`http://${server}:3000/`,{"token":token,"user":context.user.profile})
//           // .then(res => {
//           //   if (res.status === 401) {
//           //     this.$ability.update(null)
//           //   }

//           //   console.log(res)
//           //   if(res.data.message === 'success'){
//           //     console.log("old-user")
//           //     localStorage.setItem('userData', JSON.stringify(res.data.user))
//           //     localStorage.setItem('accessToken', res.data.accessToken)
//           //     localStorage.setItem('refreshToken', res.data.refreshToken)
              
//           //     axios.default.headers = {
//           //       Authorization:'Bearer '+localStorage.getItem('accessToken'),
//           //     }
//           //   }
//           //   // new user
//           //   if (res.data.message === 'new') {
//           //     console.log("new-user")
//           //     console.log(res.data.user)
//           //     console.log('old', JSON.parse(localStorage.getItem('userData')))
//           //     localStorage.setItem('userData', JSON.stringify(res.data.user))
//           //     console.log('new', JSON.parse(localStorage.getItem('userData')))
//           //   }
            
//           // }).catch(err => { console.log(err) })
//         }
//       },
//       onTokenFailure(error) { 
//         // Token failure hook
//         // When an attempt to retrieve a token is not successful, this will get called.
//         console.log(error)
//       },
//     })
//   },
// })

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

// Composition API
Vue.use(VueCompositionAPI)

// Feather font icon - For form-wizard
// * Shall remove it if not using font-icons of feather-icons - For form-wizard
require('@core/assets/fonts/feather/iconfont.css') // For form-wizard

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

//server
import { $theServer } from '@themeConfig'

Vue.prototype.GLOBAL = $theServer

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')

