<template>
    <div>
    <vue-google-autocomplete
      ref="address"
      id="map"
      classname="form-control"
      placeholder="Please type your address"
      :country="['us']"
      v-on:placechanged="getAddressData"
    >
    </vue-google-autocomplete>
    </div>
  </template>
   
  

  <script>
    import VueGoogleAutocomplete from "vue-google-autocomplete";
  
    export default {
      components: { 
       
        VueGoogleAutocomplete, 
      },
  
      data(){
        return{
          address: "",
        };
      },
  
      mounted() {
        // To demonstrate functionality of exposed component functions
        // Here we make focus on the user input
        this.$refs.address.focus();
      },
  
      methods: {
        /**
         * When the location found
         * @param {Object} addressData Data of the found location
         * @param {Object} placeResultData PlaceResult object
         * @param {String} id Input container ID
         */
        getAddressData: function (addressData, placeResultData, id) {
          this.address = addressData;
          this.$bus.$emit('send-address', this.address)
        },
      },
    };
  </script>