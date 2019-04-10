<template>
  <div class="about-hit shadow-4" ref="hint">
    <type-writer-effect ref="s1" @animation-complete="onAnimantionComplete(1)">
      Ты свободен в выборе!
    </type-writer-effect>
    <br>
    <type-writer-effect ref="s2" @animation-complete="onAnimantionComplete(2)">
      Но лучший выбор – курс
    </type-writer-effect><br>
    <type-writer-effect ref="s3" @animation-complete="onAnimantionComplete(3)">
      <strong><q>Погружение в языковую среду</q></strong>
    </type-writer-effect><br>
    <type-writer-effect ref="s4" @animation-complete="onAnimantionComplete(4)">
      в <q>Свободе слова</q>
    </type-writer-effect><br>
  </div>
</template>

<script>

import TypeWriterEffect from '../effect/TypeWriterEffect'
export default {
  name: 'Hint',
  components: {TypeWriterEffect},
  props: {
    strings: {
      type: Array,
      default () {
        return []
      },
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    startAnim () {
      this.$refs.s1.reset()
      this.$refs.s2.reset()
      this.$refs.s3.reset()
      this.$refs.s4.reset()

      this.$refs.s1.start()
    },
    onAnimantionComplete (num) {
      switch (num) {
        case 1:
          this.$refs.s2.start()
          break
        case 2:
          this.$refs.s3.start()
          break
        case 3:
          this.$refs.s4.start()
          break
        case 4:
          this.$emit('animation-complete')
          break
      }
    }
  }
}
</script>

<style scoped>
  .about-hit {
    width: 320px;
    padding: 2rem;
    border-radius: 1rem;
    color: white;
    background-color: rgba(65, 105, 225, 0.95);
    overflow: hidden;
  }

</style>
