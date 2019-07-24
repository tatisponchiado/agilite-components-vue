<template>
  <div v-if="isLoading > 0">
    <section class="wrapper dark">
      <!-- <div class="spinner">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div> -->

      <div class="loadingDog">
        <div class="img" :class="classeLoading"></div>
      </div>

      <div class="processando"> Processando . . .</div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'loading',
  data: function () {
    return {
      classeLoading: ""
    }
  },
  created: function () {
    let indexClassimage = Math.round(Math.random()*6);
    this.classeLoading = 'loadingDog-img-' + indexClassimage;
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading'
    })
  }
}
</script>

<style lang="scss" scoped>

</style>