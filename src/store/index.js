import Vue from 'vue'
import Vuex from 'vuex'

import beginners from './beginners'
import user from './user'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      beginners,
      user
    },

    strict: process.env.NODE_ENV !== 'production'
  })

  return Store
}
