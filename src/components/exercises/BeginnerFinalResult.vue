<template>
  <div class='column justify-center no-wrap final-results-container'>
    <section class="final-results-section">
      <div class="final-results-section__title">Мнемические способности</div>
      <div class="final-results-section__text">{{mnemic}}</div>
    </section>
    <section class="final-results-section">
      <div class="final-results-section__title">Словарный запас</div>
      <div class="final-results-section__text">{{rating}}</div>
    </section>
    <section class="final-results-section">
      <div class="final-results-section__title">Пробное обучение</div>
      <div class="final-results-section__text">{{delta}}</div>
    </section>
    <section class="final-results-section">
      <div class="final-summary-section__title">Результат</div>
      <div class="final-summary-section__text">{{summary}}</div>
    </section>
  </div>
</template>

<script>
import get from 'lodash/get'
import {toDDMMYYYY} from '../../lib/utils'

export default {
  name: 'BeginnerFinalResult',
  filters: {
    dateDMY: function (value) {
      return toDDMMYYYY(value)
    }
  },
  props: {
    testing: {
      type: Array,
      required: true
    },
    onlyzero: {
      type: Boolean,
      default () {
        return true
      },
      required: false
    }
  },
  data () {
    return {
      xtesting: [
        {'label': 'Сусггестивность по АТ', 'method': 'at0', 'min': 1, 'max': 100, 'k1': 0.05, 'k2': 0.6, 'k': 0.03, 'value': 0, 'result': 0},
        {'label': 'Мнемический тест', 'method': 'mnemic', 'min': 1, 'max': 40, 'k1': 0.125, 'k2': 0.8, 'k': 0.1, 'value': 2, 'result': 0.2},
        {'label': 'Словарный запас по трем языкам', 'method': 'controlRating', 'min': 1, 'max': 25, 'k1': 0.2, 'k2': 0.25, 'k': 0.05, 'value': 1, 'result': 0.05},
        {'label': 'Способность понимания смысла текстов', 'method': 'selftext', 'min': 1, 'max': 20, 'k1': 0.25, 'k2': 0.3, 'k': 0.075, 'value': 0, 'result': 0},
        {'label': 'Показатель "delta"', 'method': 'delta', 'min': 1, 'max': 40, 'k1': 1.125, 'k2': 1, 'k': 1.125, 'value': 0, 'result': 0},
        {'label': 'Самооценка', 'method': 'selfRating', 'min': 1, 'max': 8, 'k1': 0.625, 'k2': 0.4, 'k': 0.25, 'value': 6, 'result': 1.5},
        {'label': 'Речевая активность', 'method': 'talking', 'min': 1, 'max': 5, 'k1': 1, 'k2': 0.7, 'k': 0.7, 'value': 0, 'result': 0}
      ]
    }
  },
  methods: {
    getTestResult (method) {
      return this.testingData.find(e => e.method === method)
    }
  },
  computed: {
    testingDate () {
      return get(this.testing, '[0].date', '')
    },
    totalResult () {
      return get(this.testing, '[0].rating', 0)
    },
    testingData () {
      // const tst = get(this.testing, '[0].testing', '[]')
      // const tstJson = JSON.parse(tst)
      // return this.onlyzero ? tstJson.filter(e => e.value !== 0) : tstJson
      return this.xtesting
    },
    mnemic () {
      const t = this.getTestResult('mnemic')
      if (t) {
        if (t.value < 7) {
          return 'Возможно, существут проблемы либо с произвольной концентрацией внимания и кратковременной памямтью, либо вы просто находитесь не в лучшем физическом состоянии'
        } else if (t.value >= 7 && t.value < 20) {
          return `Хороший результат! Вы запомнили ${t.value} пар слов! Но Вам нужно обратить внимание на концентрацию внимания и кратковременную памямть.`
        } else if (t.value >= 20 && t.value < 30) {
          return `Отличный результат! Вы запомнили ${t.value} пар слов! У вас хорошо развиты мнемические способности.`
        } else {
          return `Великолепно! Вы запомнили ${t.value} пар слов! У вас отлично развиты мнемические способности, это позволит Вам быть лидером в изучении иностранных языков.`
        }
      } else {
        return 'Тест не пройден'
      }
    },
    rating () {
      const t = this.getTestResult('controlRating')
      if (t) {
        if (t.value < 5) {
          return 'Вам рекомендуется прохождение начального цикла занятий по иностранному языку'
        } else if (t.value >= 5 && t.value < 20) {
          return `Вам рекомендуется стандартный курс.`
        } else {
          return `Вам рекомендуется усиленный курс (для продолжающих): главная задача - развитие разговорных навыков и активизация имеющегося словарного запаса.`
        }
      } else {
        return 'Тест не пройден'
      }
    },
    delta () {
      const t = this.getTestResult('delta')
      if (t) {
        if (t.value < 7) {
          return 'Вам не рекомендуются начинать обучение с автоматизированных уроков'
        } else if (t.value >= 5 && t.value < 20) {
          return `Вам рекомендуется стандартный курс. Вы можете узучать иностранные языки с помощью автоматизированных курсов.`
        } else if (t.value >= 20 && t.value < 30) {
          return `У Вас хорошая способность к усвоению информации. Вы можете узучать иностранные языки с помощью автоматизированных курсов.`
        } else {
          return `У Вас очень хорошая способность к усвоению информации. Вам рекомендуется заниматься на интенсивных курсах автоматизированного обучения.`
        }
      } else {
        return 'Тест не пройден'
      }
    },
    summary () {
      const mnemic = this.getTestResult('mnemic')
      const delta = this.getTestResult('delta')
      if (this.totalResult > 7) {
        if (mnemic > 15 && delta > 20) {
          return 'Вы достаточно успешно справитесь с программой обучения и на выходе покажете высокие результаты'
        } else {
          return 'Вы достаточно успешно справитесь с программой обучения, но Вам нужно обратить внимание на запоминание слов и проявлять высокую активность на занаятиях.'
        }
      } else {
        return 'Вы успешно справитесь с программой обучения, но для этого Вам нужно обратить внимание на запоминание слов и проявлять высокую активность на занаятиях.'
      }
    }
  }
}
</script>

<style scoped>
  .final-results-container {
    width: 75vw;
    border: 1px solid lightgrey;
  }
  .final-results-section {
    margin: 1rem 2rem;
  }

  .final-results-section__title,
  .final-summary-section__title {
    font-weight: bold;
  }

  .final-results-section__title {
    border-bottom: 2px solid lightskyblue;
  }

  .final-summary-section__title {
    border-bottom: 2px solid royalblue;
  }

  .final-results-section__text {
    padding-left: 2rem;
  }

  .final-summary-section__text {
    padding-left: 2rem;
    font-weight: bold;
  }

</style>
