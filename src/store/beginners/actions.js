
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

const getPhasesByStep = ({ commit, state }, stepId) => {
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

const fixStep = ({ commit, state }, stepResult) => {

}

const nextStep = ({ commit, state }) => {
  commit('nextStep')
  if (state.stepIndex < state.steps.length) {
    commit('setStep', state.steps[state.stepIndex])
  } else {
    commit('setStep', {})
  }
}

const fixPhase = ({ commit, state }, phaseResult) => {

}

const nextPhase = ({ commit, state }) => {
  commit('nextPhase')
  if (state.phaseIndex < state.phases.length) {
    commit('setPhase', state.phases[state.phaseIndex])
  } else {
    commit('setPhase', {})
  }
}

export {
  getSteps,
  getPhasesByStep,

  fixStep,
  nextStep,

  fixPhase,
  nextPhase
}
