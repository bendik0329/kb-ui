<template>
  <!--  page-->
  <div class="misc-wrapper">
    <b-link class="brand-logo">
      <vuexy-logo />
    </b-link>

    <div class="misc-inner p-2 p-sm-3 mt-5">
      <div class="w-100 text-center">
        <h2 class="mb-1">
          Welcome {{ username }} 🚀
        </h2>
        <p class="mb-3">
          Are you ready to create your own Business ?
        </p>
        
        <!-- <b-button
            variant="primary"
            class="m-1 btn-sm-block"
            @click.prevent="pushto('dashboard-analytics')"
          >
          Dashboard
        </b-button> -->
        <b-button
          v-if="userRole == 'franchise'"
            variant="primary"
            class="m-1 btn-sm-block"
            v-b-modal.modal-franchise-create
          >
          creat your franchise
        </b-button>


       
        <b-img
          fluid
          :src="imgUrl"
          alt="Coming soon page"
        />
      </div>
      <!-- modal -->
    <franchise-modal></franchise-modal>
    </div>

  </div>
<!--  page-->
</template>

<script>
/* eslint-disable global-require */
import {
  BLink, BForm, BFormInput, BButton, BImg,
} from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import store from '@/store/index'
import franchiseModal from './FranchiseCreateModal.vue'

export default {
  components: {
    VuexyLogo,
    BLink,
    BForm,
    BButton,
    BFormInput,
    BImg,
    franchiseModal
  },
  data() {
    return {
      downImg: require('@/assets/images/pages/coming-soon.svg'),
      username:'',
      userRole:'',
    }
  },
  methods:{
    pushto (where){
        this.$router.push({name:where})
    },
    createFranchise(item) {
      const url =`http://${this.GLOBAL.server}:3000/organization/new-franchise`
      const httpsMethods = 'post'
      console.log('create')
      this.$http[httpsMethods](url,item)
        .then(res => { 
          console.log(res.data)
          if(res.message == 'success'){
            this.$router.push({name:'dashboard-analytics'})
          }
        })
    }
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.downImg = require('@/assets/images/pages/coming-soon-dark.svg')
        return this.downImg
      }
      return this.downImg
    },
  },
  created () {
    this.username = JSON.parse(localStorage.getItem('userData')).username
    this.userRole = JSON.parse(localStorage.getItem('userData')).role
    // console.log(JSON.parse(localStorage.getItem('userData')),this.userRole)
    this.$ability.update(JSON.parse(localStorage.getItem('userData')).ability)
  },
  mounted() {
    this.$bus.$on('create-franchise', (franchise) => {this.createFranchise(franchise)})
  },
  beforeDestroy() {
    this.$bus.$off('create-franchise')
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-misc.scss';
</style>
