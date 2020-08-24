<template>
  <GridContainer type="fluid" include>
    <GridCol
      class="col-lg-4 col-md-6 col-sm-6 col-xs-12"
      v-for="(team, teamIndex) in teams"
      :key="teamIndex"
      :team="team"
      :teamIndex="teamIndex"
    >
      <div class="card text-center mb-3">
        <div class="card-body card-body--team">
          <AvatarGenerator :name="team.title.rendered" :avatarImage="team.acf.image" />
          <h4 class="card-title mt-2">
            <nuxt-link :to="'/teams/' + team.slug">{{ team.title.rendered }}</nuxt-link>
          </h4>
          <p class="text-muted" v-if="team.acf.description != ''">{{ team.acf.description }}</p>
          <p class="text-muted" v-if="team.joined != ''">
            <small class="text-muted">Joined in March 2019</small>
          </p>
        </div>
      </div>
    </GridCol>
  </GridContainer>
</template>

<script>
import { mapState } from 'vuex'
import AvatarGenerator from '@/components/AvatarGenerator.vue'
export default {
  name: 'Teams',
  head() {
    return {
      title: 'Teams'
    }
  },
  components: {
    AvatarGenerator
  },
  computed: {
    ...mapState({
      teams: state => state.teams.all,
      users: state => state.users.all
    })
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('teams/fetchTeams')
      await store.dispatch('usersLoad')
    } catch (e) {
      // TODO: add better error handling later
      error({
        statusCode: 503,
        message: 'Unable to fetch teams at this time. Please try again later'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
