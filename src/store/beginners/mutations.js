const setSteps = (state, playload) => {
  state.steps = playload.map((step) => {
    return Object.assign({}, step, {result: false})
  })
}

const setStep = (state, playload) => {
  state.step = playload
}

const nextStep = (state) => {
  state.stepIndex++
}

const setPhases = (state, playload) => {
  state.phases = playload.map((phase) => {
    return Object.assign({}, phase, {result: false})
  })
}

const setPhase = (state, playload) => {
  state.phase = playload
}

const nextPhase = (state) => {
  state.phaseIndex++
}

const setResult = (state, result) => {
  state.result = result
  state.error = ''
}

const setError = (state, error) => {
  state.result = 'error'
  state.error = error
}

const setSoundTestResult = (state, playload) => {
  state.testResult.sound = playload
}

export {
  setSteps,
  setStep,
  setPhases,
  setPhase,
  setResult,
  setError,

  nextStep,
  nextPhase,

  setSoundTestResult
}
