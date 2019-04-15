<template>
  <div class='column justify-center no-wrap final-results-container'>
      <div class="row justify-center no-wrap table-header">
        <span class="col-4 cell cell-header">Тест</span>
        <span class="col-2 cell cell-header">min-max</span>
        <span class="col-1 cell cell-header">K1</span>
        <span class="col-1 cell cell-header">K2</span>
        <span class="col-1 cell cell-header">K</span>
        <span class="col-1 cell cell-header">Результат теста</span>
        <span class="col-2 cell cell-header">Балл тестирования</span>
      </div>
      <div v-for="test in testingData" :key="test.label" class="row justify-center no-wrap table-row">
        <span class="col-4 self-end cell cell-text">{{test.label}}</span>
        <span class="col-2 cell cell-number">{{test.min}}-{{test.max}}</span>
        <span class="col-1 cell cell-number">{{test.k1}}</span>
        <span class="col-1 cell cell-number">{{test.k2}}</span>
        <span class="col-1 cell cell-number">{{test.k}}</span>
        <span class="col-1 cell cell-number">{{test.value}}</span>
        <span class="col-2 cell cell-number">{{test.result}}</span>
      </div>
      <div class="row justify-center no-wrap table-footer">
        <span class="col-10 self-end cell cell-text">Суммарный балл тестирования от {{testingDate | dateDMY}}</span>
        <span class="col-2 cell cell-number">{{totalResult}}</span>
      </div>
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
      // resultX: {'mnemic': {'checked': 2, 'checkedWordsPairs': [{'word1': 'история', 'word2': 'арка', 'hide': ''}, {'word1': 'будущее', 'word2': 'писать', 'hide': ''}], 'rememberedWordsPairs': [{'word1': 'история', 'word2': 'арка'}, {'word1': 'будущее', 'word2': 'писать'}], 'remembered': 2, 'percent': 4, 'cancel': true, 'recomendation': '<p>Вы запомнили  <strong>2</strong> слов <strong>(4%)</strong></p>  <p><strong><p>Рекомендуем Вам прервать тестирование, устранить все мешающие и отвлекающие факторы, как следует отдохнуть и повторить все с самого начала еще раз.</p> <p>Если результат не улучшился, рискните продолжить тестирование - зрительное ассоциативное запоминание не единственный вид памяти, может быть, Вы сможете компенсировать результаты за счет слуховой или зрительной механической памяти (повторение - мать учения).</p> <p>Эти виды памяти будут задействованы в следующих заданиях.</p></strong></p>'}, 'selfrating': {'SelfRating': {'raw': {'EN': [{'id': 1, 'name': 'Полное отсутствие знаний.'}], 'DE': [{'id': 2, 'name': 'Могу отличить данный язык от другого.'}], 'FR': [{'id': 1, 'name': 'Полное отсутствие знаний.'}, {'id': 4, 'name': 'Понимаю смысл отдельных фраз.'}]}, 'reduced': {'EN': 1, 'DE': 2, 'FR': 5}}, 'ControlRating': {'raw': {'EN': [{'word1': 'boundless', 'word2': 'бакенбарды', 'hide': 'безграничный'}], 'DE': [{'word1': 'färbe', 'word2': 'конец', 'hide': 'краски'}], 'FR': [{'word1': 'Rangée', 'word2': 'посвящать', 'hide': 'Ряд, строй'}]}, 'reduced': {'EN': 3, 'DE': 4, 'FR': 9}}, 'langSelfRating': {'lang': 'EN', 'value': 1}, 'langControlRating': {'lang': 'EN', 'value': 0}, 'langResult': 'EN', 'recomendation': 'В результате тестирования выбран язык обучения: <p><strong>Английский</strong></p>'}, 'lexical': {'checked': 3, 'checkedWordsPairs': [{'word1': 'airport', 'word2': 'аэропорт', 'hide': 'аэропорт'}, {'word1': 'animal', 'word2': 'животное', 'hide': 'животное'}, {'word1': 'apples', 'word2': 'яблоки', 'hide': 'яблоки'}], 'rememberedWordsPairs': [{'word1': 'airport', 'word2': 'аэропорт'}, {'word1': 'animal', 'word2': 'животное'}, {'word1': 'apples', 'word2': 'яблоки'}], 'remembered': 3, 'percent': 6, 'cancel': true, 'recomendation': '<p>Из 100 предъявленных пар слов вы отметили <strong>3</strong> и запомнили <strong>3</strong> пар</p>'}, 'san': {'before': {'s': 1.75, 'a': 3.5, 'n': 3.25}, 'after': {'s': 4.25, 'a': 3.25, 'n': 3}, 'recomendation': '<p>Ваше самочувствие до проведения аутотренинга:<br> <strong>С: 1.75; А: 3.5; H: 3.25</strong>, после аутотренинга: <strong>С: 4.25; А: 3.25; H: 3</strong>. <br><strong><p>Ваше самочувствие улучшилось, активность ухудшилось, настроение ухудшилось,  после прохождения аутотренинга.</p><br><p>Вы можете перейти к следующему тесту.</p></strong></p>'}, 'lesson': {'0': null, '1': null, '2': null, '3': null, 'recomendation': 'После прохождения пробного урока Ваш результат: <br><strong>Вы не выполнили задание урока</strong>'}, 'endlexical': {'checked': 4, 'checkedWordsPairs': [{'word1': 'also', 'word2': 'также', 'hide': 'также'}, {'word1': 'animal', 'word2': 'животное', 'hide': 'животное'}, {'word1': 'apples', 'word2': 'яблоки', 'hide': 'яблоки'}, {'word1': 'bag', 'word2': 'сумка', 'hide': 'сумка'}], 'rememberedWordsPairs': [{'word1': 'airport', 'word2': 'аэропорт'}, {'word1': 'animal', 'word2': 'животное'}, {'word1': 'apples', 'word2': 'яблоки'}, {'word1': 'bag', 'word2': 'сумка'}], 'remembered': 7, 'percent': 6, 'cancel': true, 'recomendation': '<p>Из 100 предъявленных пар слов вы отметили <strong>4</strong> и запомнили <strong>3</strong> пар</p>'}}
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
      const tst = get(this.testing, '[0].testing', '[]')
      const tstJson = JSON.parse(tst)
      return this.onlyzero ? tstJson.filter(e => e.value !== 0) : tstJson
    }
  }
}
</script>

<style scoped>
  .final-results-container {
    width: 75vw;
    border: 1px solid lightgrey;
  }

  .final-results-title {
    font-weight: 700;
  }

  .table-header {
    border-bottom: 1px solid lightgrey;
    background-color: royalblue;
    color: white;
    /*font-weight: 600;*/
  }

  .table-footer {
    font-weight: 600;
  }

  .table-row {
    border-bottom: 1px solid lightgrey;
    transition: background-color 0.5s ease;
  }

  .table-row:hover {
    background-color: #d9d9d9;
  }

  .cell {
    padding: 0.5rem 1rem;
  }

  .cell-header {
    text-align: center;
  }

  .cell-text {
    text-align: right;
  }

  .cell-number {
    text-align: center;
  }

  .final-result-test__title {

  }

  .final-result-test__info {

  }
</style>
