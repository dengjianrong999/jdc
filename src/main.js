// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'  //状态管理

import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.min.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
// /axios配置/
import axios from 'axios'
Vue.prototype.$http = axios,
// Vue.prototype.baseurl = 'http://192.168.4.20:8080/bjsy-jdc/jdc/',
// Vue.prototype.baseurl = 'http://192.168.3.209:8080/bjsy-jdc/jdc/',
// Vue.prototype.baseurl = 'http://183.6.158.26:8090/bjsy-jdc/jdc/',
// Vue.prototype.baseurl = 'http://124.42.41.43:9001/bjsy-jdc/jdc/',
Vue.prototype.baseurl = 'http://117.121.97.120:9001/bjsy-jdc/jdc/',
axios.defaults.withCredentials = true ,
Vue.config.productionTip = false,
//过滤时间
Vue.filter('slice', function(value) {
  return value.slice(0,10);
});
//过滤经纬度
Vue.filter('postion', function(value) {
  return value.toFixed(2)
});

/* eslint-disable no-new */
 new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
