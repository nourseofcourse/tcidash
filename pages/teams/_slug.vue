<template>
  <GridContainer type="fluid">
    <GridRow>
      <GridCol class="col-12">
        <div class="card">
          <div class="card-body border-bottom">
            <div class="fro_profile">
              <GridRow classes="align-items-center">
                <GridCol classes="col-lg-4 mb-3 mb-lg-0">
                  <div class="fro_profile-main">
                    <div class="fro_profile-main-pic">
                      <AvatarGenerator
                        :name="team.title.rendered"
                        :size="128"
                        :avatarImage="team.acf.image"
                      />
                      <span class="fro-profile_main-pic-change">
                        <i class="fas fa-camera"></i>
                      </span>
                    </div>
                    <div class="fro_profile_user-detail">
                      <h5 class="fro_user-name">{{ team.title.rendered }}</h5>
                      <p
                        class="mb-0 fro_user-name-post"
                        v-if="team.acf.city"
                      >{{ team.acf.city | capitalize }}, {{ team.acf.state | capitalize }}</p>
                    </div>
                  </div>
                </GridCol>
                <GridCol classes="col-lg-4 mb-3 mb-lg-0">
                  <GridRow>
                    <GridCol classes="col-7">
                      <div class="header-title">close rate</div>
                      <div class="seling-report">
                        <h3 class="seling-data mb-1">{{ getTeamAverageCloseRate(team.id) }}%</h3>
                        <p class="text-muted">Avgerage monthly sales per coordinator</p>
                        <!-- <h5 class="seling-data-detail">Avg. close rate shown</h5> -->
                      </div>
                    </GridCol>
                    <GridCol classes="col-5 align-item-center">
                      <PeityChart
                        :type="'donut'"
                        :chartData="getTeamAverageCloseRate(team.id) + '/100'"
                      ></PeityChart>
                    </GridCol>
                  </GridRow>
                </GridCol>
                <GridCol classes="col-lg-4 mb-2 mb-lg-0">
                  <GridRow>
                    <GridCol classes="col-6">
                      <div class="header-title">Total Sales</div>
                      <div class="seling-report">
                        <h3
                          class="seling-data mb-1"
                        >${{ getTeamAverageTotalSales(team.id) | numbersWithCommas }}</h3>
                        <p class="text-muted">Avgerage monthly sales per coordinator</p>
                      </div>
                    </GridCol>
                    <GridCol classes="col-6">
                      <PeityChart></PeityChart>
                    </GridCol>
                  </GridRow>
                </GridCol>
              </GridRow>
            </div>
          </div>
        </div>
      </GridCol>
    </GridRow>
    <GridRow>
      <GridCol class="col-lg-3">
        <div class="card">
          <div class="card-body profile-nav">
            <div class="nav flex-column nav-pills" id="profile-tab" aria-orientation="vertical">
              <a
                v-for="tab in tabs"
                :key="tab"
                @click="selected = tab;"
                :class="{ active: selected == tab }"
                class="nav-link"
                aria-selected="true"
              >{{ tab }}</a>
            </div>
          </div>
          <!--end card-body-->
        </div>

        <!--end card-->
        <div class="card" v-if="team.acf.description">
          <div class="card-body">
            <h4 class="mt-0 header-title">Practice</h4>
            <p class="text-muted font-13">{{ team.acf.description }}</p>
          </div>
          <!--end card-body-->
        </div>
        <!--end card-->
        <div class="card">
          <div class="card-body">
            <h4 class="mt-0 header-title mb-3">Contact</h4>
            <ul class="list-unstyled mb-0">
              <li class>
                <i class="mdi mdi-phone mr-2 text-success font-18"></i>
                <b v-if="team.acf.phone">phone</b>
                : {{ team.acf.phone }}
              </li>
              <li class="mt-2">
                <i class="mdi mdi-email-outline text-success font-18 mt-2 mr-2"></i>
                <b v-if="team.acf.website">Website</b>
                : {{ team.acf.website }}
              </li>
              <li class="mt-2">
                <i class="mdi mdi-map-marker text-success font-18 mt-2 mr-2"></i>
                <b>Location</b>
                : {{ team.acf.city | capitalize }}, {{ team.acf.state | capitalize }}
              </li>
            </ul>
          </div>
          <!--end card-body-->
        </div>
      </GridCol>
      <GridCol class="col-lg-9">
        <Transition name="screen-fade" mode="out-in" appear>
          <component :is="selected" :team="team" :teamStats="getTeamStats(team.id)"></component>
        </Transition>
      </GridCol>
    </GridRow>
  </GridContainer>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import AvatarGenerator from '@/components/AvatarGenerator.vue'
import Dashboard from '@/components/Team/Dashboard.vue'
import Coordinators from '@/components/Team/Coordinators.vue'
import Statistics from '@/components/Team/Statistics.vue'
import Settings from '@/components/Team/Settings.vue'
import PeityChart from '@/components/Charts/PeityChart.vue'

export default {
  head() {
    return {
      title: this.team.title.rendered
    }
  },
  data() {
    return {
      tabs: ['Dashboard', 'Coordinators', 'Statistics'],
      selected: 'Dashboard',
      closeRate: [70]
    }
  },
  components: {
    AvatarGenerator,
    Dashboard,
    Coordinators,
    Statistics,
    Settings,
    PeityChart
  },
  computed: {
    ...mapState({
      team: store => store.teams.team
    }),
    ...mapGetters([
      'getTeamStats',
      'getTeamAverageCloseRate',
      'getTeamAverageTotalSales'
    ])
  },
  filters: {
    capitalize(value) {
      return value.toUpperCase()
    },
    numbersWithCommas(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('teams/fetchTeamBySlug', params.slug)
    } catch (e) {
      // TODO: add better error handling later
      error({
        statusCode: 503,
        message: 'Unable to fetch team at this time. Please try again later.'
      })
    }
  },
  mounted() {
    if (this.$store.state.auth.user.acf.team.ID == this.team.id) {
      this.tabs.push('Settings')
    }
  }
}
</script>

<style lang="scss" scoped>
.screen-fade-enter-active,
.screen-fade-leave-active {
  transition: opacity 250ms ease;
}
.screen-fade-enter,
.screen-fade-leave-to {
  opacity: 0;
}
</style>
