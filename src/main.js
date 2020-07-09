import Vue from 'vue'
import App from './App.vue'
// import vuetify from './plugins/vuetify';
import './plugins/buefy'
import router from './router'
import store from './store'

const fb = require('./plugins/firebase');

Vue.config.productionTip = true;
// Vue.config.devtools = true;

import Nl2br from 'vue-nl2br'

import vSelect from "vue-select";

Vue.component("v-select", vSelect);

Vue.component('nl2br', Nl2br);

let app;
fb.auth.onAuthStateChanged(user => {
  !!user;
  if (!app) {
    app = new Vue({
      // vuetify,
      router,
      store,
      render: h => h(App)
    });
    app.$mount('#app');
    if (user) {
      store.commit('setCurrentUser', user);
      store.dispatch('fetchUserProfile');
    }
  }
});

// // handle page reload
// fb.auth.onAuthStateChanged(user => {
//   if (user) {
//     store.commit('setCurrentUser', user.user);
//     // store.dispatch('fetchUserProfile')
//   }
// })
//
// new Vue({
//   // vuetify,
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app');
