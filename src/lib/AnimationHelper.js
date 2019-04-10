export default class AnimationHelper {
  constructor (context) {
    this.context = context
    this.listeners = []

    this.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

    this.animationTimeStart = new Date().getTime()
  }

  step () {
    const currentTime = new Date().getTime()

    for (let i = 0; i < this.listeners.length; i++) {
      const e = this.listeners[i]
      if (e.start > 0) {
        const delta = currentTime - e.start
        if (delta > e.seconds) {
          this.fire(e.event)
          e.start = 0
          this.listeners[i] = e
        }
      }
    }

    if (this.listeners.filter(e => e.start > 0).length > 0) {
      this.requestAnimationFrame.call(window, this.step.bind(this))
    }
  }

  start (event) {
    const i = this.listeners.findIndex(e => e.event === event)
    if (i > -1) {
      this.listeners[i].start = new Date().getTime()
      this.requestAnimationFrame.call(window, this.step.bind(this))
    }
  }

  fire (event) {
    const data = {event}
    this.listeners
      .filter((l) => { return l.event === event })
      .map((l) => {
        if (l.listener) {
          l.listener.call(this.context, data)
        }
      })
  }

  on (event, seconds, listener) {
    this.listeners.push({event, seconds: seconds * 1000, start: 0, listener})
    return this
  }

  off (event, listener) {
    this.listeners = this.listeners.filter((elem) => {
      return !(
        event === elem.event &&
        listener === elem.listener
      )
    })
    return this
  }
}
