<template>
  <div class="menu-item d-flex cetralize" :class="menuItem.class" @click="navegar(menuItem)">
    <div class="d-flex cetralize menu-item-text" v-if="menuItem.label">
      <div class="mr-2" v-if="menuItem.icone">
        <i :class="menuItem.icone"></i>   
      </div>
      <div>
        {{ menuItem.label }}
      </div>
    </div>
    <div v-if="menuItem.submenu">
      <i class="fas fa-arrow-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultiSidebarMenuItem',
  props: {
    menuItem: {
      type: Object,
      required: true
    }
  },
  methods: {
    navegar: function (menuItem) {
      this.$emit('menuClicked', menuItem)
    }
  }
}
</script>

