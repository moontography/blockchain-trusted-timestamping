<template lang="pug">
  div
    h4
      a.text-dark(
        style="cursor: pointer"
        data-toggle="collapse"
        :data-target="`#collapsible-${_uid}`") {{ question }}
    div.collapse(:id="`collapsible-${_uid}`")
      div.card
        div.card-body
          div(v-html="answerHtml")
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'Faq',
    props: {
      question: { type: String },
      answerHtml: { type: String },
    },
  })
</script>
