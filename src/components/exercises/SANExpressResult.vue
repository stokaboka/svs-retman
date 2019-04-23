<!--
  - Copyright (c) 2019. Igor Khorev http://orangem.me igorhorev@gmail.com
  -->

<template>
  <div class="column justify-center san-result-container">
    <div class="san-result-title">Результаты теста САН
      <span v-if="user" class="san-result-user">
        {{user.firstName}} {{user.secondName}} {{user.lastName}}
      </span>
    </div>

    <div class="san-result-descr">
      <p>Сопоставьте результаты Вашей самооценки самочувствия (С), активности (А) и настроения (Н) до выполнения упражнений аутогенной тренировки (САН1) и после (САН2).</p>
      <p>Ознакомьтесь с комментариями, следуйте рекомендациям.</p>
    </div>

    <div class="column justify-start shadow-3 san-result-block">
      <span class="san-result-label underline-gray">перед аутогенной тренировкой</span>
      <div class="row">
        <span class="san-result-text">САН1 = <span class="san-result-value">{{before}}</span></span>
        <span class="san-result-text">самочувствие = <span class="san-result-value">{{results.san.before.s}}</span></span>
        <span class="san-result-text">активность = <span class="san-result-value">{{results.san.before.a}}</span></span>
        <span class="san-result-text">настроение = <span class="san-result-value">{{results.san.before.n}}</span></span>
      </div>
      <span class="san-result-label underline-gray">после аутогенной тренировки</span>
      <div class="row">
        <span class="san-result-text">САН2 = <span class="san-result-value">{{after}}</span></span>
        <span class="san-result-text">самочувствие = <span class="san-result-value">{{results.san.after.s}}</span></span>
        <span class="san-result-text">активность = <span class="san-result-value">{{results.san.after.a}}</span></span>
        <span class="san-result-text">настроение = <span class="san-result-value">{{results.san.after.n}}</span></span>
      </div>
    </div>

    <div class="column justify-center shadow-3 san-result-block">

      <div v-if="screen===3" class="san-result-recomendation">
        <p class="underline-blue"><strong>Сегодня точно не Ваш день...</strong></p>

        <p>Вы оценили своей общий настрой как крайне неудовлетворительный.<br>
          Программа <strong>CONTROL YOURSELF</strong> сочувствует Вам и предлагает перенести занятия на другой день,<br>
        а пока принять меры к подъему прежде всего того параметра САН1,<br>
        который находится ниже всего от нормы (норма – от 2,8 до 3,2 баллов).<br><br>
        Подлечитесь, немного отдохните или просто развлекитесь.</p>

        <p>Когда будете полностью уверены, что готовы к сосредоточенной, напряженной работе,<br>
        можете продолжить тестирование.</p>

      </div>

      <div v-if="screen===4" class="san-result-recomendation">
        <p class="underline-blue"><strong>Наверное, сегодня - не Ваш день...</strong></p>

        <p>Вы оценили своей общий настрой как неудовлетворительный.<br>
          Программа <strong>CONTROL YOURSELF</strong> сочувствует Вам и предлагает перенести занятия на другой день,<br>
          а пока принять меры к подъему прежде всего того параметра САН1,<br>
          который находится ниже всего от нормы (норма – от 2,8 до 3,2 баллов).<br><br>
          </p>

        <div v-if="recomendationAnswer === 'sleep'">
          <p><q-chip color="secondary" class="shadow-2 san-result-value">наконец-то высплюсь!</q-chip></p>

          <p>...и правильно! Сон, кроме того, что восстанавливает физические силы, служит для того, чтобы упорядочить на подсознательном уровне воспринятую информацию.</p>

          <p>Поэтому, если Вы планируете интенсивно обучаться по нашей программе, рекомендуем после обеда сделать перерыв на сон-отдых хотя бы в 40-50 мин.</p>

          <p>Подробнее смотрите здесь: <a href="https://www.lingvo-svoboda.ru/" target="_blank">Информация о нас для Вас</a></p>
        </div>
        <div v-else-if="recomendationAnswer === 'drink'">
          <p><q-chip color="secondary" class="shadow-2 san-result-value">выпью чего-нибудь из тонизирующего...</q-chip></p>

          <p>Если это будут поливитамины - это то, что нужно, а если спиртное ...</p>
          <p>Программа <strong>CONTROL YOURSELF</strong> извиняется за вторжение в частную жизнь, но обязана предупредить, что алкоголь в данном случае Вам не поможет - любое спиртное блокирует и даже стирает информацию в кратковременной памяти, поэтому интенсивное автоматизированное обучение и алкоголь - вещи несовместимые!</p>
          <p>Подробнее смотрите здесь: <a href="https://www.lingvo-svoboda.ru/" target="_blank">Информация о нас для Вас</a></p>
        </div>
        <div v-else-if="recomendationAnswer === 'idea'">
          <p><q-chip color="secondary" class="shadow-2 san-result-value">что-нибудь придумаю.</q-chip></p>

          <p>Правильно!<br>Самое главное не терять присутствия духа и уверенность в себе! Подлечитесь, немного отдохните или просто развлекитесь.</p>
          <p>Когда почувствуете, что готовы к сосредоточенной, напряженной работе, мы продолжим занятие.</p>
          <p>Программа <strong>CONTROL YOURSELF</strong> всегда к вашим услугам!</p>
          <p>А пока, если хотите, можете ознакомиться с дополнительными сведениями об особенностях автоматизированного обучения: <a href="https://www.lingvo-svoboda.ru/" target="_blank">Информация о нас для Вас</a></p>
        </div>
        <div v-else-if="recomendationAnswer === 'fraud'">
          <p><q-chip color="secondary" class="shadow-2 san-result-value">повторю тест САН и обману программу <strong>CONTROL YOURSELF</strong>!</q-chip></p>
          <p>..."Ах, обмануть меня не трудно!... Я сам обманываться рад!"<br>
            Конечно, Вы можете повторить тест САН, но учтите: Вы оцениваете Сами себя и, поэтому, обманываете себя Сами!
            Ваш организм четко сказал "нет" Вашему желанию. К кому прислушаться – решать Вашему разуму.
            Но, если Ваша интуиция шепчет Вам: "Попытка – не пытка!" – что ж, можете попробовать… Удачи Вам!
          </p>
          <p>Но, все-таки лучше сейчас отложить работу с ТЛС и ограничиться изучением информации об особенностях автоматизированного обучения: <a href="https://www.lingvo-svoboda.ru/" target="_blank">Информация о нас для Вас</a></p>
        </div>

        <div>
          <p>Что Вы предпримете для улучшения самочувствия?</p>
          <q-field
            icon="help_outline"
            helper="Клините мышкой по наиболее подходящему варианту"
            label="Выберите Ваш вариант действий:"
          >
            <q-option-group
              type="radio"
              color="secondary"
              v-model="recomendationAnswer"
              :options="[
              { label: 'наконец-то высплюсь!', value: 'sleep' },
              { label: 'выпью чего-нибудь из тонизирующего...', value: 'drink' },
              { label: 'что-нибудь придумаю.', value: 'idea'},
              { label: 'повторю тест САН и обману программу ТЛС!', value: 'fraud'}
            ]"></q-option-group>
          </q-field>
        </div>
      </div>

      <div v-if="screen === 5" class="san-result-recomendation">
        <p class="underline-blue"><strong>Хорошо!</strong></p>

        <p>Вы оценили свое состояние как, в основном, соответствующее норме - "деловой" настрой.</p>

        <p>Если показатели отдельных параметров САН2 все же ниже нормы (норма – от 2,8 до 3,2 баллов), будем надеяться, что это не помешает Вам в работе.</p>
        <p>Наш девиз: "Работа – лучшее лекарство от хандры!".</p>

        Программа <strong>CONTROL YOURSELF</strong> предлагает Вам продолжить тестирование.
      </div>

      <div v-if="screen === 6" class="san-result-recomendation">
        <p class="underline-blue"><strong>Отлично!</strong></p>
        <p>Вы оценили свое состояние как хорошее, даже "приподнятое"!</p>
        <p>Постарайтесь сохранить этот Ваш настрой во время работы.</p>
        <p>Программа <strong>CONTROL YOURSELF</strong> предлагает Вам продолжить тестирование.</p>
      </div>

      <div v-if="screen === 7" class="san-result-recomendation">
        <p class="underline-blue"><strong>Великолепно!</strong></p>
        <p>Судя по самооценке, Ваше состояние просто... класс!</p>
        <p>Однако, заметим, что повышенная эмоциональная реакция (даже положительная) – может иногда мешать восприятию новой информации (эффект "розовых очков"), особенно во время интенсивного обучения, где нужна предельная сосредоточенность и концентрация внимания.</p>
        <p>Программа <strong>CONTROL YOURSELF</strong> рада за Вас и предлагает немедленно приступить к тестированию, пока Ваш настрой не стал еще лучше, и Вы не улетели бы на "седьмое небо!"</p>
      </div>

      <div v-if="screen === 8" class="san-result-recomendation">
        <p class="underline-blue"><strong>"Остановись, мгновенье! Ты прекрасно!"</strong></p>
        <p>Поздравляем Вас с прекрасным самочувствием, которое, судя по результатам теста САН, Вы в данный момент ощущаете!</p>
        <p>Программа <strong>CONTROL YOURSELF</strong> предлагает Вам сейчас не тратить на лингвистическое тестирование такой воодушевляющий настрой, а пойти и поделиться своим счастьем с друзьями и близкими, сделать для них что-нибудь хорошее!</p>
        <p>Впрочем, если Вы настаиваете, Вы, конечно, можете продолжить занятие.<br>Выбор за Вами!</p>
      </div>

    </div>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'SANExpressResult',
  data () {
    return {
      recomendationAnswer: null,
      screen: 0
    }
  },
  methods: {
    san (val) {
      const {s, a, n} = val
      return Math.round(10 * (s + a + n) / 3) / 10
    },
    getScreen () {
      let screen = 0
      if (this.after <= 1.4) {
        screen = 3
      } else if (this.after <= 2.4) {
        if (this.delta <= 0.2) {
          screen = 3
        } else {
          screen = 4
        }
      } else if (this.after <= 3.6) {
        screen = 5
      } else if (this.after <= 4.8) {
        screen = 6
      } else if (this.after <= 5.8) {
        if (this.delta >= 4.2) {
          screen = 8
        } else {
          screen = 7
        }
      } else {
        screen = 8
      }
      screen = 3
      return screen
    }
  },
  mounted () {
    this.screen = this.getScreen()
    const data = this.buttonsData
    this.$emit('exercies-action', {id: 'changed-sanexpressresult', data})
  },
  computed: {

    before () {
      return this.san(this.results.san.before)
    },
    after () {
      return this.san(this.results.san.after)
    },
    delta () {
      return this.after - this.before
    },
    buttonsData () {
      return {
        next: this.screen === 8 || this.screen === 7 || this.screen === 6 || this.screen === 5 || (this.screen === 4 && this.recomendationAnswer === 'fraud'),
        cancel: this.screen === 3 || this.screen === 4 || this.screen === 8,
        restartSan: this.recomendationAnswer === 'fraud'
      }
    },
    ...mapGetters('beginners', ['results']),
    ...mapGetters('auth', ['user']),
    ...mapState('beginners', [ 'api', 'sound', 'error' ])
  },
  watch: {
    recomendationAnswer (val) {
      const data = this.buttonsData
      this.$emit('exercies-action', {id: 'changed-sanexpressresult', data})
    }
  }
}
</script>

<style scoped>

  .san-result-container {
    width: 60vw;
  }

.san-result-title {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}
  .san-result-descr {
    font-size: 1rem;
  }

  .san-result-user {
    font-weight: bold;
  }

  .san-result-label {
    margin: 1rem 0;
  }

  .underline-blue {
    border-bottom: 2px solid royalblue;
  }

  .underline-gray {
    border-bottom: 2px solid darkgray;
  }

  .san-result-text {
    margin: 0 1rem;
  }

  .san-result-text:first-child {
    margin: 0 0;
  }

  .san-result-value {
    font-weight: bold;
  }

  .san-result-block {
    padding: 1rem 2rem;
    margin-bottom: 1rem;
  }
  .san-result-block:last-child {
    margin-bottom: 0;
  }

  .san-result-recomendation {
    margin: 1rem 0;
  }
</style>
