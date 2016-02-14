'use strict'
var Event = require('vigour-js/lib/event')
var cnt = 0

exports.define = {
  toggle () {
    this.playing.origin.set(!this.playing.val)
  },
  updateTime () {
    let current = this.getTime()
    let data = this.state.data
    let duration = data.duration.val
    let time = current / duration
    if (current >= this.previousTime + 0.2) {
      this.loading.origin.set(this.isStalled())
      this.updateEnded(current, duration)
      let stamp = '$vp' + (cnt++)
      let event = new Event('data', stamp)
      data.progress.set(time, event)
      event.trigger()
    } else {
      this.loading.origin.set(true)
    }
    this.previousTime = current
  },
  updateEnded (time, duration) {
    if (duration - time < 5) {
      this.playing.origin.set(false)
      this.ended.origin.set(true)
    } else {
      this.ended.origin.set(false)
    }
  },
  initScript (src) {
    var script = document.createElement('script')
    var store = this.storeContext()
    var config = this.config
    script.type = 'text/javascript'
    script.src = config.src.val
    script.id = config.id.val
    script.onload = () => {
      this.applyContext(store)
      this.loaded = true
      this.init(src)
    }
    document.getElementsByTagName('head')[0].appendChild(script)
  }
}

exports.properties = {
  init (val) {
    this.define({
      init (src) {
        if (this.loaded) {
          let store = this.storeContext()
          val.call(this, src, (instance) => {
            // init callback
            this.applyContext(store)
            this.instance = instance
            let videos = document.getElementsByTagName('video')
            for (let i = videos.length - 1; i >= 0; i--) {
              videos[i].setAttribute('webkit-playsinline', true)
            }
          }, () => {
            // on ready
            this.applyContext(store)
            this.playing.origin.set(true)
            this.ready.origin.set(true)
          })
        } else if (!this.initialised) {
          this.loading.origin.set(true)
          this.initScript(src)
        }
        this.initialised = true
      }
    })
  },
  dispose (val) {
    this.define({
      dispose: val
    })
  },
  isPlaying (val) {
    this.define({
      isPlaying: val
    })
  },
  getTime (val) {
    this.define({
      getTime: val
    })
  },
  getBuffer (val) {
    this.define({
      getBuffer: val
    })
  },
  getDuration (val) {
    this.define({
      getDuration: val
    })
  },
  isStalled (val) {
    this.define({
      isStalled: val
    })
  },
  play (val) {
    this.define({
      play: val
    })
  },
  pause (val) {
    this.define({
      pause: val
    })
  },
  seek (val) {
    this.define({
      seek: val
    })
  },
  setVolume (val) {
    this.define({
      setVolume: val
    })
  },
  load (val) {
    this.define({
      load (src) {
        let store = this.storeContext()
        val.call(this, src, () => {
          this.applyContext(store)
          this.playing.origin.set(true)
          this.ready.origin.set(true)
        })
      }
    })
  }
}

exports.on = {
  remove: {
    player () {
      console.error('remove this remove guard!')
      if (this.instance) {
        this.updateTime()
        this.dispose()
      }

      this.initialised = false
      this.instance = false
      this.setTime = false

      this.ready.origin.set(false)
      this.loading.origin.set(true)
    }
  }
}
