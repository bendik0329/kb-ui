<template>
    <b-row class="match-height">
      <b-col md="12">
        <task-list></task-list>
      </b-col>
    </b-row>
</template>

<script>
import { BRow, BCol, BLink,BCard,BTab,BTabs,BButton, BCardTitle,BCardText, BCardSubTitle, } from 'bootstrap-vue'
  import TaskList from './TaskList.vue'


  export default {
    components: {
      BRow,
      BCol,
      TaskList,
    },



  }

</script>