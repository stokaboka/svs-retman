// const title = (state) => {
//   return state.title
// }
//
// const api = (state) => {
//   return state.api
// }

const results = (state) => {
  return state.results
}

const userResults = (state) => {
  return state.userResults
}

const testing = (state) => {
  return state.testing
}

// const version = (state) => {
//   return state.version
// }

const steps = (state) => {
  return state.steps
}

const step = (state) => {
  return state.step
}

const restartStep = (state) => {
  return state.restartStep
}

const stepIndex = (state) => {
  return state.stepIndex
}

const isFirstStep = (state) => {
  return state.stepIndex <= 0
}

const isLastStep = (state) => {
  return state.stepIndex === state.steps.length - 1
}

const soundTheme = (state) => {
  return state.soundTheme
}

const phases = (state) => {
  return state.phases
}

const phase = (state) => {
  return state.phase
}

const phaseIndex = (state) => {
  return state.phaseIndex
}

const stages = (state) => {
  return state.stages
}

const stage = (state) => {
  return state.stage
}

const dictionary = (state) => {
  return state.dictionary
}

const lessons = (state) => {
  return state.lessons
}

const soundTestResult = (state) => {
  return state.testResult.sound
}

const mnemonicRecommendations = (state) => {
  return state.mnemonicRecommendations
}

const stepperVisible = (state) => {
  return state.stepperVisible
}

const learningLang = (state) => {
  return state.learningLang
}

const learningLangNames = (state) => {
  if (state.learningLang in state.learningLangNames) {
    return state.learningLangNames[state.learningLang]
  } else {
    return {p1: '', p2: '', p3: ''}
  }
}

const learningTime = (state) => {
  return state.learningTime
}

const atLevels = (state) => {
  return state.atLevels
}

const cue = (state) => {
  return state.cue
}

const selfRatingColumns = (state) => {
  return state.selfRatingColumns
}

const selfRatingLevels = (state) => {
  return state.selfRatingLevels
}

export {
  // title,
  // api,
  results,
  userResults,
  testing,
  // version,
  steps,
  step,
  stepIndex,
  restartStep,
  isFirstStep,
  isLastStep,
  phases,
  phaseIndex,
  stages,
  phase,
  stage,
  dictionary,
  lessons,

  soundTestResult,

  mnemonicRecommendations,

  stepperVisible,

  learningLang,
  learningLangNames,
  learningTime,

  atLevels,

  cue,

  selfRatingColumns,
  selfRatingLevels,

  soundTheme
}
