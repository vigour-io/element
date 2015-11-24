'use strict'

var isNumberLike = require('vigour-js/lib/util/is/numberlike')
var test = /\$vp/

var Html5Player = {
  node: 'video',
  properties: {
    hasLoaded: true
  },
  define: {
    getTime () {
      return this.node.currentTime / this.duration.val
    }
  },
  inject: require('../../../../lib/events/render'),
  on: {
    canplay (data, event) {
      if (this.hasLoaded === true) {
        return
      }
      this.hasLoaded = true
      setDuration.call(this)
      emit.call(this, 'play', event)
      emit.call(this, 'time', event)
    },
    render: {
      handle (data, evt) {
        let node = this.node
        node.readystatechange
        emit.call(this, 'src', evt)
        emit.call(this, 'volume', evt)
      }
    },
    remove: {
      player () {
        var node = this.node
        node.removeEventListener('canplay')
        node.removeEventListener('play')
      }
    }
  },
  src: { on: { data: { handle: handleSrc } } },
  volume: { on: { data: { handle: handleVolume } } },
  time: {
    on: { data: { handle: handleTime } }
  },
  play: { on: { data: { handle: handlePlay } } }
}

function emit (key, event) {
  this[key].emit('data', this[key].val, event)
}

function handleSrc (data) {
  if (!this.parent.rendered) {
    return
  }

  let node = this.parent.node
  let key = this.key
  let val = this.val

  if (val) {
    node.setAttribute(key, val)
  } else {
    node.removeAttribute(key)
  }
}

function handleVolume (data) {
  if (this.parent && !this.parent.rendered) {
    return
  }

  let node = this.parent.node
  let val = this.val

  if (isNumberLike(val)) {
    node.volume = val
  }
}

function handleTime (data, event) {
  if (this.parent && !this.parent.rendered) {
    return
  }

  if (test.test(event.stamp)) {
    return
  }

  let node = this.parent.node
  let val = this.val

  if (val && val === Number(val) && val % 1 !== 0) {
    let duration = this.parent.duration.val
    node.currentTime = (duration * (val * 100)) / 100
  }
}

function handlePlay (data) {
  if (this.parent && !this.parent.rendered) {
    return
  }

  let node = this.parent.node
  let val = this.val

  if (val) {
    node.play()
  } else {
    node.pause()
  }
}

function setDuration () {
  let node = this.node

  if (!this.rendered || !node.readyState) {
    return
  }

  let duration = node.duration
  this.duration.val = duration
}

module.exports = function (element) {
  element.set(Html5Player)
  element.node.addEventListener('canplay', function (e) {
    e.target.base.emit('canplay')
  })
  element.node.addEventListener('play', function (e) {
    e.target.base.emit('play')
  })
}
