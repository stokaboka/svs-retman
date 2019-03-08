export default {
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
    }

  }
}
