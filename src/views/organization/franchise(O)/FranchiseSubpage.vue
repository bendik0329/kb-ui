<template>
    <div>
        <h2>Franchise</h2>
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
        variant="warning"
        class="m-1"
        v-b-modal.modal-prevent-closing
        @click.prevent="openModal('create')"
        >
        Add Franchise
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

        
        <!-- Column: franchise_owner -->
        <span
          v-if="props.column.field === 'franchise_owner'"
          class="text-nowrap"
        >
          <span class="text-nowrap">{{ props.row.franchise_owner }}</span>
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
    <franchise-modal
    ref="franchiseModal"
    :franchise="tempFranchise"
    :ownerOption="ownerOption"
    ></franchise-modal>
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
import franchiseModal from './components/franchiseModal'


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
    franchiseModal
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
          label: 'Franchise Name',
          field: 'franchise_name',
        },
        {
          label: 'Address',
          field: 'address',
        },
        {
          label: 'Phone',
          field: 'phone',
        },
        {
          label: 'Owner',
          field: 'franchise_owner',
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
    ownerSelected: '',
    ownerOption: {},
    submitFranchise:{
      id:null,
      franchise_name:'',
      address:'',
      phone:'',
      franchise_owner: '',
    },
    tempFranchise:{},
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
    getUser() {
      const url = `${this.GLOBAL.server}/users`
      this.$http.get( url)
        .then(res => { 
          console.log(res.data)
          const userList = []
          const users = JSON.parse(JSON.stringify(res.data))
          users.forEach(user => {
            userList.push(user.username)
          })
          this.ownerOption = userList
          console.log(userList ,typeof(userList))

      })
    },
    getFranchise () {
      this.loading = true
      const url = `${this.GLOBAL.server}/franchises`
      this.$http.get( url)
        .then(res => { 
          console.log(res.data)
          if(res.data){
            const FranchiseData = res.data.data
            const newRow = []
            FranchiseData.forEach(item => {
              newRow.push({
                id:item.id,
                ...item.attributes
              })
            })

            this.rows = newRow
            this.modalMethod = null
            this.loading = false
          }
      })
    },
    openModal(methods, item) {
        this.modalMethod = methods
        if (methods == 'create') {
            console.log(methods )
            this.tempFranchise = {
                id: Math.floor( new Date() / 1000),
                franchise_name:'',
                address:'',
                phone:'',
                franchise_owner: '',
            }
        } else if (methods == 'edit') {
            console.log(methods , item)
            this.tempFranchise = {
              id:item.id,
              franchise_name:item.franchise_name,
              address:item.address,
              phone:item.phone,
              franchise_owner: item.franchise_owner,
            }
        } 
    },
    showMsgBox(item) {
      this.boxOne = ''
      this.$bvModal
        .msgBoxConfirm(`Please confirm that you want to delete ${ item.franchise_name }.`, {
          title: 'Please Confirm',
          size: 'sm',
          okVariant: 'danger',
          okTitle: 'Delete',
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
            this.DeleteFranchise(item)
          }
        })
    },
    EditFranchise (item) {
        let url =`${this.GLOBAL.server}/franchises`
        let httpsMethods = 'post'
        
        //edit
        if (this.modalMethod == 'edit') {
            url = `${this.GLOBAL.server}/franchises/${item.id}`
            httpsMethods = 'put'
        }
        this.$http[httpsMethods](url,{data:item})
          .then(res => { 
            console.log(res.data)
            if(res.data.data.attributes) {
                this.getFranchise()
                this.makeToast('success','success','update')
            }
          }).catch(err => {
            this.makeToast('fail','danger','update')
          })
    },
    DeleteFranchise (item) {
        console.log(item)
        let url =`${this.GLOBAL.server}/franchises/${item.id}`
        let httpsMethods = 'delete'
        this.$http[httpsMethods](url)
          .then(res => { 
            console.log(res.data)
            if(res.data.data.attributes) {
                this.getFranchise()
                this.makeToast('success','success','delete')
            }
          }).catch(err => {
            this.makeToast('fail','danger','delete')
          })
    },
    makeToast(result,variant = null,methods) {
      this.$bvToast.toast(`${methods}  ${result}!!`, {
        title: `${result || 'default'} !`,
        variant,
        solid: true,
      })
    },
  },
  created() {
    this.getFranchise()
    this.getUser()
  },
  mounted() {
    this.$bus.$on('send-franchise', (franchise) => {this.EditFranchise(franchise)})
  },
  beforeDestroy() {
    this.$bus.$off('send-franchise')
  }
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
.loading {
  position: absolute;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>