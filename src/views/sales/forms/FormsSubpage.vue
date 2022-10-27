<template>
    <b-row class="match-height">
      <b-col md="12">
        <forms-list></forms-list>
      </b-col>
    </b-row>
</template>

<script>
import { BRow, BCol, BLink,BCard,BTab,BTabs,BButton, BCardTitle,BCardText, BCardSubTitle, } from 'bootstrap-vue'
  import FormsList from './FormsList.vue'


  export default {
    components: {
      BRow,
      BCol,
      FormsList,
    },



  }

</script>