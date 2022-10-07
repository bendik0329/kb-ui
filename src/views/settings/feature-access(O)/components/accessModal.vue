<template>
    <b-modal
      id="modal-change-access"
      ref="my-modal"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      title="Access"
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
       
        <!--Access -->
        <validation-provider
              #default="{ errors }"
              name="Access"
              rules="required"
            >
            <b-form-group
              label="Choose the Access"
              label-for="access-select"
              >
              <v-select
                id="access-select"
                v-model="tempAccess.Access"
                multiple
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="tempAccessOption"
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
    access: {
        type: Object,
        default () {return{}}
    },
    index: {
      type: Number,
      default () {return{}}
    }
  },
  watch: {
    access () {
      this.tempAccess = this.access
    },
    index () {
      this.pageIndex = this.index
    }
  },
  data() {
    return {
      headerBgVariant: 'light',
      headerTextVariant: 'dark',
      tempAccessOption: ["Owner","Franchise","Agent"],
      tempAccess: {},
      name: '',
      nameState: null,
      submittedNames: [],
      pageIndex:0,
    }
  },
  methods: {
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          // eslint-disable-next-line
          console.log('validate OK!!')
          this.$bus.$emit('send-access', this.tempAccess,this.pageIndex)
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

