<template>
    <!-- start home-page -->
    <section id="home-page">
        <b-nav  class="fixed-top wrap-border d-flex align-items-center px-2 px-md-0  bg-white">
          <b-nav-item class="mr-auto font-weight-bolder">
            <router-link :to="{ name: 'home'}">
              <vuexy-logo />
            </router-link>
          </b-nav-item>
          <b-nav-item active class="font-weight-bolder d-xl-block d-lg-block d-md-block d-sm-none d-none">
            <router-link :to="{ name: 'home'}">
              Home
            </router-link>
          </b-nav-item>
          <b-nav-item class="font-weight-bolder d-xl-block d-lg-block d-md-block d-sm-none d-none">
            <router-link :to="{ name: 'faq'}">
              FAQ
            </router-link>
          </b-nav-item>
          <b-nav-item class="font-weight-bolder d-xl-block d-lg-block d-md-block d-sm-none d-none">
            <router-link :to="{ name: 'findAgent'}">
              Find Agent
            </router-link>
          </b-nav-item>
          <b-nav-item class="font-weight-bolder d-xl-block d-lg-block d-md-block d-sm-none d-none">
            <router-link :to="{ name: 'joinUsPage'}">
              Join Us
            </router-link>
          </b-nav-item>
          

          <!-- Login with modal -->
          <b-button
            v-if="!isLogin"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-dark"
            class="d-xl-block d-lg-block d-md-block d-sm-none d-none"
            v-b-modal.modal-login
            @click.prevent=""
          >
            Sign in(modal)
          </b-button>
          <!-- Login with modal -->


          <!-- Login with page -->
          <b-button
            v-if="!isLogin"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-dark"
            class="d-xl-block d-lg-block d-md-block d-sm-none d-none"
            @click.prevent="routerPushTo('login')"
          >
            Sign in 
          </b-button>
          <!-- Login with page -->


            <b-button-group
              class="d-xl-block d-lg-block d-md-block d-sm-none d-none"
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
                @click.prevent="userLogout"
                >
                Log out
              </b-button>
            </b-button-group>

          
          <b-dropdown
            id="dropdown-grouped"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-dark"
            right
            class="dropdown-icon-wrapper d-xl-none d-lg-none d-md-none d-sm-block"
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

            <!-- Login with modal -->
            <b-dropdown-item
              v-if="!isLogin"
              >
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-dark"
                v-b-modal.modal-login
                @click.prevent=""
                >
                Sign in (modal)
              </b-button>
            </b-dropdown-item>
            <!-- Login with modal -->

            <!-- Login with page -->
            <b-dropdown-item
              v-if="!isLogin"
              >
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-dark"
                @click.prevent="routerPushTo('login')"
                >
                Sign in
              </b-button>
            </b-dropdown-item>
            <!-- Login with page -->

            <b-dropdown-item
            v-if="isLogin">
            <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-dark"
                @click.prevent="routerPushTo('dashboard-ecommerce')"
                >
                Dashboard
              </b-button>
            </b-dropdown-item>
            <b-dropdown-item
            v-if="isLogin">
            <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-dark"
                @click.prevent="userLogout()"
                >
                Log out
              </b-button>
            </b-dropdown-item>
          </b-dropdown>
        </b-nav>
        <div class="main-content">
          <router-view></router-view>
          <login-modal></login-modal>
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
import { BLink, BButtonGroup,BButton,BModal, BNav,BNavItem,BDropdown,BDropdownItem,BDropdownDivider,} from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import Ripple from 'vue-ripple-directive'
import LoginModal from './components/LoginModal.vue'

export default {
  data() {
    return {
      isLogin: false,
      isNewUser: false,
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
    BDropdownDivider,
    Ripple,
    BModal,
    LoginModal,
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
      if(localStorage.getItem('accessToken')){
        this.isLogin = true
      }
     
    },
    userLogout(){
      localStorage.removeItem('accessToken')
      this.isLogin = false
    },
  },
  created(){
    this.checkLogin()
    
  },
  mounted(){
    this.$bus.$on('login-success', () => this.checkLogin() )

  },
  beforeDestroy(){
    this.$bus.$off('login-success' )
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