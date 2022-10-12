<template>
  <layout-vertical>

    <router-view />

    <app-customizer
      v-if="showCustomizer"
      slot="customizer"
    />

  </layout-vertical>
</template>

<script>
import LayoutVertical from '@core/layouts/layout-vertical/LayoutVertical.vue'
import AppCustomizer from '@core/layouts/components/app-customizer/AppCustomizer.vue'
import { $themeConfig } from '@themeConfig'

export default {
  components: {
    AppCustomizer,
    LayoutVertical,
  },
  data() {
    return {
      showCustomizer: $themeConfig.layout.customizer,
    }
  },
  methods:{
    checkLogin() {
      this.$http.get(`${this.GLOBAL.server}/login/check`)
        .then(res => {
          console.log(res.data)
          if(res.data.isLogin) {
            this.isLogin = res.data.isLogin
            localStorage.setItem('userData', JSON.stringify(res.data.user))
            this.$ability.update(res.data.user.ability)
          }else{
            console.log("login yet")
          }

        })
    },
    tokenCheck() {
      this.$http.get(`${this.GLOBAL.server}/token/check`)
        .then(res => {
          console.log(res.status)
        }).catch(err => {
          console.log(err)
          const refreshToken = localStorage.getItem('refreshToken')
          console.log( refreshToken )
          this.$http.post(`${this.GLOBAL.server}/refresh-token`,{
            token:refreshToken
          })
          .then( res => {
            console.log(res.data)
            localStorage.setItem('accessToken', res.data.accessToken)
            this.checkLogin()
          })
        })
    },
  },
  created(){
    // this.checkLogin()
    // this.tokenCheck()
  }
}
</script>
