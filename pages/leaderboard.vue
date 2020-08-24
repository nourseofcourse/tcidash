<template>
  <GridContainer type="fluid">
    <GridRow>
      <GridCol
        classes="col-md-4 col-sm-6 col-xs-12"
        v-for="(stat, boardIndex) in getCurrentMonthStats"
        :key="boardIndex.id"
        :statIndex="boardIndex"
        :stat="stat"
        v-if="sortedStats && sortedStats.length > 0 && boardIndex <= limit - 1"
      >
        <div class="card">
          <div class="card-body mb-0">
            <div class="row">
              <GridCol classes="col-8 align-self-center">
                <div>
                  <h4 class="mt-0 header-title">{{ getUserById( stat.user_id ).name }}</h4>
                  {{ getDateStuff( stat )}}
                  <h2
                    class="mt-0 font-weight-bold text-dark"
                  >{{ ( ( stat.accepted / stat.presented ) * 100).toFixed(2) }} %</h2>
                  <p class="mb-0 text-muted">
                    <span class="text-success">
                      <i class="mdi mdi-arrow-up"></i>14.5%
                    </span> Up From Last Week
                  </p>
                </div>
              </GridCol>
              <GridCol classes="col-4 align-self-center">
                <div class="icon-info text-right">
                  <i class="dripicons-cart bg-soft-warning">{{ boardIndex + 1 }}</i>
                </div>
              </GridCol>
            </div>
          </div>
          <div class="card-body overflow-hidden p-0">
            <div class="d-flex mb-0 h-100 dash-info-box">
              <div class="w-100">
                <div class="apexchart-wrapper">
                  <!-- insert chart here with class of chart-gutters -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </GridCol>
    </GridRow>
    <GridRow>
      <GridCol classes="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="header-title mt-0">Leaderboard</h4>
            <table
              id="datatable"
              class="table table-bordered dt-responsive nowrap"
              style="border-collapse: collapse; border-spacing: 0; width: 100%;"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Coordinator</th>
                  <!-- <th>Practice</th> -->
                  <th>Consults</th>
                  <th>Presented</th>
                  <th>Accepted</th>
                  <th>Close %</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(stat, boardIndex) in getCurrentMonthStats"
                  :key="boardIndex.id"
                  :statIndex="boardIndex"
                  :stat="stat"
                >
                  <td class="text-center">{{ boardIndex + 1 }}</td>
                  <td>{{ getUserById( stat.user_id ).name }}</td>
                  <!-- <td></td> -->
                  <td class="text-center">{{ stat.consults }}</td>
                  <td class="text-center">${{ stat.presented | addCommas }}</td>
                  <td class="text-center">${{ stat.accepted | addCommas }}</td>
                  <td class="text-center">
                    <span
                      class="text-dark-success"
                    >{{ ( ( stat.accepted / stat.presented ) * 100).toFixed(2) }}%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </GridCol>
    </GridRow>
  </GridContainer>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  head() {
    return {
      title: 'Leaderboard'
    }
  },
  data() {
    return {
      limit: 3
    }
  },
  filters: {
    addCommas(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  methods: {
    getDateStuff() {
      // let date1 = new Date('2019-09-13 13:34:40').getMonth()
      // let date2 = new Date().getMonth() - 1
      // return date1 + ' ' + date2
    }
  },
  computed: {
    ...mapState({
      stats: store => store.stats.all,
      users: store => store.users.all
    }),
    ...mapGetters(['sortedStats', 'getUserById', 'getCurrentMonthStats'])
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('stats/fetchStats')
      await store.dispatch('usersLoad')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch stats at this time. Please try again later.'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
