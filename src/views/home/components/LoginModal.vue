<template>
    <div>
      <b-modal
        id="modal-login"
        cancel-variant="outline-secondary"
        centered
        title="Login"
        ref="login-modal"
      >
      <b-overlay
      :show="loading"
      :variant="variant"
      :opacity="opacity"
      :blur="blur"
      rounded="bg"
      >
        <b-form>
          <b-form-group>
            <label for="email">Email:</label>
            <b-form-input
              v-model="userEmail"
              id="email"
              type="email"
              placeholder="Email Address"
            />
          </b-form-group>
          <b-form-group>
            <label for="password">Password</label>
            <b-form-input
              v-model="password"
              type="password"
              placeholder="Password"
            />
          </b-form-group>
        </b-form>
        
    </b-overlay>
    <template #modal-footer>
    <div class="w-100">
      
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
        size="sm"
        class="float-right"
        @click="login()"
      >
        Login
      </b-button>
    </div>
    </template>
      </b-modal>
    </div>
  </template>
  
  <script>
  import { ValidationProvider, ValidationObserver } from 'vee-validate'
  import { required, email } from '@validations'
  import { togglePasswordVisibility } from '@core/mixins/ui/forms'
  import {
    BOverlay,BButton, BModal, VBModal, BForm, BFormInput, BFormGroup,
  } from 'bootstrap-vue'
  import vSelect from 'vue-select'
  import Ripple from 'vue-ripple-directive'
  import { abilityCheck } from './ability'
  
  export default {
    components: {
      BOverlay,
      BButton,
      BModal,
      BForm,
      BFormInput,
      BFormGroup,
      vSelect,
    },
    directives: {
      'b-modal': VBModal,
      Ripple,
    },
    data() {
      return {
        loading:false,
        variant: 'light',
        opacity: 1,
        blur: '3em',
        userEmail: 'franchise01@test.com',//test1234@test.test,franchise01@test.com
        password: 'franchise01@test.com',//test1234,franchise01@test.com
      }
    },
    methods:{
      login() {
        this.loading = true
        this.$http.post(`${this.GLOBAL.server}/auth/local/`,{
          identifier:this.userEmail,
          password:this.password
        })
          .then( res => {
            if(res.data.user) {
              localStorage.setItem('accessToken', res.data.jwt)
              const data = {
                id: res.data.user.id,
                fullName: res.data.user.fullName,
                username: res.data.user.username,
                // eslint-disable-next-line global-require
                avatar: res.data.user.avatar,
                email:  res.data.user.email,
                role: res.data.user.userType,
                ability: abilityCheck(res.data.user.userType),
                extras: {
                  eCommerceCartItemsCount: 0,
                },
                isLogin:true
              }
              localStorage.setItem('userData', JSON.stringify(data))
              this.$ability.update(data.ability)
              this.$bus.$emit('login-success')
              //this.hideModal()
              this.routerPushToDashboard(res.data.user.userType)
            }
          })
      },
      hideModal() {
        this.$refs['login-modal'].hide()
      },
      routerPushToDashboard(type){
        let dashboard = ''
        if(type =='owner') dashboard = 'owner'
        if(type =='franchise') dashboard = 'franchise'
        if(type =='Agent') dashboard = 'agent'
        // console.log(`dashboard-${ dashboard }`)
        this.$router.push({name:`dashboard-${ dashboard }`})
      },
    },
    
  }
  </script>