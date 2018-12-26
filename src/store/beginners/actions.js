
import axios from 'axios'

const getSteps = ({ commit, state }) => {
  return axios.get(`${state.api}/s`)
    .then(response => {
      commit('setSteps', response.data)
      commit('setStep', response.data[0])
      commit('setResult', 'OK')
    })
    .catch(error => {
      commit('setError', error)
    })
}

const getPhaseByStep = ({ commit, state }, stepId) => {
  return axios.get(`${state.api}/ph/step/${stepId}`)
    .then(response => {
      commit('setPhases', response.data)
      commit('setPhase', response.data[0])
      commit('setResult', 'OK')
    })
    .catch(error => {
      commit('setError', error)
    })
}

export {
  getSteps,
  getPhaseByStep
}
