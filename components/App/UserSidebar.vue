<template>
  <div class="sidebar-user media">
    <AvatarGenerator
      :name="loggedInUser.name"
      :avatarImage="loggedInUser.avatar_urls | avatarUrl"
      :size="64"
      :imageClasses="'img-thumbnail mb-1'"
    />
    <span class="online-icon">
      <i class="mdi mdi-record text-success"></i>
    </span>
    <div class="media-body">
      <h5 class="text-light">{{ loggedInUser.name }}</h5>
      <ul class="list-unstyled list-inline mb-0 mt-2">
        <li class="list-inline-item">
          <nuxt-link :to="'/users/' + loggedInUser.slug">
            <i class="mdi mdi-account text-light"></i>
          </nuxt-link>
        </li>
        <li class="list-inline-item">
          <a href="#" class>
            <i class="mdi mdi-settings text-light"></i>
          </a>
        </li>
        <li class="list-inline-item">
          <a @click="logout" href class>
            <i class="mdi mdi-power text-light"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AvatarGenerator from '@/components/AvatarGenerator.vue'

export default {
  components: {
    AvatarGenerator
  },
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
