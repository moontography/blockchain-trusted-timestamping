<template lang="pug">
  div.form-group
    label(:for="`secret-seed-${_uid}`")
      | Stellar Private Key/Secret
      sup
        a.margin-left-small.text-primary(
          href="https://developers.stellar.org/docs/tutorials/create-account/#create-a-keypair"
          target="_blank"
          rel="noopener noreferrer") (i)
    input.input-block(
      :id="`secret-seed-${_uid}`"
      type="text"
      v-model="xlmSeed")
</template>

<script lang="ts">
  import Vue from 'vue'
  // import { mapState } from 'vuex'

  export default Vue.extend({
    name: 'SecretSeed',

    computed: {
      xlmSeed: {
        get() {
          return this.$store.state.xlmSecretSeed
        },

        set(newSeed) {
          console.log('GOTHERE', newSeed)
          this.$store.commit('SET_SECRET_SEED', newSeed)
          localStorage.xlmSeed = newSeed
        },
      },
    },
  })
</script>
