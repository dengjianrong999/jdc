import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        data:{},
        isFresh: false
    },
    mutations: {
        data:state=>state.data  
    }
})
