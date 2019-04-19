import axios from 'axios'

export default ({ Vue }) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  Vue.prototype.$axios = axios
}
