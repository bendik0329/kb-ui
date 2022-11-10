<template>
  <!-- Need to add height inherit because Vue 2 don't support multiple root ele -->
  <div style="height: inherit">
    <div
      class="body-content-overlay"
      :class="{'show': mqShallShowLeftSidebar}"
      @click="mqShallShowLeftSidebar = false"
    />
    <div class="todo-app-list">

      <!-- App Searchbar Header -->
      <div class="app-fixed-search d-flex align-items-center">

        <!-- Toggler -->
        <div class="sidebar-toggle d-block d-lg-none ml-1">
          <feather-icon
            icon="MenuIcon"
            size="21"
            class="cursor-pointer"
            @click="mqShallShowLeftSidebar = true"
          />
        </div>

        <!-- Searchbar -->
        <div class="d-flex align-content-center justify-content-between w-100">
          <b-input-group class="input-group-merge">
            <b-input-group-prepend is-text>
              <feather-icon
                icon="SearchIcon"
                class="text-muted"
              />
            </b-input-group-prepend>
            <b-form-input
              :value="searchQuery"
              placeholder="Search forms"
              @input="updateRouteQuery"
            />
          </b-input-group>
        </div>

        <!-- Dropdown -->
        <div class="dropdown">
          <b-dropdown
            variant="link"
            no-caret
            toggle-class="p-0 mr-1"
            right
          >
            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>
            <b-dropdown-item @click="resetSortAndNavigate">
              Reset Sort
            </b-dropdown-item>
            <b-dropdown-item :to="{ name: $route.name, query: { ...$route.query, sort: 'title-asc' } }">
              Sort A-Z
            </b-dropdown-item>
            <b-dropdown-item :to="{ name: $route.name, query: { ...$route.query, sort: 'title-desc' } }">
              Sort Z-A
            </b-dropdown-item>
            <b-dropdown-item :to="{ name: $route.name, query: { ...$route.query, sort: 'assignee' } }">
              Sort Assignee
            </b-dropdown-item>
            <b-dropdown-item :to="{ name: $route.name, query: { ...$route.query, sort: 'due-date' } }">
              Sort Due Date
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>

      <!-- Todo List -->
      <vue-perfect-scrollbar
        :settings="perfectScrollbarSettings"
        class="todo-task-list-wrapper list-group scroll-area ps ps-scroll-y"
      >
        <draggable
          v-model="Forms"
          handle=".draggable-task-handle"
          tag="ul"
          class="todo-task-list media-list"
        >
          <!-- forms -->
          <li
            v-for="form in Forms"
            :key="form.id"
            class="todo-item"
            :class="{ 'completed': form.isCompleted }"
            @click="handleTaskClick(form)"
          >
            <feather-icon
              icon="MoreVerticalIcon"
              class="draggable-task-handle d-inline"
            />
            <div class="todo-title-wrapper">
              <div class="todo-title-area">
                <div class="title-wrapper">
                  <b-form-checkbox
                    :checked="form.isCompleted"
                    @click.native.stop
                    @change="updateTaskIsCompleted(form)"
                  />
                  <span class="todo-title">{{ form.title }}</span>
                </div>
              </div>
              <div class="todo-item-action">
                <div class="badge-wrapper mr-1">
                  <b-badge
                    v-model="form.tags"
                    pill
                    :variant="`light-${resolveTagVariant(form.tags)}`"
                    class="text-capitalize"
                  >
                    {{ form.tags }}
                  </b-badge>
                </div>
              </div>
              <div class="todo-item-action">
                
                <small class="text-nowrap text-muted mr-1">{{ formatDate(form.updatedAt, { month: 'short', day: 'numeric'}) }}</small>
                <b-avatar
                  v-if="form['users_permissions_user'].avatar"
                  size="32"
                  :src="form['users_permissions_user'].avatar"
                  :variant="`light-${resolveAvatarVariant(form.tags)}`"
                  :text="avatarText(form['users_permissions_user'].username)"
                />
                <b-avatar
                  v-else
                  size="32"
                  :variant="`light-${resolveAvatarVariant(form.tags)}`"
                  :text="avatarText(form['users_permissions_user'].username)"
                  v-b-tooltip.hover.v-primary
                  :title="form['users_permissions_user'].username"
                >
                  <span>{{avatarText(form['users_permissions_user'].username)}}</span>
                </b-avatar>
              </div>
            </div>

          </li>
          <!-- old -->
          <!-- <li
            v-for="task in tasks"
            :key="task.id"
            class="todo-item"
            :class="{ 'completed': task.isCompleted }"
            @click="handleTaskClick(task)"
          >
            <feather-icon
              icon="MoreVerticalIcon"
              class="draggable-task-handle d-inline"
            />
            <div class="todo-title-wrapper">
              <div class="todo-title-area">
                <div class="title-wrapper">
                  <b-form-checkbox
                    :checked="task.isCompleted"
                    @click.native.stop
                    @change="updateTaskIsCompleted(task)"
                  />
                  <span class="todo-title">{{ task.title }}</span>
                </div>
              </div>
              <div class="todo-item-action">
                <div class="badge-wrapper mr-1">
                  <b-badge
                    v-for="tag in task.tags"
                    :key="tag"
                    pill
                    :variant="`light-${resolveTagVariant(tag)}`"
                    class="text-capitalize"
                  >
                    {{ tag }}
                  </b-badge>
                </div>
                <small class="text-nowrap text-muted mr-1">{{ formatDate(task.dueDate, { month: 'short', day: 'numeric'}) }}</small>
                <b-avatar
                  v-if="task.assignee"
                  size="32"
                  :src="task.assignee.avatar"
                  :variant="`light-${resolveAvatarVariant(task.tags)}`"
                  :text="avatarText(task.assignee.fullName)"
                />
                <b-avatar
                  v-else
                  size="32"
                  variant="light-secondary"
                >
                  <feather-icon
                    icon="UserIcon"
                    size="16"
                  />
                </b-avatar>
              </div>
            </div>

          </li>  -->
          <!-- old -->

        </draggable>
        <div
          class="no-results"
          :class="{'show': !Forms.length}"
        >
          <h5>No Items Found</h5>
        </div>
      </vue-perfect-scrollbar>
    </div>

    <!-- Task Handler -->
    <forms-task-handler-sidebar
      v-model="isTaskHandlerSidebarActive"
      :task="task"
      :clear-task-data="clearTaskData"
      @remove-task="removeForm"
      @add-task="addForm"
      @update-task="updateForm"
    />

    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-left">
      <forms-left-sidebar
        :task-categories="taskCategories"
        :task-tags="taskTags"
        :is-task-handler-sidebar-active.sync="isTaskHandlerSidebarActive"
        :class="{'show': mqShallShowLeftSidebar}"
        @close-left-sidebar="switchCategory"
      />
    </portal>
  </div>
</template>

<script>
import store from '@/store'
import {
  ref, watch, computed, onUnmounted,
} from '@vue/composition-api'
import {
  BFormInput, BInputGroup, BInputGroupPrepend, BDropdown, BDropdownItem,
  BFormCheckbox, BBadge, BAvatar,VBTooltip,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import draggable from 'vuedraggable'
import { formatDate, avatarText } from '@core/utils/filter'
import { useRouter } from '@core/utils/utils'
import { useResponsiveAppLeftSidebarVisibility } from '@core/comp-functions/ui/app'
import FormsLeftSidebar from './FormsLeftSidebar.vue'
import todoStoreModule from './todoStoreModule'
import FormsTaskHandlerSidebar from './FormsTaskHandlerSidebar.vue'

export default {
  data(){
    return{
      categories:['Selling','Buying','Miscellaneous'],
      forms:[],
    }
  },
  directives: {
    'b-tooltip': VBTooltip,
    Ripple,
  },
  components: {
    BFormInput,
    BInputGroup,
    BInputGroupPrepend,
    BDropdown,
    BDropdownItem,
    BFormCheckbox,
    BBadge,
    BAvatar,
    draggable,
    VuePerfectScrollbar,

    // App SFC
    FormsLeftSidebar,
    FormsTaskHandlerSidebar,
  },
  setup() {
    const TODO_APP_STORE_MODULE_NAME = 'app-todo'

    // Register module
    if (!store.hasModule(TODO_APP_STORE_MODULE_NAME)) store.registerModule(TODO_APP_STORE_MODULE_NAME, todoStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(TODO_APP_STORE_MODULE_NAME)) store.unregisterModule(TODO_APP_STORE_MODULE_NAME)
    })

    const { route, router } = useRouter()
    const routeSortBy = computed(() => route.value.query.sort)
    const routeQuery = computed(() => route.value.query.q)
    const routeParams = computed(() => route.value.params)
    watch(routeParams, () => {
      // eslint-disable-next-line no-use-before-define
      fetchTasks()
      fetchForms()
    })
    const user = ref({})

    const tasks = ref([])

    const Forms = ref([])
    const filterForms = ref({})

    const sortOptions = [
      'latest',
      'title-asc',
      'title-desc',
      'assignee',
      'due-date',
    ]
    const sortBy = ref(routeSortBy.value)
    watch(routeSortBy, val => {
      console.log(val)
      if (sortOptions.includes(val)) sortBy.value = val
      else sortBy.value = val
    })
    const resetSortAndNavigate = () => {
      const currentRouteQuery = JSON.parse(JSON.stringify(route.value.query))

      delete currentRouteQuery.sort

      router.replace({ name: route.name, query: currentRouteQuery }).catch(() => {})
    }

    const blankTask = {
      id: null,
      title: '',
      updatedAt: new Date(),
      description: '',
      assignee: null,
      tags: null,
      category:null,
      isCompleted: false,
      isDeleted: false,
      isImportant: false,
      ['users_permissions_user']: null,
    }
    const task = ref(JSON.parse(JSON.stringify(blankTask)))
    const clearTaskData = () => {
      task.value = JSON.parse(JSON.stringify(blankTask))
    }


    //new
    const blankForm = {
      id: null,
      title: '',
      updatedAt: new Date(),
      description: '',
      assignee: null,
      tags: null,
      category:null,
      isCompleted: false,
      isDeleted: false,
      isImportant: false,
      ['users_permissions_user']: null,
    }
    const form = ref(JSON.parse(JSON.stringify(blankForm)))
    const clearFormData = () => {
      form.value = JSON.parse(JSON.stringify(blankForm))
    }
    //new



    const addTask = val => {
      store.dispatch('app-todo/addTask', val)
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          fetchTasks()
        })
    }
    const removeTask = () => {
      store.dispatch('app-todo/removeTask', { id: task.value.id })
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          fetchTasks()
        })
    }
    const updateTask = taskData => {
      store.dispatch('app-todo/updateTask', { task: taskData })
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          fetchTasks()
        })
    }

    //new
    const addForm = val => {
      const newForm = {
        ...val,
        ['users_permissions_user']:user.value
      }
      console.log(newForm)
      store.dispatch('app-todo/addForm', newForm)
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          fetchForms()
        })
    }
    const removeForm = () => {
      store.dispatch('app-todo/removeForm', { id: task.value.id })
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          fetchForms()
        })
    }
    const updateForm = formData => {
      console.log(formData) //updateForm
      store.dispatch('app-todo/updateForm', { form: formData })
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          fetchForms()
        })
    }



    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    }

    const isTaskHandlerSidebarActive = ref(false)

    const taskTags = [
      { title: 'Mandatory', color: 'primary', route: { name: 'apps-todo-tag', params: { tag: 'Mandatory' } } },
      { title: 'Optional', color: 'success', route: { name: 'apps-todo-tag', params: { tag: 'Optional' } } },
      { title: 'Informational', color: 'info', route: { name: 'apps-todo-tag', params: { tag: 'Informational' } } },
    ]

    const taskCategories = [
      { title: 'Selling', color: 'primary', route: { name: 'apps-todo-tag', params: { tag: 'Selling' } } },
      { title: 'Buying', color: 'success', route: { name: 'apps-todo-tag', params: { tag: 'Buying' } } },
      { title: 'Miscellaneous', color: 'warning', route: { name: 'apps-todo-tag', params: { tag: 'Miscellaneous' } } },
    ]


    const resolveTagVariant = tag => {
      if (tag === 'team') return 'primary'
      if (tag === 'low') return 'success'
      if (tag === 'medium') return 'warning'
      if (tag === 'high') return 'danger'
      if (tag === 'update') return 'info'
      if (tag === 'Mandatory') return 'primary'
      if (tag === 'Optional') return 'success'
      if (tag === 'Informational') return 'info'
      return 'primary'
    }

    const resolveAvatarVariant = tags => {
      if (tags.includes('high')) return 'primary'
      if (tags.includes('medium')) return 'warning'
      if (tags.includes('low')) return 'success'
      if (tags.includes('update')) return 'danger'
      if (tags.includes('team')) return 'info'
      return 'primary'
    }

    // Search Query
    const searchQuery = ref(routeQuery.value)
    watch(routeQuery, val => {
      searchQuery.value = val
    })
    // eslint-disable-next-line no-use-before-define
    watch([searchQuery, sortBy], () => fetchTasks())
    const updateRouteQuery = val => {
      const currentRouteQuery = JSON.parse(JSON.stringify(route.value.query))

      if (val) currentRouteQuery.q = val
      else delete currentRouteQuery.q

      router.replace({ name: route.name, query: currentRouteQuery })
    }

    //get forms
    const fetchForms = () => {
      store.dispatch('app-todo/fetchForms', {
        q: searchQuery.value,
        filter: router.currentRoute.params.filter,
        tag: router.currentRoute.params.tag,
        sortBy: sortBy.value,
      })
        .then(response => {
          console.log('get forms',response.data)
          Forms.value = response.data.forms
          const userData = {...response.data}
          delete userData.forms
          user.value = userData
          filterCategory(response.data.forms)
        })
    }
    fetchForms()

    const  filterCategory = formData => {
      console.log(formData)
      let newForms = {
        origin:formData,
        category:{},
        tag:{}
      }
      taskCategories.forEach(item =>{
        newForms.category[item.title] = []
      })
      taskTags.forEach(item =>{
        newForms.tag[item.title] = []
      })
      //category
      formData.forEach(form =>{
        newForms.category[form.category].push(form)
        newForms.tag[form.tags].push(form)
      })
      //tag
      console.log('filter',newForms)
      filterForms.value = newForms
    }

    const switchCategory = (category,type) =>{
      Forms.value = filterForms.value[type][category]
    }


    const fetchTasks = () => {
      store.dispatch('app-todo/fetchTasks', {
        q: searchQuery.value,
        filter: router.currentRoute.params.filter,
        tag: router.currentRoute.params.tag,
        sortBy: sortBy.value,
      })
        .then(response => {
          tasks.value = response.data
        })
    }

    fetchTasks()

    const handleTaskClick = taskData => {
      console.log(taskData)
      task.value = taskData
      isTaskHandlerSidebarActive.value = true
    }

    // Single Task isCompleted update
    const updateTaskIsCompleted = taskData => {
      // eslint-disable-next-line no-param-reassign
      taskData.isCompleted = !taskData.isCompleted
      updateTask(taskData)
    }

    //new
    const handleFormClick = formData => {
      console.log(formData)
      form.value = formData
      isTaskHandlerSidebarActive.value = true
    }

    // Single Form isCompleted update
    const updateFormIsCompleted = formData => {
      // eslint-disable-next-line no-param-reassign
      formData.isCompleted = !formData.isCompleted
      updateForm(formData)
    }



    const { mqShallShowLeftSidebar } = useResponsiveAppLeftSidebarVisibility()

    return {
      task,
      tasks,
      removeTask,
      addTask,
      updateTask,
      clearTaskData,

      //new
      user,
      Forms,
      addForm,
      removeForm,
      updateForm,
      fetchForms,
      filterCategory,
      switchCategory,


      taskTags,
      //categories
      taskCategories,
      searchQuery,
      fetchTasks,
      perfectScrollbarSettings,
      updateRouteQuery,
      resetSortAndNavigate,

      // UI
      resolveTagVariant,
      resolveAvatarVariant,
      isTaskHandlerSidebarActive,

      // Click Handler
      handleTaskClick,
      handleFormClick,

      // Filters
      formatDate,
      avatarText,

      // Single Task isCompleted update
      updateTaskIsCompleted,
      updateFormIsCompleted,

      // Left Sidebar Responsive
      mqShallShowLeftSidebar,
    }
  },
}
</script>

<style lang="scss" scoped>
.draggable-task-handle {
position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    visibility: hidden;
    cursor: move;

    .todo-task-list .todo-item:hover & {
      visibility: visible;
    }
}
</style>

<style lang="scss">
@import "@core/scss/base/pages/app-todo.scss";
</style>

