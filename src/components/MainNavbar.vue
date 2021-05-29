<template lang="pug">
  nav.navbar.navbar-expand-lg.navbar-light
    a.navbar-brand(href='/')
      img.img-fluid(src="../assets/logo.png")
    button.navbar-toggler(
      type='button'
      data-toggle='collapse'
      data-target='#timestamping-navbar-content'
      aria-controls='timestamping-navbar-content'
      aria-expanded='false'
      aria-label='Toggle navigation')
        span.navbar-toggler-icon
    #timestamping-navbar-content.collapse.navbar-collapse
      div.mr-auto
      //- ul.navbar-nav.mr-auto
      //-   li.nav-item.active
      //-     a.nav-link(href='#')
      //-       | Home 
      //-       span.sr-only (current)
      //-   li.nav-item
      //-     a.nav-link(href='#') Link
      //-   li.nav-item.dropdown
      //-     a#navbarDropdown.nav-link.dropdown-toggle(href='#' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false')
      //-       | Dropdown
      //-     .dropdown-menu(aria-labelledby='navbarDropdown')
      //-       a.dropdown-item(href='#') Action
      //-       a.dropdown-item(href='#') Another action
      //-       .dropdown-divider
      //-       a.dropdown-item(href='#') Something else here
      //-   li.nav-item
      //-     a.nav-link.disabled(href='#') Disabled
      //- form.form-inline.my-2.my-lg-0
      //-   input.form-control.mr-sm-2(type='search' placeholder='Search' aria-label='Search')
      //-   button.btn.btn-outline-success.my-2.my-sm-0(type='submit') Search
      ul.navbar-nav
        li.nav-item
          a.nav-link(
            href="https://github.com/moontography/blockchain-file-timestamping"
            target="_blank"
            rel="noopener noreferrer")
              img.img-fluid(
                alt="Github"
                style="max-width: 40px; margin: 0px auto;"
                src="../assets/github.png")
      user-address

</template>

<script lang="ts">
  //   import Vue from 'vue'

  //   export default Vue.extend({
  //     name: 'Faq',
  //     props: {
  //       question: { type: String },
  //       answerHtml: { type: String },
  //     },
  //   })
  //
</script>

<style scoped lang="scss">
  img {
    max-height: 30px;
  }
</style>
