<template>
    <div>
        <h2>LicenseManagement</h2>
        <!-- search input -->
    <div class="custom-search d-flex justify-content-between align-items-center">
      <b-form-group class="mb-0">
        <div class="d-flex align-items-center">
          <label class="mr-1">Search</label>
          <b-form-input
            v-model="searchTerm"
            placeholder="Search"
            type="text"
            class="d-inline-block"
          />
        </div>
      </b-form-group>
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="info"
        class="m-1"
        v-b-modal.modal-prevent-closing
        @click.prevent="openModal('create')"
        >
        Add License
      </b-button>
    </div>

    <!-- table -->
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :rtl="direction"
      :search-options="{
        enabled: true,
        externalQuery: searchTerm }"
      :select-options="{
        enabled: true,
        selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
        selectionInfoClass: 'card-header',
        selectionText: 'rows selected',
        clearSelectionText: 'clear',
        disableSelectInfo: true, // disable the select info panel on top
        selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
      }"
      :pagination-options="{
        enabled: true,
        perPage:pageLength
      }"
    >
      <template
        slot="table-row"
        slot-scope="props"
      >

        <!-- Column: License Name -->
        <span
          v-if="props.column.field === 'license_name'"
          class="text-nowrap"
        >
          <span class="text-nowrap">{{ props.row.license_name }}</span>
        </span>


        <!-- Column: License Type -->
        <span
          v-else-if="props.column.field === 'license_type'"
          class="text-nowrap"
        >
          <span class="text-nowrap">{{ props.row.license_type }}</span>
        </span>

        <!-- Column: License Number -->
        <span
          v-else-if="props.column.field === 'license_number'"
          class="text-nowrap"
        >
          <span class="text-nowrap">{{ props.row.license_number }}</span>
        </span>

        <!-- Column: Issue Date -->
        <span
          v-else-if="props.column.field === 'issue_date'"
          class="text-nowrap"
        >
          <span class="text-nowrap">{{ changeDate(props.row.issue_date) }}</span>
        </span>

        <!-- Column: Expiration Date -->
        <span
          v-else-if="props.column.field === 'expiration_date'"
          class="text-nowrap"
        >
          <span class="text-nowrap">{{ changeDate(props.row.expiration_date) }}</span>
        </span>



        <!-- Column: Action -->
        <span v-else-if="props.column.field === 'action'">
          <span>
            <b-dropdown
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template v-slot:button-content>
                <feather-icon
                  icon="MoreVerticalIcon"
                  size="16"
                  class="text-body align-middle mr-25"
                />
              </template>
              <b-dropdown-item
                v-b-modal.modal-prevent-closing
                @click.prevent="openModal('edit', props.row)"
                >
                <feather-icon
                  icon="Edit2Icon"
                  class="mr-50"
                />
                <span>Edit</span>
              </b-dropdown-item>
              <b-dropdown-item
                @click.prevent="showMsgBox(props.row)"
                >
                <feather-icon
                  icon="TrashIcon"
                  class="mr-50"
                />
                <span>Delete</span>
              </b-dropdown-item>
            </b-dropdown>
          </span>
        </span>

        <!-- Column: Common -->
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>

      <!-- pagination -->
      <template
        slot="pagination-bottom"
        slot-scope="props"
      >
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-center mb-0 mt-1">
            <span class="text-nowrap ">
              Showing 1 to
            </span>
            <b-form-select
              v-model="pageLength"
              :options="['3','5','10']"
              class="mx-1"
              @input="(value)=>props.perPageChanged({currentPerPage:value})"
            />
            <span class="text-nowrap"> of {{ props.total }} entries </span>
          </div>
          <div>
            <b-pagination
              :value="1"
              :total-rows="props.total"
              :per-page="pageLength"
              first-number
              last-number
              align="right"
              prev-class="prev-item"
              next-class="next-item"
              class="mt-1 mb-0"
              @input="(value)=>props.pageChanged({currentPage:value})"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
            </b-pagination>
          </div>
        </div>
      </template>
    </vue-good-table>
    <!-- modal -->
    <license-modal
    ref="licenseModal"
    :license="tempLicense"
    ></license-modal>
    <b-modal></b-modal>
    <div class="loading" v-if="loading">
        <b-spinner
          style="width: 3rem; height: 3rem;"
          class="mr-1"
          label="Large Spinner"
          type="grow"
        />
    </div>
    </div>
</template>

<script>
import AppBreadcrumb from '@core/layouts/components/AppBreadcrumb.vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
   BSpinner, BAvatar, BBadge, BPagination, BFormGroup, BForm, BFormInput, BFormSelect, BDropdown, BDropdownItem,BButton,BModal, VBModal, BListGroup, BListGroupItem,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { required, email } from '@validations'
import { VueGoodTable } from 'vue-good-table'
import Ripple from 'vue-ripple-directive'
import store from '@/store/index'
import licenseModal from './components/licenseModal'

export default {
    components: {
    BSpinner,
    AppBreadcrumb,
    ValidationProvider,
    ValidationObserver,
    BButton,
    VueGoodTable,
    BAvatar,
    BBadge,
    BPagination,
    BForm,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem,
    BListGroup,
    BListGroupItem,
    BModal,
    vSelect,
    licenseModal
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      loading: true,
      pageLength: 10,
      dir: false,
      columns: [
        {
          label: 'License Name',
          field: 'license_name',
        },
        {
          label: 'License Type',
          field: 'license_type',
        },
        {
          label: 'License Number',
          field: 'license_number',
        },
        {
          label: 'Issue Date',
          field: 'issue_date',
        },
        {
          label: 'Expiration Date',
          field: 'expiration_date',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      rows: [],
      searchTerm: '',
      status: [{
        1: 'Current',
        2: 'Professional',
        3: 'Rejected',
        4: 'Resigned',
        5: 'Applied',
        6: 'publish'
      },
      {
        1: 'light-primary',
        2: 'light-success',
        3: 'light-danger',
        4: 'light-warning',
        5: 'light-info',
      }],
    submitLicense:{
        license_name:'',
        license_type:'',
        license_number:'',
        issue_date: '',
        expiration_date: '',
    },
    tempLicense:{},
    required,
    nameState: null,
    modalMethod:null,
    boxOne: '',
    }
  },
  computed: {
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        Current      : 'light-primary',
        Professional : 'light-success',
        Rejected     : 'light-danger',
        Resigned     : 'light-warning',
        Applied      : 'light-info',
        publish      : 'light-success'
        /* eslint-enable key-spacing */
      }

      return status => statusColor[status]
    },
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  methods: {
    getLicense () {
      this.loading = true
      const url = `${this.GLOBAL.server}/organization/license`
      this.$http.get( url)
        .then(res => { 
          console.log(res.data)

          if(res.data){
            this.rows = res.data.licenses
            this.modalMethod = null
            this.loading = false
          }
      })
    },
    openModal(methods, item) {
        this.modalMethod = methods
        if (methods == 'create') {
            console.log(methods )
            this.tempLicense = {
                license_name:'',
                license_type:'',
                license_number:'',
                issue_date: '',
                expiration_date: '',
            }
        } else if (methods == 'edit') {
            console.log(methods , item._id)
            this.tempLicense = {...item}
        } 
    },
    changeDate(e) {
        return e.split('T')[0]
    },
    showMsgBox(item) {
      this.boxOne = ''
      this.$bvModal
        .msgBoxConfirm(`Please confirm that you want to delete ${item.license_name}.`, {
          title: 'Please Confirm',
          size: 'sm',
          okVariant: 'primary',
          okTitle: 'Yes',
          cancelTitle: 'No',
          cancelVariant: 'outline-secondary',
          hideHeaderClose: false,
          centered: true,
          headerBgVariant:'danger',
          headerTextVariant:'light',
        })
        .then(value => {
          this.boxOne = value
          if (this.boxOne) {
            this.DeleteLicense(item)
          }
        })
    },
    EditLicense (item) {
        let url =`${this.GLOBAL.server}/organization/license`
        let httpsMethods = 'post'
        //edit
        if (this.modalMethod == 'edit') {
            url = `${this.GLOBAL.server}/organization/license/${item._id}`
            httpsMethods = 'patch'
        }
        this.$http[httpsMethods](url,item)
          .then(res => { 
            console.log(res.data)
            if(res.data.message === 'success') {
                this.getLicense()
            }
          })
    },
    DeleteLicense (item) {
        console.log(item)
        let url =`${this.GLOBAL.server}/organization/license/${item._id}`
        let httpsMethods = 'delete'
        this.$http[httpsMethods](url)
          .then(res => { 
            console.log(res.data)
            if(res.data.message === 'success') {
                this.getLicense()
            }
          })
    }
  },
  created() {
    this.getLicense()
  },
  mounted() {
    this.$bus.$on('send-license', (license) => {this.EditLicense(license)})
  },
  beforeDestroy() {
    this.$bus.$off('send-license')
  }
}


</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>