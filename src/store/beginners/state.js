export default {
  title: 'Тест Лингвистических Способностей (ТЛС)',
  version: '0.1.1',

  // api: 'http://localhost:3333',
  api: process.env.API,
  sound: 'sound',

  results: {},

  testing: [],

  result: '',
  error: '',

  steps: [],
  step: {},
  stepIndex: 0,

  phases: [],
  phase: {},
  phaseIndex: 0,

  stages: [],
  stage: {},
  stageIndex: 0,

  dictionary: [],

  lessons: [],

  cue: [],

  atLevels: [
    'Умер',
    'Отвратительное',
    'Плохое',
    'Ниже среднего',
    'Нормальное',
    'Отличное',
    'Великолепное',
    'Готов двигать горы'
  ],

  selfRatingColumns: [
    {id: 1, header: 'Английский', lang: 'EN', level: 0},
    {id: 2, header: 'Немецкий', lang: 'DE', level: 0},
    {id: 3, header: 'Французский', lang: 'FR', level: 0},
    {id: 4, header: 'Уровень', lang: '', level: 1}
  ],

  selfRatingLevels: [
    {id: 1, name: 'Полное отсутствие знаний.'},
    {id: 2, name: 'Могу отличить данный язык от другого.'},
    {id: 3, name: 'Понимаю отдельные слова.'},
    {id: 4, name: 'Понимаю смысл отдельных фраз.'},
    {id: 5, name: 'Иностранную речь понимаю, но разговаривать не могу.'},
    {id: 6, name: 'В беседе могу ответить на простые вопросы.'},
    {id: 7, name: 'Могу поддержать диалог на повседневные темы.'},
    {id: 8, name: 'Могу самостоятельно подготовить и сделать сообщение (выступление).'},
    {id: 9, name: 'Могу вести полемику, отстаивать свою точку зрения (участвовать в дискуссии).'},
    {id: 10, name: 'Могу свободно изъясняться на любую тему, общаться с носителями языка.'},
    {id: 11, name: 'Владею иностранным языком как родным'}
  ],

  learningLang: 'EN',

  learningLangNames: {
    EN: {
      p1: 'Английский',
      p2: 'Английского',
      p3: 'Английских'
    },
    DE: {
      p1: 'Немецкий',
      p2: 'Немецкого',
      p3: 'Немецких'
    },
    FR: {
      p1: 'Французский',
      p2: 'Французского',
      p3: 'Французских'
    }
  },

  learningTime: {
    EN: '45 мин. 39 сек',
    DE: '20 мин. 06 сек',
    FR: '25 мин. 41 сек.'
  },

  stepperVisible: true,
  /**
   * TODO move recommendation on server API
   */
  mnemonicRecommendations: [
    {
      from: 0,
      to: 4,
      text: '<p>Рекомендуем Вам прервать тестирование, устранить все мешающие и отвлекающие факторы, как следует отдохнуть и повторить все с самого начала еще раз.</p> <p>Если результат не улучшился, рискните продолжить тестирование - зрительное ассоциативное запоминание не единственный вид памяти, может быть, Вы сможете компенсировать результаты за счет слуховой или зрительной механической памяти (повторение - мать учения).</p> <p>Эти виды памяти будут задействованы в следующих заданиях.</p>'
    },
    {
      from: 5,
      to: 14,
      text: '<p>Ваша способность к зрительному ассоциативному запоминанию ниже среднестатистической.</p> <p>Вам придется потратить больше времени и приложить дополнительные усилия для усвоения новой лексики. Впрочем, возможно у Вас просто преобладает слуховая память.</p> <p>Рекомендуем во время занятий не отключать звук уроков.</p>'
    },
    {
      from: 15,
      to: 30,
      text: '<p>У Вас достаточно хорошо развита способность к зрительному ассоциативному запоминанию.</p> <p>Это свойство Вашей памяти несомненно пригодится Вам во время обучения.</p>'
    },
    {
      from: 31,
      to: 50,
      text: '<p>У Вас прекрасно развита способность к зрительному ассоциативному запоминанию.</p> <p>Это свойство Вашей памяти значительно облегчит Вам работу во время обучения при усвоении новой лексики.</p> <p>Однако при повторах уроков, особенно при работе со словарем, Ваше внимание может быстро перегружаться, рассеиваться.</p> <p>Постарайтесь сознательно переключать внимание на звуковое сопровождение уроков.</p>'
    }
  ],

  testResult: {
    sound: false
  }
}
