<template>
  <GridContainer type="fluid">
    <GridRow>
      <GridCol classes="col-12">
        <div class="card">
          <div class="card-body border-bottom">
            <div class="fro_profile">
              <GridRow classes="align-items-center">
                <GridCol classes="col-lg-4 mb-3 mb-lg-0">
                  <div class="fro_profile-main">
                    <div class="fro_profile-main-pic">
                      <AvatarGenerator
                        :size="128"
                        :name="user.name"
                        :avatarImage="user.avatar_urls | avatarUrl"
                      />
                      <span class="fro-profile_main-pic-change">
                        <i class="fas fa-camera"></i>
                      </span>
                    </div>
                    <div class="fro_profile_user-detail">
                      <h5 class="fro_user-name">{{ user.name }}</h5>
                      <p
                        class="mb-0 fro_user-name-post"
                        v-if="user.acf.team"
                      >{{ user.acf.team.post_title | capitalize }}</p>
                    </div>
                  </div>
                </GridCol>
                <!--end col-->
                <GridCol classes="col-lg-4 mb-3 mb-lg-0">
                  <GridRow>
                    <GridCol classes="col-7">
                      <div class="header-title">close rate</div>
                      <div class="seling-report">
                        <h3 class="seling-data mb-1">{{ getUserAverageCloseRate(user.id) }}%</h3>
                        <p class="text-muted">Avgerage monthly rate</p>
                        <!-- <h5 class="seling-data-detail">Avg. close rate shown</h5> -->
                      </div>
                    </GridCol>
                    <GridCol classes="col-5 align-item-center">
                      <PeityChart
                        :type="'donut'"
                        :chartData="getUserAverageCloseRate(user.id) + '/100'"
                      ></PeityChart>
                    </GridCol>
                  </GridRow>
                </GridCol>
                <!--end col-->
                <GridCol classes="col-lg-4 mb-2 mb-lg-0">
                  <GridRow>
                    <GridCol classes="col-6">
                      <div class="header-title">Total Sales</div>
                      <div class="seling-report">
                        <h3
                          class="seling-data mb-1"
                        >${{ getUserAverageTotalSales(user.id) | numbersWithCommas }}</h3>
                        <p class="text-muted">Avgerage monthly sales</p>
                      </div>
                    </GridCol>
                    <GridCol classes="col-6">
                      <PeityChart></PeityChart>
                    </GridCol>
                  </GridRow>
                </GridCol>
                <!--end col-->
              </GridRow>
              <!--end row-->
            </div>
            <!--end f_profile-->
          </div>
          <!--end card-body-->
        </div>
      </GridCol>
    </GridRow>
    <GridRow>
      <GridCol classes="col-lg-3">
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
        <div class="card" v-if="user.acf.description">
          <div class="card-body">
            <h4 class="mt-0 header-title">About</h4>
            <p class="text-muted font-13">{{ user.acf.description }}</p>
          </div>
          <!--end card-body-->
        </div>
      </GridCol>
      <GridCol classes="col-lg-9">
        <Transition name="screen-fade" mode="out-in" appear>
          <component :is="selected" :user="user" :teamStats="getUserStats(user.id)"></component>
        </Transition>
      </GridCol>
    </GridRow>
  </GridContainer>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import AvatarGenerator from '@/components/AvatarGenerator.vue'
import Dashboard from '@/components/User/Dashboard.vue'
import Statistics from '@/components/User/Statistics.vue'
import Settings from '@/components/User/Settings.vue'
import PeityChart from '@/components/Charts/PeityChart.vue'

export default {
  head() {
    return {
      title: this.user.name
    }
  },
  data() {
    return {
      tabs: ['Dashboard', 'Statistics'],
      selected: 'Dashboard'
    }
  },
  components: {
    AvatarGenerator,
    Dashboard,
    Statistics,
    Settings,
    PeityChart
  },
  computed: {
    ...mapState({
      user: store => store.users.user
    }),
    ...mapGetters([
      'getUserStats',
      'getUserAverageCloseRate',
      'getUserAverageTotalSales'
    ])
  },
  filters: {
    capitalize(value) {
      return value.toUpperCase()
    },
    avatarUrl(value) {
      return value[Object.keys(value)[2]]
    },
    numbersWithCommas(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('users/fetchUserByUsername', params.slug)
    } catch (e) {
      // TODO: add better error handling later
    }
  },
  mounted() {
    if (this.$store.state.auth.user.id == this.user.id) {
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
