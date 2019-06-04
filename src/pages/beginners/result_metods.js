import {testWordReducer, testLevelReducer, minKeysValues, reduce, lexicalResult} from '../../lib/utils'

const getMidSan = (val) => {
  const {s, a, n} = val
  return Math.round(10 * (s + a + n) / 3) / 10
}

const sanChanges = (b, a) => {
  if (b < a) {
    return 'улучшилось'
  } else if (b > a) {
    return 'ухудшилось'
  } else {
    return 'не изменилось'
  }
}

const getResultFromContext = (context, defObject) => {
  if (context.phase && context.phase.result && context.phase.action === 'TEST') {
    return context.results[context.phase.result]
      ? context.results[context.phase.result]
      : defObject
  }
  return null
}

const initDataLexical = (context, prop, data) => {
  const defObj = {
    checked: 0,
    checkedWordsPairs: [],
    rememberedWordsPairs: [],
    rememberedWordsPairs1: [],
    rememberedWordsPairs2: [],
    remembered: 0,
    percent: 0,
    cancel: false
  }
  const result = getResultFromContext(context, defObj)
  if (result) {
    result[prop] = data
  }
  return result
}

const initResultsLexical = (context, resultId) => {
  const result = context.results[resultId]
  if (result) {
    return lexicalResult(result)
  } else {
    return null
  }
}

const initDataAT = (context, prop, data, defObj) => {
  const result = getResultFromContext(context, defObj)
  if (result) {
    result[prop] = data
  }
  return result
}

// ***
const mnemic = {

  initData: (context, prop, data) => {
    return initDataLexical(context, prop, data)
  },
  clearResults: (context, resultId) => {},
  initResults: (context, resultId) => {
    return initResultsLexical(context, resultId)
  },

  initRecomendation: (context, phase, result) => {
    const rec = context.mnemonicRecommendations.find((elem) => {
      return (elem.from <= result.remembered && result.remembered <= elem.to)
    })

    context.showCancelBtn = result.cancel

    const recText = rec ? rec.text : '?'

    let text = phase.text
    text = text
      .replace('{{RECOMMENDATION}}', recText)
      .replace('{{CHECKED}}', result.checked)
      .replace('{{REMEMBERED_PERCENT}}', result.percent)
      .replace('{{REMEMBERED}}', result.remembered)
    return text
  }
}

// ***
const selfrating = {

  initData: (context, prop, data) => {
    const defObj = {
      SelfRating: {
        raw: { EN: [], DE: [], FR: [] },
        reduced: { EN: 0, DE: 0, FR: 0 }
      },
      ControlRating: {
        raw: { EN: [], DE: [], FR: [] },
        reduced: { EN: 0, DE: 0, FR: 0 }
      },
      langSelfRating: '',
      langControlRating: '',
      langResult: ''
    }
    const result = getResultFromContext(context, defObj)
    if (result) {
      if (prop === 'SelfRating') {
        result.SelfRating.raw = data
      }
      if (prop === 'ControlRating') {
        result.ControlRating.raw[context.phase.lang1] = data
      }
    }
    return result
  },
  clearResults: (context, resultId) => {},
  initResults: (context, resultId) => {
    const result = context.results[resultId]
    const out = {
      SelfRating: {
        raw: {
          EN: result.SelfRating.raw.EN,
          DE: result.SelfRating.raw.DE,
          FR: result.SelfRating.raw.FR
        },
        reduced: {
          EN: reduce(result.SelfRating.raw.EN, testLevelReducer, 0, 'id'),
          DE: reduce(result.SelfRating.raw.DE, testLevelReducer, 0, 'id'),
          FR: reduce(result.SelfRating.raw.FR, testLevelReducer, 0, 'id')
        }
      },
      ControlRating: {
        raw: {
          EN: result.ControlRating.raw.EN.filter(e => e.word2).map(e => { return {word1: e.word1, word2: e.word2, hide: e.hide} }),
          DE: result.ControlRating.raw.DE.filter(e => e.word2).map(e => { return {word1: e.word1, word2: e.word2, hide: e.hide} }),
          FR: result.ControlRating.raw.FR.filter(e => e.word2).map(e => { return {word1: e.word1, word2: e.word2, hide: e.hide} })
        },
        reduced: {
          EN: reduce(result.ControlRating.raw.EN, testWordReducer, 0),
          DE: reduce(result.ControlRating.raw.DE, testWordReducer, 0),
          FR: reduce(result.ControlRating.raw.FR, testWordReducer, 0)
        }
      },
      langSelfRating: '',
      langControlRating: '',
      langResult: ''
    }

    out.langSelfRating = minKeysValues(['EN', 'DE', 'FR'], out.SelfRating.reduced)
    out.langControlRating = minKeysValues(['EN', 'DE', 'FR'], out.ControlRating.reduced)
    out.langResult = out.langControlRating.value < out.langSelfRating.value ? out.langControlRating.lang : out.langSelfRating.lang

    return out
  },

  initRecomendation: (context, phase, result) => {
    context.setLearningLang(result.langResult)
    let text = context.initLanguageTestName(context, phase.text)
    return text
  }
}

// ***
const lexical = {
  initData: (context, prop, data) => {
    return initDataLexical(context, prop, data)
  },
  clearResults: (context, resultId) => {},
  initResults: (context, resultId) => {
    return initResultsLexical(context, resultId)
  },
  initRecomendation: (context, phase, result) => {
    let text = phase.text
    text = text
      .replace('{{CHECKED}}', result.checked)
      .replace('{{REMEMBERED}}', result.remembered)
    return text
  }
}

// ***
const atself = {
  initData: (context, prop, data) => {
    const defObj = {
      before: {
        level: 4,
        label: ''
      },
      after: {
        level: 4,
        label: ''
      }
    }
    return initDataAT(context, prop, data, defObj)
  },
  clearResults: (context) => {
    // context.AT = {
    //   before: {
    //     level: 4,
    //     label: ''
    //   },
    //   after: {
    //     level: 4,
    //     label: ''
    //   }
    // }
  },
  initResults: (context, resultId) => {
    // return context.AT
    return context.results[resultId]
  },
  initRecomendation: (context, phase, result) => {
    let text = phase.text
    let rec = ''
    if (result.before.level < result.after.level) {
      rec = 'Аутотренинг улучшил Ваше настроение и самочувствие, '
    } else if (result.before.level > result.after.level) {
      rec = 'После аутотренинга Ваше самочувствие ухудшилось и '
    } else {
      rec = 'Ваше настроение и самочувствие не изменились и '
    }

    if (result.after.level < 4) {
      rec = rec + 'мы рекомендуем повторить тестирование в другое время.'
    } else {
      rec = rec + 'Вы можете перейти к следующему уроку.'
    }

    text = text
      .replace('{{AUTOSELFBEFORE}}', result.before.label)
      .replace('{{AUTOSELFAFTER}}', result.after.label)
      .replace('{{AUTOSELFRECOMENDATION}}', rec)
    return text
  }
}

// ***
const san = {
  initData: (context, prop, data) => {
    const defObj = {
      before: { s: 3, a: 3, n: 3 },
      after: { s: 3, a: 3, n: 3 }
    }
    return initDataAT(context, prop, data, defObj)
  },
  clearResults: (context) => {
    // context.SAN = {
    //   before: { s: 3, a: 3, n: 3 },
    //   after: { s: 3, a: 3, n: 3 }
    // }
  },
  initResults: (context, resultId) => {
    // return context.SAN
    return context.results[resultId]
  },
  initRecomendation: (context, phase, result) => {
    let text = phase.text
    let rec = '<p>Ваше '

    rec = rec + `самочувствие ${sanChanges(result.before.s, result.after.s)}, `
    rec = rec + `активность ${sanChanges(result.before.a, result.after.a)}, `
    rec = rec + `настроение ${sanChanges(result.before.n, result.after.n)}, `
    rec = rec + ' после прохождения аутотренинга.</p>'

    const before = getMidSan(result.before)
    const after = getMidSan(result.after)

    if (after >= before) {
      rec = rec + '<br><p>Вы можете перейти к следующему тесту.</p>'
    } else {
      rec = rec + '<br><p>Мы рекомендуем повторить тестирование в другое время.</p>'
    }

    text = text
      .replace('{{AUTOSELFBEFORE}}', `С: ${result.before.s}; А: ${result.before.a}; H: ${result.before.n}`)
      .replace('{{AUTOSELFAFTER}}', `С: ${result.after.s}; А: ${result.after.a}; H: ${result.after.n}`)
      .replace('{{AUTOSELFRECOMENDATION}}', rec)

    return text
  }
}

// ***
const sanexpr = {
  initData: (context, prop, data) => {
    const defObj = {
      before: { s: 3, a: 3, n: 3 },
      after: { s: 3, a: 3, n: 3 }
    }
    return initDataAT(context, prop, data, defObj)
  },
  clearResults: (context) => {
    // context.SANexpress = {
    //   before: { s: 3, a: 3, n: 3 },
    //   after: { s: 3, a: 3, n: 3 }
    // }
  },
  initResults: (context, resultId) => {
    // return context.SANexpress
    return context.results[resultId]
  },
  initRecomendation: (context, phase, result) => {
    let screen = 0
    const before = getMidSan(result.before)
    const after = getMidSan(result.after)
    const delta = after - before

    if (after <= 1.4) {
      screen = 3
    } else if (after <= 2.4) {
      if (delta <= 0.2) {
        screen = 3
      } else {
        screen = 4
      }
    } else if (after <= 3.6) {
      screen = 5
    } else if (after <= 4.8) {
      screen = 6
    } else if (after <= 5.8) {
      if (delta >= 4.2) {
        screen = 8
      } else {
        screen = 7
      }
    } else {
      screen = 8
    }
    // return `Экран: ${screen}`
    console.log(screen)
    return ''
  }
}

// ***
const at0 = {
  initData: (context, prop, data) => {
    const defObj = {
      before: { s: 3, a: 3, n: 3 },
      after: { s: 3, a: 3, n: 3 }
    }
    return initDataAT(context, prop, data, defObj)
  },
  clearResults: (context) => {
    // context.AT0 = {
    //   before: { s: 3, a: 3, n: 3 },
    //   after: { s: 3, a: 3, n: 3 }
    // }
  },
  initResults: (context, resultId) => {
    // return context.AT0
    return context.results[resultId]
  },
  initRecomendation: (context, phase, result) => {
    let text = phase.text
    let rec = '<p>Ваше '

    rec = rec + `самочувствие ${sanChanges(result.before.s, result.after.s)}, `
    rec = rec + `активность ${sanChanges(result.before.a, result.after.a)}, `
    rec = rec + `настроение ${sanChanges(result.before.n, result.after.n)}, `
    rec = rec + ' после прохождения аутотренинга.</p>'

    const before = result.before.s + result.before.a + result.before.n
    const after = result.after.s + result.after.a + result.after.n

    if (before < after) {
      rec = rec + '<br><p>Мы рекомендуем повторить тестирование в другое время.</p>'
    } else {
      rec = rec + '<br><p>Вы можете перейти к следующему тесту.</p>'
    }

    text = text
      .replace('{{AUTOSELFBEFORE}}', `С: ${result.before.s}; А: ${result.before.a}; H: ${result.before.n}`)
      .replace('{{AUTOSELFAFTER}}', `С: ${result.after.s}; А: ${result.after.a}; H: ${result.after.n}`)
      .replace('{{AUTOSELFRECOMENDATION}}', rec)
    return text
  }
}

// ***
const lesson = {
  initData: (context, prop, data) => {
    const defObj = [null, null, null, null]
    const result = getResultFromContext(context, defObj)
    if (result) {
      const idx = data.lesson - 1
      if (!result[idx]) {
        result[idx] = {
          lang: '',
          stages: [ [], [], [], [] ],
          matches: [0, 0, 0, 0],
          partials: [0, 0, 0, 0],
          difference: [0, 0, 0, 0]
        }
      }

      result[idx].lang = data.lang
      result[idx].stages[data.stage - 1] = data.items
    }
    return result
  },
  clearResults: (context, resultId) => {},
  initResults: (context, resultId) => {
    const result = context.results[resultId]
    if (result) {
      for (let l = 0; l < 4; l++) {
        if (!result[l]) {
          continue
        }
        for (let i = 0; i < 4; i++) {
          let stage = result[l].stages[i]
          for (const w of stage) {
            let matches = 0
            for (let j = 0; j < 4; j++) {
              if (i !== j) {
                let test = result[l].stages[j]
                if (test.includes(w)) {
                  matches++
                }
              }
            }
            switch (matches) {
              case 3:
                result[l].matches[i]++
                break
              case 2:
              case 1:
                result[l].partials[i]++
                break
              default :
                result[l].difference[i]++
            }
          }
        }
      }
    }
    return result
  },
  initRecomendation: (context, phase, result) => {
    let text = phase.text
    let resultText = ''
    for (let l = 0; l < 4; l++) {
      if (!result[l]) {
        continue
      }

      resultText = resultText + `<br><p>Урок <strong>${l + 1}</strong>, язык обучения <strong>${result[l].lang}</strong></p>`

      for (let i = 0; i < 4; i++) {
        const matches = `<strong>${result[l].matches[i]}</strong>`
        const partials = `<strong>${result[l].partials[i]}</strong>`
        const difference = `<strong>${result[l].difference[i]}</strong>`

        resultText = resultText + `<p>Проход ${i + 1}: совпадений полных <strong>${matches}</strong>, частичных - <strong>${partials}</strong>, без совпадений - <strong>${difference}</strong></p>`
      }
    }
    text = text.replace('{{LESSON_RESULT}}', (resultText || '<strong>Вы не выполнили задание урока</strong>'))

    return text
  }
}

// ***
const endlexical = {
  initData: (context, prop, data) => {
    return initDataLexical(context, prop, data)
  },
  clearResults: (context, resultId) => {},
  initResults: (context, resultId) => {
    return initResultsLexical(context, resultId)
  },
  initRecomendation: (context, phase, result) => {
    let text = phase.text
    text = text
      .replace('{{CHECKED}}', result.checked)
      .replace('{{REMEMBERED}}', result.remembered)
    return text
  }
}

const resultMethods = {
  mnemic,
  selfrating,
  lexical,
  atself,
  lesson,
  endlexical,
  san,
  sanexpr,
  at0
}

export default {

  methods: {

    initLanguageTestName (context, text) {
      return text
        .replace(/{{LANGUAGE_NAME_1}}/g, context.learningLangNames.p1)
        .replace(/{{LANGUAGE_NAME_2}}/g, context.learningLangNames.p2)
        .replace(/{{LANGUAGE_NAME_3}}/g, context.learningLangNames.p3)
        .replace(/{{LANGUAGE_NAME}}/g, context.learningLang)
        .replace(/{{LANGUAGE}}/g, context.learningLang)
        .replace(/{{STEP_7_TIME}}/g, context.learningTime[context.learningLang])
    },

    initData (resultId, prop, data) {
      if (resultMethods[resultId]) {
        const func = resultMethods[resultId].initData
        if (func) {
          return func(this, prop, data)
        }
      }
      return null
    },

    clearTmpResults (resultId) {
      if (resultMethods[resultId]) {
        const func = resultMethods[resultId].clearResults
        if (func) {
          return func(this)
        }
      }
      return null
    },

    initResults (resultId) {
      if (resultMethods[resultId]) {
        const func = resultMethods[resultId].initResults
        return func(this, resultId)
      }
      return null
    },

    initRecomendation (phase, results) {
      const func = resultMethods[phase.result].initRecomendation
      return func(this, phase, results[phase.result])
    }
  }
}
