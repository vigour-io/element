'use strict'
var Element = require('../element')
var remove = Element.prototype.remove

exports.define = {
  remove () {
    this.initialised.origin.set(false)
    this.ready.origin.set(false)
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
    this.dispose()
    this.instance = null
    remove.apply(this, arguments)
  },
  initScript () {
    var script = document.createElement('script')
    var store = this.storeContext()
    var config = this.config
    script.type = 'text/javascript'
    script.src = config.src.val
    script.id = config.id.val
    script.onload = () => {
      this.applyContext(store)
      this.loaded.origin.set(true)
      this.init()
    }
    document.getElementsByTagName('head')[0].appendChild(script)
  }
}

exports.properties = {
  init (val) {
    this.define({
      init () {
        this.initialised.origin.set(true)
        if (this.loaded.val) {
          let store = this.storeContext()
          val.call(this, (instance) => {
            // init callback
            this.applyContext(store)
            this.instance = instance
            let videos = document.getElementsByTagName('video')
            for (let i = videos.length - 1; i >= 0; i--) {
              let video = videos[i]
              if (video.id.indexOf(this.id) === -1) {
                continue
              }
              video.setAttribute('webkit-playsinline', true)
            }
          }, () => {
            // on ready
            this.applyContext(store)
            this.ready.origin.val = true
            this.play.origin.val = true
          })
        } else {
          this.initScript()
        }
      }
    })
  },
  dispose (val) {
    this.define({
      dispose: val
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
