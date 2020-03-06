<template>
  <div id="app" v-loading="loading">
      <router-view class="mainBox"></router-view>
  </div>
</template>

<script>
  // eslint-disable-next-line no-unused-vars
import HelloWorld from './components/HelloWorld.vue'
// eslint-disable-next-line no-unused-vars
import Main from "@/components/Main";
import 'element-ui/lib/theme-chalk/base.css';
  // collapse 展开折叠
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
  import Vue from 'vue'

  Vue.component(CollapseTransition.name, CollapseTransition)
export default {
  name: 'app',
  data() {
    return {
      loading: true,
        activeIndex2: '1'
    };
  },
  methods: {
  },
  created(){
    this.loading=false
      let name=''
      localStorage.setItem('name' , name)
  },
    destroyed(){
        localStorage.setItem('name' , '')
    },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Main,
    // eslint-disable-next-line vue/no-unused-components
    HelloWorld
  }
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
    .topbar{
        color: #44c1ff;
        margin-left: 20px;
    }
    .mainBox{
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
</style>
