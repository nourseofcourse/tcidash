<template>
  <div class="card">
    <div class="card-body">
      <h4 class="header-title mt-0">Overview</h4>
      <ApexChart :options="options" :series="getGraphStatsForUser"></ApexChart>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ApexChart from '@/components/Charts/ApexChart.vue'
export default {
  components: {
    ApexChart
  },
  data() {
    return {
      options: {
        xaxis: {
          categories: ['June', 'July', 'August', 'September']
        },
        dataLabels: {
          enabled: !1
        },
        colors: ['#00bcd4', '#7043c1']
      }
    }
  },
  computed: {
    ...mapGetters(['getGraphStatsForUser'])
  }
}
// import VueApexCharts from 'vue-apexcharts'
// export default {
//   components: {
//     apexchart: VueApexCharts
//   },
//   data() {
//     return {
//       options: {
//         chart: {
//           id: 'user-apexchart'
//         },
//         dataLabels: {
//           enabled: !1
//         },
//         colors: ['#00bcd4', '#e6edf3'],
//         xaxis: {
//           type: 'month',
//           categories: [
//             'Aug 2019',
//             'Sep 2019',
//             'Oct 2019',
//             'Nov 2019',
//             'Dec 2019',
//             'Jan 2020'
//           ]
//         }
//       },
//       series: [
//         {
//           name: 'Presented',
//           data: [85, 56, 70, 80, 25, 44]
//         },
//         {
//           name: 'Accepted',
//           data: [55, 30, 35, 45, 15, 27]
//         }
//       ]
//     }
//   }
// }
</script>

<style lang="scss" scoped>
</style>
