'use strict'
exports.inject = require('../methods/patch')

exports.define = {
  handleContextChild (data, event, context) {
    // lets log here...
    // console.error('ok handle child!')
    this.clearContext() // emit on all
    this.emit('data', data, event)
  }
}

exports.on = {
  data: {
    patch (data, event) {
      console.error('yo yo yo')
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
    // else {
    let parent = this
    while (parent) {
      parent._force = true
      if (parent.renderTree) {
        break
      }
      parent = parent.parent
    }
    // }
  }
}
