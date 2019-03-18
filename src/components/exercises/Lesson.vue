<template>
  <div>
    <GlobalEvents @keyup.space.prevent="onPressSpace"></GlobalEvents>
    <div class="lesson">
      <div class="lesson-title">
        <span class="lesson-title__label">Урок</span><span class="lesson-title__num">{{lesson.lesson}}</span>
        <span class="lesson-title__label">Проход</span><span class="lesson-title__stage">{{lesson.stage}}</span>
      </div>
      <div class="lesson-box">
        <div v-for="item in items" :key="item.id" class="lesson-row" :class="item.cls">
            <div class="lesson-word lesson-word__left" :class="{ 'lesson-word__left': stageOneTwoTree, 'lesson-word__center': stageFour}">{{item.word1}}</div>
            <div v-if="stageOneTwoTree" class="lesson-word lesson-word__right">{{item.word2}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import GlobalEvents from 'vue-global-events'

export default {
  name: 'Lesson',
  components: {GlobalEvents},
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
      indexLessonDictionary: 0
    }
  },

  computed: {
    ready () {
      return this.readyLesson && this.readyDictionary && this.readyCue
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

    const data = null
    this.readyLesson = false
    this.readyDictionary = false
    this.$emit('exercies-action', {id: 'init-lesson', data})
  },

  methods: {
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

    initDictionary () {
      this.readyDictionary = true
      this.indexLessonDictionary = -1
      this.items = this.dictionary.map(elem => {
        return {
          ...elem,
          cls: '',
          selected: false
        }
      })
      this.tryStart()
    },

    initCue () {
      this.readyCue = true
      this.tryStart()
    },

    play () {
      if (this.nextLesson()) {
        this.playLesson()
      } else {
        console.log('THE END')
      }
    },

    tryStart () {
      if (this.ready) {
        this.start()
      }
    },

    start () {
      this.audio.mode('ONCE').play(this.lesson.sound)
    },

    onPressSpace () {
      if (this.indexLessonDictionary >= 0 && this.indexLessonDictionary < this.items.length) {
        this.items[this.indexLessonDictionary].selected = true
        this.refreshDictionary()

        this.selectedLessonItems = this.items
          .filter((elem) => { return elem.selected })
          .map((elem, index) => { return index })

        this.$emit('exercies-action', {id: 'lesson-item-selected', data: this.selectedLessonItems})
      }
    },

    refreshDictionary () {
      this.items = this.items.map((elem, index) => {
        let cls = ''
        if (index === this.indexLessonDictionary) {
          cls = 'lesson_row__active'
        }
        if (elem.selected) {
          cls = 'lesson_row__selected'
        }
        return Object.assign({}, elem, {cls})
      }, this)
    },

    checkCuePosition (currentTime) {
      const idx = this.cue.findIndex((el) => el.pos >= currentTime) - 1
      if (idx >= 0 && idx !== this.indexLessonDictionary) {
        this.indexLessonDictionary = idx
        this.refreshDictionary()
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
}

.lesson-box {
  /*height: 30vh;*/
  width: 100%;
  border: lightgray 1px solid;
  /*overflow: hidden;*/
}

  .lesson-row {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    padding: 0.5rem 0;
  }

  .lesson_row__active {
    background-color: aquamarine;
  }

  .lesson_row__selected {
    background-color: darkseagreen;
  }

  .lesson_row__words {
    display: flex;
    flex-flow: row nowrap;
  }

  .lesson-word {
    padding: 0.2rem 0;
    width: 40%;
  }

  .lesson-word__center {
    text-align: center;
    margin-right: 1rem;
  }

  .lesson-word__left {
    text-align: right;
    margin-right: 1rem;
  }

.lesson-word__right {
  text-align: left;
  margin-left: 1rem;
}

  .lesson-title {
    display: flex;
    flex-flow: row wrap;
  }

  .lesson-title__label {
    margin-left: 1rem;
    margin-right: 1rem;
  }

  .lesson-title__num {
    font-weight: bold;
  }

  .lesson-title__stage {
    font-weight: bold;
  }
</style>
