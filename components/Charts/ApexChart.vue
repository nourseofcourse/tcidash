<template>
  <client-only placeholder="Loading...">
    <apexchart
      width="100%"
      height="350px"
      style="min-height: 364px;"
      type="bar"
      :options="options"
      :series="series"
    ></apexchart>
  </client-only>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: false,
      default: function() {
        return {
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
          }
        }
      }
    },
    series: {
      type: Array,
      required: false,
      default: function() {
        return [
          {
            name: 'series-1',
            data: [30, 40, 45, 50, 49, 60, 70, 91]
          }
        ]
      }
    }
  },
  components: {
    /* Fix for `Cannot read property 'document' of undefined`
     * Would cause never ending reload if the page was refreshed
     *
     * https://github.com/apexcharts/vue-apexcharts/issues/116
     */
    Apexchart: () => import('vue-apexcharts')
    //ApexChart: () => import('vue-apexcharts').then(m => m.default)
  }
}
</script>

<style lang="scss" scoped>
</style>
