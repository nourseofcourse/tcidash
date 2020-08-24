<template>
  <div class="card">
    <div class="card-body">
      <h4 class="header-title mt-0">settings</h4>
      <p
        class="text-muted mb-4"
      >Update your teams settings by filling out the form below. Changes will not be made until you hit update.</p>
      <form class="form-horizontal" method="post" @submit.prevent="updateTeam">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="city">City</label>
              <input type="text" class="form-control" name="city" :value="team.acf.city" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="State">State</label>
              <input type="text" class="form-control" name="state" :value="team.acf.state" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="phone">Phone</label>
              <input type="text" class="form-control" name="phone" :value="team.acf.phone" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="website">Website</label>
              <input type="text" class="form-control" name="website" :value="team.acf.website" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="custom-file mb-4">
              <input type="file" class="custom-file-input" id="customFile" @change="updateImage" />
              <label class="custom-file-label" for="customFile">Choose Avatar</label>
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
                :value="team.acf.description"
              ></textarea>
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
import TeamsService from '@/services/TeamsService.js'

export default {
  props: {
    team: {
      type: Object,
      required: true
    }
  },
  methods: {
    updateTeam(event) {
      TeamsService.updateTeamData(
        this.team.id,
        {
          fields: {
            city: event.target.elements.city.value,
            state: event.target.elements.state.value,
            phone: event.target.elements.phone.value,
            website: event.target.elements.website.value,
            description: event.target.elements.description.value
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
    },
    updateImage(e) {
      const image = e.target.files[0]
      console.log(image)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
