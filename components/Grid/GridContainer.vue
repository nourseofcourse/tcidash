<template>
  <component :is="tag" :class="getClass">
    <GridRow v-if="include">
      <slot />
    </GridRow>
    <slot v-else />
  </component>
</template>

<script>
export default {
  name: 'GridContainer',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    type: {
      type: String,
      default: ''
    },
    include: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      class: 'container'
    }
  },
  computed: {
    getClass() {
      if (this.type == 'fluid') {
        this.class = 'container-fluid'
      }
      return this.class
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
