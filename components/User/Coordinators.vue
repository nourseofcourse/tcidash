<template>
  <div class="row">
    <div
      class="col-md-6"
      v-for="(user, userIndex) in getTeamCoordinators( team.id )"
      :key="userIndex"
      :user="user"
      :teamIndex="userIndex"
    >
      <div class="card text-center mb-3">
        <div class="card-body">
          <AvatarGenerator :name="user.name" :avatarImage="user.avatar_urls | avatarUrl" />
          <h4 class="card-title mt-2">
            <nuxt-link :to="'/users/' + user.slug">{{ user.name }}</nuxt-link>
          </h4>
          <p class="text-muted" v-if="user.description != ''">{{ user.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AvatarGenerator from '@/components/AvatarGenerator.vue'

export default {
  props: {
    team: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['getTeamCoordinators'])
  },
  filters: {
    avatarUrl(value) {
      return value[Object.keys(value)[2]]
    }
  },
  components: {
    AvatarGenerator
  }
}
</script>

<style lang="scss" scoped>
</style>
