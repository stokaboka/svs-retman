<template>
  <div>
    <GlobalEvents @keyup.space.prevent="onPressSpace"></GlobalEvents>

    <div class="lesson">
      <div v-if="lesson" class="lesson-title">
        <div><span class="lesson-title__label">Урок:</span><span class="lesson-title__num">{{lesson.lesson}}</span></div>
        <div><span class="lesson-title__label">Проход:</span><span class="lesson-title__num">{{lesson.stage}}</span></div>
        <div><span class="lesson-title__label">Задание:</span><span class="lesson-title__title" v-html="lesson.title"></span></div>
      </div>
      <div class="lesson-box" ref="lessonBox" @touchend="onTouchEnd">
        <lesson-row v-for="(item) in items"
                    :key="item.id"
                    class="lesson-row"
                    ref="rows"
                    :item="item"
                    :current-index="indexLessonDictionary"
                    :mode="lessonRowMode"
                    :stage-four="stageFour"
                    @click.prevent="onPressSpace"
        >
        </lesson-row>
      </div>
    </div>
  </div>
</template>

<script>
// <q-btn @click="play()"></q-btn>
import get from 'lodash/get'
import GlobalEvents from 'vue-global-events'
import { scroll } from 'quasar'
import LessonRow from './parts/LessonRow'

const { setScrollPosition } = scroll

let numFixedRows = 3
let itemElementFirst = null
let itemElementTop = null
let itemElementBotton = null
let topLimit = 0
let bottomLimit = 0
let rowHeight = 0

export default {
  name: 'Lesson',
  components: {LessonRow, GlobalEvents},
  props: {
    audio: {
      type: Object,
      default () {
        return {}
      },
      required: true
    },
    timer: {
      type: Object,
      default () {
        return {}
      },
      required: true
    },
    lang2: {
      type: String,
      default () {
        return 'RU'
      },
      required: false
    },
    lessons: {
      type: Array,
      default () {
        return []
      },
      required: true
    },
    dictionary: {
      type: Array,
      default () {
        return []
      },
      required: true
    },
    cue: {
      type: Array,
      default () {
        return []
      },
      required: true
    }
  },

  data () {
    return {
      readyLesson: false,
      readyDictionary: false,
      readyCue: false,
      items: [],
      lesson: null,
      lessonIndex: 0,
      indexLessonDictionary: 0,
      reverseCue: []
    }
  },

  computed: {
    ready () {
      return this.readyLesson && this.readyDictionary && this.readyCue
    },
    lessonRowMode () {
      return this.lesson.stage === 4 ? 'WORD2' : 'BOTH'
    },
    stageOneTwoTree () {
      return this.lesson.stage !== 4
    },
    stageFour () {
      return this.lesson.stage === 4
    }
  },

  mounted () {
    this.audio
      .on('START', this.audioHandler)
      .on('PROGRESS', this.audioHandler)
      .on('COMPLETE', this.audioHandler)

    this.readyLesson = false
    this.readyDictionary = false

    // let data = process.env.NODE_ENV === 'production' ? null : {lang: 'FR'}
    const data = null
    this.$emit('exercies-action', {id: 'init-lesson', data})
  },

  methods: {
    scrollToElement (el, force) {
      if (el) {
        let target = this.$refs.lessonBox
        let offset = el.offsetTop - this.$refs.lessonBox.offsetTop
        let duration = 500
        if (force) {
          setScrollPosition(target, offset, duration)
        } else {
          topLimit = itemElementTop.$el.offsetTop - this.$refs.lessonBox.offsetTop
          bottomLimit = itemElementBotton.$el.offsetTop - this.$refs.lessonBox.offsetTop
          if (topLimit < offset && offset < bottomLimit) {
            offset -= rowHeight * numFixedRows
            setScrollPosition(target, offset, duration)
          }
        }
      } else {
        console.log('Element not found')
      }
    },

    nextLesson () {
      this.lessonIndex++
      return this.lessonIndex < this.lessons.length
    },

    playLesson () {
      this.lesson = this.lessons[this.lessonIndex]
      if (this.lesson) {
        this.initLesson()
        return true
      } else {
        console.log('STAGE-LESSON NOT FOUND', this.lessonIndex)
        return false
      }
    },

    initLesson () {
      const data = {
        scope: this.lesson.scope,
        lang1: this.lesson.lang,
        lang2: this.lang2,
        file: this.lesson.sound
      }
      this.readyLesson = true
      this.readyDictionary = false
      this.readyCue = false

      this.$emit('exercies-action', {id: 'init-lesson-dictionary', data})
    },

    initLessons () {
      this.lessonIndex = -1
      this.play()
    },

    async initDictionary () {
      this.readyDictionary = true
      this.indexLessonDictionary = -1
      this.items = this.dictionary.map((elem, index) => {
        return {
          ...elem,
          index,
          current: false,
          selected: false
        }
      })

      await this.$nextTick()

      if (this.$refs.rows) {
        itemElementFirst = this.$refs.rows.find((el) => el.item.index === 0, this)
        itemElementTop = this.$refs.rows.find((el) => el.item.index === numFixedRows, this)
        itemElementBotton = this.$refs.rows.find((el) => el.item.index === this.items.length - numFixedRows, this)
        rowHeight = itemElementTop.$el.offsetHeight
      }

      this.tryStart()
    },

    initCue () {
      this.reverseCue = this.cue.map(el => el).reverse()
      this.readyCue = true
      this.tryStart()
    },

    play () {
      if (this.nextLesson()) {
        this.playLesson()
      } else {
        console.log('THE END')
        this.$emit('exercies-action', {id: 'do-next-action', data: null})
      }
    },

    tryStart () {
      if (this.ready) {
        this.start()
      }
    },

    start () {
      if (itemElementTop) {
        this.scrollToElement(itemElementFirst.$el, true)
      }

      const startSoundOffset = get(this.reverseCue, '[0]', 0) - 1
      // const startSoundOffset = (this.reverseCue.length === 0 || this.reverseCue[0] - 1) < 0 ? 0 : this.reverseCue[0] - 1

      this.audio
        .mode('ONCE')
        .play(this.lesson.sound, startSoundOffset)
    },

    onTouchEnd (event) {
      // console.log('onTouchEnd')
      event.stopPropagation()
      this.onPressSpace()
    },

    onPressSpace () {
      if (this.indexLessonDictionary >= 0 && this.indexLessonDictionary < this.items.length) {
        this.items[this.indexLessonDictionary].selected = true
        this.refreshDictionary()

        const items = this.items
          .filter((elem) => { return elem.selected })
          .map((elem, index) => { return elem.word1 })

        const data = {
          lesson: this.lesson.lesson,
          lang: this.lesson.lang,
          stage: this.lesson.stage,
          items
        }
        this.$emit('exercies-action', {id: 'lesson-item-selected', data})
      }
    },

    refreshDictionary () {
      this.items = this.items.map((elem, index) => {
        return {
          ...elem,
          current: index === this.indexLessonDictionary,
          index
        }
      }, this)
    },

    checkCuePosition (currentTime) {
      const idx = this.cue.length - 1 - this.cue.findIndex((el) => el.pos < currentTime)
      if (idx >= 0 && idx !== this.indexLessonDictionary) {
        this.indexLessonDictionary = idx
        this.refreshDictionary()

        if (this.indexLessonDictionary > numFixedRows && this.indexLessonDictionary < this.items.length - numFixedRows) {
          if (this.$refs.rows) {
            const elem = this.$refs.rows.find((el) => el.item.index === this.indexLessonDictionary, this)
            if (elem) {
              this.scrollToElement(elem.$el, false)
            }
          }
        }
      }
    },

    audioHandler (event) {
      switch (event.event) {
        case 'START' :
          break
        case 'PROGRESS' :
          this.checkCuePosition(event.currentTime)
          break
        case 'COMPLETE' :
          this.play()
          break
      }
    }

  },

  watch: {
    lessons () {
      this.initLessons()
    },
    dictionary () {
      this.initDictionary()
    },
    cue () {
      this.initCue()
    }
  }
}
</script>

<style scoped>
  .lesson {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    padding: 0 6rem;
  }

  .lesson-box {
    height: 50vh;
    width: 75vw;
    border: lightgray 1px solid;
    border-radius: 3px;
    overflow: hidden;

    background-color: white;
    box-shadow: 1px 1px 6px 1px rgba(0, 0, 0, .2);

    margin: 1rem 0 0 0;
  }

  .lesson-row {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    padding: 0.5rem 0;
  }

  .lesson_row__words {
    display: flex;
    flex-flow: row nowrap;
  }

  .lesson-title {
    display: flex;
    flex-flow: row wrap;
  }

  .lesson-title__label {
    margin-left: 1rem;
    margin-right: 1rem;
  }

  .lesson-title__title {

  }

  .lesson-title__num {
    font-weight: bold;
  }

  .lesson-title__description {
    font-size: 1.2rem;
  }
</style>
