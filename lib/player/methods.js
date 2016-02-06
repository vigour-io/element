'use strict'
var Element = require('../element')
var remove = Element.prototype.remove

exports.define = {
  remove () {
    this.dispose()
    remove.apply(this, arguments)
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
      this.loaded.origin.set(true)
      this.init(src)
    }
    document.getElementsByTagName('head')[0].appendChild(script)
  }
}

exports.properties = {
  init (val) {
    this.define({
      init (src) {
        this.initialised.origin.set(true)
        if (this.loaded.val) {
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
            this.ready.origin.set(true)
            this.play.origin.set(true)
          })
        } else {
          this.initScript(src)
        }
      }
    })
  },
  dispose (val) {
    this.define({
      dispose () {
        this.initialised.origin.set(false)
        this.ready.origin.set(false)
        this.play.origin.set(false)
        if (this.interval) {
          clearInterval(this.interval)
          this.interval = null
        }
        val.apply(this, arguments)
        this.instance = null
        this.setTime = null
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
