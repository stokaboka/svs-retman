import {testWordReducer, testLevelReducer, minKeysValues, reduce, lexicalResult} from '../../lib/utils'

const mnemonic = {
  initResults: (context) => {
    return lexicalResult(context.checkedWordsPairs, context.rememberedWordsPairs)
  },

  initRecomendation: (context, phase, result) => {
    const rec = context.mnemonicRecommendations.find((elem) => {
      return (elem.from <= result.remembered && result.remembered <= elem.to)
    })

    const recText = rec ? rec.text : '?'

    let text = phase.text
    text = text
      .replace('{{RECOMMENDATION}}', recText)
      .replace('{{CHECKED}}', result.checked)
      .replace('{{REMEMBERED}}', result.remembered)
    return text
  }
}

const selfrating = {
  initResults: (context) => {
    const out = {
      SelfRating: {
        raw: {
          EN: context.SelfRating.EN,
          DE: context.SelfRating.DE,
          FR: context.SelfRating.FR
        },
        reduced: {
          EN: reduce(context.SelfRating.EN, testLevelReducer, 0, 'id'),
          DE: reduce(context.SelfRating.DE, testLevelReducer, 0, 'id'),
          FR: reduce(context.SelfRating.FR, testLevelReducer, 0, 'id')
        }
      },
      ControlRating: {
        raw: {
          EN: context.ControlRating.EN.filter(e => e.word2).map(e => { return {word1: e.word1, word2: e.word2, hide: e.hide} }),
          DE: context.ControlRating.DE.filter(e => e.word2).map(e => { return {word1: e.word1, word2: e.word2, hide: e.hide} }),
          FR: context.ControlRating.FR.filter(e => e.word2).map(e => { return {word1: e.word1, word2: e.word2, hide: e.hide} })
        },
        reduced: {
          EN: reduce(context.ControlRating.EN, testWordReducer, 0),
          DE: reduce(context.ControlRating.DE, testWordReducer, 0),
          FR: reduce(context.ControlRating.FR, testWordReducer, 0)
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

const lexical = {
  initResults: (context) => {
    const rememberedWordsPairs = []
      .concat(context.rememberedWordsPairs1.map(elem => { return {word1: elem.word1, word2: elem.word2} }))
      .concat(context.rememberedWordsPairs2.map(elem => { return {word1: elem.word1, word2: elem.word2} }))
    return lexicalResult(context.checkedWordsPairs, rememberedWordsPairs)
  },
  initRecomendation: (context, phase, result) => {
    let text = phase.text
    text = text
      .replace('{{CHECKED}}', result.checked)
      .replace('{{REMEMBERED}}', result.remembered)
    return text
  }
}

const atself = {
  initResults: (context) => {
    return context.AT
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

const sanChanges = (b, a) => {
  if (b < a) {
    return 'улучшилось'
  } else if (b > a) {
    return 'ухудшилось'
  } else {
    return 'не изменилось'
  }
}

const san = {
  initResults: (context) => {
    return context.SAN
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

const at0 = {
  initResults: (context) => {
    return context.AT0
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

const lesson = {

  initResults: (context) => {
    for (let l = 0; l < 4; l++) {
      if (!context.lesson[l]) { continue }
      for (let i = 0; i < 4; i++) {
        let stage = context.lesson[l].stages[i]
        for (const w of stage) {
          let matches = 0
          for (let j = 0; j < 4; j++) {
            if (i !== j) {
              let test = context.lesson[l].stages[j]
              if (test.includes(w)) {
                matches++
              }
            }
          }
          switch (matches) {
            case 3:
              context.lesson[l].matches[i]++
              break
            case 2:
            case 1:
              context.lesson[l].partials[i]++
              break
            default :
              context.lesson[l].difference[i]++
          }
        }
      }
    }
    return context.lesson
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

const endlexical = {
  initResults: (context) => {
    const rememberedWordsPairs = []
      .concat(context.rememberedWordsPairs1.map(elem => { return {word1: elem.word1, word2: elem.word2} }))
      .concat(context.rememberedWordsPairs2.map(elem => { return {word1: elem.word1, word2: elem.word2} }))
    return lexicalResult(context.checkedWordsPairs, rememberedWordsPairs)
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
  mnemonic,
  selfrating,
  lexical,
  atself,
  lesson,
  endlexical,
  san,
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

    initResults (resultId) {
      if (resultMethods[resultId]) {
        const func = resultMethods[resultId].initResults
        return func(this)
      }
      return null
    },

    initRecomendation (phase, results) {
      const func = resultMethods[phase.result].initRecomendation
      return func(this, phase, results[phase.result])
    }
  }
}
