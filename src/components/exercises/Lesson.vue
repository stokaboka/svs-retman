<template>
<div class="lesson">
  <div class="lesson_box">
    <div v-for="item in items" :key="item.id" class="lesson_row" :class="item.cls">
        <div class="lesson_word lesson_word__left">{{item.word1}}</div>
        <div class="lesson_word lesson_word__right">{{item.word2}}</div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'Lesson',
  props: {
    timer: {
      type: Object,
      default () {
        return []
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
    }
  },

  data () {
    return {
      ready: {
        lesson: false,
        dictionary: false
      },
      items: [],
      lesson: null,
      lessonsCount: 0,
      lessonNum: 0,
      stageNum: 0
    }
  },

  mounted () {
    const data = null
    this.ready.lesson = false
    this.ready.dictionary = false
    this.$emit('exercies-action', {id: 'init-lesson', data})
  },

  methods: {
    nextLesson () {
      this.lessonNum++
      return this.lessonNum <= this.lessonsCount
    },
    nextStage () {
      this.lessonNum = 0
      this.stageNum++
      return (this.stageNum <= 4)
    },

    playStage () {
    },

    playLesson () {
      this.lesson = this.lessons.find(l => l.stage === this.stageNum && l.lesson === this.lessonNum)

      if (this.lesson) {
        this.initLesson()
        return true
      } else {
        console.log('LESSON NOT FOUND', this.stageNum, this.lessonNum)
        return false
      }
    },

    initLesson () {
      const data = {
        scope: this.lesson.scope,
        lang1: this.lesson.lang,
        lang2: this.lang2
      }
      this.ready.lesson = true
      this.ready.dictionary = false
      this.$emit('exercies-action', {id: 'init-lesson-dictionary', data})
    },

    initLessons () {
      this.lessonsCount = this.lessons.reduce(
        (accumulator, currentValue) =>
          accumulator < currentValue.lesson ? currentValue.lesson : accumulator, 0
      )

      if (this.nextStage()) {
        if (this.nextLesson()) {
          this.playLesson()
        }
      } else {
        console.log('THE END')
      }
    },

    initDictionary () {
      this.ready.dictionary = true
      this.items = this.dictionary.map(elem => {
        return {
          ...elem,
          cls: 'lesson_row__active'
        }
      })
    }
  },

  watch: {
    lessons () {
      this.initLessons()
    },
    dictionary () {
      this.initDictionary()
    }

  }
}
</script>

<style scoped>
.lesson {
  display: flex;
  flex-flow: column nowrap;
}

.lesson_box {
  height: 30vh;
  width: 100%;
  border: lightgray 1px solid;
  overflow: hidden;
}

  .lesson_row {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    padding: 0.5rem 0;
  }

.lesson_row__active {
  background-color: aquamarine;
}

  .lesson_row__words {
    display: flex;
    flex-flow: row nowrap;
  }

  .lesson_word {
    padding: 0.2rem 0;
    width: 40%;
  }

  .lesson_word__left {
    text-align: right;
    margin-right: 1rem;
  }

.lesson_word__right {
  text-align: left;
  margin-left: 1rem;
}

</style>
