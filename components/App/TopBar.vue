<template>
  <!-- Top Bar Start -->
  <div class="topbar">
    <!-- Navbar -->
    <nav class="navbar-custom">
      <!-- LOGO -->
      <div class="topbar-left">
        <nuxt-link class="logo" to="/">
          <span>
            <img src="/tci-logo.png" alt="logo-small" class="logo-sm" />
          </span>
        </nuxt-link>
      </div>
      <ul class="list-unstyled topbar-nav float-right mb-0">
        <li
          class="dropdown"
          @click="toggleDropdown"
          v-on-clickaway="close"
          :class="{ show: isActive }"
          ref="dropdownMenu"
        >
          <a
            class="nav-link dropdown-toggle waves-effect waves-light nav-user"
            data-toggle="dropdown"
            href="#"
            role="button"
          >
            <AvatarGenerator
              :name="loggedInUser.name"
              :avatarImage="loggedInUser.avatar_urls | avatarUrl"
              :size="32"
            />
            <span class="ml-1 nav-user-name hidden-sm">
              <i class="mdi mdi-chevron-down"></i>
            </span>
          </a>
          <div class="dropdown-menu dropdown-menu-right" :class="{ show: isActive }">
            <a class="dropdown-item" href="#">
              <i class="dripicons-user text-muted mr-2"></i> Profile
            </a>
            <a class="dropdown-item" href="#">
              <i class="dripicons-gear text-muted mr-2"></i> Settings
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" @click="logout" href>
              <i class="dripicons-exit text-muted mr-2"></i> Logout
            </a>
          </div>
        </li>
        <li class="menu-item">
          <!-- Mobile menu toggle-->
          <a class="navbar-toggle nav-link" id="mobileToggle">
            <div class="lines">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </a>
          <!-- End mobile menu toggle-->
        </li>
      </ul>
    </nav>
    <!-- end navbar-->
  </div>
  <!-- Top Bar End -->
</template>

<script>
import { mapGetters } from 'vuex'
import AvatarGenerator from '@/components/AvatarGenerator.vue'
import { mixin as clickaway } from 'vue-clickaway'

export default {
  components: {
    AvatarGenerator
  },
  data() {
    return {
      isActive: false
    }
  },
  mixins: [clickaway],
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  filters: {
    avatarUrl(value) {
      return value[Object.keys(value)[2]]
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
    toggleDropdown() {
      this.isActive = !this.isActive
    },
    close() {
      this.isActive = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
