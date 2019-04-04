import Vue from 'vue'
import Vuex from 'vuex'

import beginners from './beginners'
import user from './user'
import auth from './auth'
import editor from './editor'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

const store = new Vuex.Store({
  modules: {
    beginners,
    user,
    auth,
    editor
  },

  strict: process.env.NODE_ENV !== 'production'
})

export default store
