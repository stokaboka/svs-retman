export default {
  data () {
    return {
      exerciesMethods: {
        'word-pair-checked': this.onWordPairChecked,
        'word-pair-remembered': this.onWordPairRemembered,
        'changed-self-rating': this.onChangedSelfRating,
        'changed-control-rating': this.onChangedControlRating,
        'changed-atself': this.onChangedAtSelf,
        'changed-san': this.onChangedSANSelf,
        'changed-at0': this.onChangedAT0Self,
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
      const obj = {
        level: value,
        label: this.atLevels[value]
      }
      if (this.phase.phase === 1) {
        this.AT.before = obj
      } else {
        this.AT.after = obj
      }
    },

    onChangedSANSelf (value) {
      console.log(value)
      if (this.phase.phase === 1) {
        this.SAN.before = value
      } else {
        this.SAN.after = value
      }
    },

    onChangedAT0Self (value) {
      console.log(value)
      if (this.phase.phase === 1) {
        this.AT0.before = value
      } else {
        this.AT0.after = value
      }
    },

    onInitLesson (value) {
      if (value && value.lang) {
        this.setLearningLang(value.lang)
      }
      this.setDictionary([])
      this.getLessons({lang: this.learningLang})
    },

    onInitLessonDictionary (value) {
      this.getDictionary(value)
      this.getCue(value)
    },

    onLessonItemSelected (value) {
      const idx = value.lesson - 1
      if (!this.lesson[idx]) {
        this.lesson[idx] = {
          lang: '',
          stages: [ [], [], [], [] ],
          matches: [0, 0, 0, 0],
          partials: [0, 0, 0, 0],
          difference: [0, 0, 0, 0]
        }
      }

      this.lesson[idx].lang = value.lang
      this.lesson[idx].stages[value.stage - 1] = value.items

      // console.log(this.lesson)
    }
  }
}
