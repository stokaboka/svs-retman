<template>
  <div class="gallery">
    <img
      ref="one"
      class="gallery-image"
      :class="{
        'gallery-image__top': one.top,
        'show-animation': one.show,
        'hide-animation': one.hide
      }"
      :style="oneStyle"
      :src="oneImageSrc"
      @load="onOneLoaded"
    />
    <img
      ref="two"
      class="gallery-image"
      :class="{
        'gallery-image__top': two.top,
        'show-animation': two.show,
        'hide-animation': two.hide
      }"
      :style="twoStyle"
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

function preLoadImage (image) {
  let img = new Image()
  const onLoad = function () {
    img.removeEventListener('load', onLoad)
    img = null
  }
  img.addEventListener('load', onLoad)
  img.src = image
}

function calcImgStyle (imgW, imgH) {
  const winW = window.innerWidth
  const winH = window.innerHeight
  const imgD = imgW / imgH
  const winD = winW / winH

  if (winD > imgD) {
    return {
      left: '0',
      top: '0',
      // top: `-${Math.round(Math.abs(winH - imgH) / 2)}px`,
      width: `${winW}px`,
      height: 'auto'
    }
  } else {
    return {
      // left: `-${Math.round(Math.abs(winW - imgW) / 2)}px`,
      left: '0',
      top: '0',
      width: 'auto',
      height: `${winH}px`
    }
  }
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
      oneStyle: {},
      twoStyle: {},
      oneImageSrc: '',
      twoImageSrc: '',
      imageIndex: -1
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
  computed: {
    sImages () {
      return this.images
        .map(e => e)
        .sort((a, b) => Math.random() - 0.5)
    }
  },
  methods: {
    onWindowResize () {
      this.oneStyle = calcImgStyle(this.$refs.one.naturalWidth, this.$refs.one.naturalHeight)
      this.twoStyle = calcImgStyle(this.$refs.two.naturalWidth, this.$refs.two.naturalHeight)
    },
    nextImage () {
      this.imageIndex = ++this.imageIndex % this.sImages.length

      let preloadIndex = this.imageIndex + 1 % this.sImages.length
      console.log(this.imageIndex, preloadIndex)

      preLoadImage(`${this.path}/${this.sImages[preloadIndex]}`)

      return `${this.path}/${this.sImages[this.imageIndex]}`
    },
    onOneLoaded () {
      this.oneStyle = calcImgStyle(this.$refs.one.naturalWidth, this.$refs.one.naturalHeight)

      this.two.top = false
      this.one = {
        ...flags,
        show: true,
        top: true
      }
    },
    onTwoLoaded () {
      this.twoStyle = calcImgStyle(this.$refs.two.naturalWidth, this.$refs.two.naturalHeight)
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
    /*left: 0;*/
    /*top: 0;*/
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
