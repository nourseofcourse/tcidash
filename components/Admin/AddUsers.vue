<template>
  <div class="card">
    <div class="card-body">
      <h4 class="header-title mt-0">add users</h4>
      <p class="text-muted mb-4">Use the form below to add users to the dashboard.</p>
      <form class="form-horizontal" method="post" @submit.prevent="addUser">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="name">Name</label>
              <input
                type="text"
                class="form-control"
                name="display_name"
                v-on:keyup="createUsername"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="user_login">User Login</label>
              <input
                type="text"
                class="form-control"
                name="user_login"
                disabled
                :value="user_login"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="user_email">Email</label>
              <input type="email" class="form-control" name="user_email" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="user_nicename">Nicename</label>
              <input
                type="text"
                class="form-control"
                name="user_nicename"
                :value="user_login"
                disabled
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="team">Team</label>
              <select name="team" class="form-control">
                <option v-for="(team, index) in teams" :value="team.id">
                  {{
                  team.title.rendered
                  }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="user_pass">Password</label>
              <input
                type="password"
                class="form-control"
                name="user_pass"
                :value="user_pass"
                disabled
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 text-right">
            <button type="submit" class="btn btn-info px-5 py-2">Add User</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UserService from '@/services/UserService.js'

export default {
  data() {
    return {
      user_login: '',
      user_pass: 'progressive1'
    }
  },
  computed: {
    ...mapState({
      teams: state => state.teams.all
    })
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('teams/fetchTeams')
    } catch (e) {}
  },
  methods: {
    createUsername(e) {
      let name = e.target.value.split(' ')
      if (name.length == 2) {
        let initial = name[0].charAt(0)
        this.user_login = initial.concat(name[1]).toLowerCase()
      }
    },
    addUser(event) {
      UserService.addUser(
        {
          username: event.target.elements.user_login.value,
          password: this.user_pass,
          nickname: event.target.elements.user_nicename.value,
          email: event.target.elements.user_email.value,
          name: event.target.elements.display_name.value,
          roles: ['coordinator'],
          fields: {
            team: event.target.elements.team.value
          }
        },
        {
          headers: {
            Authorization: `${this.$store.$auth.getToken('local')}`
          }
        }
      )
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log('There was an error' + error.response)
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
