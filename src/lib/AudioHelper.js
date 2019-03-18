
export default class AudioHelper {
  constructor (context) {
    this.context = context

    this.audio = null
    this.api = ''
    this.sndPath = ''

    this._sounds = []
    this._soundsIndex = 0

    this.playing = false

    this.timeStamp = {
      play: 0
    }

    this.MODES = {
      ONCE: 'ONCE',
      RANDOM: 'RANDOM',
      CYCLE: 'CYCLE'
    }

    this.EVENTS = {
      START: 'START',
      PROGRESS: 'PROGRESS',
      COMPLETE: 'COMPLETE'
    }

    this._mode = this.MODES.ONCE

    this.listeners = []
  }

  init (api, sndPath) {
    this.api = api
    this.sndPath = sndPath
    return this
  }

  once () {
    this._mode = this.MODES.ONCE
    return this
  }

  cycle () {
    this._mode = this.MODES.CYCLE
    return this
  }

  random () {
    this._mode = this.MODES.RANDOM
    return this
  }

  mode (mode) {
    if (mode === this.MODES.ONCE || mode === this.MODES.CYCLE || mode === this.MODES.RANDOM) {
      this._mode = mode
    } else {
      this._mode = this.MODES.ONCE
    }
    return this
  }

  sounds (soundsArr) {
    this._sounds = soundsArr.filter(
      snd => {
        return snd && snd.length > 0
      })
    this._soundsIndex = -1
    return this
  }

  _play (sound) {
    const self = this
    if (this.audio) {
      this.audio.removeEventListener('ended', (e) => self.eventsHandler(e))
      this.audio.removeEventListener('play', (e) => self.eventsHandler(e))
      this.audio.removeEventListener('playing', (e) => self.eventsHandler(e))
      this.audio.removeEventListener('pause', (e) => self.eventsHandler(e))
      this.audio.removeEventListener('timeupdate', (e) => self.eventsHandler(e))

      this.audio.pause()
      this.audio = null
    }

    this.audio = new Audio(sound)
    this.audio.addEventListener('ended', (e) => self.eventsHandler(e))
    this.audio.addEventListener('play', (e) => self.eventsHandler(e))
    this.audio.addEventListener('playing', (e) => self.eventsHandler(e))
    this.audio.addEventListener('pause', (e) => self.eventsHandler(e))
    this.audio.addEventListener('timeupdate', (e) => self.eventsHandler(e))

    this.audio.play()
    this.playing = true
  }

  play (sound) {
    if (sound) {
      this.sounds([sound])
    }
    if (this._sounds.length > 0) {
      let snd = this.nextSound()
      snd = `${this.api}/${this.sndPath}/${snd}`
      this._play(snd)
    } else {
      this.playing = false
    }
  }

  pause () {
    if (this.audio) {
      this.audio.pause()
      this.playing = false
    }
  }

  resume () {
    if (this.audio) {
      this.audio.play()
      this.playing = false
    }
  }

  stop () {
    if (this.audio) {
      this.audio.pause()
      this.playing = false
      this.once()
    }
  }

  isPlaying () {
    return this.playing
  }

  nextSound () {
    let snd = ''
    switch (this._mode) {
      case this.MODES.RANDOM :
        const n = Math.ceil(Math.random() * this._sounds.length) - 1
        snd = this._sounds[n || 0]
        break
      case this.MODES.CYCLE :
        this._soundsIndex = ++this._soundsIndex % this._sounds.length
        snd = this._sounds[this._soundsIndex]
        break
      case this.MODES.ONCE :
      default :
        snd = this._sounds[0]
    }
    return snd
  }

  nextPlay () {
    switch (this._mode) {
      case this.MODES.CYCLE :
        this.play()
        break
      case this.MODES.ONCE :
      case this.MODES.RANDOM :
      default :
    }
  }

  info (event) {
    return {
      event: event,
      currentTime: this.audio.currentTime,
      duration: this.audio.duration
    }
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

  eventsHandler (event) {
    const self = this
    switch (event.type) {
      case 'ended' :
        self.nextPlay()
        this.fire(this.EVENTS.COMPLETE)
        break
      case 'timeupdate' :
        // console.log(event.target.currentTime)
        this.fire(this.EVENTS.PROGRESS)
        break
      case 'play' :
        // console.log(event)
        break
      case 'playing' :
        // console.log(event)
        break
      case 'pause' :
        // console.log(event)
        break
    }
  }
}
