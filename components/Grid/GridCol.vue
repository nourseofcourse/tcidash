<template>
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    classes: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
