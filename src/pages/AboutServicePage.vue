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
            to="/beginners">
          </q-btn>
        </div>

      </div>
    </div>
  </q-page>
</template>

<script>
import AboutServiceComponent from '../components/AboutServiceComponent'
export default {
  components: {AboutServiceComponent},

  name: 'AboutServicePage',

  methods: {
    onStartBtnClick () {

    },

    myTweak (offset) {
      // "offset" is a Number (pixels) that refers to the total
      // height of header + footer that occupies on screen,
      // based on the QLayout "view" prop configuration

      // this is actually what the default style-fn does in Quasar
      // offset = offset + 30 * 2
      return { minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh' }
    }
  }
}
</script>

<style>
  .page-container__layout {
    /*margin: 30px;*/
    /*border-radius: 20px;*/
    background-color: white;
  }

</style>
