<template>
  <b-tabs
    vertical
    content-class="col-12 col-md-9 mt-1 mt-md-0"
    pills
    nav-wrapper-class="col-md-3 col-12"
    nav-class="nav-left"
  >


    <!-- change profile tab -->
    <b-tab active>

      <!-- title -->
      <template #title>
        <feather-icon
          icon="UserIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">Profile</span>
      </template>

       <my-profile 
        v-if="meData.profile"
        :general-data="meData.profile"
        :profile="meData.profile"/>
    </b-tab>
    <!--/ change profile tab -->

    <!-- info -->
    <b-tab>

      <!-- title -->
      <template #title>
        <feather-icon
          icon="UsersIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">Team</span>
      </template>

      
    </b-tab>

    <!-- social links -->
    <b-tab>

      <!-- title -->
      <template #title>
        <feather-icon
          icon="FileTextIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">License</span>
      </template>

      
    </b-tab>

    <!-- notification -->
    <b-tab>

      <!-- title -->
      <template #title>
        <feather-icon
          icon="AwardIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">Membership</span>
      </template>

      
    </b-tab>


    <!-- notification -->
    <b-tab>

      <!-- title -->
      <template #title>
        <feather-icon
          icon="BookOpenIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">Reports</span>
      </template>

      
    </b-tab>




    <!-- notification -->
    <b-tab>

      <!-- title -->
      <template #title>
        <feather-icon
          icon="BellIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">Expenses</span>
      </template>

      
    </b-tab>


    <!-- notification -->
    <b-tab>

      <!-- title -->
      <template #title>
        <feather-icon
          icon="BellIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">Tax</span>
      </template>

      
    </b-tab>
    



  </b-tabs>
</template>

<script>
import { BTabs, BTab } from 'bootstrap-vue'
import MyProfile from './my-profile/MyProfilePage.vue'


export default {
  components: {
    BTabs,
    BTab,
    MyProfile,
  },
  data() {
    return {
      options: {},
      meData:{}
    }
  },
  created() {
    const uid = JSON.parse(localStorage.getItem('userData')).id
    this.$http.get(`${this.GLOBAL.server}/me-page/profile/${uid}`)
      .then(res => {
        console.log(res.data)
        this.meData = res.data
      })
  }
}
</script>
