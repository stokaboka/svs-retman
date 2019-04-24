<template>
  <div class="container about-container">

    <q-page-sticky v-show="(audio.playing || audio.paused)" position="right" :offset="[18, 18]">
      <q-btn round dense color="secondary" size="xl" @click="onPlayPause" :icon="playPauseIcon" />
      <q-spinner-audio v-if="false" color="secondary" :size="30" v-show="audio.playing"/>
    </q-page-sticky>

    <div class="about-body">
      <div v-if="allowResume" class="about-text">
        <p>
          <span class="tls tls-color">ТЛС</span> предназначен для оценки способностей Тестируемого к изучению иностранного языка с
          помощью автоматизированной обучающей системы (АОС).
        </p>
        <p>
          Тестируемый регистрируется в системе и выполняет 6 последовательных тестов:
        </p>
        <ul>
          <li>мнемический тест (ассоциативное запоминание пар слов);</li>
          <li>определение языка, изучаемого в режиме <q>Пробное обучение</q> (английский, немецкий, французский);</li>
          <li>входной тест знания лексики выбранного для обучения языка;</li>
          <li>влияние аутотренинга на оптимизацию состояния Тестируемого;</li>
          <li>работа в режиме <q>Пробное обучение</q>;</li>
          <li>выходной тест знания лексики языка, предъявленного в <q>Пробном обучении</q>;</li>
        </ul>
        <p>После завершения работы, Тестируемый получает от АОС результаты тестов, пояснения и рекомендации.</p>

        <div v-if="showPlayInstruction">
          <q-btn
            color="secondary"
            @click="playInstruction"
          >
            {{playInstructionLabel}}
          </q-btn>
          <q-btn v-show="(audio.playing || audio.paused)"
               class="about-palyer about-palyer__button"
               round dense color="secondary"
               size="xl"
               @click="onPlayPause"
               :icon="playPauseIcon"/>
          <q-spinner-audio color="secondary" :size="30" v-show="audio.playing"/>
        </div>

      </div>

      <div v-else class="about-text">
        <p>Программа <span class="tls-color"><strong>CONTROL YOURSELF</strong></span> предлагает Вам продолжить работу завтра или в любое другое удобное для Вас время.</p>
        <p>Успехов Вам!</p>
      </div>

      <image-box-with-animation-text :text="hitStrings">
        <img src="/statics/assets/icons_1082x972_new_02_small.jpg">
      </image-box-with-animation-text>

    </div>
  </div>
</template>

<script>

import {mapState, mapGetters} from 'vuex'
import AudioHelper from '../../lib/AudioHelper'
import ImageBoxWithAnimationText from './ImageBoxWithAnimationText'

export default {
  name: 'AboutServiceComponent',
  components: {ImageBoxWithAnimationText},
  async mounted () {
    this.audio
      .init(this.api, this.sound)
      .theme(this.soundTheme)
      .on('COMPLETE', this.audioEventsHandler)

    this.playBackgroundSound()
  },
  data () {
    return {
      audio: new AudioHelper(this),
      showPlayInstruction: false,
      backgroundSoundVolume: 20,
      hitStrings: [
        'Ты свободен в выборе!',
        'Но лучший выбор – курс',
        '<q>Погружение в языковую среду</q>',
        'в <q>Свободе слова</q>'
      ]
    }
  },
  computed: {
    playInstructionLabel () {
      return (this.audio.playing || this.audio.paused) ? 'Остановить инструкцию' : 'Прослушать инструкцию'
    },
    playPauseIcon () {
      return this.audio.paused ? 'play_circle_filled' : 'pause_circle_filled'
    },
    ...mapState('app', ['api']),
    ...mapState('beginners', ['sound', 'soundTheme']),
    ...mapGetters('app', ['allowResume', 'allowCancel'])
  },
  beforeDestroy () {
    this.audio.stop()
    this.audio = null
  },
  methods: {
    audioEventsHandler () {},
    onPlayPause () {
      if (this.audio) {
        if (this.audio.paused) {
          this.audio.resume()
        } else {
          this.audio.pause()
        }
      }
    },
    playInstruction () {
      const sounds = ['cy-inst2fm0.mp3', 'cy-inst2fm1.mp3']
      if (this.audio.playing || this.audio.paused) {
        this.audio.stop()
      } else {
        this.audio
          .sounds(sounds)
          .mode('ONCE')
          .play()
      }
    },
    playBackgroundSound () {
      this.audio
        .volume(this.backgroundSoundVolume)
        .collection(1, 16, '{{SOUNDTHEME}}/')
        .randomCycle()
        .play()
    }
  }
}
</script>

<style scoped>

  .about-container {
    background-color: white;
  }

  .about-body {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
  }

  .about-text {
    min-width: 400px;
    max-width: 500px;
    margin: 1rem 0;
  }

  .about-image {

  }

  .tls {
    font-size: 3rem;
    font-weight: bold;
  }

  .tls-color {
    color: royalblue;
  }

  .about-palyer {
  }

  .about-palyer__button {
    margin-left: 2rem;
  }

</style>
