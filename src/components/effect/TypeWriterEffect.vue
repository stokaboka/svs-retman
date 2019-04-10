<template>
  <div
    class="typewriter-container"
    ref="typewriter"
    :class="{'typewriter-animation': typewriterClass, 'typewriter-invisible': invisible}">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'TypeWriterEffect',
  data () {
    return {
      typewriterClass: false,
      invisible: true
    }
  },
  mounted () {
    const e = this.$refs.typewriter
    e.addEventListener('animationend', this.listener, false)
  },
  methods: {
    listener (event) {
      switch (event.type) {
        case 'animationend':
          if (event.animationName.startsWith('typing')) {
            this.$emit('animation-complete')
            this.typewriterClass = false
          }
          break
      }
    },
    reset () {
      this.invisible = true
    },
    start () {
      this.typewriterClass = true
      this.invisible = false
    }
  }
}
</script>

<style scoped>
  .typewriter-container {
    display: inline-block;
    color: white;
    overflow: hidden; /* Ensures the content is not revealed until the animation */
    white-space: nowrap; /* Keeps the content on a single line */
    margin: 0 auto; /* Gives that scrolling effect as the typing happens */
    /*letter-spacing: .15em; !* Adjust as needed *!*/
  }

  .typewriter-invisible {
    height: 0;
  }

  .typewriter-animation {
    border-right: .3em solid rgba(255, 255, 255, 0.5); /* The typwriter cursor */
    animation: typing 3.5s steps(30, end),
    blink-caret .5s step-end infinite;
  }

  /* The typing effect */
  @keyframes typing {
    from {
      width: 0
    }
    to {
      width: 100%
    }
  }

  /* The typewriter cursor effect */
  @keyframes blink-caret {
    from, to {
      border-color: transparent
    }
    50% {
      border-color: rgba(255, 255, 255, 0.5)
    }
  }
</style>
