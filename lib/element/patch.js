'use strict'
var renderLoop = require('./loop')
var Observable = require('vigour-js/lib/observable')
var _set = Observable.prototype.set
var _remove = Observable.prototype.remove
var Event = require('vigour-js/lib/event')
// get morwe base stuff here!

function assambleStamps () {

}

exports.define = {
  patch: function (cb) {
    // if (!renderLoop.inProgress) {
      // this has to become super efficient
    var parent = this
    while (parent) {
      if (parent.renderTree) {
        // so we check is it rendering current ly
        // if no we do a patch (patches are also badged ofc)
        // 2 patches is rly rly good for the time instead of wicked
        //tree and node thats it
        // then another add patch
        // context is ofc wrong...
        // also needs data attached
        renderLoop(parent, parent.uid, cb)
        return
      }
      parent = parent.parent
    }
    // }
  },
  set (val, event, nocontext, escape) {
    var trigger
    if (event === void 0) {
      trigger = true
      event = new Event('data')
    }
    var changed = _set.call(this, val, event, nocontext, escape)
    if (changed && event) {
      // this._lstamp = event.stamp //maybe in render? last rendered or something?
      var parent = changed
      while (parent) {
        // if (nocontext) {
        // parent._lstamp = void 0
        if (!parent._datarender) {
          parent._lstamp = event.stamp
        } else {
          break;
        }
        parent = parent._parent
      }
      // this._lstamp = event.stamp
      // has ot be apllied on render
      // how will this work
      // a [ b, c ]  -->   a.b._lstamp = 30
      // will use the actual lstamp in the data to speed things up
      if (trigger) {
        event.trigger()
      }
      changed.patch() // check rendered stamp if same -- dont do
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
    if (this._input instanceof Observable) {
      let parent = this
      // this._datarender = true
      while (parent) {
        if (parent._datarender) {
          break
        }
        parent._lstamp = void 0
        parent._datarender = true
        parent = parent.parent
      }
    }
  }
}

  // on: {
  //   data () {
  //     this.patch()
  // rather not! ha
  // just do whgen set -- if instance then do ---xxxx
  //   }
  // },
