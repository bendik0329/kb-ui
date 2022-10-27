<template>
  <section id="card-navigation">
    <b-row>
      <b-col>
        <b-card class="text-center">
          <b-tabs
            pills
            nav-class="mb-2"
          >
            <b-tab
              title="1. Find an Agent"
              active
            >
              <b-card-title>It's like Tinder for houses</b-card-title>
              <b-card-text>
                The right agent will go along way. Simply type in your zip code. We'll find an agent close to you or the area you are looking for. For more information on the home buying/selling process, click on the FAQ tab above.
              </b-card-text>
              <b-form-group
              label="Zip Code"
              label-for="zip"
              class="mb-2"
            >
              <b-form-input
                id="zip"
                placeholder="ex. 77068"
              />
            </b-form-group>
            <br>
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-primary"
              >
                Find my Agent
              </b-button>
            </b-tab>
            <b-tab title="2. Find a Lender">
              
                <b-card-title>
                  Shop for rates, get prequalified.
                </b-card-title>
                <b-card-text class="mb-2">
                  In order for you to find out how much house you can afford, contact a lender/s and ask for a Prequalification Letter. For a curated list of lenders click below.
                </b-card-text>
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="outline-primary"
                  >
                Search
              </b-button>
            </b-tab>
            <b-tab title="3. Find a Home">
              <b-card-title>Finally you are ready to start your home search.</b-card-title>
              <b-card-text>
                Your agent can guide you through the rest of the way. Schedule an appointment with one of our top notch real estate agents by clicking below.
              </b-card-text>
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-primary"
              >
                Schedule
              </b-button>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import {
  BRow, BCol, BCard, BTab, BTabs, BCardText, BCardTitle, BCardHeader, BMedia, BMediaAside, BAvatar, BMediaBody, BBadge, BCardBody, BButton, BFormInput,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BTab,
    BTabs,
    BCardText,
    BCardTitle,
    BButton,
    BBadge,
    BCardHeader,
    BMedia,
    BFormInput,
    BMediaAside,
    BAvatar,
    BMediaBody,
    BCardBody,
  },
  directives: {
    Ripple,
  },
}
</script>
