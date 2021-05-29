<template lang="pug">
  div.card.rounded
    div.card-body.p-2
      small
        div(v-if="userAddress") {{ shortAddy }}
        div(v-else)
          button.btn.btn-sm.btn-primary.rounded(
            @click="reconnect") Connect to your Wallet
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'UserAddress',

    computed: {
      ...mapState({
        userAddress: (state) => state.web3.address,
      }),

      shortAddy() {
        const f3 = this.userAddress.slice(0, 4)
        const l3 = this.userAddress.slice(-5, -1)
        return `${f3}...${l3}`
      },
    },

    methods: {
      async reconnect() {
        await this.$store.dispatch('init', true)
      },
    },
  }
</script>
