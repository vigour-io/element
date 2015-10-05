'use strict'

var Observable = require('vjs/lib/observable')
var remove = Observable.prototype.remove

// TODO redo this entire thing
exports.define = {
  /**
   * Use remove to remove a child Element from his parent.
   * @function remove
   * @memberOf Element
   *
   * @example
   *
   * var elem = new Element({
   *  otherElement:{
   *    css:"style"
   *  }
   *})
   * elem.otherElement.remove(); //elem.otherElement === null
   */
  remove: function () {
    var instances = this.hasOwnProperty('_instances') && this._instances
    var node = this.node
    var parentNode = node.parentNode
    var currContext
    var instance
    var property
    var length
    var parent
    var path
    var i = 0

    if (parentNode) {
      parentNode.removeChild(node)
    }

    if (instances) {
      for (length = instances.length; i < length; i++) {
        instance = instances[i]

        node = this.node
        parentNode = node.parentNode
        if (parentNode) {
          parentNode.removeChild(node)
        }
      }
    } else {
      parent = this._parent
      if (parent) {
        path = [this.key]

        var origContext = this._context
        var origLevel = this._contextLevel

        while (parent) {
          if (parent.hasOwnProperty('_instances')) {
            instances = parent._instances
            break
          }
          path.push(parent.key)
          parent = parent._parent
        }
        if (instances) {
          for (length = instances.length; i < length; i++) {
            instance = instances[i]
            for (var j = path.length - 1; j >= 0; j--) {
              property = path[j]
              instance = instance[property]
            }
            if (instance && instance === this) {
              node = this.node
              parentNode = node.parentNode
              if (parentNode) {
                parentNode.removeChild(node)
              }
            }
          }
        }
        if (origContext) {
          this._contextLevel = origLevel
          this._context = origContext
        } else {
          this.clearContextUp()
        }
        if (this._contextLevel) {
          currContext = this._context
          parent = this._parent
          for (var k = this._contextLevel - 1; k > 0; k--) {
            if (parent) {
              parent._context = currContext
              parent._contextLevel = k || null
              parent = parent._parent
            }
          }
        }
      }
    }

    remove.apply(this, arguments)
  }
}
