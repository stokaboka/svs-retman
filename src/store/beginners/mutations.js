const setSteps = (state, playload) => {
  state.steps = playload
}

const setStep = (state, playload) => {
  state.step = playload
}

const setResult = (state, result) => {
  state.result = result
  state.error = ''
}

const setError = (state, error) => {
  state.result = 'error'
  state.error = error
}

export {
  setSteps,
  setStep,
  setResult,
  setError
}
