
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
  // console.log('getDictionary')
  // console.log(p)
  return axios.get(`${getters.api}/words/scope/${p.scope}/lang1/${p.lang1}/lang2/${p.lang2}`)
    .then(response => {
      let data = response.data.filter((elem, index) => {
        if (!isNaN(p.index1) && !isNaN(p.index2)) {
          return p.index1 <= index && index <= p.index2
        }
        return true
      })

      commit('setDictionary', data)
      commit('setResult', 'OK')
    })
    .catch(error => {
      commit('setError', error)
    })
}

const getLessons = ({ commit, getters }, p) => {
  // console.log('getLessons')
  // console.log(p)
  return axios.get(`${getters.api}/ls/lang/${p.lang}`)
    .then(response => {
      commit('setLessons', response.data)
      commit('setResult', 'OK')
    })
    .catch(error => {
      commit('setError', error)
    })
}

const getCue = ({ commit, getters }, p) => {
  return axios.get(`${getters.api}/cue/file/${p.file}`)
    .then(response => {
      commit('setCue', response.data)
      commit('setResult', 'OK')
    })
    .catch(error => {
      commit('setCue', [])
      commit('setError', error)
    })
}

const saveResult = ({ commit, getters, rootGetters }, p) => {
  if (rootGetters['auth/isLogged']) {
    const user = rootGetters['auth/user']
    const results = JSON.stringify(getters.results)
    const data = {
      user: user.login,
      results,
      date: new Date()
    }

    return axios.post(`${getters.api}/user/results`, data)
      .then(response => {
        commit('setResult', 'OK')
        return true
      })
      .catch(error => {
        commit('setError', error)
        return false
      })
  } else {
    return false
  }
}

// TODO load results table
const loadResult = ({ commit, getters, rootGetters }, p) => {
  const user = rootGetters['auth/user']
  return axios.get(`${getters.api}/user/results/${user.login}`)
    .then(response => {
      commit('setResults', response.data)
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

  getDictionary,

  getLessons,

  getCue,
  saveResult,
  loadResult
  // getMnemonicRecommendation
}
