<template>
    <b-modal
      id="modal-prevent-closing"
      ref="my-modal"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      title="Team"
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
        <!-- franchise name -->
        <validation-provider
              #default="{ errors }"
              name="Team Name"
              rules="required"
            >
        <b-form-group
          label="Enter Team Name"
          label-for="team_name"
        >
          <b-form-input
            id="team_name"
            placeholder="Enter team name"
            :state="errors.length > 0 ? false:null"
            v-model="tempTeam.team_name"
          />
        </b-form-group>
        <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
        <!-- franchise -->
        <validation-provider
              #default="{ errors }"
              name="Franchise"
              rules=""
            >
            <b-form-group
              label="Choose the Franchise"
              label-for="franchise-select"
              >
              <v-select
                id="franchise-select"
                v-model="tempTeam.franchise_name"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="tempFranchiseOption"
              />
            </b-form-group>
            <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
        <!-- user -->
        <validation-provider
              #default="{ errors }"
              name="User"
              rules=""
            >
            <b-form-group
              label="Choose the User"
              label-for="user-select"
              >
              <v-select
                id="user-select"
                v-model="tempTeam.member"
                multiple
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="tempUserOption"
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
    team: {
        type: Object,
        default () {return{}}
    },
    franchiseOption: {
        type: [Array,Object],
        default () {return{}}
    },
    userOption: {
        type: [Array,Object],
        default () {return{}}
    }
  },
  watch: {
    team () {
        this.tempTeam = this.team
    },
    franchiseOption () {
        this.tempFranchiseOption = this.franchiseOption
    },
    userOption () {
        this.tempUserOption = this.userOption
    }
  },
  data() {
    return {
      headerBgVariant: 'light',
      headerTextVariant: 'dark',
      franchiseSelected: '',
      tempFranchiseOption: [],
      userSelected: [],
      tempUserOption: [],
      tempTeam:{
        team_name:'',
        franchise_name:'',
        member:[],
      },
      name: '',
      nameState: null,
      submittedNames: [],
    }
  },
  methods: {
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          // eslint-disable-next-line
          console.log('validate OK!!')
          this.$bus.$emit('send-team', this.tempTeam)
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

