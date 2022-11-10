<template>
  <b-tabs
    vertical
    content-class="col-12 col-md-9 mt-1 mt-md-0"
    pills
    nav-wrapper-class="col-md-3 col-12"
    nav-class="nav-left"
  >

    <!-- change profile tab -->
    <b-tab active
      @click.prevent="options ='profile'">

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
        v-if="options == 'profile'"
        :profile-data="my.profile"
      />
    </b-tab>
    <!--/ change profile tab -->

    <!-- info -->
    <b-tab
      @click.prevent="options ='team'">

      <!-- title -->
      <template #title>
        <feather-icon
          icon="UsersIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">Team</span>
      </template>
      <my-teams
        v-if="options == 'team'"
        :team-data="options.team"
      />
      
    </b-tab>

    <!-- social links -->
    <b-tab
      @click.prevent="options ='license'">

      <!-- title -->
      <template #title>
        <feather-icon
          icon="FileTextIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">License</span>
      </template>

      <my-license
        v-if="options == 'license'"
        :license-data="options.license"
      />
    </b-tab>

    <!-- notification -->
    <b-tab
      @click.prevent="options ='membership'">

      <!-- title -->
      <template #title>
        <feather-icon
          icon="AwardIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">Membership</span>
      </template>
      <my-membership
        v-if="options == 'membership'"
        :membership-data="options.membership"
      />
      
    </b-tab>


    <!-- notification -->
    <b-tab
      @click.prevent="options ='reports'">

      <!-- title -->
      <template #title>
        <feather-icon
          icon="BookOpenIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">Reports</span>
      </template>

      <my-reports
        v-if="options == 'reports'"
        :reports-data="options.reports"
      />
    </b-tab>




    <!-- notification -->
    <b-tab
      @click.prevent="options ='expenses'">

      <!-- title -->
      <template #title>
        <feather-icon
          icon="BellIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">Expenses</span>
      </template>
      <my-expenses
        v-if="options == 'expenses'"
        :expenses-data="options.expenses"
      />
      
    </b-tab>


    <!-- notification -->
    <b-tab
      @click.prevent="options ='tax'">

      <!-- title -->
      <template #title>
        <feather-icon
          icon="BellIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">Tax</span>
      </template>
      <my-taxes
        v-if="options == 'tax'"
        :tax-data="options.tax"
      />
      
    </b-tab>
    
    <b-tab
      @click.prevent="options ='paymentMethods'">

      <!-- title -->
      <template #title>
        <feather-icon
          icon="BellIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">Payment Methods</span>
      </template>
      <my-payment-methods
        v-if="options == 'paymentMethods'"
        :payment-methods-data="options.paymentMethods"
      />
      
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
      options: 'profile',
      my:{
        profile:{},
        team:{},
        license:{},
        membership:{},
        expenses:{},
        reports:{},
        tax:{},
        paymentMethods:{},
      },
    }
  },
  created() {
    let url = `${this.GLOBAL.server}/users/me?[populate]=*`
    this.$http.get(url)
      .then(res => { 
        this.my.profile = res.data 
        console.log(this.my.profile)
      })
  },
  mounted(){
    console.log(this.my.profile)
  },
}
</script>
