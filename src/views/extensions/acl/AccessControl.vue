<template>
  <b-row>
    <b-col
    cols="12"
    >
    <b-button-group>
    <b-button
      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
      variant="outline-primary"
      @click="changeAbility(owner)"
    >
      Owner
    </b-button>
    <b-button
      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
      variant="outline-primary"
      @click="changeAbility(franchise)"
    >
      Franchise
    </b-button>
    <b-button
      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
      variant="outline-primary"
      @click="changeAbility(agent)"
    >
      Agent
    </b-button>
  </b-button-group>
    </b-col>
    <b-col>
      <b-button
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        variant="outline-primary"
        @click="routerPushTo('dashboard-analytics')"
      >
        test to dashboard-analytics
      </b-button>
    </b-col>
    <b-col
      cols="12"
      md="6"
    >
      <b-card title="visitor">
        <b-card-text>No ability is required to view this card123</b-card-text>
        <b-card-text class="text-primary">
          This card is visible to 'everyone' 
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
        <b-card-text>User with 'Agent'</b-card-text>
        <b-card-text class="text-danger">
          This card is visible to 'Agent' 'Franchise' 'Owner'
        </b-card-text>
      </b-card>
    </b-col>

    <b-col
      v-if="$can('read', 'franchise')"
      cols="12"
      md="6"
    >
      <b-card title="Franchise">
        <b-card-text>User with 'Franchise'</b-card-text>
        <b-card-text class="text-danger">
          This card is visible to 'Franchise' 'Owner'
        </b-card-text>
      </b-card>
    </b-col>

    <b-col
      v-if="$can('read', 'owner')"
      cols="12"
      md="6"
    >
      <b-card title="Owner">
        <b-card-text>User with 'Owner'</b-card-text>
        <b-card-text class="text-danger">
          This card is visible to 'Owner'
        </b-card-text>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow, BCol, BCard, BCardText,BButtonGroup, BButton
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  data() {
    return {
      owner: [
        {
          action: 'manage',
          subject: 'all',
        },
      ],
      franchise:[
        {
          action: 'read',
          subject: 'franchise',
        },
        {
          action: 'read',
          subject: 'Agent',
        },
        {
          action: 'read',
          subject: 'ACL',
        },
      ],
      agent:[
        {
          action: 'read',
          subject: 'Agent',
        },
        {
          action: 'read',
          subject: 'ACL',
        },
      ]
    }
  },
  components: {
    BRow, BCol, BCard, BCardText,BButtonGroup, BButton,
  },
  directives: {
    Ripple,
  },
  methods: {
    changeAbility(ability) {
      this.$ability.update(ability)
    },
    routerPushTo(where){
        this.$router.push({name:`${ where }`})
    }
  }
}
</script>
