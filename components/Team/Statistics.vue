<template>
  <div class="card">
    <div class="card-body">
      <h4 class="header-title mt-0">uploaded stats</h4>
      <v-client-table :options="options" :data="teamStats" :columns="columns">
        <div slot="date" slot-scope="props">{{ props.row.date | getMonthFromDate }}</div>
        <div slot="coordinator" slot-scope="props">{{ getUserById( props.row.user_id ).name }}</div>
        <div slot="presented" slot-scope="props">${{ props.row.presented | addCommas }}</div>
        <div slot="accepted" slot-scope="props">${{ props.row.accepted | addCommas }}</div>
        <div
          slot="rate"
          slot-scope="props"
        >{{ ( ( props.row.accepted / props.row.presented ) * 100 ).toFixed(2) }}%</div>
      </v-client-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    teamStats: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      options: {
        headings: {
          date: 'Month',
          coordinator: 'Coordinator',
          consults: 'Consults',
          presented: 'Presented',
          accepted: 'Accepted',
          rate: 'Close Rate'
        }
      },
      columns: [
        'date',
        'coordinator',
        'consults',
        'presented',
        'accepted',
        'rate'
      ]
    }
  },
  computed: {
    ...mapGetters(['getUserById'])
  },
  filters: {
    addCommas(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    getMonthFromDate(value) {
      let date = new Date(value)
      return date.toLocaleString('default', { month: 'long' })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
