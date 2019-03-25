<template>
  <div :class="{'lesson_row__current': item.current, 'lesson_row__selected': item.selected}">
    <div
      class="lesson-word "
      :class="{'lesson-word__left': showTranslate, 'lesson-word__center': hideTranslate}"
    >
      {{item.word1}}
    </div>
    <div v-if="showTranslate" class="lesson-word lesson-word__right">
      {{item.word2}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'LessonRow',
  props: {
    item: {
      type: Object,
      default () {
        return null
      },
      required: true
    },
    mode: {
      type: String,
      default () {
        return 'BOTH'
      },
      required: true
    }
  },
  computed: {
    showTranslate () {
      return this.mode === 'BOTH'
    },
    hideTranslate () {
      return this.mode !== 'BOTH'
    }
  }
}
</script>

<style scoped>
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

  .lesson_row__current {
    color: white;
    background-color: royalblue;
    font-weight: bold;
  }

  .lesson_row__selected {
    color: black;
    background-color: lightgreen;
  }
</style>
