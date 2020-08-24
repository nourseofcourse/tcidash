<template>
  <avatar
    :username="name"
    :size="size"
    color="#fff"
    :inline="true"
    :src="avatarImage && avatarImage != defaultAvatar ? avatarImage : ''"
    :class="imageClasses"
  ></avatar>
</template>

<script>
import Avatar from 'vue-avatar'
export default {
  data() {
    return {
      defaultAvatar:
        'https://members.theclosinginstitute.com/wp-content/plugins/wp-user-avatar/images/wpua-96x96.png'
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 90
    },
    avatarImage: {
      required: false
    },
    imageClasses: {
      type: String,
      required: false
    }
  },
  components: {
    Avatar
  }
}
</script>

<style lang="scss" scoped>
</style>
