<template>
  <b-card>
    <b-card-title class="mb-1">
      Leads Status
    </b-card-title>
    <b-card-sub-title class="mb-2">
      leads resource from some where
    </b-card-sub-title>

    <vue-apex-charts
      type="donut"
      height="350"
      :options="donutChart.chartOptions"
      :series="donutChart.series"
    />
  </b-card>
</template>

<script>
import {
  BCard, BCardTitle, BCardSubTitle,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'

// colors
const chartColors = {
  donut: {
    series1: '#ffe700',
    series2: '#00d4bd',
    series3: '#826bf8',
    series4: '#2b9bf4',
    series5: '#FFA1A1',
    series6: '#fff',
  },
}

export default {
  components: {
    VueApexCharts,
    BCard,
    BCardTitle,
    BCardSubTitle,
  },
  data() {
    return {
      donutChart: {
        series: [15 ,50,5, 25, 10,],
        chartOptions: {
          legend: {
            show: true,
            position: 'bottom',
            fontSize: '14px',
            fontFamily: 'Montserrat',
          },
          colors: [
            chartColors.donut.series1,
            chartColors.donut.series6,
            chartColors.donut.series3,
            chartColors.donut.series2,
            chartColors.donut.series5,
          ],
          dataLabels: {
            enabled: true,
            formatter(val) {
              // eslint-disable-next-line radix
              return `${parseInt(val)}%`
            },
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '2rem',
                    fontFamily: 'Montserrat',
                  },
                  value: {
                    fontSize: '1rem',
                    fontFamily: 'Montserrat',
                    formatter(val) {
                      // eslint-disable-next-line radix
                      return `${parseInt(val)}%`
                    },
                  },
                  total: {
                    show: true,
                    fontSize: '1.5rem',
                    label: 'Operational',
                    formatter() {
                      return '25%'
                    },
                  },
                },
              },
            },
          },
          labels: ['New', 'Contacted', 'Qualified', 'Unqualified','null'],
          responsive: [
            {
              breakpoint: 992,
              options: {
                chart: {
                  height: 380,
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
            {
              breakpoint: 576,
              options: {
                chart: {
                  height: 320,
                },
                plotOptions: {
                  pie: {
                    donut: {
                      labels: {
                        show: true,
                        name: {
                          fontSize: '1.5rem',
                        },
                        value: {
                          fontSize: '1rem',
                        },
                        total: {
                          fontSize: '1.5rem',
                        },
                      },
                    },
                  },
                },
                legend: {
                  show: true,
                },
              },
            },
          ],
        },
      },
    }
  },
}
</script>
