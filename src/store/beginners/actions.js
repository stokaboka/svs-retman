
import axios from 'axios'

const getSteps = ({ commit, getters }) => {
  return axios.get(`${getters.api}/s`)
    .then(response => {
      commit('setSteps', response.data)
      commit('setStep', getters.steps[0])
      commit('setResult', 'OK')
    })
    .catch(error => {
      commit('setError', error)
    })
}

const resetSteps = ({ commit, getters }) => {
  commit('setSteps', getters.steps)
  commit('setStep', getters.steps[0])
  commit('resetStepIndex')
}

const getPhasesByStep = ({ commit, getters }, stepId) => {
  return axios.get(`${getters.api}/ph/step/${stepId}`)
    .then(response => {
      commit('setPhases', response.data)
      commit('setPhase', getters.phases[0])
      commit('setResult', 'OK')
    })
    .catch(error => {
      commit('setError', error)
    })
}

const fixStep = ({ commit }, result) => {
  commit('setStepResult', result)
}

const nextStep = ({ commit, state }) => {
  commit('nextStep')
  if (state.stepIndex < state.steps.length) {
    commit('setStep', state.steps[state.stepIndex])
  } else {
    commit('setStep', {complete: true})
  }
}

const fixPhase = ({ commit, state }, result) => {
  commit('setPhaseResult', result)
}

const nextPhase = ({ commit, state }) => {
  commit('nextPhase')
  if (state.phaseIndex < state.phases.length) {
    commit('setPhase', state.phases[state.phaseIndex])
  } else {
    commit('setPhase', {complete: true})
  }
}

const getDictionary = ({ commit, getters }, p) => {
  return axios.get(`${getters.api}/words/scope/${p.scope}/lang1/${p.lang1}/lang2/${p.lang2}`)
    .then(response => {
      commit('setDictionary', response.data)
      commit('setResult', 'OK')
    })
    .catch(error => {
      commit('setError', error)
    })
}

export {
  getSteps,
  getPhasesByStep,
  resetSteps,

  fixStep,
  nextStep,

  fixPhase,
  nextPhase,

  getDictionary
}
