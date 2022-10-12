<template>
  <div class="auth-wrapper auth-v1 px-2">
    <b-overlay
      :show="show"
      :variant="variant"
      :opacity="opacity"
      :blur="blur"
      rounded="bg"
      >
      <div class="auth-inner py-2">
        <!-- Login v1 -->
        <b-card class="mb-0">
          <b-link class="brand-logo">
            <vuexy-logo />
          </b-link>

          <b-card-title class="mb-1">
            Welcome to Kloud Realty! 👋
          </b-card-title>
          <b-card-text class="mb-2">
            Please sign-in to your account and start the adventure
          </b-card-text>

      <!-- form -->
      <validation-observer
        ref="loginForm"
        #default="{invalid}"
      >
        <b-form
          class="auth-login-form mt-2"
          @submit.prevent
        >

          <!-- email -->
          <b-form-group
            label-for="email"
            label="Email"
          >
            <validation-provider
              #default="{ errors }"
              name="Email"
              rules="required|email"
            >
              <b-form-input
                id="email"
                v-model="userEmail"
                name="login-email"
                :state="errors.length > 0 ? false:null"
                placeholder="john@example.com"
                autofocus
                autocomplete="username"
                :disabled="loading"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <!-- password -->
          <b-form-group>
            <div class="d-flex justify-content-between">
              <label for="password">Password</label>
              <b-link :to="{name:'auth-forgot-password-v1'}">
                <small>Forgot Password?</small>
              </b-link>
            </div>
            <validation-provider
              #default="{ errors }"
              name="Password"
              rules="required"
            >
              <b-input-group
                class="input-group-merge"
                :class="errors.length > 0 ? 'is-invalid':null"
              >
                <b-form-input
                  id="password"
                  v-model="password"
                  :type="passwordFieldType"
                  class="form-control-merge"
                  :state="errors.length > 0 ? false:null"
                  name="login-password"
                  placeholder="Password"
                  autocomplete="current-password"
                  :disabled="loading"
                />

                <b-input-group-append is-text>
                  <feather-icon
                    class="cursor-pointer"
                    :icon="passwordToggleIcon"
                    @click="togglePasswordVisibility"
                  />
                </b-input-group-append>
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <!-- checkbox -->
          <b-form-group>
            <b-form-checkbox
              id="remember-me"
              v-model="status"
              name="checkbox-1"
            >
              Remember Me
            </b-form-checkbox>
          </b-form-group>

          <!-- submit button -->
          <b-button
            variant="primary"
            block
            :disabled="invalid"
            @click.prevent="login()"
          >
            Sign in
          </b-button>
          <!-- azure -->
          <b-button
            v-if="loading"
            variant="primary"
            block
            :disabled="invalid"
            :href="azureUrl"
          >
            Azure AD
          </b-button>
        </b-form>
      </validation-observer>

      <b-card-text class="text-center mt-2">
        <span>New on our platform? </span>
        <b-link :to="{name:'register'}">
          <span>Create an account</span>
        </b-link>
      </b-card-text>

      <div class="divider my-2">
        <div class="divider-text">
          or
        </div>
      </div>

          <!-- social button -->
          <div class="auth-footer-btn d-flex justify-content-center">
            <b-button
              href="javascript:void(0)"
              variant="facebook"
            >
              <feather-icon icon="FacebookIcon" />
            </b-button>
            <b-button
              href="javascript:void(0)"
              variant="twitter"
            >
              <feather-icon icon="TwitterIcon" />
            </b-button>
            <b-button
              href="javascript:void(0)"
              variant="google"
            >
              <feather-icon icon="MailIcon" />
            </b-button>
            <b-button
              href="javascript:void(0)"
              variant="github"
            >
              <feather-icon icon="GithubIcon" />
            </b-button>
          </div>
        </b-card>
        <!-- /Login v1 -->
      </div>
    </b-overlay>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BOverlay,BButton, BForm, BFormInput, BFormGroup, BCard, BLink, BCardTitle, BCardText, BInputGroup, BInputGroupAppend, BFormCheckbox,
} from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'

export default {
  components: {
    // BSV
    BOverlay,
    BButton,
    BForm,
    BFormInput,
    BFormGroup,
    BCard,
    BCardTitle,
    BLink,
    VuexyLogo,
    BCardText,
    BInputGroup,
    BInputGroupAppend,
    BFormCheckbox,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      show: true,
      loading:false,
      variant: 'light',
      opacity: 1,
      blur: '3em',
      userEmail: 'test1234@test.test',
      password: 'test1234',
      status: '',
      // validation rules
      required,
      email,
      isLogin: false,
      isNewUser: false,
      azureUrl:`${this.GLOBAL.server}/connect/microsoft`
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods:{
    login() {
      this.loading = true
      this.$http.post(`${this.GLOBAL.server}/auth/local/`,{
        identifier:this.userEmail,
        password:this.password
      })
        .then( res => {
          console.log(res)
          if(res.data.user) {
            console.log(res.data.jwt)
            localStorage.setItem('accessToken', res.data.jwt)
          }
        })
    },
    checkLogin() {
      this.$http.get(`${this.GLOBAL.server}/login/check`)
        .then(res => {
          console.log(res.data)
          if(res.data.isLogin) {
            this.isLogin = res.data.isLogin
            if(res.data.userStatus =='newuser') {
              this.isNewUser = true
            }
            if(res.data.userStatus == 'old'){
              localStorage.setItem('accessToken', res.data.accessToken)
              localStorage.setItem('refreshToken', res.data.refreshToken)
            }
            localStorage.setItem('userData', JSON.stringify(res.data.user))
            this.$ability.update(res.data.user.ability)
            
          }else{
            this.show = false
          }

        })
    },
  },
  
  created(){
    this.show = false
    localStorage.removeItem('accessToken')
    console.log(localStorage.getItem('accessToken'))
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
