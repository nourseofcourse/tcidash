<template>
  <transition name="modal">
    <div class="modal" :class="{ show: open }">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <slot name="header">default header</slot>
            <button type="button" class="close" @click="$emit('close')">x</button>
          </div>

          <div class="modal-body">
            <slot name="body">default body</slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">default footer</slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  display: none;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 0;
}

// .modal-wrapper {
//   display: table-cell;
//   vertical-align: middle;
// }

// .modal-container {
//   width: 300px;
//   margin: 0px auto;
//   padding: 20px 30px;
//   background-color: #fff;
//   border-radius: 2px;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
//   transition: all 0.3s ease;
//   font-family: Helvetica, Arial, sans-serif;
// }

// .modal-header h3 {
//   margin-top: 0;
//   color: #42b983;
// }

// .modal-body {
//   margin: 20px 0;
// }

// .modal-default-button {
//   float: right;
// }

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
