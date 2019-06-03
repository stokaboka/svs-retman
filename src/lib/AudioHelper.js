
export default class AudioHelper {
  constructor (context) {
    this.context = context

    this.audio = null
    this.api = ''
    this.sndPath = ''

    this._sounds = []
    this._soundsIndex = 0

    this._theme = '1'

    this.playing = false
    this.paused = false

    this._offset = 0

    this._volume = 1

    this.timeStamp = {
      play: 0
    }

    this.MODES = {
      ONCE: 'ONCE',
      RANDOM: 'RANDOM',
      RANDOM_CYCLE: 'RANDOM_CYCLE',
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

  theme (theme) {
    this._theme = theme
    return this
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

  randomCycle () {
    this._mode = this.MODES.RANDOM_CYCLE
    return this
  }

  mode (mode) {
    if (mode === this.MODES.ONCE || mode === this.MODES.CYCLE || mode === this.MODES.RANDOM || mode === this.MODES.RANDOM_CYCLE) {
      this._mode = mode
    } else {
      this._mode = this.MODES.ONCE
    }
    return this
  }

  offset (v) {
    this._offset = v || 0
    this._offset = this._offset < 0 ? 0 : this._offset
    return this
  }

  volume (v) {
    this._volume = v > 1 ? v / 100 : v
    if (this.audio) {
      this.audio.volume = this._volume
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
      this.audio.pause()
      this.audio = null
    }

    sound = sound.replace('{{SOUNDTHEME}}', this._theme)

    this.audio = new Audio(sound)
    this.audio.addEventListener('ended', (e) => self.eventsHandler(e))
    this.audio.addEventListener('play', (e) => self.eventsHandler(e))
    this.audio.addEventListener('playing', (e) => self.eventsHandler(e))
    this.audio.addEventListener('pause', (e) => self.eventsHandler(e))
    this.audio.addEventListener('timeupdate', (e) => self.eventsHandler(e))

    this.audio.volume = this._volume
    // console.log('this.audio.volume', this.audio.volume)

    try {
      this.audio.play()
      if (this._offset > 0) {
        this.audio.currentTime = this._offset
      }
      this.playing = true
      this.paused = false
    } catch (e) {
      console.log(e)
    }
  }

  collection (min, max, prefix = '') {
    let sounds = []
    for (let i = min; i <= max; i++) {
      const snd = i < 10 ? `0${i}.mp3` : `${i}.mp3`
      sounds.push(`${prefix}${snd}`)
    }

    this.sounds(sounds)

    return this
  }

  play (sound = '', offset = 0) {
    if (sound) {
      this.sounds([sound])
    }
    this.offset(offset)
    if (this._sounds.length > 0) {
      let snd = this.nextSound()
      snd = `${this.api}/${this.sndPath}/${snd}`
      this._play(snd)
    } else {
      this.playing = false
    }
  }

  pause () {
    if (this.audio && this.playing) {
      // this.audio.removeEventListener('ended', (e) => self.eventsHandler(e))
      // this.audio.removeEventListener('play', (e) => self.eventsHandler(e))
      // this.audio.removeEventListener('playing', (e) => self.eventsHandler(e))
      // this.audio.removeEventListener('pause', (e) => self.eventsHandler(e))
      // this.audio.removeEventListener('timeupdate', (e) => self.eventsHandler(e))
      this.audio.pause()
      this.playing = false
      this.paused = true
    }
  }

  resume () {
    if (this.audio && this.paused) {
      this.audio.play()
      this.playing = true
      this.paused = false
    }
  }

  stop () {
    if (this.audio) {
      this.audio.removeEventListener('ended', (e) => self.eventsHandler(e))
      this.audio.removeEventListener('play', (e) => self.eventsHandler(e))
      this.audio.removeEventListener('playing', (e) => self.eventsHandler(e))
      this.audio.removeEventListener('pause', (e) => self.eventsHandler(e))
      this.audio.removeEventListener('timeupdate', (e) => self.eventsHandler(e))
      this.audio.pause()
      this.audio.currentTime = 0
      this.audio.src = ''
      this.playing = false
      this.paused = false
      this.once()
    }
    this._offset = 0
  }

  isPlaying () {
    return this.playing
  }

  isPaused () {
    return this.paused
  }

  nextSound () {
    let snd = ''
    switch (this._mode) {
      case this.MODES.RANDOM :
      case this.MODES.RANDOM_CYCLE:
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
      case this.MODES.RANDOM_CYCLE:
        this.play()
        break
      case this.MODES.ONCE :
      case this.MODES.RANDOM :
      default :
        this.playing = false
        this.paused = false
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
    // console.log(event)
    switch (event.type) {
      case 'ended' :
        this.playing = false
        this.paused = false
        self.nextPlay()
        this.fire(this.EVENTS.COMPLETE)
        break
      case 'timeupdate' :
        // console.log(event.target.currentTime)
        this.fire(this.EVENTS.PROGRESS)
        break
      case 'play' :
        // this.playing = true
        // this.paused = false
        break
      case 'playing' :
        // this.playing = true
        // this.paused = false
        break
      case 'pause' :
        // this.playing = false
        // this.paused = true
        break
    }
  }
}
