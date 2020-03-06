<template>
  <div class="home">
    <main></main>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'
  import Main from "@/components/Main";
  export default {
  name: 'home',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    HelloWorld,
    // eslint-disable-next-line no-undef,vue/no-unused-components
    Main
  }
}
</script>
