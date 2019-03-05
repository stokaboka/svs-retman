
import axios from 'axios'

const getSteps = ({ commit, getters }) => {
  commit('resetStepIndex')
  return axios.get(`${getters.api}/s`)
    .then(response => {
      commit('setSteps', response.data)
      commit('setStep', getters.steps[getters.stepIndex])
      commit('setResult', 'OK')
    })
    .catch(error => {
      commit('setError', error)
    })
}

const resetSteps = ({ commit, getters }) => {
  commit('resetStepIndex')
  commit('setStep', getters.steps[getters.stepIndex])

  commit('resetPhaseIndex')
  commit('setPhases', [{sounds: '', scope: ''}])
  commit('setPhase', getters.phases[getters.phaseIndex])
}

const getPhasesByStep = ({ commit, getters }, stepId) => {
  commit('resetPhaseIndex')
  return axios.get(`${getters.api}/ph/step/${stepId}`)
    .then(response => {
      commit('setPhases', response.data)
      commit('setPhase', getters.phases[getters.phaseIndex])
      commit('setResult', 'OK')
    })
    .catch(error => {
      commit('setError', error)
    })
}

const fixStep = ({ commit, getters }, result) => {
  commit('setStepResult', result)
  // if (getters.step.id === 4) {
  //   commit('setLearningLang', result.langResult)
  // }
}

const nextStep = ({ commit, state }) => {
  commit('nextStep')
  if (state.stepIndex < state.steps.length) {
    commit('setStep', state.steps[state.stepIndex])
  } else {
    commit('setStep', {complete: true})
  }
}

const gotoStep = ({ commit, state }, stepIndex) => {
  commit('setStepIndex', stepIndex)
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
  console.log('getDictionary')
  console.log(p)
  return axios.get(`${getters.api}/words/scope/${p.scope}/lang1/${p.lang1}/lang2/${p.lang2}`)
    .then(response => {
      commit('setDictionary', response.data)
      commit('setResult', 'OK')
    })
    .catch(error => {
      commit('setError', error)
    })
}

// const getMnemonicRecommendation = ({getters}, result) => {
//   const rec = getters.mnemonicRecommendation.find((elem) => {
//     return (elem.from <= result.remembered && result.remembered <= elem.to)
//   })
//   return rec
// }

export {
  getSteps,
  getPhasesByStep,
  resetSteps,

  fixStep,
  nextStep,
  gotoStep,

  fixPhase,
  nextPhase,

  getDictionary

  // getMnemonicRecommendation
}
