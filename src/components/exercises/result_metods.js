import {testWordReducer, testLevelReducer, minKeysValues, reduce} from '../../lib/utils'

const mnemonic = {
  initResults: (context) => {
    const out = {
      checked: context.checkedWordsPairs.length,
      remembered: 0
    }

    for (let i = 0; i < context.checkedWordsPairs.length; i++) {
      const checkedWordPair = context.dictionary[context.checkedWordsPairs[i] - 1]
      const isRememberedProperly = context.rememberedWordsPairs.findIndex((elem) => {
        return (elem.word1 === checkedWordPair.word1 && elem.word2 === checkedWordPair.word2)
      })
      out.remembered += isRememberedProperly >= 0 ? 1 : 0
    }
    return out
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
        EN: reduce(context.SelfRating.EN, testLevelReducer, 0),
        DE: reduce(context.SelfRating.DE, testLevelReducer, 0),
        FR: reduce(context.SelfRating.FR, testLevelReducer, 0)
      },
      ControlRating: {
        EN: reduce(context.ControlRating.EN, testWordReducer, 0),
        DE: reduce(context.ControlRating.DE, testWordReducer, 0),
        FR: reduce(context.ControlRating.FR, testWordReducer, 0)
      },
      langSelfRating: '',
      langControlRating: '',
      langResult: ''
    }

    out.langSelfRating = minKeysValues(['EN', 'DE', 'FR'], out.SelfRating)
    out.langControlRating = minKeysValues(['EN', 'DE', 'FR'], out.ControlRating)
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
    const out = {
      checked: context.checkedWordsPairs.length,
      remembered: 0
    }

    for (let i = 0; i < context.checkedWordsPairs.length; i++) {
      const checkedWordPair = context.dictionary[context.checkedWordsPairs[i]]

      let isRememberedProperly = context.rememberedWordsPairs1.findIndex((elem) => {
        return (elem.word1 === checkedWordPair.word1 && elem.word2 === checkedWordPair.word2)
      })

      out.remembered += isRememberedProperly >= 0 ? 1 : 0

      isRememberedProperly = context.rememberedWordsPairs2.findIndex((elem) => {
        return (elem.word1 === checkedWordPair.word1 && elem.word2 === checkedWordPair.word2)
      })

      out.remembered += isRememberedProperly >= 0 ? 1 : 0
    }
    return out
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
    if (result.before < result.after) {
      rec = 'Аутотренинг улучшил Ваше настроение и самочувствие, '
    } else if (result.before > result.after) {
      rec = 'После аутотренинга Ваше самочувствие ухудшилось и '
    } else {
      rec = 'Ваше настроение и самочувствие не изменились и '
    }

    if (result.after < 4) {
      rec = rec + 'мы рекомендуем повторить тестирование в другое время.'
    } else {
      rec = rec + 'Вы можете перейти к следующему уроку.'
    }

    text = text
      .replace('{{AUTOSELFBEFORE}}', context.atLevels[result.before])
      .replace('{{AUTOSELFAFTER}}', context.atLevels[result.after])
      .replace('{{AUTOSELFRECOMENDATION}}', rec)
    return text
  }
}

const resultMethods = {
  mnemonic,
  selfrating,
  lexical,
  atself
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
