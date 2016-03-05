'use strict'
exports.inject = require('../method/patch')

exports.define = {
  handleContextChild (data, event, context) {
    this.clearContext() // emit on all
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
          clean later! its wrong because it manipulates context [element/patch:26]
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
