<template>
  <q-page padding :style-fn="myTweak" class="shadow-6 page-container__layout">
    <div class="doc-container">
      <div class="column justify-center">
        <div class="col-auto">
          <about-service-component ></about-service-component>
        </div>

        <div class="col col-md-4  justify-center">
          <q-btn
            label="Старт !"
            color="primary"
            size="xl"
            @click="onStartBtnClick"
            >
          </q-btn>
        </div>

      </div>
    </div>
  </q-page>
</template>

<script>
// to="/beginners"
import {createNamespacedHelpers} from 'vuex'
import AboutServiceComponent from '../components/AboutServiceComponent'

const { mapState, mapActions } = createNamespacedHelpers('beginners')

export default {
  components: {AboutServiceComponent},

  name: 'AboutServicePage',

  computed: {
    ...mapState([ 'error' ])
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
      return { minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh' }
    },

    ...mapActions(['resetSteps'])
  }
}
</script>

<style>
  .page-container__layout {
    background-color: white;
  }

</style>
