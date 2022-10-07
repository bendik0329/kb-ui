<template>
    <b-modal
      id="modal-lead-assign"
      ref="my-modal"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      title="Assign to"
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
       

        <!-- team -->
        <validation-provider
              #default="{ errors }"
              name="Team"
              rules="required"
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
      teamSelected: [],
      tempTeamOption: [],
      userSelected: [],
      tempUserOption: {},
      tempLead:{
        team:'',
        agent:'',
      },
    }
  },
  methods: {
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          // eslint-disable-next-line
          console.log('validate OK!!')
          this.$bus.$emit('send-assign', this.tempLead)
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

