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
      if (event && !parent._datarender) {
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
      var parent = changed
      // console.log('ok ok ok', cah)
      while (parent) {
        if (!parent._datarender) {
          parent._lstamp = event.stamp
        } else {
          break
        }
        parent = parent._parent
      }
      if (trigger) {
        event.trigger()
      }
      console.log('PATCH IT!', changed.path)
      changed.patch()
    }
    return changed
  },
  remove () {
    this.patch()
    return _remove.apply(this, arguments)
  }
}

exports.on = {
  reference (val) {
    // only if not parent!
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
        // this._datarender = true
        while (parent) {
          parent._lstamp = null
          parent._datarender = true
          parent = parent.parent
        }
      })
    }

    let parent = this
    while (parent) {
      parent._lstamp = null
      parent._datarender = true
      parent = parent.parent
    }
  }
}
