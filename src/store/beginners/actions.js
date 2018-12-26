
import axios from 'axios'

const getSteps = ({ commit, state }) => {
  return axios.get(`${state.api}/s`)
    .then(response => {
      commit('setSteps', response)
      commit('setResult', 'OK')
    })
    .catch(error => {
      commit('setError', error)
    })
}

export {getSteps}
