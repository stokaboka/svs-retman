const title = (state) => {
  return state.title
}

const api = (state) => {
  return state.api
}

const results = (state) => {
  return state.results
}

const version = (state) => {
  return state.version
}

const steps = (state) => {
  return state.steps
}

const step = (state) => {
  return state.step
}

const stepIndex = (state) => {
  return state.stepIndex
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

export {
  title,
  api,
  results,
  version,
  steps,
  step,
  stepIndex,
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

  cue
}
