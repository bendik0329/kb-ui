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

       <me-page-profile
        v-if="options.profile"
        :profile-data="options.profile"
      />
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
        <me-page-teams
        v-if="options.teams"
        :teams-data="options.teams"
      />
      
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
    
    <b-tab>

      <!-- title -->
      <template #title>
        <feather-icon
          icon="BellIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">Payment Methods</span>
      </template>

      
    </b-tab>  


  </b-tabs>
</template>

<script>
import { BTabs, BTab } from 'bootstrap-vue'
import MyProfile from './my-profile/MyProfilePage.vue'
import MyExpenses from './my-expenses/MyExpensesPage.vue'
import MyMembership from './my-membership/MyMembershipSubpage.vue'
import MyReports from './my-reports/MyReportsSubpage.vue'
import MyTaxes from './my-tax/MyTaxSubpage.vue'
import MyPaymentMethods from './my-paymentmethods/MyPaymentMethods.vue'
import MyLicense from './my-license/MyLicenseSubpage.vue'
import MyTeams from './my-teams/MyTeamsSubpage.vue'


export default {
  components: {
    BTabs,
    BTab,
    MyProfile,
    MyLicense,
    MyMembership,
    MyExpenses,
    MyReports,
    MyTaxes,
    MyPaymentMethods,
    MyTeams,
  },
  data() {
    return {
      options: {},
    }
  },
  // beforeCreate() {
  //   this.$http.get('/me-page/data').then(res => { this.options = res.data })
  // },
}
</script>
