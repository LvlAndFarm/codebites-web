import Vue from 'vue'
import App from './App.vue'
// import vuetify from './plugins/vuetify';
import './plugins/buefy'
import router from './router'
import store from './store'

const fb = require('./plugins/firebase');

Vue.config.productionTip = false;

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
