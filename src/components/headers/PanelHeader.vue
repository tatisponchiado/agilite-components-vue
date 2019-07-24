<template>
  <div class="panel-header">
    <div class="container h-100 d-flex align-items-center">
      <a href="javascript:;" @click="menuShow">
        <i class="fas fa-bars"></i>
      </a>
      <img src="@/assets/logo.png">
    </div>
  </div>
</template>
<script>
export default {
  name: "PanelHeader",
  methods: {
    menuShow () {
      document.body.classList.toggle('sidebar-visible')
    }
  }
}
</script>

