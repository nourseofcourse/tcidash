<template>
  <div class="card">
    <div class="card-body">
      <h4 class="header-title mt-0">Overview</h4>
      <ApexChart :options="options" :series="getGraphStatsForTeam"></ApexChart>
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
    ...mapGetters(['getGraphStatsForTeam'])
  }
}
</script>

<style lang="scss" scoped>
</style>
