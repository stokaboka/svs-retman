<template>
  <div class="about-hit shadow-4" :class="boxAnim" ref="hint">
    <span class="anim-str" :class="anim1">Ты свободен в выборе!</span><br>
    <span class="anim-str" :class="anim2">Но лучшей выбор – курс</span><br>
    <span class="anim-str" :class="anim3"><q>Погружение в языковую среду</q></span><br>
    <span class="anim-str" :class="anim4">в <q>Свободе слова</q></span>
  </div>
</template>

<script>

export default {
  name: 'Hint',
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
    return {
      lastStringIndex: 1,
      visibleStr: [],
      anim1: 'hide',
      anim2: 'hide',
      anim3: 'hide',
      anim4: 'hide',
      boxAnim: ''
    }
  },
  methods: {
    startAnim () {
      this.anim1 = 'as1'
      this.anim2 = 'as2'
      this.anim3 = 'as3'
      this.anim4 = 'as4'
      this.boxAnim = 'hide-box-anim'
    }
  }
}
</script>

<style scoped>
  .about-hit {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: flex-start;
    position: absolute;
    top: -1000px;
    width: 320px;
    height: auto;
    padding: 2rem;
    border-radius: 1rem;
    color: white;
    background-color: rgba(65, 105, 225, 0.95);
    overflow: hidden;
  }

  .hide-box-anim {
    animation: hidebox 25s ease-in;
  }

  .anim-str {
    overflow: hidden;
  }

  .hide {
    opacity: 0;
  }

  .as1 {
    animation: showStr1 5s ease-in;
  }

  .as2 {
    animation: showStr2 5s ease-in;
  }

  .as3 {
    animation: showStr3 5s ease-in;
  }

  .as4 {
    animation: showStr4 5s ease-in;
  }

  @keyframes hidebox {
    0% {opacity: 1}
    95% {opacity: 1}
    100% {opacity: 0}
  }

  @keyframes showStr1 {
    0% {opacity: 0}
    10% {opacity: 1}
    100% {opacity: 1}
  }

  @keyframes showStr2 {
    0% {opacity: 0}
    20% {opacity: 0}
    30% {opacity: 1}
    100% {opacity: 1}
  }

  @keyframes showStr3 {
    0% {opacity: 0}
    30% {opacity: 0}
    40% {opacity: 1}
    100% {opacity: 1}
  }

  @keyframes showStr4 {
    0% {opacity: 0}
    40% {opacity: 0}
    50% {opacity: 1}
    100% {opacity: 1}
  }
</style>
