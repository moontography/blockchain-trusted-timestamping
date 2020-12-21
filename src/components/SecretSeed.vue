<template lang="pug">
  div.form-group
    label(:for="`secret-seed-${_uid}`")
      | Stellar Private Key/Secret
      sup
        a.margin-left-small.text-primary(
          href="https://developers.stellar.org/docs/tutorials/create-account/#create-a-keypair"
          target="_blank"
          rel="noopener noreferrer") (i)
    div.row
      div.col-11
        input.input-block(
          :id="`secret-seed-${_uid}`"
          :type="inputType"
          v-model="xlmSeed")
      div.col-1.text-center
        a(style="cursor:pointer" @click="toggleType") (show)
</template>

<script lang="ts">
  import Vue from 'vue'
  // import { mapState } from 'vuex'

  export default Vue.extend({
    name: 'SecretSeed',

    data() {
      return {
        inputType: 'password',
      }
    },

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

    methods: {
      toggleType() {
        this.inputType = this.inputType === 'text' ? 'password' : 'text'
      },
    },
  })
</script>
