<template>
  <div class="final-container">

    <section class="final-section">

      <q-list>
        <q-collapsible v-for="lessonIndex  in 4"
                       v-if="result[lessonIndex-1]"
                       :key="lessonIndex"
                       :label="`Урок ${lessonIndex}, язык ${result[lessonIndex-1].lang}`"
        >
          <q-list>
            <q-collapsible v-for="stage in 4"
                           :key="stage"
                           :label="`Проход ${stage}`"
            >
              <section class="final-section">
                <div class="final-row row">
                  <span class="final-num-label col-3">Cовпадений полных:</span>
                  <span class="final-num-value col">{{result[lessonIndex-1].matches[stage-1]}}</span>
                </div>
                <div class="final-row row">
                  <span class="final-num-label col-3"> - частичных:</span>
                  <span class="final-num-value col">{{result[lessonIndex-1].partials[stage-1]}}</span>
                </div>
                <div class="final-row row">
                  <span class="final-num-label col-3"> - без совпадений:</span>
                  <span class="final-num-value col">{{result[lessonIndex-1].difference[stage-1]}}</span>
                </div>
              </section>

              <q-list>
                <q-collapsible label="Отмеченные фразы"
                >
                  <div class="final-row" v-for="row in result[lessonIndex-1].stages[stage-1]" :key="row">
                    <span class="final-num-value col" :class="getIndexClass(row)">{{row}}</span>
                  </div>
                </q-collapsible>
              </q-list>

            </q-collapsible>
          </q-list>
        </q-collapsible>
      </q-list>

    </section>

  </div>
</template>

<script>

/*
{
          '0': {
            'lang': 'DE',
            'stages': [
              [
                '- Das ist ein Zimmer.',
                '- Das ist ein Tisch.',
                '- Das ist ein Stuhl.'
              ],
              [],
              [],
              [
                '- Das ist ein Zimmer.',
                '- Das ist ein Tisch.',
                '- Das ist ein Stuhl.',
                '- Das ist ein Sessel.',
                '- Das ist ein Schrank.'
              ]
            ],
            'matches': [
              0,
              0,
              0,
              0
            ],
            'partials': [
              3,
              0,
              0,
              3
            ],
            'difference': [
              0,
              0,
              0,
              2
            ]
          },
          '1': {
            'lang': 'DE',
            'stages': [
              [
                '- Guten Tag, Frau Kröger!',
                '- Guten Tag, Frau Nowak, wieder in Berlin?'
              ],
              [],
              [],
              [
                '- Guten Tag, Frau Kröger!',
                '- Guten Tag, Frau Nowak, wieder in Berlin?',
                '- Ja, wieder in Berlin.'
              ]
            ],
            'matches': [
              0,
              0,
              0,
              0
            ],
            'partials': [
              2,
              0,
              0,
              2
            ],
            'difference': [
              0,
              0,
              0,
              1
            ]
          },
          '2': null,
          '3': null,
          'recomendation': 'После прохождения пробного урока Ваш результат: <br><br><p>Урок <strong>1</strong>, язык обучения <strong>DE</strong></p><p>Проход 1: совпадений полных <strong><strong>0</strong></strong>, частичных - <strong><strong>3</strong></strong>, без совпадений - <strong><strong>0</strong></strong></p><p>Проход 2: совпадений полных <strong><strong>0</strong></strong>, частичных - <strong><strong>0</strong></strong>, без совпадений - <strong><strong>0</strong></strong></p><p>Проход 3: совпадений полных <strong><strong>0</strong></strong>, частичных - <strong><strong>0</strong></strong>, без совпадений - <strong><strong>0</strong></strong></p><p>Проход 4: совпадений полных <strong><strong>0</strong></strong>, частичных - <strong><strong>3</strong></strong>, без совпадений - <strong><strong>2</strong></strong></p><br><p>Урок <strong>2</strong>, язык обучения <strong>DE</strong></p><p>Проход 1: совпадений полных <strong><strong>0</strong></strong>, частичных - <strong><strong>2</strong></strong>, без совпадений - <strong><strong>0</strong></strong></p><p>Проход 2: совпадений полных <strong><strong>0</strong></strong>, частичных - <strong><strong>0</strong></strong>, без совпадений - <strong><strong>0</strong></strong></p><p>Проход 3: совпадений полных <strong><strong>0</strong></strong>, частичных - <strong><strong>0</strong></strong>, без совпадений - <strong><strong>0</strong></strong></p><p>Проход 4: совпадений полных <strong><strong>0</strong></strong>, частичных - <strong><strong>2</strong></strong>, без совпадений - <strong><strong>1</strong></strong></p>'
        }
 */
export default {
  name: 'FinalLessonPassiv',
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    getIndexClass (w) {
      const v = this.getIndexValue(w)
      switch (v) {
        case 4 :
        case 3 :
          return 'final-positive'
        case 2 :
          return 'final-neutral'
        default :
          return 'final-negative'
      }
    },
    getIndexValue (w) {
      const out = this.matchesIndex.find(e => e.w === w)
      if (out) {
        return out.c
      } else {
        return 0
      }
    }
  },
  computed: {
    matchesIndex () {
      const index = []
      for (let l = 0; l < 4; l++) {
        if (this.result[l]) {
          for (let s = 0; s < 4; s++) {
            const rows = this.result[l].stages[s]
            for (let row of rows) {
              const idx = index.findIndex(e => e.w === row)
              if (idx < 0) {
                index.push({w: row, c: 1})
              } else {
                index[idx].c = index[idx].c + 1
              }
            }
          }
        }
      }
      // console.log(index)
      return index
    }
  }
}
</script>

<style scoped>

</style>
