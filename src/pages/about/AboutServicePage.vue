<template>
  <q-page :style-fn="myTweak" class="column about-service-container">

    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <hero/>
    </transition>

    <about-service-component></about-service-component>

    <q-btn
      label="Начать тестирование"
      color="primary"
      size="xl"
      @click="onStartBtnClick"
    >
    </q-btn>

  </q-page>
</template>

<script>
// to="/beginners"
import AboutServiceComponent from '../../components/about/AboutServiceComponent'
import {mapState, mapGetters, mapActions} from 'vuex'
import Hero from '../../components/about/Hero'

export default {
  components: {Hero, AboutServiceComponent},

  name: 'AboutServicePage',

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
