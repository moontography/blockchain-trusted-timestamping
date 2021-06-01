<template lang="pug">
  div#blockchain-file-timestamping
    main-navbar
    div.container.container-lg
      div.row
        div.col-12.text-center
          button.btn.btn-secondary.btn-sm.mr-1(
            data-toggle="modal"
            data-target="#faq-modal") What is this?
          button.btn.btn-success.btn-sm(
            data-toggle="modal"
            data-target="#hash-list-modal") Show Your Hashes
        div.col-12.col-lg-6.offset-lg-3.my-4
          div.alert.alert-danger(v-if="globalError")
            | {{ globalError.message }}
          div.card.border-0.bg-light.rounded
            div.card-body
              component(:is="blockchainHashComponent")

      div.row.mt-4
        div.col-12.d-flex.justify-content-center
          a(
            href="https://github.com/moontography/blockchain-file-timestamping"
            target="_blank"
            rel="noopener noreferrer")
              img.img-fluid(
                alt="Github"
                style="max-width: 40px; margin: 0px auto;"
                src="./assets/github.png")

    faq-modal#faq-modal
    hash-list-modal#hash-list-modal
</template>

<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'

  export default Vue.extend({
    name: 'BlockchainFileTimestamping',

    computed: {
      ...mapState({
        activeNetwork: (state) => state.activeNetwork,
        globalError: (state) => state.globalError,
      }),

      blockchainHashComponent() {
        return this.activeNetwork === 'xlm'
          ? 'timestamping-card-xlm'
          : 'timestamping-card-eth'
      },
    },

    async created() {
      await this.$store.dispatch('init')
    },
  })
</script>
