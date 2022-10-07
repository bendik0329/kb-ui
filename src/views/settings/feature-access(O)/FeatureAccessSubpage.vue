<template>
    <div>
        <b-row>
          <b-col>
                <h3>Access List</h3>
                <access-list></access-list>
            </b-col>
            
            <b-col cols="12">
                <div class="custom-search d-flex justify-content-between align-items-center">
                    <b-form-group class="mb-0">
                        <h3>user list</h3>
                    <div class="d-flex align-items-center mb-2">
                        <!-- search input -->
                      <label class="mr-1">Search</label>
                      <b-form-input
                        v-model="searchTerm"
                        placeholder="Search"
                        type="text"
                        class="d-inline-block"
                      />
                    </div>
                  </b-form-group>
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
            
                    <!-- Column: User Name -->
                    <span
                      v-if="props.column.field === 'username'"
                      class="text-nowrap"
                    >
                      <span class="text-nowrap">{{ props.row.username }}</span>
                    </span>
            
            
                    <!-- Column: Team -->
                    <span
                      v-else-if="props.column.field === 'team'"
                      class="text-nowrap"
                    >
                      <span class="text-nowrap">{{ props.row.team }}</span>
                    </span>
            
                    <!-- Column: Role -->
                    <span
                      v-else-if="props.column.field === 'role'"
                      class="text-nowrap"
                    >
                      <span class="text-nowrap">{{ props.row.role }}</span>
                    </span>
            
            
            
                    <!-- Column: Status -->
                    <span v-else-if="props.column.field === 'status'">
                      <b-badge :variant="statusVariant(props.row.status)">
                        {{ props.row.status }}
                      </b-badge>
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
                            v-b-modal.modal-user-access
                            @click.prevent="openUserModal('edit', props.row)"
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
            </b-col>
        </b-row>
    <b-modal></b-modal>
    <user-access-modal
      :user="tempUser"></user-access-modal>
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
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BRow, BCol,BTable,BSpinner, BAvatar, BBadge, BPagination, BFormGroup, BForm, BFormInput, BFormSelect, BDropdown, BDropdownItem,BButton,BModal, VBModal, BListGroup, BListGroupItem,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { required, email } from '@validations'
import { VueGoodTable } from 'vue-good-table'
import Ripple from 'vue-ripple-directive'
import store from '@/store/index'
import accessList from './components/accessList'
import UserAccessModal from './components/UserAccessModal.vue'

export default {
    components: {
    accessList,
    BRow, 
    BCol,
    BTable,
    BSpinner,
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
    UserAccessModal,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      loading: true,
      pageLength: 10,
      items: [],
      dir: false,
      columns: [
        {
          label: 'User Name',
          field: 'username',
        },
        {
          label: 'Team',
          field: 'team',
        },
        {
          label: 'Role',
          field: 'role',
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
    selected: 'secret',
    option: ['secret', 'publish'],
    required,
    nameState: null,
    modalMethod:null,
    boxOne: '',
    tempUser:{},
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
    getUserList () {
      this.loading = true
      const url = `${this.GLOBAL.server}/setting/feature-access`
      this.$http.get( url)
        .then(res => { 
          if(res.data){
            this.rows = res.data.users
            console.log(res.data.users)
            this.modalMethod = null
            this.loading = false
          }
      })
    },
    openUserModal(item) {
      console.log(item)
      this.tempUser = item
    },
    EditUser(item) {
      this.$http.patch(`${this.GLOBAL.server}/setting/feature-access/${item._id}`,item)
      .then(res => {
        console.log(res)
      })
    },
    showMsgBox(item) {
      this.boxOne = ''
      this.$bvModal
        .msgBoxConfirm(`Please confirm that you want to delete ${item.franchise_name}.`, {
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
            this.DeleteFranchise(item)
          }
        })
    },
  },
  created() {
    this.getUserList()
  },
  mounted() {
    this.$bus.$on('send-user', (user) => {this.EditUser(user)})
  },
  beforeDestroy() {
    this.$bus.$off('send-user')
  }
}


</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>