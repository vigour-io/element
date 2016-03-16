'use strict'
exports.on = {
  remove: {
    interval () {
      this.clearInterval()
    }
  }
}

exports.define = {
  setInterval (id, fn, time) {
    var props = this.state.props
    if (typeof id === 'function') {
      time = fn
      fn = id
      id = 'val'
    }
    if (!props._intervals) {
      props._intervals = {}
    } else if (props._intervals[id]) {
      this.clearInterval(id)
    }
    let store = this.storeContext()
    let _this = this
    props._intervals[id] = setInterval(() => {
      _this.applyContext(store)
      fn.call(_this)
    }, time)
  },
  clearInterval (id) {
    var state = this.state
    if (state) {
      let props = state.props
      let intervals = props._intervals
      if (intervals) {
        if (id !== void 0) {
          clearInterval(props._intervals[id])
          props._intervals[id] = null
        } else {
          for (let i in intervals) {
            clearInterval(intervals[i])
            intervals[i] = null
          }
        }
      }
    }
  }
}
