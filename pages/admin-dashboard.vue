<template>
  <GridContainer type="fluid" include>
    <GridCol class="col-lg-3">
      <div class="card">
        <div class="card-body profile-nav">
          <div class="nav flex-column nav-pills" id="profile-tab" aria-orientation="vertical">
            <a
              v-for="(tab, index) in tabs"
              :key="index"
              @click="selected = tab.component"
              :class="{ active: selected == tab.component }"
              class="nav-link"
              aria-selected="true"
            >{{ tab.name }}</a>
          </div>
        </div>
        <!--end card-body-->
      </div>
    </GridCol>
    <GridCol class="col-lg-9">
      <Transition name="screen-fade" mode="out-in" appear>
        <component :is="selected"></component>
      </Transition>
    </GridCol>
  </GridContainer>
</template>

<script>
import UploadStats from '@/components/Admin/UploadStats.vue'
import AddUsers from '@/components/Admin/AddUsers.vue'
import AddTeams from '@/components/Admin/AddTeams.vue'

export default {
  name: 'admin',
  head() {
    return {
      title: 'Admin'
    }
  },
  data() {
    return {
      tabs: [
        {
          name: 'Upload Stats',
          component: 'UploadStats'
        },
        {
          name: 'Add Users',
          component: 'AddUsers'
        },
        {
          name: 'Add Teams',
          component: 'AddTeams'
        }
      ],
      selected: 'UploadStats'
    }
  },
  components: {
    UploadStats,
    AddTeams,
    AddUsers
  }
}
</script>

<style lang="scss" scoped></style>
