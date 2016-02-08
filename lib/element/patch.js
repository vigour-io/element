'use strict'
var renderLoop = require('./loop')
var Observable = require('vigour-js/lib/observable')

exports.define = {
  patch (event) {
    var parent = this
    console.log('lets patch!', this.path)
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
  handleContextChild (data, event, context) {
    console.log('lets handle child!', this.path)
    this.clearContext()
    this.emit('data', data, event)
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
  reference (val, event) {
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
        break
      }
      parent = parent.parent
    }
  }
}
