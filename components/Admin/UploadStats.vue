<template>
  <div class="card">
    <div class="card-body">
      <h4 class="header-title mt-0">upload stats</h4>
      <p class="text-muted mb-4">Use the form below to upload stats for an individual user.</p>
      <form class="form-horizontal" method="post" @submit.prevent="uploadStats">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="month">Sales Month</label>
              <select name="month" id="month" class="form-control" v-model="month">
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="coordinator">Coordinator</label>
              <select name="coordinator" class="form-control">
                <option
                  v-for="(user, index) in users"
                  :key="user.id"
                  :value="userid"
                >{{ user.name }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="consultations">Consultations</label>
              <input
                type="number"
                class="form-control"
                name="consultations"
                v-model="consultations"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="presented">Presented</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-dollar-sign"></i>
                  </span>
                </div>
                <input
                  type="number"
                  class="form-control"
                  name="presented"
                  v-model="presented"
                  @change="calculateCloseRate"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="presented">Actual</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-dollar-sign"></i>
                  </span>
                </div>
                <input
                  type="number"
                  class="form-control"
                  name="actual"
                  v-model="actual"
                  @change="calculateCloseRate"
                />
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="closeRate">Close Rate</label>
              <div class="input-group">
                <input
                  type="number"
                  class="form-control"
                  name="closeRate"
                  disabled
                  v-model="closeRate"
                />
                <div class="input-group-append">
                  <span class="input-group-text">
                    <i class="fas fa-percent"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 text-right">
            <button type="submit" class="btn btn-info px-5 py-2">Update</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import StatsService from '@/services/StatsService.js'

export default {
  data() {
    return {
      consultations: '',
      month: '',
      presented: '',
      actual: '',
      closeRate: ''
    }
  },
  computed: {
    ...mapState({
      users: store => store.users.all
    })
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('users/fetchUsers')
    } catch (e) {}
  },

  methods: {
    uploadStats(event) {
      StatsService.uploadStats(
        {
          user_id: event.target.elements.coordinator.value
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
    },
    calculateCloseRate() {
      if (this.actual != 0 && this.presented != 0) {
        this.closeRate = ((this.actual / this.presented) * 100).toFixed(2)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
