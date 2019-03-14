<template>

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
      required: true
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
    ready: {
      lesson: false,
      dictionary: false
    }
  },

  data () {
    return {
      lesson: null,
      lessonIndex: 0
    }
  },

  mounted () {
    const data = null
    this.$emit('exercies-action', {id: 'init-lesson', data})
  },

  methods: {
    initLessons () {
      this.lessonIndex = 0
      this.lesson = this.lessons[this.lessonIndex]
      this.initLesson()
    },
    initLesson () {
      const data = {
        scope: this.lesson.scope,
        lang1: this.lesson.lang,
        lang2: this.lang2
      }
      this.$emit('exercies-action', {id: 'init-lesson-dictionary', data})

      this.ready.lesson = true
    },
    initDictionary () {
      this.ready.dictionary = true
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

</style>
