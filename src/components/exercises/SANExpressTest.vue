<!--
  - Copyright (c) 2019. Igor Khorev http://orangem.me igorhorev@gmail.com
  -->

<template>
  <div class="column justify-center items-center">
    <div v-for="san in sanData" :key="san.t" class="column san-self-container">
      <div class="san-title">{{san.title}}: {{san.v}}</div>
      <div class="row justify-center items-center">
        <img class="san-img" :src="imgPath(san.l.img)" :alt="san.l.label"/>
        <span class="san-self-label" :style="san.l.style">{{san.l.label}}</span>
        <q-slider
          class="col shadow-3 san-slider"
          :class="san.cls"
          :max="maxLevel"
          :min="minLevel"
          :step="stepLevel"
          @input="onChangedInput"
          :color="san.color"
          markers
          snap
          v-model="san.v">
        </q-slider>
        <span class="san-self-label" :style="san.r.style">{{san.r.label}}</span>
        <img class="san-img"  :src="imgPath(san.r.img)" :alt="san.r.label"/>
      </div>
    </div>
    <div>САН: {{sanValue}}</div>
  </div>
</template>
<script>
import {createNamespacedHelpers} from 'vuex'

const {mapGetters} = createNamespacedHelpers('beginners')

const levels = [
  {label: '0', value: 0},
  {label: '1', value: 1},
  {label: '2', value: 2},
  {label: '3', value: 3},
  {label: '4', value: 4},
  {label: '5', value: 5},
  {label: '6', value: 6}
]

const sanData = [
  {
    title: 'Ваше состояние, самочувствие в настоящий момент',
    t: 's',
    l: {img: 's0.jpg', label: '-', style: {color: 'red'}},
    r: {img: 's1.jpg', label: '+', style: {color: 'green'}},
    v: 3,
    levels,
    cls: 's-bg',
    color: 'dark'
  },
  {
    title: 'Ваша активность, работоспособность в настоящий момент',
    t: 'a',
    l: {img: 'a0.jpg', label: '-', style: {color: 'darkblue'}},
    r: {img: 'a1.jpg', label: '+', style: {color: 'orangered'}},
    v: 3,
    levels,
    cls: 'a-bg',
    color: 'dark'
  },
  {
    title: 'Ваше настроение в настоящий момент',
    t: 'n',
    l: {img: 'n0.jpg', label: '-', style: {color: 'rebeccapurple'}},
    r: {img: 'n1.jpg', label: '+', style: {color: 'deepskyblue'}},
    v: 3,
    levels,
    cls: 'n-bg',
    color: 'dark'
  }
]

export default {
  name: 'SANExpressTest',
  props: {
    phase: {
      type: Object,
      default () {
        return {}
      },
      required: false
    },
    results: {
      type: Object,
      default () {
        return {}
      },
      required: false
    }
  },
  data () {
    return {
      minLevel: 0,
      maxLevel: 6,
      stepLevel: 1,
      sanValue: 3,
      sanData: sanData
    }
  },
  mounted () {
    if (this.results && this.phase && this.phase.result && this.phase.action === 'TEST') {
      if (this.results[this.phase.result]) {
        const result = this.results[this.phase.result]
        const prop = this.phase.phase === 1 ? 'before' : 'after'
        const values = result[prop]
        this.sanData = sanData.map(e => {
          return {
            ...e,
            v: values[e.t]
          }
        })
      }
    }
    this.onChangedInput()
  },
  methods: {
    imgPath (img) {
      return `/statics/assets/san/${img}`
    },
    onChangedInput () {
      const s = this.sanData[0].levels[this.sanData[0].v].value
      const a = this.sanData[1].levels[this.sanData[1].v].value
      const n = this.sanData[2].levels[this.sanData[2].v].value

      this.sanValue = Math.round(10 * (s + a + n) / 3) / 10

      const data = {s, a, n}
      this.$emit('exercies-action', {id: 'changed-sanexpress', data})
    }
  },
  computed: {
    label () {
      return this.atLevels[this.level]
    },
    ...mapGetters(['atLevels'])
  }
}
</script>

<style>

  .san-slider {
    border-radius: 1.5rem;
    padding: 1rem;
    height: 3rem;
  }
  .s-bg {
    background: linear-gradient(to right, red, white 45%, white 55%, greenyellow);
  }

  .a-bg {
    background: linear-gradient(to right, darkblue, white 45%, white 55%, orange);
  }

  .n-bg {
    background: linear-gradient(to right, rebeccapurple, white 45%, white 55%, deepskyblue);
  }

  .san-img {
    width: 80px;
    height: auto;
  }

  .san-title {
    margin-left: 120px;
  }

  .qq-slider-track {
    height: 10px;
  }

  .qq-slider-track .active-track {
    background-color: aqua;
    height: 10px;
  }

  .qq-slider-mark {
    width: 10px;
    border-color: #d9d9d9;
    background-color: white;
  }

  .san-self-container {
    width: 60vw;
  }

  .san-self-label {
    margin: 1rem;
    font-size: 3rem;
  }

</style>
