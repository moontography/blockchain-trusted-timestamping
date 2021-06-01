<template lang="pug">
  div.d-flex.justify-content-center
    input.input-block(
      :id="`hash-file-${_uid}`"
      type="file"
      @change="hashFile")
    button.btn.btn-primary(@click="triggerFile")
      | #[i.fas.fa-upload] Upload File to Hash
</template>

<script>
  import FileUtils from '../factories/FileUtils'

  export default {
    name: 'InputFileHash',

    methods: {
      triggerFile() {
        document.getElementById(`hash-file-${this._uid}`).click()
      },

      async hashFile(evt) {
        try {
          const file = evt.target.files[0]
          this.$emit('change', {
            name: file.name,
            size: file.size,
            hash: await FileUtils.sha256(file),
          })
        } catch (err) {
          this.$emit('error', err)
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  input[type='file'] {
    // visibility: hidden;
    display: none;
  }
</style>
