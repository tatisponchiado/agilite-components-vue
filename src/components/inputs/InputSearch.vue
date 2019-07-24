<template>
  <div class="input-group input-group-custom m-input-search-wr mr-1">
    <input
      type="text"
      class="form-control m-input-search"
      :placeholder="placeholder"
      @keyup="autosearchExec"
      @keyup.enter="search"
      v-model="searchTerm"
    >
    <div class="input-group-prepend">
      <div class="input-group-text click" @click="clear" v-show="searchTerm && autosearch">
        <i class="fas fa-times-circle"></i>
      </div>
      <div class="input-group-text click" @click="search">
        <i class="fas fa-search"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "InputSearch",
  props: {
    placeholder: {
      type: String,
      default: "Buscar..."
    },
    value: {
      type: String
    },
    autosearch: {
      type: Boolean,
      value: true
    }
  },
  data: function() {
    return {
      searchTerm: this.value,
      timer: null
    };
  },
  methods: {
    clear: function(cancelResearch) {
      this.searchTerm = null
      if (cancelResearch) {
        return
      }
      this.search();
    },
    autosearchExec: function () {
      if (!this.autosearch) return
      this.search()
    },
    search: function() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.$emit("onSearch", this.searchTerm);
      }, 300);
    }
  }
};
</script>

