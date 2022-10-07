<template>
    <b-modal
      id="modal-lead-create"
      ref="my-modal"
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
                :options="tempCategoryOption"
              />
            </b-form-group>
            <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
        <!-- fullName -->
        <validation-provider
              #default="{ errors }"
              name="Full Name"
              rules="required"
            >
        <b-form-group
          label="Enter Full Name"
          label-for="fullName"
        >
          <b-form-input
            id="fullName"
            placeholder="Enter franchise name"
            :state="errors.length > 0 ? false:null"
            v-model="tempLead.fullName"
          />
        </b-form-group>
        <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>

        <!-- post -->
        <validation-provider
              #default="{ errors }"
              name="Post"
              rules="required"
            >
        <b-form-group
          label="Enter Post"
          label-for="post"
        >
          <b-form-input
            id="post"
            placeholder="Enter post"
            :state="errors.length > 0 ? false:null"
            v-model="tempLead.post"
          />
        </b-form-group>
        <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
        <!-- email -->
        <validation-provider
              #default="{ errors }"
              name="Email"
              rules="required"
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
              rules="required"
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
      </b-form>
      </validation-observer>
    </b-modal>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BButton,BForm, BFormGroup, BFormInput,BFormSelect, BDropdown, BDropdownItem, BModal, VBModal, BCardText, BListGroup, BListGroupItem,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { required, email } from '@validations'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
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
    BModal,
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
    teamOption: {
        type: Array,
        default () {return{}}
    },
    userOption: {
        type: Object,
        default () {return{}}
    }
  },
  watch: {
    lead () {
        this.tempLead = this.lead
        console.log(this.tempLead)
    },
    teamOption () {
        this.tempTeamOption = this.teamOption
    },
    userOption () {
        this.tempUserOption = this.userOption
    }
  },
  data() {
    return {
      headerBgVariant: 'light',
      headerTextVariant: 'dark',
      tempTeamOption: [],
      tempUserOption: {},
      tempCategoryOption:['franchise','agent'],
      tempLead:{
        category:'agent',
        fullName:'',
        post:'',
        phone:'',
        email:'',
        team:'null',
        agent:'null',
      },
    }
  },
  methods: {
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          // eslint-disable-next-line
          console.log('validate OK!!')
          this.$bus.$emit('create-lead', this.tempLead)
          this.$nextTick(() => {
            this.$refs['my-modal'].toggle('#toggle-btn')
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
        this.$refs['my-modal'].toggle('#toggle-btn')
      })
    },
  }
}
</script>
