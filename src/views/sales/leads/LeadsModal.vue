<template>
    <b-modal
      id="modal-lead-update"
      size="xl"
      ref="modal-lead-update"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      title="Create Lead"
      ok-title="Submit"
      cancel-variant="outline-secondary"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <validation-observer ref="simpleRules">
      <b-form
       ref="form"
       @submit.stop.prevent="validationForm()">
       <b-row>
        <b-col
          md="6"
          >
          <!-- type -->
          <validation-provider
            #default="{ errors }"
            name="type"
            rules="required"
            >
            <b-form-group
              label="Choose the type"
              label-for="type-select"
              >
              <v-select
                id="type-select"
                v-model="tempLead.type"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="tempTypeOptions"
              />
            </b-form-group>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>

          <!-- category -->
          <validation-provider
            #default="{ errors }"
            name="Category"
            rules="required"
            >
            <b-form-group
              label="Choose the Category"
              label-for="category-select"
              >
              <v-select
                id="category-select"
                v-model="tempLead.category"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="tempCategoryOptions"
              />
            </b-form-group>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>

          <!-- source -->
          <validation-provider
            #default="{ errors }"
            name="Source"
            rules="required"
            >
            <b-form-group
              label="Choose the Source"
              label-for="source-select"
              >
              <v-select
                id="source-select"
                v-model="tempLead.source"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="tempSourceOptions"
              />
            </b-form-group>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>

          <!-- rating -->
          <validation-provider
            #default="{ errors }"
            name="Rating"
            rules="required"
            >
            <b-form-group
              label="Choose the Rating"
              label-for="rating-select"
              >
              <v-select
                id="rating-select"
                v-model="tempLead.rating"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="tempRatingOptions"
              />
            </b-form-group>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>
        <b-col
          md="6">
          <!-- Name -->
          <validation-provider
                #default="{ errors }"
                name="Name"
                rules="required"
              >
          <b-form-group
            label="Enter Name"
            label-for="Name"
          >
            <b-form-input
              id="Name"
              placeholder="Enter Name"
              :state="errors.length > 0 ? false:null"
              v-model="tempLead.name"
            />
          </b-form-group>
          <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
          
          <!-- email -->
          <validation-provider
                #default="{ errors }"
                name="Email"
                rules="required|email"
              >
              <b-form-group
                label="Email"
                label-for="email"
              >
                  <b-form-input
                    id="email"
                    placeholder="Email"
                    v-model="tempLead.email"
                  />
              </b-form-group>
              <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
          <!-- phone -->
          <validation-provider
                #default="{ errors }"
                name="Phone"
                rules="required|integer|min:10"
              >
              <b-form-group
                label="Phone"
                label-for="phone"
              >
                  <b-form-input
                    id="phone"
                    placeholder="Phone Number"
                    v-model="tempLead.phone"
                  />
              </b-form-group>
              <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
          
          <!-- address -->
          <validation-provider
                #default="{ }"
                name="address"
                rules=""
              >
          <b-form-group
            label="Enter Address"
            label-for="address"
          >  
            <leads-modal-address
              :tempAddress=tempLead.address
              class="position-relative"
              ></leads-modal-address>
          </b-form-group>
          <small class="text-danger">{{ addressErr }}</small>
          </validation-provider>
        </b-col>

       </b-row>
        


        <div
          v-show = "tempLead.category == 'agent'">

          <!-- team -->
          <validation-provider
                #default="{ errors }"
                name="Team"
              >
              <b-form-group
                label="Choose the Team"
                label-for="franchise-select"
                >
                <v-select
                  id="franchise-select"
                  v-model="tempLead.team"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="tempTeamOption"
                />
              </b-form-group>
              <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
  
          <!-- user -->
          <validation-provider
                #default="{ errors }"
                name="User"
              >
              <b-form-group
                label="Choose the User"
                label-for="user-select"
                >
                <v-select
                  id="user-select"
                  v-model="tempLead.agent"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="tempUserOption[tempLead.team]"
                />
              </b-form-group>
              <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </div>
      </b-form>
      </validation-observer>
    </b-modal>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BRow,BCol,BButton,BForm, BFormGroup, BFormInput,BFormSelect, BDropdown, BDropdownItem, BModal, VBModal, BCardText, BListGroup, BListGroupItem,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { required, email } from '@validations'
import Ripple from 'vue-ripple-directive'
import leadsModalAddress from "./LeadsModalAddress.vue";
import { filterAddress } from'@/@core/mixins/ui/address'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BRow,
    BCol,
    BButton,
    BForm,
    BFormGroup,
    BCardText,
    BFormInput,
    BListGroup,
    BListGroupItem,
    BFormSelect,
    BDropdown,
    BDropdownItem,
    vSelect,
    required,
    email,
    BModal,
    leadsModalAddress
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  props: {
    lead: {
      type: Object,
      default () {return{}}
    },
    userType:{
      type:String,
      default () {return{}}
    }
  },
  watch: {
    lead () {
        //owner
        this.tempLead = this.lead
        console.log('lead',this.tempLead,this.userType)
        if(this.userType == 'franchise' ){
          this.tempTypeOptions = ['Agent','Buyer','Seller']
          this.tempSourceOptions = ['System','Advertisement',`${this.tempLead.franchise.franchise_name}`,'Agent Referral','Client Referral','Social','Web','Word of Mouth','Other']
          this.tempCategoryOptions = ['Franchise','Team','Agent',]
        }else if(this.userType == 'agent') {
          this.tempTypeOptions = ['Buyer','Seller']
          this.tempSourceOptions = ['System','Advertisement',`${this.tempLead.franchise.franchise_name}`,'Agent Referral','Client Referral','Social','Web','Word of Mouth','Other']
          this.tempCategoryOptions = ['Team','Agent',]
        }
    },
    

  },
  data() {
    return {
      headerBgVariant: 'light',
      headerTextVariant: 'dark',
      tempTypeOptions: ['Franchise', 'Agent','Buyer','Seller','Management'],
      tempCategoryOptions:['Owner','Franchise','Team','Agent',],
      tempSourceOptions:['System','Advertisement','Franchise Name','Agent Referral','Client Referral','Social','Web','Word of Mouth','Other'],
      tempRatingOptions:['hot','warm','cold',],
      tempTeamOption: [],
      tempUserOption: [],
      tempLead:{
        type:'',
        category:'',
        rating:'',
        name:'',
        phone:'',
        email:'',
        address:'',
        rating:'',
        owner:'',
        franchise:'',
        team:'',
        agent:'',
      },
      addressErr:'',
    }
  },
  methods: {
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          // eslint-disable-next-line
          console.log('validate OK!!')
          this.$bus.$emit('update-lead', this.tempLead)
          this.$nextTick(() => {
            this.$refs['modal-lead-update'].toggle('#toggle-btn')
          })
        }
      })
    },
    resetModal() {
      this.nameState = null
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.validationForm()) {
        return
      }
      // Push the name to submitted names
      console.log('submit')
    //   this.$bus.$emit('send-franchise', this.tempFranchise)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs['modal-lead-update'].toggle('#toggle-btn')
      })
    },
  },
  mounted(){
    this.$bus.$on('send-address', (address) => {
        console.log('1',address)
        console.log('2',filterAddress(address))
        const adrress = filterAddress(address)
        this.tempLead.address = adrress.addressString
        this.addressErr = adrress.message
      })
  },
  beforeDestroy(){
      this.$bus.$off('send-address')
    }
}
</script>
