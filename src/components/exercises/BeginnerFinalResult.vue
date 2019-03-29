<template>
    <div class="final-results-container">
      <h3 class="final-results-title">Результаты тестирования</h3>

      <q-list>
        <q-collapsible
          v-for="(test, key) in tests"
          :key="key"
          :icon="test.icon"
          :label="test.label">
          <div>
            <component :is="test.component" :result="results[key]"></component>
          </div>
        </q-collapsible>
      </q-list>

    </div>
</template>

<script>

/*
{
  "mnemonic": {
    "checked": 2,
    "remembered": 2,
    "recomendation": "<p>Из 50 предъявленных пар слов вы отметили  <strong>2</strong> и запомнили  <strong>2</strong> пар</p>  <p><strong><p>Рекомендуем Вам прервать тестирование, устранить все мешающие и отвлекающие факторы, как следует отдохнуть и повторить все с самого начала еще раз.</p> <p>Если результат не улучшился, рискните продолжить тестирование - зрительное ассоциативное запоминание не единственный вид памяти, может быть, Вы сможете компенсировать результаты за счет слуховой или зрительной механической памяти (повторение - мать учения).</p> <p>Эти виды памяти будут задействованы в следующих заданиях.</p></strong></p>"
  },
  "selfrating": {
    "SelfRating": {
      "EN": 1,
      "DE": 1,
      "FR": 3
    },
    "ControlRating": {
      "EN": 0,
      "DE": 0,
      "FR": 0
    },
    "langSelfRating": {
      "lang": "EN",
      "value": 1
    },
    "langControlRating": {
      "lang": "EN",
      "value": 0
    },
    "langResult": "EN",
    "recomendation": "В результате тестирования выбран язык обучения: <p><strong>Английский</strong></p>"
  },
  "lexical": {
    "checked": 3,
    "remembered": 1,
    "recomendation": "<p>Из 100 предъявленных пар слов вы отметили <strong>3</strong> и запомнили <strong>1</strong> пар</p>"
  },
  "atself": {
    "before": 3,
    "after": 7,
    "recomendation": "<p>Ваше самочувствие до проведения аутотренинга: <strong>Ниже среднего</strong>, после аутотренинга: <strong>Готов двигать горы</strong>. <br><strong>Аутотренинг улучшил Ваше настроение и самочувствие, Вы можете перейти к следующему уроку.</strong></p>"
  },
  "lesson": {
    "lang": "EN",
    "stages": [
      [
        "- And what are these?",
        "- These are things, too.",
        "- But these aren’t things.",
        "- No, these are persons."
      ],
      [
        "- This is a thing.",
        "- And what are these?",
        "- These are things, too."
      ],
      [
        "- What’s this?",
        "- This is a thing.",
        "- And what are these?",
        "- These are things, too."
      ],
      [
        "- Is this a telephone?",
        "- Yes, this is a telephone.",
        "- Is this a book?"
      ]
    ],
    "matches": [
      0,
      0,
      0,
      0
    ],
    "difference": [
      2,
      0,
      1,
      3
    ],
    "partials": [
      2,
      3,
      3,
      0
    ],
    "recomendation": "После прохождения пробного урока Ваш результат: <br><p>Проход 1: совпадений полных <strong>0</strong>, частичных - <strong>2</strong>, без совпадений - <strong>2</strong></p><p>Проход 2: совпадений полных <strong>0</strong>, частичных - <strong>3</strong>, без совпадений - <strong>0</strong></p><p>Проход 3: совпадений полных <strong>0</strong>, частичных - <strong>3</strong>, без совпадений - <strong>1</strong></p><p>Проход 4: совпадений полных <strong>0</strong>, частичных - <strong>0</strong>, без совпадений - <strong>3</strong></p>"
  }
}
 */

import FinalMnemonic from './parts/FinalMnemonic'
import FinalSelfRating from './parts/FinalSelfRating'
import FinalLexical from './parts/FinalLexical'
import FinalAtTraining from './parts/FinalAtTraining'
import FinalLessonPassiv from './parts/FinalLessonPassiv'
import FinalEndLexical from './parts/FinalEndLexical'

export default {
  name: 'BeginnerFinalResult',
  components: {
    FinalMnemonic,
    FinalSelfRating,
    FinalLexical,
    FinalAtTraining,
    FinalLessonPassiv,
    FinalEndLexical
  },
  props: {
    results: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      // resultsX: {
      //   'mnemonic': {
      //     'checked': 2,
      //     'checkedWordsPairs': [
      //       {
      //         'word1': 'история',
      //         'word2': 'арка',
      //         'hide': ''
      //       },
      //       {
      //         'word1': 'будущее',
      //         'word2': 'писать',
      //         'hide': ''
      //       }
      //     ],
      //     'rememberedWordsPairs': [
      //       {
      //         'word1': 'история',
      //         'word2': 'арка'
      //       },
      //       {
      //         'word1': 'будущее',
      //         'word2': 'писать'
      //       }
      //     ],
      //     'remembered': 2,
      //     'recomendation': '<p>Из 50 предъявленных пар слов вы отметили  <strong>2</strong> и запомнили  <strong>2</strong> пар</p>  <p><strong><p>Рекомендуем Вам прервать тестирование, устранить все мешающие и отвлекающие факторы, как следует отдохнуть и повторить все с самого начала еще раз.</p> <p>Если результат не улучшился, рискните продолжить тестирование - зрительное ассоциативное запоминание не единственный вид памяти, может быть, Вы сможете компенсировать результаты за счет слуховой или зрительной механической памяти (повторение - мать учения).</p> <p>Эти виды памяти будут задействованы в следующих заданиях.</p></strong></p>'
      //   },
      //   'selfrating': {
      //     'SelfRating': {
      //       'raw': {
      //         'EN': [
      //           {
      //             'id': 1,
      //             'name': 'Полное отсутствие знаний.'
      //           }
      //         ],
      //         'DE': [
      //           {
      //             'id': 5,
      //             'name': 'Иностранную речь понимаю, но разговаривать не могу.'
      //           }
      //         ],
      //         'FR': [
      //           {
      //             'id': 8,
      //             'name': 'Могу самостоятельно подготовить и сделать сообщение (выступление).'
      //           }
      //         ]
      //       },
      //       'reduced': {
      //         'EN': 1,
      //         'DE': 5,
      //         'FR': 8
      //       }
      //     },
      //     'ControlRating': {
      //       'raw': {
      //         'EN': [
      //           {
      //             'word1': 'boundless',
      //             'word2': 'безграничный',
      //             'hide': 'безграничный'
      //           }
      //         ],
      //         'DE': [
      //           {
      //             'word1': 'beleidigung',
      //             'word2': 'будущее',
      //             'hide': 'оскорбление'
      //           }
      //         ],
      //         'FR': [
      //           {
      //             'word1': 'Profiter',
      //             'word2': 'пользоваться, извлекать пользу',
      //             'hide': 'пользоваться, извлекать пользу'
      //           }
      //         ]
      //       },
      //       'reduced': {
      //         'EN': 1,
      //         'DE': 0,
      //         'FR': 1
      //       }
      //     },
      //     'langSelfRating': {
      //       'lang': 'EN',
      //       'value': 1
      //     },
      //     'langControlRating': {
      //       'lang': 'DE',
      //       'value': 0
      //     },
      //     'langResult': 'DE',
      //     'recomendation': 'В результате тестирования выбран язык обучения: <p><strong>Немецкий</strong></p>'
      //   },
      //   'lexical': {
      //     'checked': 3,
      //     'checkedWordsPairs': [
      //       {
      //         'word1': 'bäum',
      //         'word2': 'дерево',
      //         'hide': 'дерево'
      //       },
      //       {
      //         'word1': 'beine',
      //         'word2': 'нога',
      //         'hide': 'нога'
      //       },
      //       {
      //         'word1': 'Beschreibung',
      //         'word2': 'описание',
      //         'hide': 'описание'
      //       }
      //     ],
      //     'rememberedWordsPairs': [
      //       {
      //         'word1': 'äugen',
      //         'word2': 'артикль'
      //       },
      //       {
      //         'word1': 'Beschreibung',
      //         'word2': 'волосы'
      //       }
      //     ],
      //     'remembered': 0,
      //     'recomendation': '<p>Из 100 предъявленных пар слов вы отметили <strong>3</strong> и запомнили <strong>0</strong> пар</p>'
      //   },
      //   'atself': {
      //     'before': {
      //       'level': 3,
      //       'label': 'Ниже среднего'
      //     },
      //     'after': {
      //       'level': 5,
      //       'label': 'Отличное'
      //     },
      //     'recomendation': '<p>Ваше самочувствие до проведения аутотренинга:<br> <strong>Ниже среднего</strong>, после аутотренинга: <strong>Отличное</strong>. <br><strong>Аутотренинг улучшил Ваше настроение и самочувствие, Вы можете перейти к следующему уроку.</strong></p>'
      //   },
      //   'lesson': {
      //     '0': {
      //       'lang': 'DE',
      //       'stages': [
      //         [
      //           '- Das ist ein Zimmer.',
      //           '- Das ist ein Tisch.',
      //           '- Das ist ein Stuhl.'
      //         ],
      //         [],
      //         [],
      //         [
      //           '- Das ist ein Zimmer.',
      //           '- Das ist ein Tisch.',
      //           '- Das ist ein Stuhl.',
      //           '- Das ist ein Sessel.',
      //           '- Das ist ein Schrank.'
      //         ]
      //       ],
      //       'matches': [
      //         0,
      //         0,
      //         0,
      //         0
      //       ],
      //       'partials': [
      //         3,
      //         0,
      //         0,
      //         3
      //       ],
      //       'difference': [
      //         0,
      //         0,
      //         0,
      //         2
      //       ]
      //     },
      //     '1': {
      //       'lang': 'DE',
      //       'stages': [
      //         [
      //           '- Guten Tag, Frau Kröger!',
      //           '- Guten Tag, Frau Nowak, wieder in Berlin?'
      //         ],
      //         [],
      //         [],
      //         [
      //           '- Guten Tag, Frau Kröger!',
      //           '- Guten Tag, Frau Nowak, wieder in Berlin?',
      //           '- Ja, wieder in Berlin.'
      //         ]
      //       ],
      //       'matches': [
      //         0,
      //         0,
      //         0,
      //         0
      //       ],
      //       'partials': [
      //         2,
      //         0,
      //         0,
      //         2
      //       ],
      //       'difference': [
      //         0,
      //         0,
      //         0,
      //         1
      //       ]
      //     },
      //     '2': null,
      //     '3': null,
      //     'recomendation': 'После прохождения пробного урока Ваш результат: <br><br><p>Урок <strong>1</strong>, язык обучения <strong>DE</strong></p><p>Проход 1: совпадений полных <strong><strong>0</strong></strong>, частичных - <strong><strong>3</strong></strong>, без совпадений - <strong><strong>0</strong></strong></p><p>Проход 2: совпадений полных <strong><strong>0</strong></strong>, частичных - <strong><strong>0</strong></strong>, без совпадений - <strong><strong>0</strong></strong></p><p>Проход 3: совпадений полных <strong><strong>0</strong></strong>, частичных - <strong><strong>0</strong></strong>, без совпадений - <strong><strong>0</strong></strong></p><p>Проход 4: совпадений полных <strong><strong>0</strong></strong>, частичных - <strong><strong>3</strong></strong>, без совпадений - <strong><strong>2</strong></strong></p><br><p>Урок <strong>2</strong>, язык обучения <strong>DE</strong></p><p>Проход 1: совпадений полных <strong><strong>0</strong></strong>, частичных - <strong><strong>2</strong></strong>, без совпадений - <strong><strong>0</strong></strong></p><p>Проход 2: совпадений полных <strong><strong>0</strong></strong>, частичных - <strong><strong>0</strong></strong>, без совпадений - <strong><strong>0</strong></strong></p><p>Проход 3: совпадений полных <strong><strong>0</strong></strong>, частичных - <strong><strong>0</strong></strong>, без совпадений - <strong><strong>0</strong></strong></p><p>Проход 4: совпадений полных <strong><strong>0</strong></strong>, частичных - <strong><strong>2</strong></strong>, без совпадений - <strong><strong>1</strong></strong></p>'
      //   },
      //   'endlexical': {
      //     'checked': 3,
      //     'checkedWordsPairs': [
      //       {
      //         'word1': 'bank ',
      //         'word2': 'скамья',
      //         'hide': 'скамья'
      //       },
      //       {
      //         'word1': 'bäum',
      //         'word2': 'дерево',
      //         'hide': 'дерево'
      //       },
      //       {
      //         'word1': 'beine',
      //         'word2': 'нога',
      //         'hide': 'нога'
      //       }
      //     ],
      //     'rememberedWordsPairs': [
      //       {
      //         'word1': 'äugen',
      //         'word2': 'артикль'
      //       },
      //       {
      //         'word1': 'Besteck',
      //         'word2': 'белый'
      //       },
      //       {
      //         'word1': 'Öl',
      //         'word2': 'зеркало'
      //       },
      //       {
      //         'word1': 'Sauer',
      //         'word2': 'кислый'
      //       }
      //     ],
      //     'remembered': 0,
      //     'recomendation': '<p>Из 100 предъявленных пар слов вы отметили <strong>3</strong> и запомнили <strong>0</strong> пар</p>'
      //   }
      // },
      tests: {
        mnemonic: {
          label: 'Мнемонический тест',
          component: 'FinalMnemonic',
          icon: 'explore',
          opened: true
        },
        selfrating: {
          label: 'Определение языка пробного обучения',
          component: 'FinalSelfRating',
          icon: 'explore',
          opened: true
        },
        lexical: {
          label: 'Входной тест знания лексики языка пробного обучения',
          component: 'FinalMnemonic',
          icon: 'explore',
          opened: true
        },
        atself: {
          label: 'Тест влияния аутотренинга на интенсивность обучения',
          component: 'FinalAtTraining',
          icon: 'explore',
          opened: true
        },
        lesson: {
          label: 'Пробное обучение (пассив)',
          component: 'FinalLessonPassiv',
          icon: 'explore',
          opened: true
        },
        endlexical: {
          label: 'Выходной тест знания лексики языка пробного обучения',
          component: 'FinalMnemonic',
          icon: 'explore',
          opened: true
        }
      }
    }
  }
}
</script>

<style scoped>
.final-results-container {
  width: 75vw;
}

.final-results-title {
  font-weight: 700;
}
.final-result-test__title {

}
  .final-result-test__info {

  }
</style>
