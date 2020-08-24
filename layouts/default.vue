<template>
  <div>
    <TopBar />
    <AppHeader />
    <div class="page-wrapper">
      <div class="page-wrapper-inner">
        <NavBar />
      </div>
      <Transition name="screen-fade" mode="out-in" appear>
        <div class="page-content">
          <nuxt />
        </div>
      </Transition>
      <AppFooter />
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/App/AppHeader.vue'
import AppFooter from '@/components/App/AppFooter.vue'
import TopBar from '@/components/App/TopBar.vue'
import NavBar from '@/components/App/NavBar.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
    TopBar,
    NavBar
  },
  head() {
    return {
      titleTemplate: '%s - The Closing Institute',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Learn dental marketing strategies to close large dental implant cases. Sign in here!'
        }
      ]
    }
  }
}
</script>
<style lang="scss">
.screen-fade-enter-active,
.screen-fade-leave-active {
  transition: opacity 250ms ease;
}
.screen-fade-enter,
.screen-fade-leave-to {
  opacity: 0;
}
</style>
