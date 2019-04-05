<template>
  <div class="san-self-container column justify-center">
    <div v-for="san in sanData" :key="san.l" class="san-self-level row justify-center items-center">
      <span class="col-2 san-self-level__l">{{san.l}}</span>
      <q-slider
        class="col-7"
        :label-value="san.levels[san.v].label"
        :max="maxLevel"
        :min="minLevel"
        :step="stepLevel"
        @input="onChangedInput"
        color="primary"
        label-always
        markers
        snap
        v-model="san.v">
      </q-slider>
      <span class="col-2 san-self-level__r">{{san.r}}</span>
    </div>
  </div>
</template>
<script>
import {createNamespacedHelpers} from 'vuex'

const {mapGetters} = createNamespacedHelpers('beginners')

export default {
  name: 'SANTest',
  data () {
    return {
      minLevel: 0,
      maxLevel: 6,
      stepLevel: 1,
      sanData: [
        {
          t: 's',
          l: 'Самочувствие хорошее',
          r: 'Самочувствие плохое',
          v: 3,
          levels: [
            {label: '3', value: 6},
            {label: '2', value: 5},
            {label: '1', value: 4},
            {label: '0', value: 3},
            {label: '1', value: 2},
            {label: '2', value: 1},
            {label: '3', value: 0}
          ]
        },
        {
          t: 's',
          l: 'Чувствую себя сильным',
          r: 'Чувствую себя слабым',
          v: 3,
          levels: [
            {label: '3', value: 6},
            {label: '2', value: 5},
            {label: '1', value: 4},
            {label: '0', value: 3},
            {label: '1', value: 2},
            {label: '2', value: 1},
            {label: '3', value: 0}
          ]
        },

        {
          t: 'a',
          l: 'Пассивный',
          r: 'Активный',
          v: 3,
          levels: [
            {label: '3', value: 0},
            {label: '2', value: 1},
            {label: '1', value: 2},
            {label: '0', value: 3},
            {label: '1', value: 4},
            {label: '2', value: 5},
            {label: '3', value: 6}
          ]
        },
        {
          t: 'a',
          l: 'Малоподвижный',
          r: 'Подвижный',
          v: 3,
          levels: [
            {label: '3', value: 0},
            {label: '2', value: 1},
            {label: '1', value: 2},
            {label: '0', value: 3},
            {label: '1', value: 4},
            {label: '2', value: 5},
            {label: '3', value: 6}
          ]
        },

        {
          t: 'n',
          l: 'Веселый',
          r: 'Грустный',
          v: 3,
          levels: [
            {label: '3', value: 6},
            {label: '2', value: 5},
            {label: '1', value: 4},
            {label: '0', value: 3},
            {label: '1', value: 2},
            {label: '2', value: 1},
            {label: '3', value: 0}
          ]
        },
        {
          t: 'n',
          l: 'Хорошее настроение',
          r: 'Плохое настроение',
          v: 3,
          levels: [
            {label: '3', value: 6},
            {label: '2', value: 5},
            {label: '1', value: 4},
            {label: '0', value: 3},
            {label: '1', value: 2},
            {label: '2', value: 1},
            {label: '3', value: 0}
          ]
        },

        {
          t: 's',
          l: 'Работоспособный',
          r: 'Разбитый',
          v: 3,
          levels: [
            {label: '3', value: 6},
            {label: '2', value: 5},
            {label: '1', value: 4},
            {label: '0', value: 3},
            {label: '1', value: 2},
            {label: '2', value: 1},
            {label: '3', value: 0}
          ]
        },
        {
          t: 's',
          l: 'Полный сил',
          r: 'Обессиленный',
          v: 3,
          levels: [
            {label: '3', value: 6},
            {label: '2', value: 5},
            {label: '1', value: 4},
            {label: '0', value: 3},
            {label: '1', value: 2},
            {label: '2', value: 1},
            {label: '3', value: 0}
          ]
        },

        {
          t: 'a',
          l: 'Медлительный',
          r: 'Быстрый',
          v: 3,
          levels: [
            {label: '3', value: 0},
            {label: '2', value: 1},
            {label: '1', value: 2},
            {label: '0', value: 3},
            {label: '1', value: 4},
            {label: '2', value: 5},
            {label: '3', value: 6}
          ]
        },
        {
          t: 'a',
          l: 'Бездеятельный',
          r: 'Деятельный',
          v: 3,
          levels: [
            {label: '3', value: 0},
            {label: '2', value: 1},
            {label: '1', value: 2},
            {label: '0', value: 3},
            {label: '1', value: 4},
            {label: '2', value: 5},
            {label: '3', value: 6}
          ]
        },

        {
          t: 'n',
          l: 'Счастливый',
          r: 'Несчастный',
          v: 3,
          levels: [
            {label: '3', value: 6},
            {label: '2', value: 5},
            {label: '1', value: 4},
            {label: '0', value: 3},
            {label: '1', value: 2},
            {label: '2', value: 1},
            {label: '3', value: 0}
          ]
        },
        {
          t: 'n',
          l: 'Жизнерадостный',
          r: 'Мрачный',
          v: 3,
          levels: [
            {label: '3', value: 6},
            {label: '2', value: 5},
            {label: '1', value: 4},
            {label: '0', value: 3},
            {label: '1', value: 2},
            {label: '2', value: 1},
            {label: '3', value: 0}
          ]
        }
      ]
    }
  },
  mounted () {
    this.onChangedInput()
  },
  methods: {
    onChangedInput () {
      // const s = this.sanData[0].v + this.sanData[1].v
      const s = this.sanData.filter(e => e.t === 's').reduce((a, v) => a + v.levels[v.v].value, 0) / 4
      const a = this.sanData.filter(e => e.t === 'a').reduce((a, v) => a + v.levels[v.v].value, 0) / 4
      const n = this.sanData.filter(e => e.t === 'n').reduce((a, v) => a + v.levels[v.v].value, 0) / 4
      const data = {s, a, n}
      this.$emit('exercies-action', {id: 'changed-san', data})
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

<style scoped>
  .san-self-container {
    width: 60vw;
  }

  .san-self-level {
    width: 100%;
    margin-bottom: 1rem;
  }

  .san-self-level__l {
    margin-right: 1rem;
  }

  .san-self-level__r {
    margin-left: 1rem;
  }
</style>
