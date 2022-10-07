<template>
    <div>
        <h2>Auth Page</h2>
       <b-row>
    <b-col
      cols="12"
      md="6"
    >
      <b-card title="Common">
        <b-card-text>No ability is required to view this card123</b-card-text>
        <b-card-text class="text-primary">
          This card is visible to 'user' and 'admin' both
        </b-card-text>
      </b-card>
    </b-col>
    <b-col
      v-if="$can('read', 'Analytics')"
      cols="12"
      md="6"
    >
      <b-card title="Analytics">
        <b-card-text>User with 'Analytics' subject's 'Read' ability can view this card</b-card-text>
        <b-card-text class="text-danger">
          This card is visible to 'admin' only
        </b-card-text>
      </b-card>
    </b-col>


    <b-col
      v-if="$can('read', 'Agent')"
      cols="12"
      md="6"
    >
      <b-card title="Agent">
        <b-card-text>User with 'Agent' {{ $can('read', 'Agent') }}</b-card-text>
        <b-card-text class="text-danger">
          This card is visible to 'Agent' 'Franchise' 'Owner'
        </b-card-text>
      </b-card>
    </b-col>
  </b-row>
    </div>
</template>

<script>
import {
  BRow, BCol, BCard, BCardText,
} from 'bootstrap-vue'
export default {
    components: {
    BRow, BCol, BCard, BCardText,
  },
created() {
    const userAbility = JSON.parse(localStorage.getItem('userData')).ability
    // console.log(userAbility,this.$ability)
    this.$ability.update(userAbility)
}
}
</script>