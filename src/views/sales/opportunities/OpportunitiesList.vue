<template>
    <b-row class="match-height">
      <b-col
        lg="4"
        md="6"
        >
        <b-card
          no-body
          class="card-employee-task"
          >
    <b-card-header>
      <b-card-title>Yet to start</b-card-title>
      <feather-icon
        icon="MoreVerticalIcon"
        size="18"
        class="cursor-pointer"
      />
    </b-card-header>

    <!-- body -->
    <b-card-body>
      <div
        v-for="(employee,index) in employeeData"
        :key="employee.userFullName"
        class="employee-task d-flex justify-content-between align-items-center"
      >
        <b-media no-body>
          <b-media-aside class="mr-75">
            <b-avatar
              rounded
              size="42"
              :src="employee.avatar"
            />
          </b-media-aside>
          <b-media-body class="my-auto">
            <h6 class="mb-0">
              {{ employee.userFullName }}
            </h6>
            <small>{{ employee.designation }}</small>
          </b-media-body>
        </b-media>
        <div class="d-flex align-items-center">
          <small class="text-muted mr-75">{{ employee.duration }}</small>

          <!-- chart -->
          <vue-apex-charts
            type="radialBar"
            height="30"
            width="30"
            :options="chartData[index].options"
            :series="chartData[index].series"
          />
        </div>
      </div>
    </b-card-body>
        </b-card>
      </b-col>
    <b-col
      lg="4"
      md="6"
    >
      <b-card
        no-body
        class="card-employee-task"
        >
        <b-card-header>
          <b-card-title>In Progress</b-card-title>
          <feather-icon
            icon="MoreVerticalIcon"
            size="18"
            class="cursor-pointer"
            />
        </b-card-header>

        <!-- body -->
        <b-card-body>
          <div
            v-for="(employee,index) in employeeData"
            :key="employee.userFullName"
            class="employee-task d-flex justify-content-between align-items-center"
            >
            <b-media no-body>
              <b-media-aside class="mr-75">
                <b-avatar
                  rounded
                  size="42"
                  :src="employee.avatar"
                />
              </b-media-aside>
              <b-media-body class="my-auto">
                <h6 class="mb-0">
                  {{ employee.userFullName }}
                </h6>
                <small>{{ employee.designation }}</small>
              </b-media-body>
            </b-media>
            <div class="d-flex align-items-center">
              <small class="text-muted mr-75">{{ employee.duration }}</small>

              <!-- chart -->
              <vue-apex-charts
                type="radialBar"
                height="30"
                width="30"
                :options="chartData[index].options"
                :series="chartData[index].series"
              />
            </div>
          </div>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col
      lg="4"
      md="6"
    >
    <b-card
        no-body
        class="card-employee-task"
        >
        <b-card-header>
          <b-card-title>Completed</b-card-title>
          <feather-icon
            icon="MoreVerticalIcon"
            size="18"
            class="cursor-pointer"
            />
        </b-card-header>

        <!-- body -->
        <b-card-body>
          <div
            v-for="(employee,index) in employeeData"
            :key="employee.userFullName"
            class="employee-task d-flex justify-content-between align-items-center"
            >
            <b-media no-body>
              <b-media-aside class="mr-75">
                <b-avatar
                  rounded
                  size="42"
                  :src="employee.avatar"
                />
              </b-media-aside>
              <b-media-body class="my-auto">
                <h6 class="mb-0">
                  {{ employee.userFullName }}
                </h6>
                <small>{{ employee.designation }}</small>
              </b-media-body>
            </b-media>
            <div class="d-flex align-items-center">
              <small class="text-muted mr-75">{{ employee.duration }}</small>

              <!-- chart -->
              <vue-apex-charts
                type="radialBar"
                height="30"
                width="30"
                :options="chartData[index].options"
                :series="chartData[index].series"
              />
            </div>
          </div>
        </b-card-body>
      </b-card>
    </b-col>
    
  </b-row>
    
</template>


<script>
import { BRow, BCol,BCard, BCardTitle, BCardHeader, BCardBody, } from 'bootstrap-vue'


export default {
  components: {
    BRow,
    BCol,
    BCard, 
    BCardTitle, 
    BCardHeader, 
    BCardBody,

  },
}
</script>
