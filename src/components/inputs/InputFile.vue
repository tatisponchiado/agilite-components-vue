<template>
  <div class="input-group">
    <div class="input-group-prepend" v-if="prepend">
      <span class="input-group-text">{{ prepend }}</span>
    </div>
      <div class="custom-file">
        <input
        type="file"
        ref="fileInput"
        class="custom-file-input"
        @change="fileChange"
        :accept="accept"
        lang="pt"
      >
      <label class="custom-file-label" for="inputGroupFile01">{{ fileName }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputFile',
  props:{
    accept: {
      type: String
    },
    prepend: {
      type: String
    },
    label: {
      type: String
    }
  },
  data: function () {
    return {
      file: null
    }
  },
  methods: {
    fileChange: function () {
      this.file = this.$refs.fileInput.files[0];
      this.$emit('onFileChange', this.file)
    }
  },
  computed: {
    fileName: function() {
      if (!this.file) {
        return this.label || 'Selecione o arquivo';
      } else {
        return this.file.name;
      }
    }
  }
}
</script>

