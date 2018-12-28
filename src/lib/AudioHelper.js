
export default class AudioHelper {
  constructor () {
    this.audio = null
    this.api = ''
    this.sndPath = ''

    this._sounds = []
    this._soundsIndex = 0

    this.playing = false

    this.MODES = {
      ONCE: 'ONCE',
      RANDOM: 'RANDOM',
      CYCLE: 'CYCLE'
    }
  }

  init (api, sndPath) {
    this.api = api
    this.sndPath = sndPath
    return this
  }

  once () {
    this.mode = this.MODES.ONCE
    return this
  }

  cycle () {
    this.mode = this.MODES.CYCLE
    return this
  }

  random () {
    this.mode = this.MODES.RANDOM
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

    this.audio = new Audio(sound)
    this.audio.addEventListener('ended', () => {
      self.nextPlay()
    })
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
    switch (this.mode) {
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
    switch (this.mode) {
      case this.MODES.CYCLE :
        this.play()
        break
      case this.MODES.ONCE :
      case this.MODES.RANDOM :
      default :
    }
  }
}
