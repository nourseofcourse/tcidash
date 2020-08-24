<template>
  <div class="card">
    <div class="card-body">
      <h4 class="header-title mt-0">uploaded stats</h4>
      <v-client-table :options="options" :data="teamStats" :columns="columns">
        <div slot="date" slot-scope="props">{{ props.row.date | getMonthFromDate }}</div>
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
export default {
  props: {
    teamStats: {
      type: Array,
      required: false
    }
  },
  filters: {
    addCommas(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    getMonthFromDate(value) {
      let date = new Date(value)
      return date.toLocaleString('default', { month: 'long' })
    }
  },
  data() {
    return {
      options: {
        headings: {
          date: 'Month',
          consults: 'Consults',
          presented: 'Presented',
          accepted: 'Accepted',
          rate: 'Close Rate'
        }
        // templates: {
        //   date(h, row, index) {
        //     let date = new Date(row.date)
        //     return date.toLocaleString('default', { month: 'long' })
        //   }
        // }
        // sortIcon: {
        //   base: 'mdi mdi-18px',
        //   up: 'mdi-menu-up',
        //   down: 'mdi-menu-down',
        //   is: ''
        // }
      },
      columns: ['date', 'consults', 'presented', 'accepted', 'rate'],
      data: this.getData()
    }
  },
  methods: {
    getData() {
      return [
        {
          date: 'Test',
          consults: 7,
          presented: 30000,
          accepted: 25000
        },
        {
          date: 'hi',
          consults: 12,
          presented: 25000,
          accepted: 10000
        }
      ]
    }
  }
}
</script>

<style lang="scss">
</style>
