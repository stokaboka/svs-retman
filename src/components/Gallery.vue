<template>
  <div class="gallery"
       :class="{
        'gallery-width': gallerySizeBy === 'width',
        'gallery-height': gallerySizeBy === 'height'
      }"
  >
    <img
      ref="one"
      class="gallery-image"
      :class="{
        'gallery-image-width': gallerySizeBy === 'width',
        'gallery-image-height': gallerySizeBy === 'height',
        'gallery-image__top': one.top,
        'show-animation': one.show,
        'hide-animation': one.hide
      }"
      :src="oneImageSrc"
      @load="onOneLoaded"
    />
    <img
      ref="two"
      class="gallery-image"
      :class="{
        'gallery-image-width': gallerySizeBy === 'width',
        'gallery-image-height': gallerySizeBy === 'height',
        'gallery-image__top': two.top,
        'show-animation': two.show,
        'hide-animation': two.hide
      }"
      :src="twoImageSrc"
      @load="onTwoLoaded"
    />
  </div>
</template>

<script>

let flags = {
  top: false,
  show: false,
  scale: false,
  hide: false
}

export default {
  name: 'Gallery',
  props: {
    path: {
      type: String,
      required: true
    },
    images: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      one: {
        ...flags
      },
      two: {
        ...flags
      },
      oneImageSrc: '',
      twoImageSrc: '',
      imageIndex: -1,
      gallerySizeBy: 'width'
    }
  },
  mounted () {
    this.$nextTick(function () {
      window.addEventListener('resize', this.onWindowResize)
    })

    this.onWindowResize()

    this.$refs.one.addEventListener('animationend', this.onOneAnimation, false)
    this.$refs.two.addEventListener('animationend', this.onTwoAnimation, false)

    this.oneImageSrc = this.nextImage()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onWindowResize)
  },
  methods: {
    onWindowResize () {
      this.gallerySizeBy = window.innerWidth > window.innerHeight ? 'width' : 'height'
      console.log(this.gallerySizeBy)
    },
    nextImage () {
      this.imageIndex = ++this.imageIndex % this.images.length
      return `${this.path}/${this.images[this.imageIndex]}`
    },
    onOneLoaded () {
      this.two.top = false
      this.one = {
        ...flags,
        show: true,
        top: true
      }
    },
    onTwoLoaded () {
      this.one.top = false
      this.two = {
        ...flags,
        show: true,
        top: true
      }
    },
    onOneAnimation (event) {
      switch (event.type) {
        case 'animationend':
          switch (event.animationName) {
            case 'motion':
              this.one = {
                ...flags,
                top: true,
                hide: true
              }
              this.twoImageSrc = this.nextImage()
              break
            case 'fadeout':
              break
          }
          break
      }
    },
    onTwoAnimation (event) {
      switch (event.type) {
        case 'animationend':
          switch (event.animationName) {
            case 'motion':
              this.two = {
                ...flags,
                top: true,
                hide: true
              }
              this.oneImageSrc = this.nextImage()
              break
            case 'fadeout':
              break
          }
          break
      }
    }
  }
}
</script>

<style>
.gallery {
  position: relative;
  overflow: hidden;
}

.gallery-width {
  width: 100vw;
  height: auto;
}

.gallery-height {
  width: auto;
  height: 100vh;
}

.gallery-image {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
}

.gallery-image-width {
  width: auto;
  height: 114vh;
}

.gallery-image-height {
  width: auto;
  height: 114vh;
}

.gallery-image__top {
  z-index: 1;
}

.show-animation {
  animation-duration: 20s;
  animation-timing-function: linear;
  animation-name: motion;
}
.hide-animation {
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-name: fadeout;
}

@keyframes motion {
  from {
    opacity: 0;
    transform: scale(1, 1);
  }

  10% {
    opacity: 1;
    transform: scale(1.02, 1.02);
  }

  to {
    opacity: 1;
    transform: scale(1.12, 1.12);
  }
}

@keyframes fadeout {
  from {
    opacity: 1;
    transform: scale(1.12, 1.12);
  }

  to {
    opacity: 0;
    transform: scale(1.14, 1.14);
  }
}
</style>
