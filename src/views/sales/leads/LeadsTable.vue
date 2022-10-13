<template>
  <div>
    <b-card class="text-center">
          <b-tabs nav-class="mb-3">
            <b-tab
              title="Franchise"
              active
            >
            <!-- franchise -->
            <div>
                <b-row>
                    <b-col
                      class="mb-4">
                        <leads-franchise-table></leads-franchise-table>
                    </b-col>
                </b-row>
            </div>
            </b-tab>
            <b-tab title="Agent Leads">
              
              <!-- team open -->
              <div
                class="pt-4"
                >
                  <h5>everyone in franchise</h5>
                  <b-table
                    class="mb-4"
                    :items="leadsData.everyone"
                    :fields="leadsFields"
                    striped
                    responsive
                    >
                    <template #cell(show_details)="row">
                      <b-form-checkbox
                        v-model="row.detailsShowing"
                        plain
                        class="vs-checkbox-con"
                        @change="row.toggleDetails"
                      >
                        <span class="vs-checkbox">
                          <span class="vs-checkbox--check">
                            <i class="vs-icon feather icon-check" />
                          </span>
                        </span>
                        <span class="vs-label">{{ row.detailsShowing ? 'Hide' : 'Show' }}</span>
                      </b-form-checkbox>
                    </template>
              
                    <template #row-details="row">
                      <b-card>
                        <b-row class="mb-2">
                          <b-col
                            md="4"
                            class="mb-1"
                          >
                            <strong>Full Name : </strong>{{ row.item.fullName }}
                          </b-col>
                          <b-col
                            md="4"
                            class="mb-1"
                          >
                            <strong>Post : </strong>{{ row.item.post }}
                          </b-col>
                          <b-col
                            md="4"
                            class="mb-1"
                          >
                            <strong>Email : </strong>{{ row.item.email }}
                          </b-col>
                          <b-col
                            md="4"
                            class="mb-1"
                          >
                            <strong>Phone : </strong>{{ row.item.phone }}
                          </b-col>
                          <b-col
                            md="4"
                            class="mb-1"
                          >
                            <strong>Salary : </strong>{{ row.item.salary? row.item.salary: 'null' }}
                          </b-col>
                          <b-col
                            md="4"
                            class="mb-1"
                          >
                            <strong>Age : </strong>{{ row.item.age ? row.item.age : 'null'}}
                          </b-col>
                        </b-row>
              
                        <b-button
                          class="mr-1"
                          size="sm"
                          variant="outline-secondary"
                          @click="row.toggleDetails"
                        >
                          Hide Details
                        </b-button>
                        <b-button
                          size="sm"
                          variant="outline-info"
                          @click.prevent="showMsgBox(row.item)"
                        >
                          Pick up
                        </b-button>
                      </b-card>
                    </template>
              
              
              
              
                     <template #cell(status)="data">
                      <b-badge :variant="status[1][data.value]">
                        {{ status[0][data.value] }}
                      </b-badge>
                    </template>
                  </b-table>
                  <h5>everyone in team </h5>
                   <b-table
                     class="mb-4"
                    :items="leadsData.team"
                    :fields="leadsFields"
                    striped
                    responsive
                    >
                    <template #cell(show_details)="row">
                      <b-form-checkbox
                        v-model="row.detailsShowing"
                        plain
                        class="vs-checkbox-con"
                        @change="row.toggleDetails"
                      >
                        <span class="vs-checkbox">
                          <span class="vs-checkbox--check">
                            <i class="vs-icon feather icon-check" />
                          </span>
                        </span>
                        <span class="vs-label">{{ row.detailsShowing ? 'Hide' : 'Show' }}</span>
                      </b-form-checkbox>
                    </template>
              
                    <template #row-details="row">
                      <b-card>
                        <b-row class="mb-2">
                          <b-col
                            md="4"
                            class="mb-1"
                          >
                            <strong>Full Name : </strong>{{ row.item.fullName }}
                          </b-col>
                          <b-col
                            md="4"
                            class="mb-1"
                          >
                            <strong>Post : </strong>{{ row.item.post }}
                          </b-col>
                          <b-col
                            md="4"
                            class="mb-1"
                          >
                            <strong>Email : </strong>{{ row.item.email }}
                          </b-col>
                          <b-col
                            md="4"
                            class="mb-1"
                          >
                            <strong>Phone : </strong>{{ row.item.phone }}
                          </b-col>
                          <b-col
                            md="4"
                            class="mb-1"
                          >
                            <strong>Salary : </strong>{{ row.item.salary? row.item.salary: 'null' }}
                          </b-col>
                          <b-col
                            md="4"
                            class="mb-1"
                          >
                            <strong>Age : </strong>{{ row.item.age ? row.item.age : 'null'}}
                          </b-col>
                        </b-row>
              
                        <b-button
                          class="mr-1"
                          size="sm"
                          variant="outline-secondary"
                          @click="row.toggleDetails"
                        >
                          Hide Details
                        </b-button>
                        <b-button
                          size="sm"
                          variant="outline-info"
                          @click.prevent="showMsgBox(row.item)"
                        >
                          Pick up
                        </b-button>
                      </b-card>
                    </template>
              
              
              
              
                     <template #cell(status)="data">
                      <b-badge :variant="status[1][data.value]">
                        {{ status[0][data.value] }}
                      </b-badge>
                    </template>
                  </b-table>
              
                  <h5>self</h5>
                   <b-table
                    class="mb-4"
                    :items="leadsData.agent"
                    :fields="leadsFields"
                    striped
                    responsive
                    >
                    <template #cell(show_details)="row">
                      <b-form-checkbox
                        v-model="row.detailsShowing"
                        plain
                        class="vs-checkbox-con"
                        @change="row.toggleDetails"
                      >
                        <span class="vs-checkbox">
                          <span class="vs-checkbox--check">
                            <i class="vs-icon feather icon-check" />
                          </span>
                        </span>
                        <span class="vs-label">{{ row.detailsShowing ? 'Hide' : 'Show' }}</span>
                      </b-form-checkbox>
                    </template>
              
                    <template #row-details="row">
                      <b-card>
                        <b-row class="mb-2">
                          <b-col
                            md="4"
                            class="mb-1"
                          >
                            <strong>Full Name : </strong>{{ row.item.fullName }}
                          </b-col>
                          <b-col
                            md="4"
                            class="mb-1"
                          >
                            <strong>Post : </strong>{{ row.item.post }}
                          </b-col>
                          <b-col
                            md="4"
                            class="mb-1"
                          >
                            <strong>Email : </strong>{{ row.item.email }}
                          </b-col>
                          <b-col
                            md="4"
                            class="mb-1"
                          >
                            <strong>Phone : </strong>{{ row.item.phone }}
                          </b-col>
                          <b-col
                            md="4"
                            class="mb-1"
                          >
                            <strong>Salary : </strong>{{ row.item.salary? row.item.salary: 'null' }}
                          </b-col>
                          <b-col
                            md="4"
                            class="mb-1"
                          >
                            <strong>Age : </strong>{{ row.item.age ? row.item.age : 'null'}}
                          </b-col>
                        </b-row>
              
                        <b-button
                          class="mr-1"
                          size="sm"
                          variant="outline-secondary"
                          @click="row.toggleDetails"
                        >
                          Hide Details
                        </b-button>
                        <b-button
                          size="sm"
                          variant="outline-info"
                          
                        >
                          Action
                        </b-button>
                      </b-card>
                    </template>
              
              
              
              
                     <template #cell(status)="data">
                      <b-badge :variant="status[1][data.value]">
                        {{ status[0][data.value] }}
                      </b-badge>
                    </template>
                  </b-table>
              </div>
            </b-tab>
            <b-tab
              title="ALL Leads"
            />
            <!-- all Leads -->
           <div
              class="pt-4"
              >
               <b-table
                 :items="leadsData.owner"
                 :fields="leadsFields"
                 striped
                 responsive
                 >
                 <template #cell(show_details)="row">
                   <b-form-checkbox
                     v-model="row.detailsShowing"
                     plain
                     class="vs-checkbox-con"
                     @change="row.toggleDetails"
                   >
                     <span class="vs-checkbox">
                       <span class="vs-checkbox--check">
                         <i class="vs-icon feather icon-check" />
                       </span>
                     </span>
                     <span class="vs-label">{{ row.detailsShowing ? 'Hide' : 'Show' }}</span>
                   </b-form-checkbox>
                 </template>
           
                 <template #row-details="row">
                   <b-card>
                     <b-row class="mb-2">
                       <b-col
                         md="4"
                         class="mb-1"
                       >
                         <strong>Full Name : </strong>{{ row.item.fullName }}
                       </b-col>
                       <b-col
                         md="4"
                         class="mb-1"
                       >
                         <strong>Post : </strong>{{ row.item.post }}
                       </b-col>
                       <b-col
                         md="4"
                         class="mb-1"
                       >
                         <strong>Email : </strong>{{ row.item.email }}
                       </b-col>
                       <b-col
                         md="4"
                         class="mb-1"
                       >
                         <strong>Phone : </strong>{{ row.item.phone }}
                       </b-col>
                       <b-col
                         md="4"
                         class="mb-1"
                       >
                         <strong>Salary : </strong>{{ row.item.salary? row.item.salary: 'null' }}
                       </b-col>
                       <b-col
                         md="4"
                         class="mb-1"
                       >
                         <strong>Age : </strong>{{ row.item.age ? row.item.age : 'null'}}
                       </b-col>
                       
                       <b-col
                         md="4"
                         class="mb-1"
                       >
                         <strong>visibility : </strong>
                         <div>
                           <h6> franchise:</h6>{{ row.item.visibility.franchise? row.item.visibility.franchise : 'null'}}
                           <h6 v-if="row.item.visibility.team">team:</h6> {{ row.item.visibility.team}}
                           <h6 v-if="row.item.visibility.agent">agent:</h6> {{ row.item.visibility.agent}}
                         </div>
                       </b-col>
           
                     </b-row>
           
                     <b-button
                       class="mr-1"
                       size="sm"
                       variant="outline-secondary"
                       @click="row.toggleDetails"
                     >
                       Hide Details
                     </b-button>
                     <b-button
                       size="sm"
                       variant="outline-info"
                     >
                       Action
                     </b-button>
                   </b-card>
                 </template>
           
           
           
           
                  <template #cell(status)="data">
                   <b-badge :variant="status[1][data.value]">
                     {{ status[0][data.value] }}
                   </b-badge>
                 </template>
               </b-table>
           </div>

          </b-tabs>
        </b-card>

    <!-- <leads-assign-modal
      :lead="tempLead"
      :teamOption="teamOption"
      :userOption="userOption"></leads-assign-modal> -->
      <b-modal></b-modal>
  </div>
</template>

<script>
import {
  BTable, BFormCheckbox, BButton, BCard, BRow, BCol, BAvatar, BBadge,
  BModal, VBModal,BTab,BTabs, BCardTitle,BCardText, BCardSubTitle,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

import LeadsFranchiseTable from './LeadsFranchiseTable.vue'
import LeadsAssignModal from './LeadsAssignModal.vue'

export default {
  components: {
    BTable,
    BButton,
    BFormCheckbox,
    BCard,
    BRow,
    BCol,
    BBadge,
    BAvatar,
    LeadsFranchiseTable,
    LeadsAssignModal,
    BModal,
    BCard,
    BTab,
    BTabs,
    BButton, 
    BCardTitle,
    BCardText, 
    BCardSubTitle,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      showTable:'',
      fields: ['show_details', 'id', { key: 'avatar', label: 'Avatar' }, 'full_name', 'post', 'email', 'city', 'start_date', 'salary', 'age', 'experience', { key: 'status', label: 'Status' }],
      status: [{
        1: 'New', 2: 'Qualified', 3: 'Unqualified', 4: 'Contacted',
      },
      {
        1: 'light-primary', 2: 'light-success', 3: 'light-danger', 4: 'light-warning', 
      }],
      leadsFields: ['show_details', 'id',  'fullName', 'post', 'email', 'phone', { key: 'status', label: 'Status' }],
      leadsData:{
        owner:[],
        franchise:[],
        team:[],
        agent:[],
      },
      tempLead:{},
      teamOption:[],
      userOption:{},
      franchisLeads:{}
    }
  },
  methods:{
    switchTable(table){
        this.showTable = `${table}`
    },
    getLeads () {
      this.$http.get(`${this.GLOBAL.server}leads`)
        .then(res => {
          console.log(res.data)
          if(res.data.message == 'owner') {
            this.leadsData.owner = res.data.allLeads
          }
          // this.leadsData = res.data
          // this.teamOption =res.data.teamList
          // this.userOption = res.data.memberList
          // this.franchisLeads = {
          //   leadsList:res.data.teamLeadsList,
          //   teamList:res.data.teamList,
          //   }
        })
    },
    openModal(item) {
        // console.log(item)
        this.tempLead = {...item}
    },
    showMsgBox(item) {
      this.boxOne = ''
      this.$bvModal
        .msgBoxConfirm(`Please confirm that you want to pick up ${item.fullName}.`, {
          title: 'Please Confirm',
          size: 'sm',
          okVariant: 'info',
          okTitle: 'Yes',
          cancelTitle: 'No',
          cancelVariant: 'outline-secondary',
          hideHeaderClose: false,
          centered: true,
          headerBgVariant:'info',
          headerTextVariant:'dark',
        })
        .then(value => {
          this.boxOne = value
          if (this.boxOne) {
            this.pickUpLead(item)
          }
        })
    },
    pickUpLead(item) {
        console.log(item)
        let url =`${this.GLOBAL.server}/sales/leads/pickup/${item._id}`
        let httpsMethods = 'patch'
        this.$http[httpsMethods](url,item)
          .then(res => { 
            console.log(res.data)
            this.makeToast(res.data.result,res.data.message,'pick up Lead')
            this.getLeads()
            
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
  created () {
    this.getLeads ()
  },
}
</script>