'use strict'
var renderLoop = require('./loop')
var Observable = require('vigour-js/lib/observable')
var _set = Observable.prototype.set
var _remove = Observable.prototype.remove
var Event = require('vigour-js/lib/event')

exports.define = {
  patch (event) {
    var parent = this
    while (parent) {
      if (event && !parent._force) {
        parent._lstamp = event.stamp
      }
      if (parent.renderTree) {
        renderLoop(parent, parent.uid)
        return
      }
      parent = parent.parent
    }
  },
  set (val, event, nocontext, escape) {
    var trigger
    if (event === void 0) {
      trigger = true
      event = new Event('data')
    }
    var changed = _set.call(this, val, event, nocontext, escape)
    if (changed && event) {
      changed.patch(event)
      if (trigger) {
        event.trigger()
      }
    }
    return changed
  },
  remove () {
    return _remove.apply(this, arguments)
  }
}

exports.on = {
  data: {
    patch (data, event) {
      if (data === null) {
        console.log('prop emit from remove... bit too many patches')
      }
      this.patch(event)
    }
  },
  reference (val) {
    if (!this._parent) {
      this.once('parent', function () {
        console.warn(
          `
          parent once listener for references, temp solution
          clean later! [element/patch:58]
          `,
          this.path
        )
        let parent = this
        while (parent) {
          parent._force = true
          parent = parent.parent
        }
      })
    }
    let parent = this
    while (parent) {
      parent._force = true
      if (parent.renderTree) {
        return
      }
      parent = parent.parent
    }
  }
}
