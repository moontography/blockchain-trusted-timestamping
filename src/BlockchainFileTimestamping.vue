<template lang="pug">
  div#blockchain-file-timestamping
    main-navbar
    div.container.container-lg
      div.row
        div.col-12.col-lg-6.offset-lg-3.my-4
          div.alert.alert-danger(v-if="globalError")
            | {{ globalError.message }}
          div.card.border-0.bg-light.rounded
            div.card-body
              component(:is="blockchainHashComponent")
        div.col-12.table-reponsive.mt-4
          table.table.table-striped.table-bordered
            thead
              tr
                th Time
                th File
                th File Size
                th Hash
            tbody
              tr(v-if="!hashes || hashes.length === 0")
                td(colspan="100%")
                  i No hashes stored yet for your address...
              tr(v-else v-for="hash in parsedHashes")
                td {{ hash.time }}
                td {{ hash.fileName }}
                td {{ hash.fileSizeBytes }}
                td {{ hash.dataHash }}

        //- div.col-12
        //-   div.row.flex-center
        //-     div.col
        //-       img.no-border(
        //-         alt="Vue logo"
        //-         style="max-width: 200px; margin: 0px auto;"
        //-         src="./assets/logo.png")
        //-   div.row.flex-center
        //-     div.col
        //-       h2.text-center(style="margin: 0.5rem 0rem 1rem 0rem;") Blockchain File Timestamping
        //-   div.row.flex-center
        //-     div.col
        //-       h4.m-0.text-center What is this?
        //-   p
        //-     | Store digital signatures of your files on the Stellar blockchain to be validated
        //-     | at a later time for tamper proofing or other use cases.
        //-   p
        //-     | Blockchain was developed with some core
        //-     | central properties (decentralization, transparency, and immutability) 
        //-     | that make it attractive for certain use cases. 
        //-     | These properties enable and empower transparent and secure financial systems in addition
        //-     | to several creative use cases that are not particularly main stream today.
        //-     | By understanding and utilizing things like #[a(href="https://en.wikipedia.org/wiki/SHA-2") SHA-2 hashing]
        //-     | and transparency and immutability within the blockchain, it's possible to store 
        //-     | digital signatures of information/data in order to
        //-     | at a later time come back and validate with certainty that this
        //-     | information was in fact true and existed at a particular snapshot in time.
        //-   p
        //-     | Why would this be valuable or important? Think of legal cases when
        //-     | you want to authenticate a video, audio, or document existed at a particular
        //-     | point in time. If the digital hash of this file existed in the blockchain
        //-     | at the time alleged and we can take the current file, calculate it's digital
        //-     | signature now and compare it to the blockchain's stored signature, we can
        //-     | confirm there has been no tampering of that file since then.
        //-   div.row
        //-     div.col-12
        //-       h3 FAQs
        //-     all-faqs.col-12
</template>

<script>
  import Vue from 'vue'
  import dayjs from 'dayjs'
  import { mapState } from 'vuex'

  export default Vue.extend({
    name: 'BlockchainFileTimestamping',

    computed: {
      ...mapState({
        activeNetwork: (state) => state.activeNetwork,
        globalError: (state) => state.globalError,
        hashes: (state) => state.hashes,
      }),

      blockchainHashComponent() {
        return this.activeNetwork === 'xlm'
          ? 'timestamping-card-xlm'
          : 'timestamping-card-eth'
      },

      parsedHashes() {
        return (
          this.hashes &&
          this.hashes.map((h) => ({
            ...h,
            time: dayjs(Number(h.time) * 1e3).toISOString(),
          }))
        )
      },
    },

    async created() {
      await this.$store.dispatch('init')
    },
  })
</script>
