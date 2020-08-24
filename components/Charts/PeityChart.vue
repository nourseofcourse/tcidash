<template>
  <peity
    :type="type"
    :options="{ 'fill': ['#44a2d2', '#e6edf3'], width: '100%', height: '90px',  'innerRadius': 30, 'radius': 45 }"
    :data="pieData"
  ></peity>
</template>

<script>
import Peity from 'vue-peity'
export default {
  components: {
    Peity
  },
  props: {
    type: {
      type: String,
      default: 'bar'
    },
    chartData: {
      default: function() {
        return [80, 45, 67, 25, 70, 40, 47, 66]
      }
    }
  },
  computed: {
    pieData() {
      return this.chartData.toString()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
