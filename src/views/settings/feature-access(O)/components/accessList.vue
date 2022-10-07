<template>
    <div>
      <!-- <button
        @click.prevent="createAccess()"
      > create  </button>  -->
    <!-- search input -->
    <div class="custom-search d-flex justify-content-end">
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
        enabled: true,
        collapsable: true
      }"
    >
      <template
        slot="table-row"
        slot-scope="props"
      >
        <!-- Column: Name -->
        <span
          v-if="props.column.field === 'page'"
          class="text-nowrap"
        > 
          <span class="text-nowrap">{{ props.row.page }}</span>
        </span>

        <!-- Column: Access -->
        <span v-else-if="props.column.field === 'Access'">
          <b-badge v-for=" item, in props.row.Access " :key="item" :variant="statusVariant(item)" class="mx-1">
            {{ item  }}
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
                v-b-modal.modal-change-access
                @click.prevent="openAccessModal(props.row)">
                <feather-icon
                  icon="Edit2Icon"
                  class="mr-50"
                />
                <span>Edit Access</span>
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
    <!-- modal -->
    <access-modal
    ref="accessModal"
    :access="tempAccess"
    :index="pageIndex"
    ></access-modal>
  </div>
</template>

<script>
import {
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdownItem, BDropdown,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import accessModal from './accessModal'
import store from '@/store/index'

export default {
  components: {
    VueGoodTable,
    BAvatar,
    BBadge,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdownItem,
    BDropdown,
    accessModal,
  },
  data() {
    return {
      pageLength: 60,
      dir: false,
      columns: [
        {
          label: 'Page',
          field: 'page',
        },
        {
          label: 'Access',
          field: 'Access',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      rows: [],
      searchTerm: '',
      tempAccess:{},
      pageIndex:0,
    }
  },
  computed: {
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        Franchise      : 'light-primary',
        Owner : 'light-success',
        Agent      : 'light-info',
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
  methods:{
    getAccessList(){
    this.$http.get(`${this.GLOBAL.server}/setting/feature-access/access`)
    .then(res => {
      console.log(res.data.Access)
      this.rows = res.data.Access
    })
    },
    routeAccessList(){
      this.$http.get(`${this.GLOBAL.server}/setting/route-access`)
      .then(res => { 
        console.log(res.data)
        })
    },
    openAccessModal(item) {
      const accessArr = this.rows[item.vgt_id].children
      const index = accessArr.findIndex( e => { return e.page ==item.page} )
      this.tempAccess = {...item}
      this.pageIndex = index
    },
    // createAccess () {
    //   const url = `${this.GLOBAL.server}/setting/feature-access/access`
    //   this.$http.post(url,{
    //     label: 'settings',
    //     children:[
    //       {
    //         route: "settings",
    //         page: "settings-integrations",
    //         Access: ["Owner"],
    //       },
    //     ],
    //   })
    // .then(res => {
    //   console.log(res.data)
    //   this.getAccessList()
    // })
    // },

    EditAccess(access,index) {
      console.log(access)
      let url = `${this.GLOBAL.server}/setting/feature-access/access/${access._id}`

       this.$http.patch(url,{access,index})
      .then(res => {
        console.log(res.data) 
        if(res.data.success) {
          this.getAccessList()
        }
        this.makeToast(res.data.success,res.data.message)
        }).catch(err => {
          this.makeToast( false ,'update fail')
        })
    },
    makeToast(status ,message) {
      const variant = `${ status? 'success' : 'danger'}`
      this.$bvToast.toast( message , {
        title: ` ${ status? 'success' : 'fail'}`,
        variant,
        solid: true,
      })
    },
  },
  created() {
    this.getAccessList()
    this.routeAccessList()
  },
  mounted() {
    this.$bus.$on('send-access', (access,index) => {this.EditAccess(access,index)})
  },
  beforeDestroy() {
    this.$bus.$off('send-access')
  }
}
</script>
 