'use strict'
var Event = require('vigour-js/lib/event')
var cnt = 0

exports.define = {
  play () {
    this.playing.origin.set(true)
  },
  pause () {
    this.playing.origin.set(false)
  },
  toggle () {
    this.playing.origin.set(!this.playing.val)
  },
  updateTime () {
    let time = this.getTime()
    if (time) {
      let stamp = '$vp' + (cnt++)
      let event = new Event('data', stamp)
      this.state.data.time.set(time, event)
      event.trigger()
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
        if (this.loaded && !this.ready.val) {
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
          this.initialised = true
          this.initScript(src)
        }
      }
    })
  },
  dispose (val) {
    this.define({
      dispose () {
        val.apply(this, arguments)

        this.playing.origin.set(false)
        this.loading.origin.set(true)
        this.ready.origin.set(false)

        this.initialised = false
        this.instance = false
        this.setTime = false
      }
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
  }
}

exports.on = {
  remove: {
    player () {
      if (this.instance) {
        this.updateTime()
        this.dispose()
      }
      console.warn('remove this remove guard!')
    }
  }
}
