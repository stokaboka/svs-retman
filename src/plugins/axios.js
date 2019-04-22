import axios from 'axios'

export default ({ app, router, store, Vue }) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  axios.interceptors.response.use((response) => {
    if (response.status === 401 || response.status === 403) {
      store.commit('auth/SET_TOKEN', '')
      store.commit('auth/SET_USER', null)
      store.commit('auth/SET_OFFER', true)
      router.push({ name: 'home' })
    }
    return response
  }, (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      store.commit('auth/SET_TOKEN', '')
      store.commit('auth/SET_USER', null)
      store.commit('auth/SET_OFFER', true)
      router.push({ name: 'home' })
    }
    return Promise.reject(error)
  })

  Vue.prototype.$axios = axios
}
