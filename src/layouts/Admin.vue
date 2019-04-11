<template>
  <div class='final-results-container'>
    <h3 class='final-results-title'>Результаты тестирования</h3>
        <q-list>
          <q-collapsible
            v-for='(test, key) in tests'
            :key='key'
            :icon='test.icon'
            :label='test.label'>
            <div>
              <component :is='test.component' :result='results[key]'></component>
            </div>
          </q-collapsible>
        </q-list>
  </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

import FinalMnemonic from './parts/FinalMnemonic'
import FinalSelfRating from './parts/FinalSelfRating'
import FinalLexical from './parts/FinalLexical'
import FinalAtTraining from './parts/FinalAtTraining'
import FinalLessonPassiv from './parts/FinalLessonPassiv'
import FinalEndLexical from './parts/FinalEndLexical'

export default {
  name: 'Admin',
  components: {
    FinalMnemonic,
    FinalSelfRating,
    FinalLexical,
    FinalAtTraining,
    FinalLessonPassiv,
    FinalEndLexical
  },
  data () {
    return {
      // resultX: {'mnemic': {'checked': 2, 'checkedWordsPairs': [{'word1': 'история', 'word2': 'арка', 'hide': ''}, {'word1': 'будущее', 'word2': 'писать', 'hide': ''}], 'rememberedWordsPairs': [{'word1': 'история', 'word2': 'арка'}, {'word1': 'будущее', 'word2': 'писать'}], 'remembered': 2, 'percent': 4, 'cancel': true, 'recomendation': '<p>Вы запомнили  <strong>2</strong> слов <strong>(4%)</strong></p>  <p><strong><p>Рекомендуем Вам прервать тестирование, устранить все мешающие и отвлекающие факторы, как следует отдохнуть и повторить все с самого начала еще раз.</p> <p>Если результат не улучшился, рискните продолжить тестирование - зрительное ассоциативное запоминание не единственный вид памяти, может быть, Вы сможете компенсировать результаты за счет слуховой или зрительной механической памяти (повторение - мать учения).</p> <p>Эти виды памяти будут задействованы в следующих заданиях.</p></strong></p>'}, 'selfrating': {'SelfRating': {'raw': {'EN': [{'id': 1, 'name': 'Полное отсутствие знаний.'}], 'DE': [{'id': 2, 'name': 'Могу отличить данный язык от другого.'}], 'FR': [{'id': 1, 'name': 'Полное отсутствие знаний.'}, {'id': 4, 'name': 'Понимаю смысл отдельных фраз.'}]}, 'reduced': {'EN': 1, 'DE': 2, 'FR': 5}}, 'ControlRating': {'raw': {'EN': [{'word1': 'boundless', 'word2': 'бакенбарды', 'hide': 'безграничный'}], 'DE': [{'word1': 'färbe', 'word2': 'конец', 'hide': 'краски'}], 'FR': [{'word1': 'Rangée', 'word2': 'посвящать', 'hide': 'Ряд, строй'}]}, 'reduced': {'EN': 3, 'DE': 4, 'FR': 9}}, 'langSelfRating': {'lang': 'EN', 'value': 1}, 'langControlRating': {'lang': 'EN', 'value': 0}, 'langResult': 'EN', 'recomendation': 'В результате тестирования выбран язык обучения: <p><strong>Английский</strong></p>'}, 'lexical': {'checked': 3, 'checkedWordsPairs': [{'word1': 'airport', 'word2': 'аэропорт', 'hide': 'аэропорт'}, {'word1': 'animal', 'word2': 'животное', 'hide': 'животное'}, {'word1': 'apples', 'word2': 'яблоки', 'hide': 'яблоки'}], 'rememberedWordsPairs': [{'word1': 'airport', 'word2': 'аэропорт'}, {'word1': 'animal', 'word2': 'животное'}, {'word1': 'apples', 'word2': 'яблоки'}], 'remembered': 3, 'percent': 6, 'cancel': true, 'recomendation': '<p>Из 100 предъявленных пар слов вы отметили <strong>3</strong> и запомнили <strong>3</strong> пар</p>'}, 'san': {'before': {'s': 1.75, 'a': 3.5, 'n': 3.25}, 'after': {'s': 4.25, 'a': 3.25, 'n': 3}, 'recomendation': '<p>Ваше самочувствие до проведения аутотренинга:<br> <strong>С: 1.75; А: 3.5; H: 3.25</strong>, после аутотренинга: <strong>С: 4.25; А: 3.25; H: 3</strong>. <br><strong><p>Ваше самочувствие улучшилось, активность ухудшилось, настроение ухудшилось,  после прохождения аутотренинга.</p><br><p>Вы можете перейти к следующему тесту.</p></strong></p>'}, 'lesson': {'0': null, '1': null, '2': null, '3': null, 'recomendation': 'После прохождения пробного урока Ваш результат: <br><strong>Вы не выполнили задание урока</strong>'}, 'endlexical': {'checked': 4, 'checkedWordsPairs': [{'word1': 'also', 'word2': 'также', 'hide': 'также'}, {'word1': 'animal', 'word2': 'животное', 'hide': 'животное'}, {'word1': 'apples', 'word2': 'яблоки', 'hide': 'яблоки'}, {'word1': 'bag', 'word2': 'сумка', 'hide': 'сумка'}], 'rememberedWordsPairs': [{'word1': 'airport', 'word2': 'аэропорт'}, {'word1': 'animal', 'word2': 'животное'}, {'word1': 'apples', 'word2': 'яблоки'}, {'word1': 'bag', 'word2': 'сумка'}], 'remembered': 3, 'percent': 6, 'cancel': true, 'recomendation': '<p>Из 100 предъявленных пар слов вы отметили <strong>4</strong> и запомнили <strong>3</strong> пар</p>'}},
      tests: {
        mnemic: {
          label: 'Мнемонический тест',
          component:
            'FinalMnemonic',
          icon:
            'explore',
          opened:
            true
        },
        selfrating: {
          label: 'Определение языка пробного обучения',
          component:
            'FinalSelfRating',
          icon:
            'explore',
          opened:
            true
        },
        lexical: {
          label: 'Входной тест знания лексики языка пробного обучения',
          component:
            'FinalMnemonic',
          icon:
            'explore',
          opened:
            true
        },
        atself: {
          label: 'Тест влияния аутотренинга на интенсивность обучения',
          component:
            'FinalAtTraining',
          icon:
            'explore',
          opened:
            true
        },
        lesson: {
          label: 'Пробное обучение (пассив)',
          component:
            'FinalLessonPassiv',
          icon:
            'explore',
          opened:
            true
        },
        endlexical: {
          label: 'Выходной тест знания лексики языка пробного обучения',
          component:
            'FinalMnemonic',
          icon:
            'explore',
          opened:
            true
        }
      }
    }
  },
  async mounted () {
    // const result = await this.loadResult()
    // const results = await this.loadResults()
  },
  computed: {
    ...mapGetters('beginners', [
      'results',
      'testing'
    ])
  },
  methods: {
    // ...mapActions('auth', ['signin']),
    // async loadTestingResult () {
    //   const result = await this.loadResult()
    //   if (result) {
    //     this.$q.notify({message: 'Выполнена обработка результатов.', type: 'info'})
    //   } else {
    //     this.$q.notify({message: 'Обработку результатов не удаляись. Попробуйте еще раз позднее.', type: 'negative'})
    //   }
    // },

    // async save () {
    //   // const result = await this.saveResult(JSON.stringify(this.resultX))
    //   if (result) {
    //     this.$q.notify({message: 'Результы теста успешно сохранены.', type: 'info'})
    //     this.loadTestingResult()
    //   } else {
    //     this.$q.notify({message: 'Результы теста не удалось сохранить.', type: 'negative'})
    //   }
    // },
    ...mapActions('beginners', [
      'saveResult',
      'loadResult',
      'loadResults'
    ])
  }
}
</script>

<style scoped>

</style>
