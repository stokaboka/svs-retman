<template>
  <q-page :style-fn="myTweak" class="column about-service-container">

    <hero
      v-if="showHero"
      :class="animationClass"/>
    <about-service-component
      v-if="showAbout"
      :class="animationClass"/>

    <q-btn
      v-if="showStart"
      :class="animationClass"
      label="Начать тестирование"
      color="primary"
      size="xl"
      @click="onStartBtnClick"
    />

  </q-page>
</template>

<script>
// to="/beginners"

import {animate, easing} from 'quasar'
import AboutServiceComponent from '../../components/about/AboutServiceComponent'
import {mapState, mapGetters, mapActions} from 'vuex'
import Hero from '../../components/about/Hero'

export default {
  components: {Hero, AboutServiceComponent},

  name: 'AboutServicePage',

  data () {
    return {
      showHero: false,
      showAbout: false,
      showStart: false,
      animationTime: 4500,
      animationClass: 'animate-fade\t'
    }
  },
  mounted () {
    const self = this
    animate.start({
      from: 0,
      to: self.animationTime,
      easing: easing.decelerate,
      apply (pos) {
        if (pos > self.animationTime / 3) self.showHero = true
        if (pos > self.animationTime / 2) self.showAbout = true
        if (pos >= self.animationTime) self.showStart = true
      },
      done () {
      }
    })
  },

  computed: {
    ...mapState('beginners', ['error']),
    ...mapGetters('auth', ['isLogged', 'user'])
  },

  methods: {
    onStartBtnClick () {
      this.resetSteps()
      this.$router.push({name: 'beginners'})
    },

    myTweak (offset) {
      // "offset" is a Number (pixels) that refers to the total
      // height of header + footer that occupies on screen,
      // based on the QLayout "view" prop configuration

      // this is actually what the default style-fn does in Quasar
      // offset = offset + 30 * 2
      return {minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh'}
    },

    ...mapActions('beginners', ['resetSteps'])
  }
}
</script>

<style>
  .about-service-container {
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;

    padding: 0 6rem;
  }
</style>
