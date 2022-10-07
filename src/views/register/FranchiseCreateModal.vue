<template>
    <b-modal
      id="modal-franchise-create"
      ref="my-modal"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      title="Franchise"
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
              name="Franchise Name"
              rules="required"
            >
        <b-form-group
          label="Enter Franchise Name"
          label-for="franchise_name"
        >
          <b-form-input
            id="franchise_name"
            placeholder="Enter franchise name"
            :state="errors.length > 0 ? false:null"
            v-model="tempFranchise.franchise_name"
          />
        </b-form-group>
        <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
        <!-- address -->
        <validation-provider
              #default="{ errors }"
              name="Address"
              rules="required"
            >
            <b-form-group
              label="Address"
              label-for="address"
            >
              <b-form-input
                id="address"
                placeholder="Address"
                v-model="tempFranchise.address"
              />
            </b-form-group>
            <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
        <!-- phone number -->
        <validation-provider
              #default="{ errors }"
              name="Phone Number"
              rules="required"
            >
            <b-form-group
              label="Phone Number"
              label-for="phone_number"
            >
                <b-form-input
                  id="phone_number"
                  placeholder="Phone Number"
                  v-model="tempFranchise.phone_number"
                />
            </b-form-group>
            <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
        
        <!-- stauts -->
        <b-form-group
          label="Choose the stauts"
          label-for="status-select"
        >
          <v-select
            id="status-select"
            v-model="tempFranchise.status"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="option"
          />
        </b-form-group>
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
  data() {
    return {
      headerBgVariant: 'light',
      headerTextVariant: 'dark',
      selected: '',
      option: ['secret', 'publish'],
      tempFranchise:{
        franchise_name:'',
        address:'',
        phone_number:'',
        status:''
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
          this.$bus.$emit('create-franchise', this.tempFranchise)
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

