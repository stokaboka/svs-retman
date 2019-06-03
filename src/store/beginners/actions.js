
import axios from 'axios'

const getSteps = ({ commit, getters, rootGetters }) => {
  commit('resetStepIndex')
  const api = rootGetters['app/api']
  return axios.get(`${api}/s`)
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

const getPhasesByStep = ({ commit, getters, rootGetters }, stepId) => {
  commit('resetPhaseIndex')
  const api = rootGetters['app/api']
  return axios.get(`${api}/ph/step/${stepId}`)
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

const prevStep = ({ commit, state }) => {
  if (state.stepIndex > 0) {
    commit('prevStep')
    commit('setStep', state.steps[state.stepIndex])
    return true
  }
  return false
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

const prevPhase = ({ commit, state }) => {
  if (state.phaseIndex > 0) {
    commit('prevPhase')
    commit('setPhase', state.phases[state.phaseIndex])
    return true
  }
  return false
}

const lastPhase = ({ commit, state }) => {
  commit('lastPhase')
  commit('setPhase', state.phases[state.phaseIndex])
}

const firstPhase = ({ commit, state }) => {
  commit('firstPhase')
  commit('setPhase', state.phases[state.phaseIndex])
}

const getDictionary = ({ commit, getters, rootGetters }, p) => {
  // console.log('getDictionary')
  // console.log(p)
  const api = rootGetters['app/api']
  return axios.get(`${api}/words/scope/${p.scope}/lang1/${p.lang1}/lang2/${p.lang2}`)
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

const getLessons = ({ commit, getters, rootGetters }, p) => {
  // console.log('getLessons')
  // console.log(p)
  const api = rootGetters['app/api']
  return axios.get(`${api}/ls/lang/${p.lang}`)
    .then(response => {
      commit('setLessons', response.data)
      commit('setResult', 'OK')
    })
    .catch(error => {
      commit('setError', error)
    })
}

const getAllLessons = ({ commit, getters, rootGetters }, p) => {
  const api = rootGetters['app/api']
  return axios.get(`${api}/ls`)
    .then(response => {
      commit('setResult', 'OK')
      return response.data
    })
    .catch(error => {
      commit('setError', error)
      return false
    })
}

const getCue = ({ commit, getters, rootGetters }, p) => {
  const api = rootGetters['app/api']
  return axios.get(`${api}/cue/file/${p.file}`)
    .then(response => {
      commit('setCue', response.data)
      commit('setResult', 'OK')
    })
    .catch(error => {
      commit('setCue', [])
      commit('setError', error)
    })
}

const saveResult = ({ commit, getters, rootGetters }, p = null) => {
  if (rootGetters['auth/isLogged']) {
    const user = rootGetters['auth/user']
    // const results = JSON.stringify(getters.results)
    const results = p ? JSON.stringify(p) : JSON.stringify(getters.results)
    const data = {
      user: user.login,
      // results: p,
      results,
      date: new Date()
    }
    const api = rootGetters['app/api']
    return axios.post(`${api}/user/result`, data)
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

const loadResult = ({ commit, getters, rootGetters }) => {
  const user = rootGetters['auth/user']
  const api = rootGetters['app/api']
  return axios.get(`${api}/user/result/${user.login}`)
    .then(response => {
      commit('setTesting', response.data)
      commit('setResult', 'OK')
      return true
    })
    .catch(error => {
      commit('setError', error)
      return false
    })
}

const loadUserResults = ({ commit, getters, rootGetters }, user) => {
  // const user = rootGetters['auth/user']
  const api = rootGetters['app/api']
  return axios.get(`${api}/user/results/${user.login}`)
    .then(response => {
      commit('setUserResults', response.data)
      commit('setResult', 'OK')
      return true
    })
    .catch(error => {
      commit('setError', error)
      return false
    })
}

const getMnemonicRecommendation = ({getters}, result) => {
  const rec = getters.mnemonicRecommendation.find((elem) => {
    return (elem.from <= result.remembered && result.remembered <= elem.to)
  })
  return rec
}

export {
  getSteps,
  getPhasesByStep,
  resetSteps,

  fixStep,
  nextStep,
  prevStep,
  gotoStep,

  fixPhase,
  nextPhase,
  prevPhase,
  firstPhase,
  lastPhase,

  getDictionary,

  getLessons,
  getAllLessons,

  getCue,
  saveResult,
  loadResult,
  loadUserResults,
  getMnemonicRecommendation
}
