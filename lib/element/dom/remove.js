'use strict'

var Observable = require('vigour-js/lib/observable')
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
  remove (event) {
    if (event !== false) {
      var node = this.node
      var parentNode = node.parentNode
      if (parentNode) {
        let instances = this.hasOwnProperty('_instances') && this._instances
        parentNode.removeChild(node)
        if (instances) {
          for (let i = 0, length = instances.length; i < length; i++) {
            let instance = instances[i]
            node = instance.node
            parentNode = node.parentNode
            if (parentNode) {
              parentNode.removeChild(node)
            }
          }
        } else {
          let parent = this._parent
          if (parent) {
            let path = [this.key]
            let origContext = this._context
            let origLevel = this._contextLevel
            while (parent) {
              if (parent.hasOwnProperty('_instances')) {
                instances = parent._instances
                break
              }
              path.push(parent.key)
              parent = parent._parent
            }
            if (instances) {
              let length = instances.length
              if (length > 1) {
                for (let i = 0; i < length; i++) {
                  let instance = instances[i]
                  for (let j = path.length - 1; j >= 0; j--) {
                    let property = path[j]
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
            }
            if (origContext) {
              this._contextLevel = origLevel
              this._context = origContext
            } else {
              this.clearContextUp()
            }
            if (this._contextLevel) {
              let currContext = this._context
              parent = this._parent
              for (let k = this._contextLevel - 1; k > 0; k--) {
                if (parent) {
                  parent._context = currContext
                  parent._contextLevel = k || null
                  parent = parent._parent
                }
              }
            }
          }
        }
      }
    }
    remove.apply(this, arguments)
  }
}
