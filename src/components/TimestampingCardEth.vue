<template lang="pug">
  div
    div.row.flex-center.mb-2
      div.col.col-fill
        div.form-group.d-flex.justify-content-center.mb-2
          img.img-fluid(
            style="max-width: 25%"
            src="../assets/bsc.png")
        div.text-center(v-if="file.hash")
          table.no-border.mx-auto
            tbody
              tr
                td.mb-2
                  strong {{ file.name }}
              tr
                td
                  div.d-flex.justify-content-center
                    div.alert.alert-success.mb-1
                      small {{ fileHashString }}
          button.btn.btn-primary.btn-sm(@click="resetFile") Upload Another File
        div(v-else)
          div.form-group
            label(for="hash-file")
              | Select the file you want to hash on the blockchain:
            div.d-flex.justify-content-center
              input#hash-file.input-block(
                type="file"
                @change="hashFile")
    div.row.flex-center
      div.col.d-flex.justify-content-center
        div.alert.alert-primary(v-if="isLoading")
          | Creating transaction now, sit tight for a couple seconds...
        button.btn(
          v-else
          :class="!file.hash ? 'btn-secondary' : 'btn-success'"
          :disabled="!file.hash"
          @click="sendTxn")
            div Store File Hash on Blockchain
</template>

<script>
  import { mapState } from 'vuex'
  import FileUtils from '../factories/FileUtils'
  import Xlm from '../factories/Xlm'

  export default {
    name: 'TimestampingCardEth',

    data() {
      return {
        success: false,
        file: getEmptyFile(),
        txn: null,
        getXlmThatWillBeSent: null,
        isLoading: false,
      }
    },

    computed: {
      ...mapState({
        isApproved: (state) => state.web3.isApproved,
      }),

      fileHashString() {
        if (!this.file.hash) return null
        return Xlm()
          .getStellarHash(this.file.hash)
          .value.toString('hex')
      },
    },

    methods: {
      resetFile() {
        this.file = getEmptyFile()
      },

      async hashFile(evt) {
        try {
          const file = evt.target.files[0]
          this.file = {
            name: file.name,
            size: file.size,
            hash: await FileUtils.sha256(file),
          }
        } catch (err) {
          this.$store.state('SET_GLOBAL_ERROR', err)
        }
      },

      async sendTxn() {
        try {
          await this.$store.dispatch('ethCheckApprovalStatusForTokenContract')
          if (!this.isApproved) {
            await this.$store.dispatch('ethApproveTokenContract')
          }

          // TODO; start loading
          await this.$store.dispatch('sendTxn', {
            hash: `0x${this.fileHashString}`,
            fileName: this.file.name,
            fileSize: this.file.size,
          })
          // TODO; reload hashes
          // TODO; stop loading
        } catch (err) {
          false
        }
      },
    },
  }

  function getEmptyFile() {
    return {
      name: '',
      hash: '',
      size: 0,
    }
  }
</script>
