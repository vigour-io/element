'use strict'
exports.on = {
  remove: {
    postpone () {
      var props = this.state.props
      if (!props) {
        props = this.state.props = {}
      }
      var postponed = props._postponed
      if (postponed) {
        for (var id in postponed) {
          clearTimeout(postponed[id])
          postponed[id] = null
        }
      }
    }
  }
}

exports.define = {
  postpone (id, fn, time) {
    var props = this.state.props
    if (!props) {
      props = this.state.props = {}
    }
    if (typeof id === 'function') {
      time = fn
      fn = id
      id = 'val'
    }
    if (!props._postponed) {
      props._postponed = {}
    } else if (props._postponed[id]) {
      clearTimeout(props._postponed[id])
      props._postponed[id] = null
    }
    let store = this.storeContext()
    props._postponed[id] = setTimeout(() => {
      props._postponed[id] = null
      this.applyContext(store)
      fn.call(this)
    }, time)
  }
}
