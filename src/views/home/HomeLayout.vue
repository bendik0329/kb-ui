<template>
    <!-- start home-page -->
    <section id="home-page">
        <b-nav  class="fixed-top wrap-border d-flex align-items-center px-2 px-md-0  bg-white">
          <b-nav-item class="mr-auto font-weight-bolder">
            <router-link :to="{ name: 'home'}">
              <vuexy-logo />
            </router-link>
          </b-nav-item>
          <b-nav-item active class="font-weight-bolder d-md-block d-sm-none">
            <router-link :to="{ name: 'home'}">
              Home
            </router-link>
          </b-nav-item>
          <b-nav-item class="font-weight-bolder d-md-block d-sm-none">
            <router-link :to="{ name: 'faq'}">
              FAQ
            </router-link>
          </b-nav-item>
          <b-nav-item class="font-weight-bolder d-md-block d-sm-none">
            <router-link :to="{ name: 'findAgent'}">
              Find Agent
            </router-link>
          </b-nav-item>
          <b-nav-item class="font-weight-bolder d-md-block d-sm-none">
            <router-link :to="{ name: 'joinUsPage'}">
              Join Us
            </router-link>
          </b-nav-item>
          
          
          
          <b-button
              v-if="!isLogin"
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              variant="outline-dark"
              class="d-md-block d-sm-none "
              @click.prevent="routerPushTo('login')"
            >
              Sign in
            </b-button>

            <b-button-group
              v-else
              >
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                @click.prevent="routerPushTo('dashboard-ecommerce')"
                >
                Dashboard
              </b-button>
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-dark"
                :href="`${logout}`"
                >
                Log out
              </b-button>
            </b-button-group>

          
          <b-dropdown
            id="dropdown-grouped"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-dark"
            right
            class="dropdown-icon-wrapper d-none d-sm-block d-md-none"
          >
            <template #button-content>
              <feather-icon
                icon="MenuIcon"
                size="16"
                class="align-middle"
              />
            </template>
            <b-dropdown-item>
              <router-link :to="{ name: 'home'}">
                Home
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link :to="{ name: 'faq'}">
                FAQ
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link :to="{ name: 'findAgent'}">
                Find Agent
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link :to="{ name: 'joinUsPage'}">
                Join Us
              </router-link>
            </b-dropdown-item>
            <b-dropdown-divider />
            <b-dropdown-item>
              <b-button
                v-if="!isLogin"
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-dark"
                @click.prevent="routerPushTo('login')"
                >
                Sign in
              </b-button>
            </b-dropdown-item>
          </b-dropdown>
        </b-nav>
        <div class="main-content">
          <router-view></router-view>
        </div>
        <footer class="fixed-bottom px-5">
            <p class="clearfix mb-0">
                <span class="float-md-left d-block d-md-inline-block mt-25">
                    Copyright  © {{ new Date().getFullYear() }}
                    <b-link
                        class="ml-25"
                        href="#"
                        target="_blank"
                    >Kloud Realty, Inc.</b-link>
                    <span class="d-none d-sm-inline-block">, All rights Reserved</span>
                </span>
                <span class="float-md-right d-none d-md-block">
                    <feather-icon
                    icon="PowerIcon"
                    size="21"
                    class="text-danger stroke-current"
                    />
                    by UltraKloud
                </span>
            </p>
        </footer>
    </section>

</template>

<script>
/* eslint-disable global-require */
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser,isUserNew } from '@/auth/utils'
import { BLink, BButtonGroup,BButton, BNav,BNavItem,BDropdown,BDropdownItem,} from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import Ripple from 'vue-ripple-directive'
import store from '@/store/index'

export default {
  data() {
    return {
      isLogin: false,
      isNewUser: false,
      logout:`${this.GLOBAL.server}/auth/signout`,
    }
  },
  components: {
    VuexyLogo,
    BLink,
    BNav,
    BNavItem,
    BButtonGroup,
    BButton,
    BDropdown,
    BDropdownItem,
    Ripple,
  },
  directives: {
    Ripple,
  },
  watch:{

  },
  methods: {
    routerPushTo(where){
        this.$router.push({name:`${ where }`})
    },
    checkLogin() {
      const user = JSON.parse(localStorage.getItem('userData'))
      console.log(JSON.parse(localStorage.getItem('userData')))
      // this.isLogin = user.isLogin
      // this.$http.get(`${this.GLOBAL.server}/login/check`)
      //   .then(res => {
      //     console.log(res.data)
      //     if(res.data.isLogin) {
      //       this.isLogin = res.data.isLogin
      //       localStorage.setItem('userData', JSON.stringify(res.data.user))
      //       this.$ability.update(res.data.user.ability)
      //     }else{
      //       console.log("login yet")
      //     }

      //   })
    },
    
  },
  created(){
    this.checkLogin()
    console.log(this.GLOBAL)
    // this.$http.get(`${this.GLOBAL.api}/testing`)
    //     .then(res => {
    //       console.log(res.data)
    //     })
        // fetch(`https://uaT.kloudrealty.com/api/login/check`)
        // .then(res => {
        //   console.log(res)
        // })
  }
}
</script>

<style lang="scss">
#home-page{
    position: absolute;
    z-index: 5;
    background-color: #fff;
    height: 100vh;
    ul{
        li{
            a{
                color:#000;
            }
        }
    }
  .main-content{
    position: absolute;
    top:95px;
    width: 100vw;
  }
}
footer{
  background-color: #fff;
}
</style>