<template>
  <div class='dropdown' v-click-out="hide">
    <div class='dropdown-button' @click="toggle">
      <slot name='content'></slot>
    </div>
    <div :class="classList" aria-labelledby="dropdownMenuButton">
      <slot name='menu'></slot>
    </div>
  </div>
</template>
<script>
import { toggle, remove } from '../utils/ArrayUtils'
export default {
  name: 'dropdown',
  data: function () {
    return {
      classList: ['dropdown-menu dropdown-menu-right arrow-top-right']
    }
  },
  watch: {
    '$route': function () {
      this.hide()
    }
  },
  methods: {
    hide: function () {
      remove(this.classList, 'show')
    },
    toggle: function () {
      toggle(this.classList, 'show')
    }
  }
}
</script>
