<template>
  <div>
    <div
      class="d-flex justify-content-end"
      >
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
        v-b-modal.modal-lead-update
        @click.prevent="openLeadsModal()"
        >
        Create Leads
      </b-button>
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="danger"
        @click.prevent="DeleteAllLeads()"
        >
        Delete All Leads
      </b-button>
    </div>
    

    <div
      class="mb-4">
        <h3>leads for franchise</h3>
       

        <!-- search input -->
        <div class="custom-search d-flex justify-content-start">
          <b-form-group>
            <div class="d-flex align-items-center">
              <label class="mr-1">Search</label>
              <b-form-input
                v-model="searchTerm1"
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
          :rows="rows1"
          :rtl="direction"
          :search-options="{
            enabled: true,
            externalQuery: searchTerm1 }"
          :select-options="{
            enabled: true,
            selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
            selectionInfoClass: 'custom-class',
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
             <!-- responsible -->
            <span v-if="props.column.field === 'responsible'">
              <b-badge
                v-if="props.row.responsible"
                :variant="statusVariant(5)">
                {{ props.row.responsible}}
              </b-badge>
              <b-badge
                v-else-if="props.row.responsible =='' "
                >
                null
              </b-badge>
            </span>
            <!-- Column: Name -->
            <span
              v-else-if="props.column.field === 'fullName'"
              class="text-nowrap"
            >
              <b-avatar
                :src="props.row.avatar"
                class="mx-1"
              />
              <span class="text-nowrap">{{ props.row.fullName }}</span>
            </span>
    
            <!-- Column: Status -->
            <span v-else-if="props.column.field === 'status'">
              <b-badge :variant="statusVariant(props.row.status)">
                {{ statusValue(props.row.status) }}
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
                    v-b-modal.modal-lead-assign
                    @click.prevent="openAssignModal(props.row)">
                    <feather-icon
                      icon="Edit2Icon"
                      class="mr-50"
                    />
                    <span>Assign(team or agent)</span>
                  </b-dropdown-item>

                  <b-dropdown-item>
                    <span>Convert(contacts) </span>
                  </b-dropdown-item>
                  
                  <b-dropdown-item
                    v-b-modal.modal-lead-update
                    @click.prevent="openLeadsModal('edit',props.row)"
                    >
                    <feather-icon
                      icon="Edit2Icon"
                      class="mr-50"
                    />
                    <span>Edit</span>
                  </b-dropdown-item>

                  <b-dropdown-item
                    @click.prevent="showMsgBox(props.row)">
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
                <span class="text-nowrap">
                  Showing 1 to
                </span>
                <b-form-select
                  v-model="pageLength"
                  :options="['15','30','60']"
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
                  <template #next-text>
                    <feather-icon
                      icon="ChevronRightIcon"
                      size="18"
                    />
                  </template>
                </b-pagination>
              </div>
            </div>
          </template>
        </vue-good-table>
    </div>


    <div>
        <h3>leads for agent</h3>
        <!-- search input -->
        <div class="custom-search d-flex justify-content-start">
          <b-form-group>
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
            selectionInfoClass: 'custom-class',
            selectionText: 'rows selected',
            clearSelectionText: 'clear',
            disableSelectInfo: true, // disable the select info panel on top
            selectAllByGroup: false, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
          }"
          :pagination-options="{
            enabled: true,
            perPage:pageLength
          }"
          :group-options="{
            enabled: true
          }"
        >
          <template
            slot="table-row"
            slot-scope="props"
          >
            <!-- responsible -->
            <span v-if="props.column.field === 'responsible'">
              <b-badge
                v-if="props.row.responsible"
                :variant="statusVariant(5)">
                {{ props.row.responsible}}
              </b-badge>
              <b-badge
                v-else-if="props.row.responsible =='' "
                >
                null
              </b-badge>
            </span>
            <!-- Column: Name -->
            <span
              v-else-if="props.column.field === 'fullName'"
              class="text-nowrap"
            >
              <b-avatar
                :src="props.row.avatar"
                class="mx-1"
              />
              <span class="text-nowrap">{{ props.row.fullName }}</span>
            </span>
    
            <!-- Column: Status -->
            <span v-else-if="props.column.field === 'status'">
              <b-badge :variant="statusVariant(props.row.status)">
                {{ statusValue(props.row.status) }}
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
                    v-b-modal.modal-lead-assign
                    @click.prevent="openAssignModal(props.row)">
                    <feather-icon
                      icon="Edit2Icon"
                      class="mr-50"
                    />
                    <span>Assign(team or agent)</span>
                  </b-dropdown-item>
                  <b-dropdown-item>
                    <span>Convert(contacts) </span>
                  </b-dropdown-item>
                  <b-dropdown-item
                    v-b-modal.modal-lead-update
                    @click.prevent="openLeadsModal('edit',props.row)"
                    >
                    <feather-icon
                      icon="Edit2Icon"
                      class="mr-50"
                    />
                    <span>Edit</span>
                  </b-dropdown-item>
                  <b-dropdown-item
                    @click.prevent="showMsgBox(props.row)">
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
                <span class="text-nowrap">
                  Showing 1 to
                </span>
                <b-form-select
                  v-model="pageLength"
                  :options="['15','30','60']"
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
                  <template #next-text>
                    <feather-icon
                      icon="ChevronRightIcon"
                      size="18"
                    />
                  </template>
                </b-pagination>
              </div>
            </div>
          </template>
        </vue-good-table>
    </div>
    <leads-assign-modal
      :lead="tempLeadAssign"
      :teamOption="teamOption"
      :userOption="userOption"></leads-assign-modal>
    <leads-modal
      :lead="tempLead"
      :teamOption="teamOption"
      :userOption="userOption"></leads-modal>
     <b-modal></b-modal>
  </div>
</template>

<script>
import {
  BButton, BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdownItem, BDropdown,
  BModal, VBModal,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import LeadsAssignModal from './LeadsAssignModal.vue'
import LeadsModal from './LeadsModal.vue'


export default {
  components: {
    VueGoodTable,
    BButton,
    BAvatar,
    BBadge,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdownItem,
    BDropdown,
    LeadsAssignModal,
    LeadsModal,
    BModal,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      pageLength: 30,
      dir: false,
      columns: [
        {
          label: 'Responsible',
          field: 'responsible',
        },
        {
          label: 'Name',
          field: 'fullName',
        },
        {
          label: 'Email',
          field: 'email',
        },
        {
          label: 'Post',
          field: 'post',
        },
        {
          label: 'Phone',
          field: 'phone',
        },
        {
          label: 'Status',
          field: 'status',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      rows1: [],
      rows: [],
      searchTerm1: '',
      searchTerm: '',
      data:{
        leadsList:{},
        teamList:[],
        franchiseLeads:[]
      },
      updateMethod:'',
      tempLead:{
        category:'',
        fullName:'',
        post:'',
        phone:'',
        email:'',
        team:'',
        agent:'',
      },
      leads:[
        {
          mode: 'span',
          label: 'Assign yet',
          html: false,
          children: [],
        },
      ],
      tempLeadAssign:{},
      teamOption:[],
      userOption:{},
    }
  },
  computed: {
    statusVariant() {
      const statusColor = {
        1: 'light-primary',
        2: 'light-success',
        3: 'light-danger',
        4: 'light-warning',
        5: 'light-info',
        /* eslint-enable key-spacing */
      }

      return status => statusColor[status]
    },
    statusValue() {
      const statusId = {
        1: 'New',
        2: 'Qualified',
        3: 'Unqualified',
        4: 'Contacted',
        /* eslint-enable key-spacing */
      }

      return status => statusId[status]
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
  methods:{
    getLead() {
        this.$http.get(`${this.GLOBAL.server}/sales/leads`)
        .then(res => {
          console.log(res.data)
          this.teamOption =res.data.teamList
          this.userOption = res.data.memberList

          this.rows1 = res.data.franchiseLeads
          this.data = {
            leadsList:res.data.teamLeadsList,
            teamList:res.data.teamList,
          }

          this.leads[0].children = this.data.leadsList.franchise

          this.data.teamList.forEach(team => {
            this.leads.push({
                mode: 'span',
                label: team,
                html: false,
                children: this.data.leadsList[team],
            },)
          })
          this.rows = this.leads
          console.log(this.leads)
        })
    },
    openAssignModal (item) {
        console.log(item)
        this.tempLeadAssign = {
            ...item.visibility,
            id:item._id,
        }
    },
    openLeadsModal (methods ='create',item ) {
        console.log(methods,item)
        
        this.updateMethod = methods
        if (methods ==='edit') {
            this.tempLead = item
        }
    },
    updateLead (item) {
        let httpMethod = 'post'
        let url = `${this.GLOBAL.server}/sales/leads`

        if(this.updateMethod === 'edit') {
            httpMethod = 'patch'
            url = `${this.GLOBAL.server}/sales/leads/${item._id}`
        }
        this.$http[httpMethod](url,item)
          .then(res => {
            console.log(res.data)
            this.makeToast(res.data.result,res.data.message,'Update Lead')
            this.getLead()
            this.updateMethod = ''
            if(res.data.result) {
              this.tempLead = {
                category:'',
                fullName:'',
                post:'',
                phone:'',
                email:'',
                team:'',
                agent:'',
              }
            }
          })

    },
    assignLead (item) {
        console.log('assign to',item)
        const url = `${this.GLOBAL.server}/sales/leads/assign/${item.id}`
        const httpsMethods = 'patch'
        
        this.$http[httpsMethods](url,item)
          .then(res => { 
            this.makeToast(res.data.result,res.data.message,'Assign')
            this.getLead()
          })
    },
    showMsgBox(item) {
      this.boxOne = ''
      this.$bvModal
        .msgBoxConfirm(`Please confirm that you want to delete ${item.fullName}.`, {
          title: 'Please Confirm',
          size: 'sm',
          okVariant: 'danger',
          okTitle: 'Yes',
          cancelTitle: 'No',
          cancelVariant: 'outline-secondary',
          hideHeaderClose: false,
          centered: true,
          headerBgVariant:'danger',
          headerTextVariant:'dark',
        })
        .then(value => {
          this.boxOne = value
          if (this.boxOne) {
            this.DeleteLead(item)
          }
        })
    },
    DeleteLead (item) {
        console.log(item)
        let url =`${this.GLOBAL.server}/sales/leads/${item._id}`
        let httpsMethods = 'delete'
        this.$http[httpsMethods](url)
          .then(res => { 
            console.log(res.data)
            this.makeToast(res.data.result,res.data.message,'Delete Lead')
            this.getLead()
          })
    },
    DeleteAllLeads() {
      let url =`${this.GLOBAL.server}/sales/leads/`
      let httpsMethods = 'delete'
      this.$http[httpsMethods](url)
        .then(res => { 
          console.log(res.data)
          this.makeToast(res.data.result,res.data.message,'Delete All Lead')
          this.getLead()
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
    this.getLead()
  },
  mounted() {
    this.$bus.$on('send-assign', (lead) => {this.assignLead(lead)})
    this.$bus.$on('update-lead', (lead) => {this.updateLead(lead)})
  },
  beforeDestroy() {
    this.$bus.$off('send-assign')
    this.$bus.$off('update-lead')
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-good-table.scss';

table.vgt-table td {
    vertical-align: middle;
}
</style>