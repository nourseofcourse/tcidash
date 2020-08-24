<template>
  <div>
    <div class="page-wrapper">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      titleTemplate: '%s - The Closing Institute',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Sign in to The Closing Institute by Progressive Dental Marketing. Learn dental marketing strategies to close large dental implant cases. Sign in here!'
        }
      ]
    }
  }
}
</script>
<style>
</style>
