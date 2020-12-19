<template lang="pug">
  div#xlmfile.paper.container
    div.row.flex-center
      div.col
        img.no-border(
          alt="Vue logo"
          style="max-width: 200px;"
          src="./assets/logo.png")
    div.row.flex-center(v-if="error")
      div.col-12.md-8
        div.alert.alert-danger {{ error.stack }}
    div.row.flex-center(v-else-if="success")
      div.col-12.md-8
        div.alert.alert-success
          | Successfully sent file hash to blockchain!
          | #[a(:href="`https://stellar.expert/explorer/public/tx/${txn.id}`") Click here]
          | to review transaction: {{ txn.id }}
    div.row.flex-center
      div.col
        div.text-center(v-if="file.hash")
          table.no-border
            tbody
              tr
                td.text-right File:
                td.text-left
                  strong {{ file.name }}
              tr
                td.text-right
                  a(
                    href="https://en.wikipedia.org/wiki/SHA-2"
                    target="_blank"
                    rel="noopener noreferrer") SHA256 Hash (base64):
                td.text-left
                  strong {{ getMemoString }}
          button.btn-primary.btn-small(@click="resetFile") Reset File
        input(
          v-else
          type="file"
          @change="hashFile")
    div.row.flex-center
      div.col.col-fill
        secret-seed
    div.row.flex-center
      div.col
        button.btn-success(
          :disabled="!(xlmSecretSeed && file.hash)"
          @click="sendTxn") Send File Hash to Stellar Blockchain
</template>

<script lang="ts">
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import SecretSeed from './components/SecretSeed.vue'
  import FileUtils from './factories/FileUtils'
  import Xlm from './factories/Xlm'

  export default Vue.extend({
    name: 'XlmFile',

    data() {
      return {
        error: '',
        success: false,
        file: getEmptyFile(),
        txn: null,
      }
    },

    computed: {
      ...mapState({
        xlmSecretSeed: (state: any) => state.xlmSecretSeed,
      }),

      getMemoString() {
        if (!this.file.hash) return null
        return Xlm()
          .getStellarHash(this.file.hash)
          .value.toString('base64')
      },
    },

    methods: {
      resetFile() {
        this.file = getEmptyFile()
      },

      async hashFile(evt: Event) {
        try {
          const file: File = (evt.target as any).files[0]
          this.file = {
            name: file.name,
            hash: await FileUtils.sha256(file),
          }
        } catch (err) {
          this.error = err
        }
      },

      async sendTxn() {
        try {
          this.success = false
          if (!this.xlmSecretSeed)
            throw new Error(
              `You need to enter your XLM private key/secret in order to send a transaction.`
            )

          if (!this.file.hash)
            throw new Error(
              `Make sure you upload a file to send it's SHA256 hash to the blockchain.`
            )

          const transactor = Xlm(this.xlmSecretSeed)
          const txn = await transactor.txn(this.file.hash)
          this.txn = txn
          this.error = ''
          this.success = true
        } catch (err) {
          console.error(err)
          this.error = err
        }
      },
    },

    components: {
      SecretSeed,
    },
  })

  function getEmptyFile() {
    return {
      name: '',
      hash: '',
    }
  }
</script>

<style lang="scss">
  table {
    &.no-border {
      td {
        border: 0px !important;
      }
    }
  }
</style>
