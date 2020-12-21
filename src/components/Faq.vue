<template lang="pug">
  div.collapsible
    input(
      type="checkbox"
      :id="`collapsible-${_uid}`"
      name="collapsible")
    label(:for="`collapsible-${_uid}`") {{ question }}
    div.collapsible-body(v-html="answerHtml")
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
