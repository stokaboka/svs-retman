const stepsComponents = {}

const initSounds = (values) => {
  return values ? values.split('#') : []
}

const scopeFields = {
  lang1: 0,
  lang2: 1,
  scope: 2,
  index1: 3,
  index2: 4
}
const initScope = (values, prop) => {
  const arr = values.split('#')
  if (arr.length > scopeFields[prop]) {
    return arr[scopeFields[prop]]
  } else {
    return null
  }
}

const setSteps = (state, playload) => {
  state.steps = playload.map((step) => {
    return Object.assign(
      {},
      step,
      {
        result: false,
        complete: false,
        component: stepsComponents[step.id]
      })
  })
}

const resetStepIndex = (state) => {
  state.stepIndex = 0
}

const setStep = (state, playload) => {
  state.step = playload
}

const setStepIndex = (state, playload) => {
  state.stepIndex = playload
}

const nextStep = (state) => {
  state.stepIndex++
  state.dictionary = []
}

const prevStep = (state) => {
  state.stepIndex--
  state.dictionary = []
}

const setStepResult = (state, playload) => {
  state.step.result = playload
}

const setRestartStep = (state, playload) => {
  state.restartStep = playload
}

const setPhases = (state, playload) => {
  state.phases = playload.map((phase) => {
    const scope = phase.scope.replace('**', state.learningLang)
    return Object.assign(
      {},
      phase,
      {
        sounds: initSounds(phase.sounds),
        scope: initScope(scope, 'scope'),
        lang1: initScope(scope, 'lang1'),
        lang2: initScope(scope, 'lang2'),
        index1: parseInt(initScope(scope, 'index1'), 10),
        index2: parseInt(initScope(scope, 'index2'), 10),
        phaseResult: false,
        complete: false
      })
  })
}

const setPhase = (state, playload) => {
  state.phase = playload
}

const nextPhase = (state) => {
  state.phaseIndex++
}

const prevPhase = (state) => {
  state.phaseIndex--
}

const firstPhase = (state) => {
  state.phaseIndex = 0
}

const lastPhase = (state) => {
  state.phaseIndex = state.phases.length - 1
}

const resetPhaseIndex = (state) => {
  state.phaseIndex = 0
}

const setPhaseResult = (state, playload) => {
  state.phase.phaseResult = playload
}

const setResult = (state, result) => {
  state.result = result
  state.error = ''
}

const setError = (state, error) => {
  state.result = 'error'
  state.error = error
}

const setDictionary = (state, playload) => {
  state.dictionary = playload.map(e => {
    return Object.assign(
      {},
      e,
      {
        word1: e.word1.toLowerCase(),
        word2: e.word2.toLowerCase()
      }
    )
  })
}

const setDictionaryById = (state, playload) => {
  // state.dictionary = playload
  const idx = state.dictionary.findIndex(e => e.id === playload.id)
  if (idx >= 0) {
    state.dictionary[idx] = playload
  }
}

const setLessons = (state, playload) => {
  state.lessons = playload
}

const setPhraseText = (state, playload) => {
  state.phase.text = playload
}

const setStepperVisible = (state, playload) => {
  state.stepperVisible = playload
}

const setLearningLang = (state, playload) => {
  state.learningLang = playload
}

const setResults = (state, playload) => {
  state.results[playload.prop] = playload.value
}

const clearResults = (state, playload) => {
  delete state.results[playload]
}

const setUserResults = (state, playload) => {
  state.userResults = playload
}

const setTesting = (state, playload) => {
  state.testing = playload
}

const setCue = (state, playload) => {
  state.cue = playload
}

export {
  setSteps,
  setStep,
  setPhases,
  setPhase,
  setResult,
  setError,

  setStepIndex,
  resetStepIndex,

  setStepResult,
  setPhaseResult,
  setRestartStep,
  nextStep,
  prevStep,
  nextPhase,
  prevPhase,
  firstPhase,
  lastPhase,

  resetPhaseIndex,

  setDictionary,
  setDictionaryById,

  setLessons,

  setPhraseText,
  setStepperVisible,

  setLearningLang,

  setResults,
  clearResults,
  setTesting,

  setUserResults,

  setCue
}
