'use strict'
var Element = require('../element')
var remove = Element.prototype.remove

exports.on = {
  remove: {
    player () {
      console.error('xxxxxxxxx')
      this.dispose()
      // remove.apply(this, arguments)
    }
  }
}


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
  initScript (src) {
    console.error('INIT SCRIPT')
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
        console.log('gurks!', val, this.path)
        val.apply(this, arguments)

        if (this.interval) {
          clearInterval(this.interval)
          this.interval = null
        }

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
      this.dispose()
    }
  }
}
