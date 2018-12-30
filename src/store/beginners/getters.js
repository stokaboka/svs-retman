const title = (state) => {
  return state.title
}

const api = (state) => {
  return state.api
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

const soundTestResult = (state) => {
  return state.testResult.sound
}

export {
  title,
  api,
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

  soundTestResult
}
