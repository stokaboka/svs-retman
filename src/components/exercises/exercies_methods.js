export default {
  data () {
    return {
      exerciesMethods: {
        'word-pair-checked': this.onWordPairChecked,
        'word-pair-remembered': this.onWordPairRemembered,
        'changed-self-rating': this.onChangedSelfRating,
        'changed-control-rating': this.onChangedControlRating,
        'changed-atself': this.onChangedAtSelf,
        'init-lesson': this.onInitLesson,
        'init-lesson-dictionary': this.onInitLessonDictionary,
        'lesson-item-selected': this.onLessonItemSelected
      }
    }
  },
  methods: {
    // mnemonic test
    onWordPairChecked (values) {
      this.checkedWordsPairs = values
    },

    onWordPairRemembered (values) {
      if (this.phase.index1 === 0) {
        this.rememberedWordsPairs1 = values
      } else if (this.phase.index1 === 50) {
        this.rememberedWordsPairs2 = values
      } else {
        this.rememberedWordsPairs = values
      }
    },

    // self rating test
    onChangedSelfRating (values) {
      this.SelfRating = values
    },
    onChangedControlRating (values) {
      this.ControlRating[this.phase.lang1] = values
    },

    onChangedAtSelf (value) {
      if (this.phase.phase === 1) {
        this.AT.before = value
      } else {
        this.AT.after = value
      }
    },

    onInitLesson (value) {
      this.setDictionary([])
      this.getLessons({lang: this.learningLang})
    },

    onInitLessonDictionary (value) {
      this.getDictionary(value)
      this.getCue(value)
    },

    onLessonItemSelected (value) {

    }

  }
}
