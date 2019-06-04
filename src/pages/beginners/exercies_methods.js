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
        'changed-sanexpress': this.onChangedSanExpress,
        'changed-sanexpressresult': this.onChangedSanExpressResult,
        'changed-at0': this.onChangedAT0Self,
        'init-lesson': this.onInitLesson,
        'init-lesson-dictionary': this.onInitLessonDictionary,
        'lesson-item-selected': this.onLessonItemSelected
      }
    }
  },
  methods: {

    setDataResult (resultId, result) {
      if (resultId && result) {
        this.setResults({
          prop: resultId,
          value: Object.assign({}, result, {recomendation: ''})
        })
      }
    },

    onWordPairChecked (values) {
      const result = this.initData(this.phase.result, 'checkedWordsPairs', values)
      this.setDataResult(this.phase.result, result)
    },

    onWordPairRemembered (values) {
      let result = null
      if (this.phase.index1 === 0) {
        result = this.initData(this.phase.result, 'rememberedWordsPairs1', values)
      } else if (this.phase.index1 === 50) {
        result = this.initData(this.phase.result, 'rememberedWordsPairs2', values)
      } else {
        result = this.initData(this.phase.result, 'rememberedWordsPairs', values)
      }
      this.setDataResult(this.phase.result, result)
    },

    // self rating test
    onChangedSelfRating (values) {
      const result = this.initData(this.phase.result, 'SelfRating', values)
      this.setDataResult(this.phase.result, result)
    },
    onChangedControlRating (values) {
      const result = this.initData(this.phase.result, 'ControlRating', values)
      this.setDataResult(this.phase.result, result)
    },

    onChangedAtSelf (value) {
      const obj = {
        level: value,
        label: this.atLevels[value]
      }
      const result = this.initData(this.phase.result, this.phase.phase === 1 ? 'before' : 'after', obj)
      this.setDataResult(this.phase.result, result)
    },

    onChangedSANSelf (value) {
      // console.log(value)
      const result = this.initData(this.phase.result, this.phase.phase === 1 ? 'before' : 'after', value)
      this.setDataResult(this.phase.result, result)
    },

    onChangedSanExpress (value) {
      // console.log(value)
      const result = this.initData(this.phase.result, this.phase.phase === 1 ? 'before' : 'after', value)
      this.setDataResult(this.phase.result, result)
    },

    onChangedSanExpressResult (value) {
      this.setAllowResume(value.next)
      this.setAllowCancel(value.cancel)
      this.setRestartStep(value.restartStep)
    },

    onChangedAT0Self (value) {
      // console.log(value)
      const result = this.initData(this.phase.result, this.phase.phase === 1 ? 'before' : 'after', value)
      this.setDataResult(this.phase.result, result)
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
      const result = this.initData(this.phase.result, '', value)
      this.setDataResult(this.phase.result, result)
    }
  }
}
