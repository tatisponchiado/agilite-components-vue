<template>
  <div>
    <div class='d-flex centralize ms-empresa'> 
      <div class='ms-empresa-logo text-center '>
        <img src="~@/agilite-components-vue/src/assets/default-logo.jpg" alt="Responsive image">
      </div>
      <div class="ms-empresa-name d-flex">
        <div class='empresa-name'>
          Marijoias
        </div>
        <div class="ms-troca-empresa">        
          <a href="">
            <i class="fas fa-angle-down"></i>
          </a>
        </div>
      </div>
      <div class="close-menu" @click="closeMenu" v-if="inDesktop()">        
        <a href="javascript:;">
          <i class="fas fa-times"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { isDesktop } from '@/agilite-components-vue'
export default {
  name: 'MultiSidebarEmpresa',
  methods: {
    closeMenu: function () {
      document.body.classList.toggle('sidebar-visible')
    },
    inDesktop: function () {
      return isDesktop()
    }
  }
}
</script>
