<template>

    <!-- Table Container Card -->
    <b-card
      no-body
    >
  
      <div class="m-2">
  
        <!-- Table Top -->
        <b-row>
          <!-- Search -->
          <b-col
          cols="12"
          md="8"
          class="d-flex align-items-center justify-content-between mb-1 mb-md-0"
          >
          
          <!-- resource -->
          <v-select
            v-model="tempView"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="viewOptions"
            class="invoice-filter-select mr-1"
            placeholder="View"
            >
              <template #selected-option="{ label }">
              <span class="text-truncate overflow-hidden">
                {{ label }}
              </span>
              </template>
          </v-select>
          <!-- Search -->
          <b-form-input
              v-model="searchQuery"
              class="d-inline-block mr-1"
              placeholder="Search..."
              />
          
          </b-col>
          
          <!-- Per Page -->
          <b-col
            cols="12"
            md="4"
            class="d-flex align-items-center justify-content-end mb-1 mb-md-0"
            >
            <b-button-group
              >
              <b-button
                variant="success"
                v-b-modal.modal-lead-update
                @click.prevent="openLeadsModal()"
              >
                Add
              </b-button>
              <b-button
                variant="success"
              >
                Change Status
              </b-button>
              <b-button
                variant="success"
              >
                Change Owner
              </b-button>
            </b-button-group>
          </b-col>
        
        </b-row>
  
      </div>
  
      <b-table
        ref="LeadsListTable"
        :items="data"
        responsive="sm"
        :fields="columns"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
        class="position-relative"
        :small="true"
        :hover="true"
        >
        <template #head(check)>
          <b-form-checkbox
            plain
            class="vs-checkbox-con"
            v-model="selectAll"
            >
            <span class="vs-checkbox">
              
            </span>
          </b-form-checkbox>
        </template>

        <!-- Column: check box -->
        <template #cell(check)="data">
          <b-form-checkbox
            :id="`check-${data.item.name}`"
            plain
            class="vs-checkbox-con"
            :checked="selectAll"
            >
            <span class="vs-checkbox">
              
            </span>
          </b-form-checkbox>
        </template>

        <!-- Column: status -->
        <template #cell(status)="data">
          <b-badge
            pill
            :variant="statusVariant(data.item.status)"
          >
            {{ data.item.status }}
          </b-badge>
        </template>
        
        <!-- Column: rating -->
        <template #cell(rating)="data">
          <b-badge
            pill
            :variant="ratingVariant(data.item.rating)"
          >
            {{ data.item.rating }}
          </b-badge>
        </template>



        <template #head(invoiceStatus)>
          <feather-icon
            icon="TrendingUpIcon"
            class="mx-auto"
          />
        </template>

        <!-- Column: Id -->
        <template #cell(id)="data">
          <b-link
            :to="{ name: 'apps-invoice-preview', params: { id: data.item.type }}"
            class="font-weight-bold"
          >
            #{{ data.value }}
          </b-link>
        </template>
  
        <!-- Column: Invoice Status -->
        <template #cell(invoiceStatus)="data">
          <b-avatar
            :id="`invoice-row-${data.item.id}`"
            size="32"
            :variant="`light-${resolveInvoiceStatusVariantAndIcon(data.item.invoiceStatus).variant}`"
          >
            <feather-icon
              :icon="resolveInvoiceStatusVariantAndIcon(data.item.invoiceStatus).icon"
            />
          </b-avatar>
          <b-tooltip
            :target="`invoice-row-${data.item.id}`"
            placement="top"
          >
            <p class="mb-0">
              {{ data.item.invoiceStatus }}
            </p>
            <p class="mb-0">
              Balance: {{ data.item.balance }}
            </p>
            <p class="mb-0">
              Due Date: {{ data.item.dueDate }}
            </p>
          </b-tooltip>
        </template>
  
        <!-- Column: Client -->
        <template #cell(client)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                :src="data.item.avatar"
                :text="avatarText(data.item.client.name)"
                :variant="`light-${resolveClientAvatarVariant(data.item.invoiceStatus)}`"
              />
            </template>
            <span class="font-weight-bold d-block text-nowrap">
              {{ data.item.client.name }}
            </span>
            <small class="text-muted">{{ data.item.client.companyEmail }}</small>
          </b-media>
        </template>
  
        <!-- Column: Issued Date -->
        <template #cell(issuedDate)="data">
          <span class="text-nowrap">
            {{ data.value }}
          </span>
        </template>
  
        <!-- Column: Balance -->
        <template #cell(balance)="data">
          <template v-if="data.value === 0">
            <b-badge
              pill
              variant="light-success"
            >
              Paid
            </b-badge>
          </template>
          <template v-else>
            {{ data.value }}
          </template>
        </template>
  
        <!-- Column: Actions -->
        <template #cell(actions)="data">
          <div class="text-nowrap">
            <!-- Dropdown -->
            <b-dropdown
              variant="link"
              toggle-class="p-0"
              no-caret
              :right="$store.state.appConfig.isRTL"
            >
  
              <template #button-content>
                <feather-icon
                  icon="MoreVerticalIcon"
                  size="16"
                  class="align-middle text-body"
                />
              </template>
              <b-dropdown-item
                v-b-modal.modal-lead-update
                @click.prevent="openLeadsModal('edit',data.item)">
                <feather-icon icon="EditIcon" />
                <span class="align-middle ml-50">Edit</span>
              </b-dropdown-item>
              <b-dropdown-item
                v-b-modal.modal-lead-status
                @click.prevent="openStatusModal(data.item)"
                >
                <feather-icon icon="EditIcon" />
                <span class="align-middle ml-50">Change Status</span>
              </b-dropdown-item>
              <b-dropdown-item
              @click.prevent="showMsgBox(data.item)">
                <feather-icon icon="TrashIcon" />
                <span class="align-middle ml-50">Delete</span>
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </template>
  
      </b-table>
      <div class="mx-2 mb-2">
        <b-row>
  
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries</span>
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >
  
            <b-pagination
              v-model="currentPage"
              :total-rows="totalInvoices"
              :per-page="perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
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
  
          </b-col>
  
        </b-row>
      </div>
      <leads-modal
        :lead="tempLead"
        :typeOptions="typeOptions"
        ></leads-modal>
      <lead-status-modal
        :status="tempStatus"
        ></lead-status-modal>
      <b-modal></b-modal>
    </b-card>
  
</template>
  
<script>
  import {
    BCard, BRow, BCol,BFormCheckbox, BFormInput,BButtonGroup, BButton, BTable, BMedia, BAvatar, BLink,
    BBadge,BModal, BDropdown, BDropdownItem, BPagination, BTooltip,
  } from 'bootstrap-vue'
  import { avatarText } from '@core/utils/filter'
  import vSelect from 'vue-select'
  import { onUnmounted } from '@vue/composition-api'
  import { isToday } from '@core/utils/utils.js'
  import store from '@/store'

  import LeadsModal from './LeadsModal.vue'
  import LeadStatusModal from './LeadStatusModal.vue'

  import useInvoicesList from './useInvoiceList'
  
  import invoiceStoreModule from './invoiceStoreModule'
  
  export default {
    components: {
      BCard,
      BRow,
      BCol,
      BFormCheckbox,
      BFormInput,
      BButtonGroup,
      BButton,
      BTable,
      BMedia,
      BAvatar,
      BLink,
      BBadge,
      BModal,
      BDropdown,
      BDropdownItem,
      BPagination,
      BTooltip,
      LeadsModal,
      vSelect,
      LeadStatusModal,
    },
    setup() {
      const INVOICE_APP_STORE_MODULE_NAME = 'app-invoice'
  
      // Register module
      if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.registerModule(INVOICE_APP_STORE_MODULE_NAME, invoiceStoreModule)
  
      // UnRegister on leave
      onUnmounted(() => {
        if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME)
      })
  
      const statusOptions = [
        'Downloaded',
        'Draft',
        'Paid',
        'Partial Payment',
        'Past Due',
      ]
  
      const {
        fetchInvoices,
        tableColumns,
        perPage,
        currentPage,
        totalInvoices,
        dataMeta,
        perPageOptions,
        searchQuery,
        sortBy,
        isSortDirDesc,
        refInvoiceListTable,
  
        statusFilter,
  
        refetchData,
  
        resolveInvoiceStatusVariantAndIcon,
        resolveClientAvatarVariant,
      } = useInvoicesList()
  
      return {
        fetchInvoices,
        tableColumns,
        perPage,
        currentPage,
        totalInvoices,
        dataMeta,
        perPageOptions,
        searchQuery,
        sortBy,
        isSortDirDesc,
        refInvoiceListTable,
  
        statusFilter,
  
        refetchData,
  
        statusOptions,
  
        avatarText,
        resolveInvoiceStatusVariantAndIcon,
        resolveClientAvatarVariant,
      }
    },
    data() {
      return {
        selectAll:false,
        columns:[
          { key:'check' },
          { key: 'type', sortable: true },
          { key: 'category', sortable: true },
          { key: 'status', sortable: true },
          { key: 'name', sortable: true,},
          { key: 'phone', sortable: true },
          { key: 'email', sortable: true },
          { key: 'address', sortable: true },
          { key: 'rating', sortable: true },
          { key: 'source', sortable: true },
          { key: 'actions' },
          //'type','category','status','name','phone','email','address','rating','source',
        ],
        viewOptions:['Recently Viewed','All Open Leads','Today\'s Leads','Unread Leads',],
        tempView:'Recently Viewed',
        typeOptions:[],
        sourceOptions:[],
        updateMethod:'',
        statusOptions:[],
        tempStatus:{
          status:'',
          id:''
        },
        tempLead:{
          type:'',
          category:'',
          status:'',
          name:'',
          phone:'',
          email:'',
          address:'',
          rating:'',
        },
        leadsData:[],
        data:[],
        filteredLeadsData:{},
      }
    },
    watch:{
      tempView(){
        if(this.tempView =='Recently Viewed'){
          console.log('Recently Viewed')
          this.data = this.leadsData
        }else if(this.tempView =='All Open Leads'){
          console.log('All Open Leads')
          this.data = this.filteredLeadsData['open']
        }else if(this.tempView =='Today\'s Leads'){
          console.log('Today\'s Leads')
          this.data = this.filteredLeadsData['today']
        }else if(this.tempView =='Unread Leads'){
          console.log('Unread Leads')
          this.data = this.filteredLeadsData['new']
        }
      }
    },
    methods:{
      getLead() {
        this.$http.get(`${this.GLOBAL.server}/sales/leads`)
        .then(res => {
          console.log(res.data.leads)
          this.leadsData = res.data.leads
          this.data = res.data.leads
          this.typeOptions = res.data.typeOptions
          this.filterLead(this.leadsData)
        })
      },
      filterLead (leads) {
        const newLeads = []
        const openLeads = []
        const todayLeads = []
        const today = new Date().toISOString().split('T', 1)[0]

        leads.filter(lead => {
          if(lead.status == 'new'){
            newLeads.push(lead)
          }
          if(lead.status !== 'qualified' && lead.status !== 'unqualified'){
            openLeads.push(lead)
          }
          const createdDay = lead.created.split('T', 1)[0]
          if(today == createdDay){
            todayLeads.push(lead)
          }
        })
        this.filteredLeadsData = {
          new: newLeads,
          open: openLeads,
          today: todayLeads,
        }
      },
      openLeadsModal (methods ='create',item ) {
        console.log(methods,item)
        
        this.updateMethod = methods
        if (methods ==='edit') {
            this.tempLead = item
            this.updateMethod = 'edit'
        }
      },
      openStatusModal (item ) {
        this.tempStatus = {
          status:item.status,
          id: item._id,
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
                type:'',
                category:'',
                status:'',
                name:'',
                phone:'',
                email:'',
                address:'',
                rating:'',
              }
            }
          })
      },
      makeToast(result,variant = null,methods) {
        this.$bvToast.toast(`${methods}  ${result}!!`, {
          title: `${result || 'default'} !`,
          variant,
          solid: true,
      })
      },
      showMsgBox(item) {
      this.boxOne = ''
      this.$bvModal
        .msgBoxConfirm(`Please confirm that you want to delete ${item.name}.`, {
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
      updateStatus (item){
        let url =`${this.GLOBAL.server}/sales/leads/status/${item.id}`
        let httpsMethods = 'patch'
        this.$http[httpsMethods](url,item)
          .then(res => { 
            console.log(res.data)
            this.makeToast(res.data.result,res.data.message,'Change Status')
            this.getLead()
          })
      },
      statusVariant(status) {
        const statusColor = {
          /* eslint-disable key-spacing */
          new: 'light-primary',
          contacted: 'light-success',
          working: 'light-danger',
          qualified: 'light-warning',
          unqualified: 'light-info',
          /* eslint-enable key-spacing */
        }
        return  statusColor[status]
      },
      ratingVariant(rating) {
        const ratingColor = {
          /* eslint-disable key-spacing */
          '': 'primary',
          hot: 'success',
          warm: 'warning',
          cold: 'info',
          /* eslint-enable key-spacing */
        }
        return  ratingColor[rating]
      },
    },
    created(){
      this.getLead()
    },
    mounted(){
      this.$bus.$on('update-lead', (lead) => {this.updateLead(lead)})
      this.$bus.$on('status-change', (status) => {this.updateStatus(status)})
    },
    beforeDestroy(){
      this.$bus.$off('update-lead')
      this.$bus.$off('status-change')
    }
  }
</script>
  
  <style lang="scss" scoped>
  .per-page-selector {
    width: 90px;
  }
  
  .invoice-filter-select {
    min-width: 210px;
  
    ::v-deep .vs__selected-options {
      flex-wrap: nowrap;
    }
  
    ::v-deep .vs__selected {
      width: 100px;
    }
  }
  </style>
  
<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>
  