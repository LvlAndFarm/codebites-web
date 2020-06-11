import Vue from 'vue'
import Vuex from 'vuex'
import {currentUser} from "../plugins/firebase";

const fb = require("../plugins/firebase");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listings: [
      // {
      //   title: "Looking for an editor to adjust the background format of 8 pixel art images.",
      //   price: "30",
      //   tags: ["React", "Express", "Firebase"],
      //   description: "As the title says I’m looking to simply make the transparent background of 8 pixel art images fit perfectly around the images.\n" +
      //       "\n" +
      //       "                            Bid and Pm if interested.",
      //   user_id: "4KcLuqciWnd8jpFztIqy1SS9MR62"
      // },
      // {
      //   title: "I need someone to make minor (very minor!) CSS edits to my Shopify theme that I can't figure out",
      //   price: "50",
      //   tags: ["Shopify", "CSS", "CMS", "eCommerce"],
      //   description: "Title. Here are the changes I need made:\n" +
      //       "\n" +
      //       "fix the line height on some text that is currently overlapping\n" +
      //       "\n" +
      //       "change vertical alignment of a text box to be different depending on desktop/mobile\n" +
      //       "\n" +
      //       "make some currently rounded buttons not round\n" +
      //       "\n" +
      //       "Bonus $5 payment if you can also do this:\n" +
      //       "\n" +
      //       "I have a Captcha page that comes after users enter their email. I'd like to replace it with a thank you message + discount code for one email collection location, but simply delete the Captcha page for the other locations on my website that emails are collected."
      // },
      // {
      //   title: "Looking for an editor to adjust the background format of 8 pixel art images.",
      //   price: "30",
      //   tags: ["React", "Express", "Firebase"],
      //   description: "As the title says I’m looking to simply make the transparent background of 8 pixel art images fit perfectly around the images.\n" +
      //       "\n" +
      //       "                            Bid and Pm if interested."
      // }
    ],
    currentUser: null,
    userProfile: {},

    // Page loading overlay status
    isLoading: false
  },

  getters: {
    currentUser() {
      return currentUser;
    }
  },

  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
      console.log("SET CURRENT USER");
      console.log(val);
    },
    setUserProfile(state, val) {
      state.userProfile = val
    },
    userLogout(state) {
      state.userProfile = {};
      state.currentUser = null;
    },

    setLoading(state, val) {
      state.isLoading = val;
    },

    setListings(state, val) {
      state.listings = val;
    },
  },
  actions: {
    fetchUserProfile({ commit, state }) {
      console.log("FETCHING USER PROFILE");
      fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
        console.log("res", res);
        commit('setUserProfile', res.data())
      }).catch(err => {
        console.log(err)
      })
    },

    async fetchListings({ commit }) {
      console.log("FETCHING LISTINGS");
      let snap = await fb.listingsCollection.get();
      let listings = snap.docs.map(doc => doc.data());
      commit('setListings', listings);
    },

    async userLogout({ commit, state }) {
      if (state.currentUser) {
        await fb.auth.signOut();
      }
      commit('userLogout');
    },

    setLoading({commit}, loadingState) {
      commit('setLoading', loadingState);
    }
  },
  modules: {
  }
})
