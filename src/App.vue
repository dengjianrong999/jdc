<template>
  <div id="app">
    <fs-head v-if="!iframe"></fs-head>
    <keep-alive>
       <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import fsHead from "./components/Head";
export default {
  name: "App",
  data(){
    return {
      iframe:null
    }
  },
  created(){
    this.iframe = window.frameElement;
    console.log(window.frameElement)
  },
  components:{
    fsHead
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}

</style>
