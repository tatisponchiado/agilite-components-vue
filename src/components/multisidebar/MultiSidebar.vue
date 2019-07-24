<template>
  <nav class='ms'>
    <multi-sidebar-header v-if="!inDesktop()"/>
    <multi-sidebar-empresa />
    <multi-sidebar-menu-itens :itens="itens"/>
  </nav>
</template>

<script>
import MultiSidebarEmpresa from './MultiSidebarEmpresa.vue'
import MultiSidebarHeader from './MultiSidebarHeader.vue'
import MultiSidebarMenuItens from './MultiSidebarMenuItens.vue'
import { isDesktop } from '@/agilite-components-vue'
export default {
  name: 'MultiSidebar',
  components: {
    MultiSidebarEmpresa,
    MultiSidebarMenuItens,
    MultiSidebarHeader
  },
  props: {
    itens: {
      type: Array,
      required: true
    }
  },
  methods: {
    inDesktop: function () {
      return isDesktop()
    }
  }
}
</script>
