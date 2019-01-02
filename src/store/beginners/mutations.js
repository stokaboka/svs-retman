const stepsComponents = {
  1: 'TestSoundComponent',
  2: 'DescriptionMethodComponent',
  3: 'MnemonicTestComponent'
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

const nextStep = (state) => {
  state.stepIndex++
}

const setStepResult = (state, playload) => {
  state.step.result = playload
}

const setPhases = (state, playload) => {
  state.phases = playload.map((phase) => {
    return Object.assign(
      {},
      phase,
      {
        testSounds: phase.testSounds ? phase.testSounds.split('#') : [],
        briefSounds: phase.briefSounds ? phase.briefSounds.split('#') : [],
        result: false,
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
  state.phase.result = playload
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

const setDictionary = (state, playload) => {
  state.dictionary = playload
}

const setPhraseBriefText = (state, playload) => {
  state.phase.briefText = playload
}

const setStepperVisible = (state, playload) => {
  state.stepperVisible = playload
}

export {
  setSteps,
  setStep,
  setPhases,
  setPhase,
  setResult,
  setError,

  resetStepIndex,

  setStepResult,
  setPhaseResult,

  nextStep,
  nextPhase,

  resetPhaseIndex,

  setSoundTestResult,

  setDictionary,

  setPhraseBriefText,
  setStepperVisible
}
