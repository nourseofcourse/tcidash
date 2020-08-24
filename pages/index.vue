<template>
  <GridContainer type="fluid">
    <GridRow>
      <GridCol classes="col-12">
        <div class="card">
          <div class="card-body">
            <GridRow>
              <GridCol classes="col-md-9">
                <h4 class="mt-0">Welcome back, {{ loggedInUser.name }}</h4>
                <p class="text-muted">Here is a quick look at your stats year to date ( YTD ).</p>
                <GridRow classes="justify-content-center" v-if="sortUploadedStats != ''">
                  <GridCol class="col-lg-3 col-md-6 col-xs-12">
                    <div class="card mb-0">
                      <div class="card-body">
                        <div class="float-right">
                          <i class="mdi mdi-clipboard-account-outline font-24 text-secondary"></i>
                        </div>
                        <span class="badge badge-danger">Consults</span>
                        <h3 class="font-weight-bold">{{ sortUploadedStats[0].consults }}</h3>
                        <p
                          class="mb-0 text-muted text-truncate"
                          v-if="
                              Math.sign(
                                getPercentageChange(
                                  sortUploadedStats[1].consults,
                                  sortUploadedStats[0].consults
                                )
                              ) == 1
                            "
                        >
                          <span class="text-success">
                            <i class="mdi mdi-trending-up"></i>
                            {{
                            Math.abs(
                            getPercentageChange(
                            sortUploadedStats[1].consults,
                            sortUploadedStats[0].consults
                            )
                            )
                            }}%
                          </span>New Consults this month
                        </p>
                        <p class="mb-0 text-muted text-truncate" v-else>
                          <span class="text-danger">
                            <i class="mdi mdi-trending-down"></i>
                            {{
                            Math.abs(
                            getPercentageChange(
                            sortUploadedStats[1].consults,
                            sortUploadedStats[0].consults
                            )
                            )
                            }}%
                          </span>New Consults this month
                        </p>
                      </div>
                    </div>
                  </GridCol>
                  <GridCol classes="col-lg-3 col-md-6 col-xs-12">
                    <div class="card mb-0">
                      <div class="card-body">
                        <div class="float-right">
                          <i class="mdi mdi-clipboard-account-outline font-20 text-secondary"></i>
                        </div>
                        <span class="badge badge-info">Presented</span>
                        <h3 class="font-weight-bold">
                          $
                          {{
                          sortUploadedStats[0].presented | numbersWithCommas
                          }}
                        </h3>
                        <p
                          class="mb-0 text-muted text-truncate"
                          v-if="
                              Math.sign(
                                getPercentageChange(
                                  sortUploadedStats[1].presented,
                                  sortUploadedStats[0].presented
                                )
                              ) == 1
                            "
                        >
                          <span class="text-success">
                            <i class="mdi mdi-trending-up"></i>
                            {{
                            Math.abs(
                            getPercentageChange(
                            sortUploadedStats[1].presented,
                            sortUploadedStats[0].presented
                            )
                            )
                            }}%
                          </span>
                          Presented monthly
                        </p>
                        <p class="mb-0 text-muted text-truncate" v-else>
                          <span class="text-danger">
                            <i class="mdi mdi-trending-down"></i>
                            {{
                            Math.abs(
                            getPercentageChange(
                            sortUploadedStats[1].presented,
                            sortUploadedStats[0].presented
                            )
                            )
                            }}%
                          </span>
                          Presented monthly
                        </p>
                      </div>
                    </div>
                  </GridCol>
                  <GridCol classes="col-lg-3 col-md-6 col-xs-12">
                    <div class="card mb-0">
                      <div class="card-body">
                        <div class="float-right">
                          <i class="mdi mdi-clipboard-account-outline font-20 text-secondary"></i>
                        </div>
                        <span class="badge badge-warning">Accepted</span>
                        <h3 class="font-weight-bold">
                          $
                          {{
                          sortUploadedStats[0].accepted | numbersWithCommas
                          }}
                        </h3>
                        <p
                          class="mb-0 text-muted text-truncate"
                          v-if="
                              Math.sign(
                                getPercentageChange(
                                  sortUploadedStats[1].accepted,
                                  sortUploadedStats[0].accepted
                                )
                              ) == 1
                            "
                        >
                          <span class="text-success">
                            <i class="mdi mdi-trending-up"></i>
                            {{
                            Math.abs(
                            getPercentageChange(
                            sortUploadedStats[1].accepted,
                            sortUploadedStats[0].accepted
                            )
                            )
                            }}%
                          </span>
                          Accepted Monthly
                        </p>
                        <p class="mb-0 text-muted text-truncate" v-else>
                          <span class="text-danger">
                            <i class="mdi mdi-trending-down"></i>
                            {{
                            Math.abs(
                            getPercentageChange(
                            sortUploadedStats[1].accepted,
                            sortUploadedStats[0].accepted
                            )
                            )
                            }}%
                          </span>
                          Accepted Monthly
                        </p>
                      </div>
                    </div>
                  </GridCol>
                  <GridCol classes="col-lg-3 col-md-6 col-xs-12">
                    <div class="card mb-0">
                      <div
                        class="card-body"
                        :class="{
                            'bg-gradient4':
                              (sortUploadedStats[0].accepted /
                                sortUploadedStats[0].presented) *
                                100 >
                              25
                          }"
                      >
                        <div class="card-icon">
                          <i class="far fa-smile"></i>
                        </div>
                        <span
                          class="badge"
                          :class="{
                              'badge-light':
                                (sortUploadedStats[0].accepted /
                                  sortUploadedStats[0].presented) *
                                  100 >
                                25,
                              'badge-success':
                                (sortUploadedStats[0].accepted /
                                  sortUploadedStats[0].presented) *
                                  100 <=
                                25
                            }"
                        >Close Rate</span>
                        <h3
                          class="font-weight-bold"
                          :class="{
                              'text-light':
                                (sortUploadedStats[0].accepted /
                                  sortUploadedStats[0].presented) *
                                  100 >
                                25
                            }"
                        >
                          {{
                          (
                          (sortUploadedStats[0].accepted /
                          sortUploadedStats[0].presented) *
                          100
                          ).toFixed(2)
                          }}%
                        </h3>
                        <p
                          class="mb-0 text-muted text-truncate"
                          :class="{
                              'text-light':
                                (sortUploadedStats[0].accepted /
                                  sortUploadedStats[0].presented) *
                                  100 >
                                25
                            }"
                          v-if="
                              Math.sign(
                                getPercentageChange(
                                  (
                                    (parseInt(sortUploadedStats[1].accepted) /
                                      parseInt(
                                        sortUploadedStats[1].presented
                                      )) *
                                    100
                                  ).toFixed(2),
                                  (
                                    (parseInt(sortUploadedStats[0].accepted) /
                                      parseInt(
                                        sortUploadedStats[0].presented
                                      )) *
                                    100
                                  ).toFixed(2)
                                )
                              ) == 1
                            "
                        >
                          <span
                            class="text-success"
                            :class="{
                                'text-light':
                                  (sortUploadedStats[0].accepted /
                                    sortUploadedStats[0].presented) *
                                    100 >
                                  25
                              }"
                          >
                            <i class="mdi mdi-trending-up"></i>
                            {{
                            Math.abs(
                            getPercentageChange(
                            (
                            (parseInt(sortUploadedStats[1].accepted) /
                            parseInt(
                            sortUploadedStats[1].presented
                            )) *
                            100
                            ).toFixed(2),
                            (
                            (parseInt(sortUploadedStats[0].accepted) /
                            parseInt(
                            sortUploadedStats[0].presented
                            )) *
                            100
                            ).toFixed(2)
                            )
                            )
                            }}%
                          </span>
                          Close Rate Monthly
                        </p>
                        <p
                          class="mb-0 text-muted text-truncate"
                          :class="{
                              'text-light':
                                (sortUploadedStats[0].accepted /
                                  sortUploadedStats[0].presented) *
                                  100 >
                                25
                            }"
                          v-else
                        >
                          <span
                            class="text-success"
                            :class="{
                                'text-light':
                                  (sortUploadedStats[0].accepted /
                                    sortUploadedStats[0].presented) *
                                    100 >
                                  25
                              }"
                          >
                            <i class="mdi mdi-trending-up"></i>
                            {{
                            Math.abs(
                            getPercentageChange(
                            (
                            (parseInt(sortUploadedStats[1].accepted) /
                            parseInt(
                            sortUploadedStats[1].presented
                            )) *
                            100
                            ).toFixed(2),
                            (
                            (parseInt(sortUploadedStats[0].accepted) /
                            parseInt(
                            sortUploadedStats[0].presented
                            )) *
                            100
                            ).toFixed(2)
                            )
                            )
                            }}%
                          </span>
                          Close Rate Monthly
                        </p>
                      </div>
                    </div>
                  </GridCol>
                </GridRow>
              </GridCol>
              <GridCol classes="col-md-3 align-self-center">
                <img src="/dash.svg" alt class="img-fluid" />
              </GridCol>
            </GridRow>
          </div>
          <div class="card-body bg-light">
            <GridRow>
              <GridCol classes="col-8">
                <div class="media">
                  <img src="/fountain-pen.png" height="40" class="mr-4" alt="..." />
                  <div class="media-body align-self-center">
                    <p class="mb-0 text-muted">
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomised words.
                    </p>
                  </div>
                </div>
              </GridCol>
              <GridCol classes="col-4 align-self-center text-center">
                <button class="btn btn-sm btn-warning">Download Report</button>
              </GridCol>
            </GridRow>
          </div>
          <!--end card-body-->
        </div>
      </GridCol>
    </GridRow>
    <GridRow v-if="sortUploadedStats">
      <GridCol classes="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="header-title mt-0">OVERVIEW</h4>
            <ApexChart :options="options" :series="getGraphStatsForUser"></ApexChart>
          </div>
          <div class="card-footer d-flex justify-content-end">
            <nuxt-link to="/leaderboard" class="btn btn-info">View Leaderboard</nuxt-link>
          </div>
        </div>
      </GridCol>
    </GridRow>
  </GridContainer>
</template>

<script>
//import Logo from '~/components/Logo.vue'
import { mapGetters, mapState } from 'vuex'
import ApexChart from '@/components/Charts/ApexChart.vue'

export default {
  head() {
    return {
      title: 'Dashboard'
    }
  },
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
    ...mapGetters([
      'loggedInUser',
      'sortUploadedStats',
      'getGraphStatsForUser'
    ]),
    ...mapState({
      stats: store => store.stats.stats
    })
  },
  filters: {
    avatarUrl(value) {
      return value[Object.keys(value)[0]]
    },
    numbersWithCommas(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  methods: {
    getPercentageChange(newNumber, oldNumber) {
      var decreaseValue = oldNumber - newNumber

      return Math.round((decreaseValue / oldNumber) * 100)
    }
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('stats/fetchUserStats', store.state.auth.user.id)
    } catch (e) {
      // TODO: add better error handling later
    }
  },
  beforeMount() {
    if (this.$store.$auth.$state.user.id == 2) {
      return this.$router.push('/admin-dashboard')
    }
  }
}
</script>

<style></style>
