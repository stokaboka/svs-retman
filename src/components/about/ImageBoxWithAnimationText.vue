<template>
<div class="imagebox-container">
  <div class="imagebox-image">
    <slot></slot>
    <hint ref="hint"
          v-show="visibleHint"
          class="imagebox-hint"
          @animation-complete="onAnimantionComplete"
          :strings="text">
    </hint>
  </div>
</div>
</template>

<script>
import {animate, easing} from 'quasar'
import Hint from './Hint'
import AnimationHelper from '../../lib/AnimationHelper'

let animationHelper = null

export default {
  name: 'ImageBoxWithAnimationText',
  components: {Hint},
  props: {
    image: {
      type: String,
      required: false
    },
    text: {
      type: Array,
      default () {
        return []
      },
      required: false
    }
  },
  data () {
    return {
      visibleHint: false,
      animationPause: 2
    }
  },
  mounted () {
    animationHelper = new AnimationHelper(this)
    animationHelper.on('showHint', 3, this.onShowHint)
    animationHelper.on('hideHint', 20, this.onHideHint)
    animationHelper.on('repeatShowHint', 17, this.onRepeatShowHint)

    animationHelper.start('showHint')
  },
  methods: {
    onAnimantionComplete () {
      animationHelper.start('hideHint')
      // console.log('onAnimantionComplete - wait hideHint')
    },
    onShowHint () {
      console.log('onShowHint - start')
      const self = this
      const element = this.$refs.hint
      element.$el.style.opacity = '1'
      animate.start({
        from: -500,
        to: -120,
        easing: easing.decelerate,
        apply (pos) {
          element.$el.style.right = `${pos}px`
          if (pos > -300) {
            self.visibleHint = true
          }
        },
        done () {
          // console.log('onShowHint - done')
          element.startAnim()
        }
      })
    },
    onHideHint () {
      // console.log('onHideHint - start')
      const element = this.$refs.hint
      animate.start({
        from: 100,
        to: 0,
        easing: easing.decelerate,
        apply (pos) {
          element.$el.style.opacity = `${pos / 100}`
        },
        done () {
          animationHelper.start('repeatShowHint')
          // console.log('onHideHint - done')
        }
      })
    },
    onRepeatShowHint () {
      // console.log('onRepeatShowHint - wait start showHint')
      animationHelper.start('showHint')
    }
  }
}
</script>

<style scoped>

  .imagebox-container {
    position: relative;
  }

  .imagebox-image {

  }

  .imagebox-hint {
    position: absolute;
    top: 20px;
    /*left: 340px*/
    right: -500px;
  }
</style>
