<template>
  <div class="sidebar-left">
    <div class="sidebar">
      <div class="sidebar-content todo-sidebar">
        <div class="todo-app-menu">
          <div class="add-task">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              block
              @click="$emit('update:is-task-handler-sidebar-active', true); $emit('close-left-sidebar')"
            >
              Add Form
            </b-button>
          </div>
          <vue-perfect-scrollbar
            :settings="perfectScrollbarSettings"
            class="sidebar-menu-list scroll-area"
          >
           
            <b-list-group class="list-group-filters">
              <b-list-group-item
                @click="$emit('close-left-sidebar','all','origin')"
              >
                <feather-icon
                  icon="MailIcon"
                  size="18"
                  class="mr-75"
                />
                <span class="align-text-bottom line-height-1">ALL</span>
              </b-list-group-item>
            </b-list-group>

            <!-- Categories -->
            <div class="mt-3 px-2 d-flex justify-content-between">
              <h6 class="section-label mb-1">
                Categories
              </h6>
              <feather-icon icon="PlusIcon" />
            </div>
            <!-- old -->
            <!-- <b-list-group class="list-group-labels">
              <b-list-group-item
                v-for="categoty in taskCategories"
                :key="categoty.title + $route.path"
                :to="categoty.route"
                :active="isDynamicRouteActive(categoty.route)"
                @click="$emit('close-left-sidebar')"
              >
                <span
                  class="bullet bullet-sm mr-1"
                  :class="`bullet-${categoty.color}`"
                />
                <span>{{ categoty.title }}</span>
              </b-list-group-item>
            </b-list-group> -->
            <!-- new -->
            <b-list-group class="list-group-labels">
              <b-list-group-item
                v-for="categoty in taskCategories"
                :key="categoty.title + $route.path"
                @click="$emit('close-left-sidebar',categoty.title,'category')"
              >
                <span
                  class="bullet bullet-sm mr-1"
                  :class="`bullet-${categoty.color}`"
                />
                <span>{{ categoty.title }}</span>
              </b-list-group-item>
            </b-list-group>

            <!-- Tags -->
            <div class="mt-3 px-2 d-flex justify-content-between">
              <h6 class="section-label mb-1">
                Tags
              </h6>
              <feather-icon icon="PlusIcon" />
            </div>
            
            <!-- new -->
            <b-list-group class="list-group-labels">
              <b-list-group-item
                v-for="tag in taskTags"
                :key="tag.title + $route.path"
                @click="$emit('close-left-sidebar',tag.title,'tag')"
              >
                <span
                  class="bullet bullet-sm mr-1"
                  :class="`bullet-${tag.color}`"
                />
                <span>{{ tag.title }}</span>
              </b-list-group-item>
            </b-list-group>
          </vue-perfect-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { BButton, BListGroup, BListGroupItem } from 'bootstrap-vue'
import { isDynamicRouteActive } from '@core/utils/utils'
import Ripple from 'vue-ripple-directive'

export default {
  directives: {
    Ripple,
  },
  components: {
    BButton,
    BListGroup,
    BListGroupItem,
    VuePerfectScrollbar,
  },
  props: {
    taskTags: {
      type: Array,
      required: true,
    },
    taskCategories: {
      type: Array,
      required: true,
    }
  },
  setup() {
    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
    }

    const taskFilters = [
      {
        title: 'My Forms', 
        icon: 'MailIcon', 
        route: { 
          name: 'sales-forms' 
        } 
      },
      { 
        title: 'Important', 
        icon: 'StarIcon', 
        route: { 
          name: 'sales-forms-filter', 
          params: { filter: 'important' } 
        } 
      },
      { 
        title: 'Completed', 
        icon: 'CheckIcon', 
        route: { 
          name: 'sales-forms-filter', 
          params: { filter: 'completed' } 
        } 
      },
      { 
        title: 'Deleted', 
        icon: 'TrashIcon', 
        route: { 
          name: 'sales-forms-filter', 
          params: { filter: 'deleted' } 
        } 
      },
    ]



    
    return {
      perfectScrollbarSettings,
      taskFilters,
      isDynamicRouteActive,
    }
  },
}
</script>

<style>

</style>
