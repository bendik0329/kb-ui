<template>
  <section id="home-page">
      <div class="block-bg"></div>
      <div  class="row justify-content-center align-items-center h-100">
        <div class="col-8 border-1" >
          <h2 class="text-center mb-3">Need Home? Easy as 1, 2, 3.</h2>
          <b-card
          text-variant="white"
          bg-variant="primary"
          class="position-static"
          md="6"
        lg="4"
          >
          <b-row>
            <b-col cols="8">
              <form-wizard-vertical />
            </b-col>
          </b-row>
          </b-card>
          </div>
        </div>
      </div>
    </section>
</template>

<style lang="scss">
#home-page{
  position: relative;
  .block-bg{
    position: absolute;
    z-index: -1;
    width: 100vw;
    height: 100vh;
    background-image: url('../../../../public/background2.jpeg');
    background-repeat: no-repeat;
    background-size: cover;
    filter:brightness(.7);
  }
  .v-select{
    .vs__dropdown-toggle{
      background: #fff;
    }
  }
  h2{
    z-index: 1;
    color: #fff;
    font-size: 3em;
    font-weight: bold;
  }
  @import '@core/scss/vue/libs/vue-wizard.scss';
  @import '@core/scss/vue/libs/vue-select.scss';
}
</style>
<script>
import { VueAutosuggest } from 'vue-autosuggest'
import vSelect from 'vue-select'
import { BAvatar, BCardText, BButton, BRow, BCol } from 'bootstrap-vue'
import FormWizardVertical from './HomeSteps.vue'


export default {
  components: {
    BRow,
    BCol,
    FormWizardVertical,
    VueAutosuggest,
    vSelect,
    BAvatar,
    BCardText,
    BButton,
  },
  data() {
    return {
      datasuggest: [],
      query: '',
      suggestions: [],
      selected: null,
      inputProps: {
        id: 'autosuggest__input',
        class: 'form-control',
        placeholder: "search by agent name or location",
      },
      sectionConfigs: {
        developers: {
          limit: 6,
          label: 'Developers',
          onSelected: selected => {
            this.selected = selected.item
          },
        },
        pages: {
          limit: 6,
          label: 'Pages',
          onSelected: selected => {
            this.selected = selected.item
          },
        },
      },
      limit: 10,
    }
  },
  created() {
    this.$http.get('/autosuggest/data')
      .then(res => { this.datasuggest = res })
  },
  methods: {
    fetchResults(text) {
      const { query } = this
      if (query) {
        this.suggestions = []
      }

      /* Full control over filtering. Maybe fetch from API?! Up to you!!! */
      const filteredDevelopers = this.datasuggest.data[0].developers.filter(item => item.name.toLowerCase().indexOf(text.toLowerCase()) > -1).slice(0, this.limit)
      const filteredPages = this.datasuggest.data[0].pages.filter(item => item.name.toLowerCase().indexOf(text.toLowerCase()) > -1).slice(0, this.limit)
      filteredDevelopers.length && this.suggestions.push({ name: 'developers', data: filteredDevelopers })
      filteredPages.length && this.suggestions.push({ name: 'pages', data: filteredPages })
    },
    renderSuggestion(suggestion) {
      if (suggestion.name === 'developers') {
        const dev = suggestion.item
        return (
          <div class="d-flex align-items-center">
            <b-avatar src={dev.img} class="mr-50"></b-avatar>
            <div class="detail">
              <b-card-text class="mb-0">{dev.name}</b-card-text>
              <small class="text-muted">{dev.email}</small>
            </div>
          </div>
        )
      }
      if (suggestion.name === 'pages') {
        const page = suggestion.item
        return (
          <div class="d-flex align-items-center">
            <feather-icon icon={page.icon} size={'18'} class={'mr-75'} />
            <span>{page.name}</span>
          </div>
        )
      }
      return false
    },
  },
}
</script>
