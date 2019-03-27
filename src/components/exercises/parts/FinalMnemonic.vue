<template>
  <div class="final-container">

    <section class="final-section">
      <div class="final-row">
        <span class="final-num-label">Отмечено:</span>
        <span class="final-num-value">{{result.checked}}</span>
      </div>

      <div class="final-row">
        <span class="final-num-label">Запомнено:</span>
        <span class="final-num-value">{{result.remembered}}</span>
      </div>

      <div class="final-row">
        <span class="final-num-label">Рекомендация:</span>
        <span class="final-num-value" v-html="result.recomendation"></span>
      </div>

    </section>

    <section class="final-section">
    <span class="final-num-label">Отмеченные пары слов:</span>
    <div class="row final-row inal-table-header">
      <span class="col-3 final-num-label">Левое</span>
      <span class="col-3 final-num-label">Правое</span>
      <span class="col-3 final-num-label">Выбранное</span>
    </div>
    <div class="final-row" v-for="row in compareWords" :key="row.word1">
      <div class="row final-row final-table-row" :class="{'final-negative': !row.result}">
        <span class="col-3 final-num-label">{{row.word1}}</span>
        <span class="col-3 final-num-label">{{row.word2}}</span>
        <span class="col-3 final-num-label">{{row.rem}}</span>
        {{row.result}}
      </div>
    </div>
    </section>
  </div>
</template>

<script>
require('./final.css')
/*
          'mnemonic': {
            'checked': 2,
            'checkedWordsPairs': [
              {
                'word1': 'история',
                'word2': 'арка',
                'hide': ''
              },
              {
                'word1': 'будущее',
                'word2': 'писать',
                'hide': ''
              }
            ],
            'rememberedWordsPairs': [
              {
                'word1': 'история',
                'word2': 'арка'
              },
              {
                'word1': 'будущее',
                'word2': 'писать'
              }
            ],
            'remembered': 2,
            'recomendation': '<p>Из 50 предъявленных пар слов вы отметили  <strong>2</strong> и запомнили  <strong>2</strong> пар</p>  <p><strong><p>Рекомендуем Вам прервать тестирование, устранить все мешающие и отвлекающие факторы, как следует отдохнуть и повторить все с самого начала еще раз.</p> <p>Если результат не улучшился, рискните продолжить тестирование - зрительное ассоциативное запоминание не единственный вид памяти, может быть, Вы сможете компенсировать результаты за счет слуховой или зрительной механической памяти (повторение - мать учения).</p> <p>Эти виды памяти будут задействованы в следующих заданиях.</p></strong></p>'
          }
 */

export default {
  name: 'FinalMnemonic',
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  computed: {
    compareWords () {
      const out = []

      for (const rem of this.result.rememberedWordsPairs) {
        const i = this.result.checkedWordsPairs.findIndex(e => e.word1 === rem.word1)

        const o = {
          word1: '',
          word2: '',
          rem: '',
          result: false
        }

        if (i >= 0) {
          o.word1 = this.result.checkedWordsPairs[i].word1
          o.word2 = this.result.checkedWordsPairs[i].word2
          o.rem = rem.word2
          o.result = o.word2 === o.rem
        } else {
          o.word1 = rem.word1
          o.word2 = ''
          o.rem = rem.word2
        }
        out.push(o)
      }

      return out
    }
  }
}
</script>

<style scoped>

</style>
