<template lang="pug">
  div#blockchain-file-timestamping
    div.row
      div.col-12.md-5
        div.sticky-card
          div.row.flex-center(v-if="error")
            div.col-12
              div.alert.alert-danger {{ error.stack }}
          div.row.flex-center(v-else-if="success")
            div.col-12
              div.alert.alert-success
                | Successfully sent file hash to blockchain!
                | #[a(target="_blank" :href="`https://stellar.expert/explorer/public/tx/${txn.id}`") Click here]
                | to review transaction: {{ txn.id }}
          div.row.flex-center
            div.col.col-fill
              div.form-group
                a(
                  href="https://github.com/moontography/blockchain-file-timestamping"
                  target="_blank"
                  rel="noopener noreferrer")
                    img.no-border(
                      alt="Github"
                      style="max-width: 40px; margin: 0px auto;"
                      src="./assets/github.png")
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
                          rel="noopener noreferrer") Hash:
                      td.text-left
                        strong {{ getMemoString }}
                button.btn-primary.btn-small(@click="resetFile") Upload Another File
              div(v-else)
                div.form-group
                  label(for="hash-file")
                    | Select the file you want to hash on the Stellar blockchain:
                  input#hash-file.input-block(
                    type="file"
                    @change="hashFile")
          div.row.flex-center
            div.col.col-fill
              secret-seed
          div.row.flex-center
            div.col
              div.alert.alert-primary(v-if="isLoading")
                | Creating transaction now, sit tight for a couple seconds...
              button.btn-success(
                v-else
                :disabled="!(xlmSecretSeed && file.hash)"
                @click="sendTxn")
                  div Send File Hash to Stellar Blockchain
                  div
                    small
                      small
                        | This will send ${{ usdToSend }} USD (~{{ getXlmThatWillBeSent }} XLM)
                        | from your account to ours to keep the lights on. Your file hash
                        | will be stored in that transaction in the memo.
      div.col-12.md-7
        div.paper.container.container-lg
          div.row.flex-center
            div.col
              img.no-border(
                alt="Vue logo"
                style="max-width: 200px; margin: 0px auto;"
                src="./assets/logo.png")
          div.row.flex-center
            div.col
              h2.text-center(style="margin: 0.5rem 0rem 1rem 0rem;") Blockchain File Timestamping
          div.row.flex-center
            div.col
              h4.m-0.text-center What is this?
          p
            | Store digital signatures of your files on the Stellar blockchain to be validated
            | at a later time for tamper proofing or other use cases.
          p
            | Blockchain was developed with some core
            | central properties (decentralization, transparency, and immutability) 
            | that make it attractive for certain use cases. 
            | These properties enable and empower transparent and secure financial systems in addition
            | to several creative use cases that are not particularly main stream today.
            | By understanding and utilizing things like #[a(href="https://en.wikipedia.org/wiki/SHA-2") SHA-2 hashing]
            | and transparency and immutability within the blockchain, it's possible to store 
            | digital signatures of information/data in order to
            | at a later time come back and validate with certainty that this
            | information was in fact true and existed at a particular snapshot in time.
          p
            | Why would this be valuable or important? Think of legal cases when
            | you want to authenticate a video, audio, or document existed at a particular
            | point in time. If the digital hash of this file existed in the blockchain
            | at the time alleged and we can take the current file, calculate it's digital
            | signature now and compare it to the blockchain's stored signature, we can
            | confirm there has been no tampering of that file since then.
          div.row
            div.col-12
              h3 FAQs
            div.col-12(v-for="faq in faqs")
              faq(
                :question="faq.question"
                :answer-html="faq.answerHtml")
</template>

<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import Faq from './components/Faq.vue'
  import SecretSeed from './components/SecretSeed.vue'
  import FileUtils from './factories/FileUtils'
  import Xlm, { getXlmPerUsdAmount } from './factories/Xlm'

  export default Vue.extend({
    name: 'BlockchainFileTimestamping',

    data() {
      return {
        error: '',
        success: false,
        file: getEmptyFile(),
        txn: null,
        getXlmThatWillBeSent: null,
        isLoading: false,
      }
    },

    computed: {
      ...mapState({
        xlmPublicKey: (state) => state.xlmPublicKey,
        xlmSecretSeed: (state) => state.xlmSecretSeed,
        usdToSend: (state) => state.usdToSend,
      }),

      faqs() {
        return [
          {
            question: 'How does this work?',
            answerHtml: `
            <p>
              The process is as follows:
              <ol>
                <li>
                  Add the file you want to store its signature on the blockchain. The process of
                  calculating its digital signature is done 100% on your computer and never leaves. If you
                  don't believe me, check your network tab, I promise I'm just trying to utilize the stellar
                  blockchain in a cool way, not steal your stuff.
                </li>
                <li>
                  Add the private key of an account on the Stellar blockchain that will be
                  used to create a transaction with the file data signature located in the memo
                  of the transaction. This account should have at least $${this.usdToSend}USD worth of XLM
                  in it in order to execute the transaction.
                </li>
                <li>
                  Process the transaction to the blockchain. The file signature is now perpetually
                  stored and can be validated against at any point in the future!
                </li>
              </ol>
            </p>
          `,
          },
          {
            question: 'Is there any cost associated with using this?',
            answerHtml: `
            <p>
              There is no cost if you want to put in a little effort
              to host blockchain-file-timestamping app yourself. You are welcome to fork and run locally or
              host it yourself online and use with your own public key target account and the
              only cost would be the associated transaction fees on the stellar network (which are VERY small).
              If you want to use this app hosted here (without hosting yourself) 
              we ask for $${this.usdToSend} (USD) per file hash stored on the blockchain. Therefore, the private key
              you enter to execute the transaction on the blockchain with the file hash in the memo
              should have $${this.usdToSend} USD worth of XLM in it in order for the transaction to execute.
            </p>
          `,
          },
          {
            question: 'What is a SHA256 Hash?',
            answerHtml: `
            <p>
              Imagine taking a piece of data (a text file,
              a video file, a word like 'grandpa', absolutely ANYTHING) and running it through a
              mathematical formula that outputs a string of constant length that "signs" that piece
              of data. If you've ever heard someone say that this is a "digital signature" that's
              what they mean. That's basically what a hash is, and there is such a large combination of
              strings that make up the total number of possible combinations that it becomes unwieldy
              and virtually impossible (but obviously not "technical" impossible) to take a piece of data
              and produce the same hash. The point is though that you can take your data/file and create
              a "signature" of it, and it will in all intents and purposes identify it without being able
              to reverse engineer it.
            </p>
          `,
          },
          {
            question: 'Is my private key/secret seed safe?',
            answerHtml: `
            <p>
              As long as your computer is secure, then yes.
              There are no servers associated with blockchain-file-timestamping and we use <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">local storage</a>
              to store your private key so you don't have to enter it every time you upload a file.
              For the non technical, this just means the key is stored on your computer file system,
              and is not stored anywhere on the internet.
            </p>`,
          },
          {
            question: `I still don't trust you, but I want to use this tool. What do I do?`,
            answerHtml: `
            <p>
              I don't blame you since I don't even trust myself half of the time. If
              you want to use this tool as a standalone utility feel free to fork it and
              enter your own public or private keys on your own machines in the tool. I'm not a hacker
              or a malicious person, just a dad of a 7 month old and 2 cats and a fan of the stellar blockchain :)
            </p>
          `,
          },
        ]
      },

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

      async hashFile(evt) {
        try {
          const file = evt.target.files[0]
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
          this.isLoading = true
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
          const txn = await transactor.txn(this.file.hash, this.xlmPublicKey)
          this.txn = txn
          this.error = ''
          this.success = true
        } catch (err) {
          console.error(err)
          this.error = err
        } finally {
          this.isLoading = false
        }
      },
    },

    async created() {
      this.getXlmThatWillBeSent = await getXlmPerUsdAmount(this.usdToSend)
    },

    components: {
      Faq,
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
  body {
    font-family: Arial, sans-serif !important;

    * {
      font-family: Arial, sans-serif !important;
    }
  }

  table {
    &.no-border {
      td {
        border: 0px !important;
      }
    }
  }

  .m-0 {
    margin: 0px !important;
  }

  @media (min-width: 992px) {
    .sticky-card {
      position: sticky;
      top: 0px;
    }
  }
</style>
