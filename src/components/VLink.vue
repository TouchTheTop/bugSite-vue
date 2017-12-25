<template>
  <a
    v-bind:href="href"
    v-bind:class="[hrefnow==href?'active':'']"
    v-on:click="go"
  >

    <slot></slot>
  </a>
</template>

<script>
  import routes from '../router'

  export default {

    props: {
      href: {
        type:String,
        required: true
      }
    },
    data(){
      return {

        hrefnow:''
      }
    },
    updated(){
        this.hrefnow = this.$router.history.current.fullPath;
    },
    // watch: {
    //   isActive () {
    //     return this.href === this.$router.history.current.fullPath
    //   }
    // },
    methods: {
      go (event) {
        event.preventDefault()
        this.$root.currentRoute = this.href;
        this.$router.push({path:this.href});
          this.hrefnow = this.$router.history.current.fullPath;
        // console.log(this.$root.currentRoute);
        // window.history.pushState(
        //   null,
        //   routes[this.href],
        //   this.href
        // )
      }
    }
  }
</script>

<style scoped>
  .active {
    color:#af9016;
  }
</style>
