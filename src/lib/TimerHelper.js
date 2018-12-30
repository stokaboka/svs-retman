/*
Copyright
*/
export default class TimerHelper {
  constructor (context) {
    this.context = context

    this.active = false
    this.complete = false
    this.seconds = 0
    this.progress = 0
    this.passed = 0
    this.left = 0
    this.id = null
    this.listeners = []

    this.passedTime = this.toTimeString(this.passed)
    this.leftTime = this.toTimeString(this.left)

    this.EVENTS = {
      START: 'START',
      PROGRESS: 'PROGRESS',
      COMPLETE: 'COMPLETE'
    }
  }

  start (seconds) {
    this.stop()
    this.active = true
    this.complete = false
    this.seconds = seconds
    this.progress = 0
    this.passed = 0
    this.left = this.seconds
    this.passedTime = this.toTimeString(this.passed)
    this.leftTime = this.toTimeString(this.left)

    this.id = setInterval(() => {
      this.onInterval()
    }, 1000)

    this.fire(this.EVENTS.START)
    return this
  }

  stop () {
    if (this.id) {
      clearTimeout(this.id)
      this.id = null
    }
    return this
  }

  info (event) {
    return {
      event: event,
      passed: this.passed,
      left: this.left,
      progress: this.progress,
      passedTime: this.toTimeString(this.passed),
      leftTime: this.toTimeString(this.left)
    }
  }

  onInterval () {
    let event = this.EVENTS.PROGRESS
    this.passed++
    this.left--
    this.progress = Math.ceil(100 * this.passed / this.seconds)
    if (this.passed >= this.seconds) {
      this.stop()
      this.active = false
      this.complete = true
      this.progress = 100
      this.passed = this.seconds
      this.left = 0
      event = this.EVENTS.COMPLETE
    }

    this.passedTime = this.toTimeString(this.passed)
    this.leftTime = this.toTimeString(this.left)

    this.fire(event)
  }

  fire (event) {
    const data = this.info(event)
    this.listeners
      .filter((l) => { return l.event === event })
      .map((l) => {
        if (l.listener) {
          l.listener.call(this.context, data)
        }
      })
  }

  on (event, listener) {
    this.listeners.push({event, listener})
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

  toTimeString (seconds) {
    let min = Math.floor(seconds / 60)
    let sec = seconds % 60
    sec = sec < 10 ? '0' + sec.toString() : sec.toString()
    return `${min}:${sec}`
  }
}
