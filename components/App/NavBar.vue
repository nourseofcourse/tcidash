<template>
  <!-- Navbar Custom Menu -->
  <div class="navbar-custom-menu">
    <div class="container-fluid">
      <div id="navigation">
        <!-- Navigation Menu-->
        <ul class="navigation-menu list-unstyled">
          <li>
            <nuxt-link to="/" exact>
              <i class="mdi mdi-monitor"></i> Dashboard
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/teams">
              <i class="mdi mdi-account-multiple"></i>Teams
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/leaderboard">
              <i class="mdi mdi-trophy-variant-outline"></i>Leaderboard
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/courses" :event="''" class="disabled">
              <i class="mdi mdi-school"></i>Online Training
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/reviews" :event="''" class="disabled">
              <i class="mdi mdi-calendar"></i>Calendar
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/events" :event="''" class="disabled">
              <i class="mdi mdi-microphone"></i>Events
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/admin-dashboard">
              <i class="mdi mdi-monitor"></i>Admin
            </nuxt-link>
          </li>
        </ul>
        <!-- End navigation menu -->
      </div>
      <!-- end navigation -->
    </div>
    <!-- end container-fluid -->
  </div>
  <!-- end left-sidenav-->
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    }
  }
}
</script>

<style lang="scss" scoped></style>
