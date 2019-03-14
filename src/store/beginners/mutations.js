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

const setStepResult = (state, playload) => {
  state.step.result = playload
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
  state.dictionary = playload
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

  nextStep,
  nextPhase,

  resetPhaseIndex,

  setDictionary,
  setLessons,

  setPhraseText,
  setStepperVisible,

  setLearningLang,

  setResults
}
