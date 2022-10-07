<template>
    <b-modal
      
      id="modal-lead-status"
      ref="status-modal"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      title="Change Status"
      ok-title="Submit"
      cancel-variant="outline-secondary"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <validation-observer ref="simpleRules">
      <b-form
       ref="form"
       class="my-5 pb-5"
       @submit.stop.prevent="validationForm()">
       

        <!-- status -->
        <validation-provider
              #default="{ errors }"
              name="status"
              rules="required"
            >
            <b-form-group
              label="Change the Status"
              label-for="status-select"
              >
              <v-select
                id="status-select"
                v-model="tempStatus.status"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="tempStatusOption"
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
import { required} from '@validations'
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
    status: {
        type: Object,
        default () {return{}}
    },
  },
  watch: {
    status () {
        this.tempStatus = this.status
    },
  },
  data() {
    return {
      headerBgVariant: 'light',
      headerTextVariant: 'dark',
      teamSelected: [],
      tempStatusOption: ['new','contacted','working','qualified','unqualified',],
      userSelected: [],
      tempUserOption: {},
      tempStatus: {
        status:'',
        id:''
      },
    }
  },
  methods: {
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          // eslint-disable-next-line
          console.log('validate OK!!')
          this.$bus.$emit('status-change', this.tempStatus)
          this.$nextTick(() => {
            this.$refs['status-modal'].toggle('#toggle-btn')
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
    }
  }
}
</script>

