<template>
  <div>
    <b-modal
      id="modal-lead-status"
      ref="status-modal"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      title="Change Status"
      ok-title="Submit"
      cancel-variant="outline-secondary"
      no-stacking
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

      <template #modal-footer>
        <div class="w-100">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="float-right"
            v-b-modal.modal-multi-2
          >
            Submit
          </b-button>
        </div>
      </template>

    </b-modal>
    <b-modal
      id="modal-multi-2"
      ref="status-modal-2"
      title="Are you sure ?"
      ok-only
      ok-title="Accept"
      @OK="handleOk"
    >
      <b-card-text class="my-2">
        Are you sure you sign all the Forms?
      </b-card-text>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="float-right"
            @click="statusSubmit()"
          >
          confirm
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
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
      tempStatusOption: ['New','Contacted','Working','Qualified','Unqualified',],
      userSelected: [],
      tempUserOption: {},
      tempStatus: {
        id:'',
        status:'',
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
      console.log('ok')
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
      this.$bus.$emit('status-change', this.tempStatus)
          this.$nextTick(() => {
            this.$refs['status-modal'].toggle('#toggle-btn')
          })
    },
    statusSubmit() {
      console.log('submit', this.tempStatus)
      this.$bus.$emit('status-change', this.tempStatus)
          this.$nextTick(() => {
            this.$refs['status-modal-2'].hide()
          })
    },
  }
}
</script>

