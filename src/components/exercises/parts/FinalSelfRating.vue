<template>
  <div class="final-container">

    <div class="final-section">
      <div class="final-row">
        <span class="final-num-label">Выбранный язык обучения:</span>
        <span class="final-num-value">{{result.langResult}}</span>
      </div>
    </div>

    <div class="final-section">

      <q-list>
        <q-collapsible label="Английский">
          <q-list>
            <q-collapsible label="Отмеченные навыки">
              <section class="final-section">
                <div class="final-row" v-for="row in SelfRatingEN" :key="row.word1">
                  <div class="row final-row final-table-row">
                    <span class="col-3 final-num-label">{{row.name}}</span>
                  </div>
                </div>
              </section>
            </q-collapsible>
            <q-collapsible label="Выбранные слова">
              <section class="final-section">
                <div class="final-row" v-for="row in ControlRatingEN" :key="row.word1">
                  <div class="row final-row final-table-row" :class="{'final-negative': row.word2 !== row.hide}">
                    <span class="col-3 final-num-label">{{row.word1}}</span>
                    <span class="col-3 final-num-label">{{row.word2}}</span>
                    <span class="col-3 final-num-label">{{row.hide}}</span>
                  </div>
                </div>
              </section>
            </q-collapsible>
          </q-list>
        </q-collapsible>

        <q-collapsible label="Немецкий">
          <q-list>
            <q-collapsible label="Отмеченные навыки">
              <section class="final-section">
                <div class="final-row" v-for="row in SelfRatingDE" :key="row.word1">
                  <div class="row final-row final-table-row">
                    <span class="col-3 final-num-label">{{row.name}}</span>
                  </div>
                </div>
              </section>
            </q-collapsible>
            <q-collapsible label="Выбранные слова">
              <section class="final-section">
                <div class="final-row" v-for="row in ControlRatingDE" :key="row.word1">
                  <div class="row final-row final-table-row" :class="{'final-negative': row.word2 !== row.hide}">
                    <span class="col-3 final-num-label">{{row.word1}}</span>
                    <span class="col-3 final-num-label">{{row.word2}}</span>
                    <span class="col-3 final-num-label">{{row.hide}}</span>
                  </div>
                </div>
              </section>
            </q-collapsible>
          </q-list>
        </q-collapsible>

        <q-collapsible label="Французский">
          <q-list>
            <q-collapsible label="Отмеченные навыки">
              <section class="final-section">
                <div class="final-row" v-for="row in SelfRatingFR" :key="row.word1">
                  <div class="row final-row final-table-row">
                    <span class="col-3 final-num-label">{{row.name}}</span>
                  </div>
                </div>
              </section>
            </q-collapsible>
            <q-collapsible label="Выбранные слова">
              <section class="final-section">
                <div class="final-row" v-for="row in ControlRatingFR" :key="row.word1">
                  <div class="row final-row final-table-row" :class="{'final-negative': row.word2 !== row.hide}">
                    <span class="col-3 final-num-label">{{row.word1}}</span>
                    <span class="col-3 final-num-label">{{row.word2}}</span>
                    <span class="col-3 final-num-label">{{row.hide}}</span>
                  </div>
                </div>
              </section>
            </q-collapsible>
          </q-list>
        </q-collapsible>

      </q-list>

    </div>

  </div>
</template>

<script>

/*
{
          'SelfRating': {
            'raw': {
              'EN': [
                {
                  'id': 1,
                  'name': 'Полное отсутствие знаний.'
                }
              ],
              'DE': [
                {
                  'id': 5,
                  'name': 'Иностранную речь понимаю, но разговаривать не могу.'
                }
              ],
              'FR': [
                {
                  'id': 8,
                  'name': 'Могу самостоятельно подготовить и сделать сообщение (выступление).'
                }
              ]
            },
            'reduced': {
              'EN': 1,
              'DE': 5,
              'FR': 8
            }
          },
          'ControlRating': {
            'raw': {
              'EN': [
                {
                  'word1': 'boundless',
                  'word2': 'безграничный',
                  'hide': 'безграничный'
                }
              ],
              'DE': [
                {
                  'word1': 'beleidigung',
                  'word2': 'будущее',
                  'hide': 'оскорбление'
                }
              ],
              'FR': [
                {
                  'word1': 'Profiter',
                  'word2': 'пользоваться, извлекать пользу',
                  'hide': 'пользоваться, извлекать пользу'
                }
              ]
            },
            'reduced': {
              'EN': 1,
              'DE': 0,
              'FR': 1
            }
          },
          'langSelfRating': {
            'lang': 'EN',
            'value': 1
          },
          'langControlRating': {
            'lang': 'DE',
            'value': 0
          },
          'langResult': 'DE',
          'recomendation': 'В результате тестирования выбран язык обучения: <p><strong>Немецкий</strong></p>'
        },
 */
require('./final.css')

export default {
  name: 'FinalSelfRating',
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  computed: {
    SelfRatingEN () {
      return this.result.SelfRating.raw.EN.map(e => e)
    },
    SelfRatingDE () {
      return this.result.SelfRating.raw.DE.map(e => e)
    },
    SelfRatingFR () {
      return this.result.SelfRating.raw.FR.map(e => e)
    },

    ControlRatingEN () {
      return this.result.ControlRating.raw.EN.map(e => e)
    },
    ControlRatingDE () {
      return this.result.ControlRating.raw.DE.map(e => e)
    },
    ControlRatingFR () {
      return this.result.ControlRating.raw.FR.map(e => e)
    }
  }
}
</script>

<style scoped>

</style>
