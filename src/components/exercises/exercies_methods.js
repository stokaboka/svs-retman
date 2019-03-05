export default {
  methods: {
    // mnemonic test
    onWordPairChecked (values) {
      this.checkedWordsPairs = values
    },

    onWordPairRemembered (values) {
      this.rememberedWordsPairs = values
    },

    // self rating test
    onChangedSelfRating (values) {
      this.SelfRating = values
    },
    onChangedControlRating (values) {
      this.ControlRating[this.dictionaryFilter.lang1] = values
    }
  }
}
