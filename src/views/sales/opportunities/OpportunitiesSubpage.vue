<template>
  <b-row class="match-height">
      <b-col md="12">
        <opportunities-list></opportunities-list>
      </b-col>
    </b-row>

</template>

<script>
import { BRow, BCol, BLink,BCard,BTab,BTabs,BButton, BCardTitle,BCardText, BCardSubTitle, } from 'bootstrap-vue'
  import OpportunitiesList from './OpportunitiesList.vue'


  export default {
    components: {
      BRow,
      BCol,
      OpportunitiesList,
    },



  }

</script>