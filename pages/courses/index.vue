<template>
  <div class="page-content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body card-body--rocket text-center">{{ courses }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  head() {
    return {
      title: 'Courses'
    }
  },
  computed: {
    ...mapState({
      courses: state => state.courses.all
    })
  },
  async fetch({ store, error }) {
    try {
      let headers = {
        headers: {
          Authorization: `${this.$store.$auth.getToken('local')}`
        }
      }
      await store.dispatch('teams/fetchCourses', headers)
      //await store.dispatch('usersLoad')
    } catch (e) {
      // TODO: add better error handling later
    }
  }
}
</script>

<style lang="scss" scoped>
.card-body--rocket {
  padding: 40px;
  min-height: 700px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
.rocket {
  max-width: 400px;
  margin: 0 auto;
}
.rocket-header {
  font-weight: 900;
  font-size: 50px;
  line-height: 50px;
}
</style>

