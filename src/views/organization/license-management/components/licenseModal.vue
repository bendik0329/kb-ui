<template>
    <b-modal
      id="modal-prevent-closing"
      ref="my-modal"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      title="License"
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
        <!-- license name -->
        <validation-provider
              #default="{ errors }"
              name="License Name"
              rules="required"
            >
        <b-form-group
          label="Enter License Name"
          label-for="license_name"
        >
          <b-form-input
            id="license_name"
            placeholder="Enter license name"
            :state="errors.length > 0 ? false:null"
            v-model="tempLicense.license_name"
          />
        </b-form-group>
        <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
        <!-- license type -->
        <validation-provider
              #default="{ errors }"
              name="License Type"
              rules="required"
            >
            <b-form-group
              label="License Type"
              label-for="type-select"
            >
            <v-select
                id="type-select"
                v-model="tempLicense.license_type"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="tempTypeOption"
              />
            </b-form-group>
            <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
        <!-- license number -->
        <validation-provider
              #default="{ errors }"
              name="License Number"
              rules="required"
            >
            <b-form-group
              label="License Number"
              label-for="license_number"
            >
                <b-form-input
                  id="license_number"
                  placeholder="License Number"
                  v-model="tempLicense.license_number"
                />
            </b-form-group>
            <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
        <!-- issue date -->
        <validation-provider
              #default="{ errors }"
              name="Issue Date"
              rules="required"
            >
            <b-form-group
              label="Choose the Issue Date"
              label-for="issue_date"
              >
              <b-form-datepicker
                id="issue_date"
                v-model="tempLicense.issue_date"
                placeholder="Choose a date"
                local="en"
              />
            </b-form-group>
            <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>

        <!-- expiration date -->
        <validation-provider
              #default="{ errors }"
              name="Expiration Date"
              rules="required"
            >
        <b-form-group
          label="Choose the expiration date"
          label-for="expiration_date"
        >
          <b-form-datepicker
                id="expiration_date"
                v-model="tempLicense.expiration_date"
                placeholder="Choose a date"
                local="en"
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
  BButton,BForm, BFormGroup, BFormInput,BFormSelect, BDropdown, BDropdownItem, BModal,
  VBModal, BCardText, BListGroup, BListGroupItem,BFormDatepicker
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
    BFormDatepicker,
    required,
    BModal,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  props: {
    license: {
        type: Object,
        default () {return{}}
    },
  },
  watch: {
    license () {
        this.tempLicense = this.license
    },
  },
  data() {
    return {
      headerBgVariant: 'light',
      headerTextVariant: 'dark',
      tempTypeOption: ['Sales person','Broker'],
      tempLicense:{
        license_name:'',
        license_type:'',
        license_number:'',
        issue_date: '',
        expiration_date: ''
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
          this.$bus.$emit('send-license', this.tempLicense)
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

