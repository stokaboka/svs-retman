<template>
  <div class="container about-container">
    <q-window-resize-observable @resize="onWindowResize" />
    <div class="about-body">

      <div class="about-text">
        <p>
          <span class="tls">ТЛС</span> предназначен для автоматизированной оценки способностей тестируемого для
          изучения
          иностранного языка в автоматическом режиме.
        </p>
        <p>
          Тестируемый регистрируется в системе и вполняет 6 последовательных тестов:
        </p>
        <ul>
          <li>Мнемонический тест</li>
          <li>Определение языка пробного обучения</li>
          <li>Входной тест знания лексики языка пробного обучения</li>
          <li>Тест влияния аутотренинга на интенсивность обучения</li>
          <li>Пробное обучение</li>
          <li>Выходной тест знания лексики языка пробного обучения</li>
        </ul>
        <p>После выполнения этих тестов, Тестируемый получает автоматическую интерпретацию результатов тестирования.</p>
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

import { animate, easing } from 'quasar'
import {sleep} from '../../lib/utils'

let hintOnScreen = false

export default {
  name: 'AboutServiceComponent',
  async mounted () {
    // this.$nextTick(function () {
    //   window.addEventListener('resize', this.onWindowResize)
    // })

    await sleep(2000)
    this.animateHint()
  },
  data () {
    return {}
  },
  methods: {
    onWindowResize (size) {
      if (hintOnScreen) {
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
  // beforeDestroy () {
  //   window.removeEventListener('resize', this.onWindowResize)
  // }
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
    /*width: 0;*/
    height: auto;

    padding: 2rem;

    border-radius: 1rem;

    color: white;

    background-color: rgba(65, 105, 225, 0.95);

  }
</style>
