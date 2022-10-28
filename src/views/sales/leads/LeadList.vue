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
          <leads-search
              :leads="leadsData"
              class="d-inline-block mr-1"
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
        
        selectable
        @row-selected="onRowSelected"
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

        <!-- Column: type -->
        <template #cell(type)="data">
          {{data.item.attributes.type}}
        </template>

        <!-- Column: category -->
        <template #cell(category)="data">
          {{data.item.attributes.category}}
        </template>


        <!-- Column: status -->
        <template #cell(status)="data">
          <b-badge
            pill
            :variant="statusVariant(data.item.attributes.status)"
          >
            {{ data.item.attributes.status }}
          </b-badge>
        </template>
        

        <!-- Column: name -->
        <template #cell(name)="data">
          {{data.item.attributes.name}}
        </template>


        <!-- Column: phone -->
        <template #cell(phone)="data">
          {{data.item.attributes.phone}}
        </template>


        <!-- Column: email -->
        <template #cell(email)="data">
          {{data.item.attributes.email}}
        </template>


        <!-- Column: address -->
        <template #cell(address)="data">
          {{data.item.attributes.address}}
        </template>



        <!-- Column: rating -->
        <template #cell(rating)="data">
          <b-badge
            pill
            :variant="ratingVariant(data.item.attributes.rating)"
          >
            {{ data.item.attributes.rating }}
          </b-badge>
        </template>


        <!-- Column: source -->
        <template #cell(source)="data">
          {{data.item.attributes.source}}
        </template>

  
        <!-- Column: Actions -->
        <template #cell(actions)="data">
          <div class="text-nowrap">
            <!-- Dropdown -->
            <b-dropdown
              variant="link"
              toggle-class="p-0"
              dropleft
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
            <span class="text-muted">Showing {{ pageMeta.from }} to {{ pageMeta.to }} of {{ pageMeta.of }} entries</span>
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
        :userType="userType"
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
  import store from '@/store'

  import LeadsSearch from './LeadsSearch.vue'
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
      LeadsSearch,
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
        userType:'',
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
          name:'',
          phone:'',
          email:'',
          address:'',
          rating:'',
        },
        leadsData:[],
        data:[],
        pageMeta:{
          pageSize:'',
          pageCount:'',
          page:'',
          total:''
        },
        perPage: 5,
        pageOptions: [3, 5, 10],
        totalRows: 1,
        currentPage: 1,
        SearchQuery:{},
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
      },
    },
    methods:{
      onRowSelected(items) {
        this.selected = items
      },
      getUserType(){
      this.userType = JSON.parse(localStorage.getItem('userData')).role
      const url = `${this.GLOBAL.server}/users/me?populate=*`
      this.$http.get( url)
        .then(res => { 
          console.log('user',res.data)
          this.userFranchise = res.data.franchise
          if(this.userType == 'owner'){
            console.log('owner')
            this.getLead()
          }
          if(this.userType == 'franchise'){
            this.getFranchise(`/${this.userFranchise.id}`)
          }
          
      })
      },
      getFranchise (id='') {
      this.loading = true
      const url = `${this.GLOBAL.server}/franchises${id}?populate=*`
      this.$http.get( url)
        .then(res => { 
          const Franchises = {
            id:res.data.data.id,
            ...res.data.data.attributes
          }
          //for owner
          if(this.userType == 'owner'){
            console.log('owner')
          
          }else {
            //for other user
            const leadURL = `${this.GLOBAL.server}/leads?populate=*&filters[franchiseID][$eq]=${Franchises.id}`
            this.$http.get(leadURL)
              .then(res => {
                const leads = res.data.data
                const leadsData = []
                leads.forEach(lead => {
                  leadsData.push({
                    id:lead.id,
                    ...lead.attributes
                  })
                })
                // console.log(leadsData)
                this.data = leads
                this.leadsData = leads
                const pagination = res.data.meta.pagination
                this.pageMeta = this.pagination(pagination.total,pagination.currentPage,pagination.pageSize)
                // console.log('pageMeta',this.pageMeta)
                this.filterLead(leads)
              })
          }
        })
      },
      getLead() {
        this.$http.get(`${this.GLOBAL.server}/leads`)
        .then(res => {
          this.leadsData = res.data.data
          this.data = res.data.data
          this.typeOptions = res.data.typeOptions
          ///this.filterLead(this.leadsData)
        }).catch(err => {
          console.log(err)
          this.makeToast('fail','danger','Get leads')
        })
      },
      filterLead (leads) {
        const newLeads = []
        const openLeads = []
        const todayLeads = []
        const today = new Date().toISOString().split('T', 1)[0]

        leads.filter(lead => {
          if(lead.attributes.status == 'New'){
            newLeads.push(lead)
          }
          if(lead.attributes.status !== 'qualified' && lead.status !== 'unqualified'){
            openLeads.push(lead)
          }
          const createdDay = lead.attributes.createdAt.split('T', 1)[0]
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
        this.tempLead = {
          id: Math.floor( new Date() / 1000),
          type:'',
          category:'',
          name:'',
          phone:'',
          email:'',
          address:'',
          rating:'',
          franchiseID:this.userFranchise.id.toString(),
          franchise:this.userFranchise,
        }
        this.updateMethod = methods
        if (methods ==='edit') {
          this.tempLead = {
            id:item.id,
            ...item.attributes,
            franchise:{
              id:item.attributes.franchise.data.id,
              ...item.attributes.franchise.data.attributes
            }
          }
          this.updateMethod = 'edit'
        }
      },
      openStatusModal (item) {
        console.log('open',item)
        this.tempStatus = {
          id: item.id,
          ...item.attributes,
          franchise:{
            id:item.attributes.franchise.data.id,
            ...item.attributes.franchise.data.attributes
          }
        }
        console.log('open',this.tempStatus)
      },
      updateLead (item) {
        console.log(item)
        let httpMethod = 'post'
        let url = `${this.GLOBAL.server}/leads`

        if(this.updateMethod === 'edit') {
            httpMethod = 'put'
            url = `${this.GLOBAL.server}/leads/${item.id}`
        }
        this.$http[httpMethod](url,{data:item})
          .then(res => {
            console.log(res.data)
            if(res.data.data){

              this.makeToast('success','success','Update Lead')
              this.getUserType()
            }
            this.updateMethod = ''
            
          }).catch(error => {
            this.makeToast(error,'danger','update')
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
        .msgBoxConfirm(`Please confirm that you want to delete ${item.attributes.name}.`, {
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
        let url =`${this.GLOBAL.server}/leads/${item.id}`
        let httpsMethods = 'delete'
        this.$http[httpsMethods](url)
          .then(res => { 
            console.log(res.data)
            this.makeToast('success','success','Delete Lead')
            this.getUserType()
          })
      },
      selectLeads(item){
        console.log('select')
        this.openLeadsModal('edit',item)
        //this.$refs['modal-lead-update'].show()
      },
      updateStatus (item){
        console.log('Change Status',item)
        
        let url =`${this.GLOBAL.server}/leads/${item.id}`
        let httpsMethods = 'put'
        this.$http[httpsMethods](url,{data:item})
          .then(res => { 
            console.log(res.data)
            this.makeToast('success','success','Change Status')
            this.getUserType()
          })
      },
      statusVariant(status) {
        const statusColor = {
          /* eslint-disable key-spacing */
          New: 'light-primary',
          Contacted: 'light-success',
          Working: 'light-danger',
          Qualified: 'light-warning',
          Unqualified: 'light-info',
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
      pagination(total,currentPage,pageSize) {
        if(pageSize > total) {
          return {
            from: 1 ,
            to: total ,
            of: total,
        }
        }
        return {
          from: pageSize * (currentPage - 1) + 1 ,
          to: pageSize * (currentPage - 1) ,
          of: total,
        }
      },
    },
    created(){
      this.getUserType()
      
    },
    mounted(){
      this.$bus.$on('update-lead', (lead) => {this.updateLead(lead)})
      this.$bus.$on('status-change', (status) => {this.updateStatus(status)})
      this.$bus.$on('selected-lead', (lead) => {
        this.selectLeads(lead)
      })
    },
    beforeDestroy(){
      this.$bus.$off('update-lead')
      this.$bus.$off('status-change')
      this.$bus.$off('selected-lead')
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
  @import '@core/scss/vue/libs/vue-autosuggest.scss';
  
</style>
  