<template>
  <div class="card">
    <div class="card-body">
      <h4 class="header-title mt-0">add teams</h4>
      <p class="text-muted mb-4">
        Use the form below to add teams to the dashboard.
      </p>
      <form class="form-horizontal" method="post" @submit.prevent="addTeam">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" class="form-control" name="name" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="joined">Join Date</label>
              <input type="date" class="form-control" name="joined" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="city">City</label>
              <input type="text" class="form-control" name="city" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="State">State</label>
              <input type="text" class="form-control" name="state" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="phone">Phone</label>
              <input type="text" class="form-control" name="phone" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="website">Website</label>
              <input type="text" class="form-control" name="website" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="description">Short Description</label>
              <textarea
                class="form-control"
                rows="5"
                id="description"
                name="description"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 text-right">
            <button type="submit" class="btn btn-info px-5 py-2">
              Add Team
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import TeamsService from '@/services/TeamsService.js'

export default {
  methods: {
    setJoinDate(joinDate) {
      if (joinDate == '') {
        joinDate = new Date()
          .toISOString()
          .slice(0, 19)
          .replace('T', ' ')
      } else {
        joinDate = new Date(joinDate)
          .toISOString()
          .slice(0, 19)
          .replace('T', ' ')
      }
      return joinDate
    },
    addTeam(event) {
      let joined = this.setJoinDate(event.target.elements.joined.value)
      console.log(joined)
      TeamsService.addTeam(
        {
          title: event.target.elements.name.value,
          post_status: 'publish',
          fields: {
            city: event.target.elements.city.value,
            state: event.target.elements.state.value,
            phone: event.target.elements.phone.value,
            website: event.target.elements.website.value,
            description: event.target.elements.description.value,
            joined: joined
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
