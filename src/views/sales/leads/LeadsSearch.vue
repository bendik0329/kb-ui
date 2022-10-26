<template>
    <vue-autosuggest
      :suggestions="filteredOptions"
      :input-props="inputProps"
      :get-suggestion-value="getSuggestionValue"
      :on-selected="onSelected"
      :limit="10"
      @input="onInputChange"
    >
      <template slot-scope="{suggestion}"
      class="position-absolute">
        <div class="d-flex align-items-center">
          <b-avatar v-if="suggestion.item.attributes.avatar" :src="suggestion.item.attributes.avatar" />
          <b-avatar v-else
            variant="light-secondary"
            >
            <span>{{initialsName(suggestion.item.attributes.name)}}</span>
          </b-avatar>
          <div class="detail ml-50">
            <b-card-text class="mb-0">
              {{ suggestion.item.attributes.name }}
            </b-card-text>
            <small class="text-muted">
              {{ suggestion.item.attributes.email }}
            </small>
          </div>
        </div>
      </template>
    </vue-autosuggest>
  </template>
  
  <style lang="scss">
  #autosuggest{
    position: relative;
    width: 100%;
  }
  </style>


  <script>
  import { VueAutosuggest } from 'vue-autosuggest'
  import { BAvatar, BCardText } from 'bootstrap-vue'
  export default {
    components: {
      VueAutosuggest,
      BCardText,
      BAvatar,
    },
    props: {
        leads:{
            type: [Object , Array],
            default () {return{}}
        }
    },
    watch:{
        leads(){
            this.datasuggest = this.leads
            console.log('suggest',this.datasuggest)
        },
    },
    data() {
      return {
        datasuggest: [],
        filteredOptions: [],
        inputProps: {
          id: 'autosuggest__input',
          class: 'form-control',
          placeholder: "Search...",
        },
        limit: 20,
      }
    },
    created() {
       

      this.$http.get('/autosuggest/data')
        .then(res => {
            console.log('old data',res.data) 
            //this.datasuggest = res 
        })
    },
    methods: {
      getSuggestionValue(suggestion) {
        this.$bus.$emit('selected-lead', suggestion.item)
        return suggestion.item.attributes.name;
      },
      onSelected(option) {
        this.selected = option.item
      },
      onInputChange(text) {
        if (text === '' || text === undefined) {
          return
        }
  
        /* Full control over filtering. Maybe fetch from API?! Up to you!!! */
        //const filteredDevelopers = this.datasuggest.data[0].developers.filter(item => item.name.toLowerCase().indexOf(text.toLowerCase()) > -1).slice(0, this.limit)
        //const filteredDesigner = this.datasuggest.data[0].designers.filter(item => item.name.toLowerCase().indexOf(text.toLowerCase()) > -1).slice(0, this.limit)
        
        const filteredLeads = this.leads.filter(item => item.attributes.name.toLowerCase().indexOf(text.toLowerCase()) > -1).slice(0, this.limit)
        
        //const filteredData = filteredDevelopers.concat(filteredDesigner)
        this.filteredOptions = [{
          data: filteredLeads,
        }]
      },
      initialsName(name){
        if(name.includes('-')) {
           const splitName = name.split('-')
           let newName = ''
           splitName.forEach(item => {
            newName += item[0].toUpperCase()
           });
           return newName
        }else{
            const splitName = name.split(' ')
           let newName = ''
           splitName.forEach(item => {
            newName += item[0].toUpperCase()
           });
           return newName
        }
      },
    },
  }
  </script>