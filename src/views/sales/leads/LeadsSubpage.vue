<template>
    <b-row class="match-height">
      <b-col md="12">
        <lead-list></lead-list>
      </b-col>
    </b-row>

</template>

<script>
import { BRow, BCol, BLink,BCard,BTab,BTabs,BButton, BCardTitle,BCardText, BCardSubTitle, } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import LeadList from './LeadList'

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BCard,
    BTab,
    BTabs,
    BCardTitle, 
    BCardText,
    BCardSubTitle,
    BButton,
    LeadList,
  },
  directives: {
    Ripple,
  },
}

</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
@import '@core/scss/vue/libs/chart-apex.scss';
.doughnut{
  position: relative;
}
</style>
