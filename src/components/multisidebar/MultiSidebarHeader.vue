<template>
  <div>
    <div class='d-flex ms-header'>
      <div class="d-flex ms-logo centralize">
        <a href="agilite.info">
          <img src="@/assets/logo.png">
        </a>
      </div> 
      <div class="close-menu">        
        <a href="javascript:;" @click="closeMenu">
          <i class="fas fa-times"></i>
        </a>
      </div>
    </div>
    <div class='ms-divider'></div>
  </div>
</template>

<script>
export default {
  name: 'MultiSidebarHeader',
  methods: {
    closeMenu: function () {
      document.body.classList.toggle('sidebar-visible')
    }
  }
}
</script>
