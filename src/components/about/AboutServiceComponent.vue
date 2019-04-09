<template>
  <div class="container about-container">

    <q-window-resize-observable @resize="onWindowResize"/>

    <q-page-sticky v-show="(audio.playing || audio.paused)" position="right" :offset="[18, 18]">
      <q-btn round dense color="secondary" size="xl" @click="onPlayPause" :icon="playPauseIcon" />
      <q-spinner-audio v-if="false" color="secondary" :size="30" v-show="audio.playing"/>
    </q-page-sticky>

    <div class="about-body">

      <div class="about-text">
        <p>
          <span class="tls">ТЛС</span> предназначен для оценки способностей Тестируемого к изучению иностранного языка с
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

      <div class="about-image" ref="img">
        <img src="/statics/assets/icons_1082x972_new_02_small.jpg">
      </div>

      <div class="about-hit shadow-4" ref="hint">
        <span>Ты свободен в выборе!<br/><br/>
          Но лучший выбор - курс<br/>
          <span style="font-weight: 600;">"Погружение в языковую среду"</span>
        </span>
      </div>

    </div>
  </div>
</template>

<script>

import {mapState} from 'vuex'
import {animate, easing} from 'quasar'
import {sleep} from '../../lib/utils'
import AudioHelper from '../../lib/AudioHelper'

let hintOnScreen = false

export default {
  name: 'AboutServiceComponent',
  async mounted () {
    this.audio
      .init(this.api, this.sound)
      .theme(this.soundTheme)
      .on('COMPLETE', this.audioEventsHandler)

    this.playBackgroundSound()

    await sleep(2000)
    this.animateHint()
  },
  data () {
    return {
      audio: new AudioHelper(this),
      showPlayInstruction: false,
      backgroundSoundVolume: 30
    }
  },
  computed: {
    playInstructionLabel () {
      return (this.audio.playing || this.audio.paused) ? 'Остановить инструкцию' : 'Прослушать инструкцию'
    },
    playPauseIcon () {
      return this.audio.paused ? 'play_circle_filled' : 'pause_circle_filled'
    },
    ...mapState('beginners', ['api', 'sound', 'soundTheme'])
  },
  beforeDestroy () {
    this.audio.stop()
    this.audio = null
  },
  methods: {
    audioEventsHandler () {

    },
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
        this.audio.sounds(sounds).mode('ONCE').play()
      }
    },
    playBackgroundSound () {
      this.audio.volume(this.backgroundSoundVolume).collection(1, 16, '{{SOUNDTHEME}}/').randomCycle().play()
    },

    onWindowResize (size) {
      if (hintOnScreen && this.$refs.img) {
        const toImgRight = size.width - (this.$refs.img.offsetLeft + this.$refs.img.offsetWidth)
        this.$refs.hint.style.top = `${this.$refs.img.offsetTop + this.$refs.img.offsetHeight / 2}px`
        this.$refs.hint.style.right = `${toImgRight}px`
      }
    },

    animateHint () {
      const element = this.$refs.hint
      element.style.top = `${this.$refs.img.offsetTop + this.$refs.img.offsetHeight / 2}px`
      const toImgRight = window.innerWidth - (this.$refs.img.offsetLeft + this.$refs.img.offsetWidth)
      animate.start({
        from: -this.$refs.hint.clientWidth,
        to: toImgRight,
        easing: easing.decelerate,
        apply (pos) {
          element.style.right = `${pos}px`
          if (pos > 0) {
            element.style.display = 'block'
          }
        },
        done () {
          hintOnScreen = true
        }
      })
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
  }

  .about-image {

  }

  .tls {
    font-size: 3rem;
    font-weight: bold;
    color: royalblue;
  }

  .about-hit {
    display: none;
    position: absolute;
    right: -1000px;
    width: 320px;
    height: auto;
    padding: 2rem;
    border-radius: 1rem;
    color: white;
    background-color: rgba(65, 105, 225, 0.95);
  }

  .about-palyer {
  }

  .about-palyer__button {
    margin-left: 2rem;
  }

</style>
