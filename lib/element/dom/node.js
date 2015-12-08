'use strict'
exports.define = {
  /**
   * This returns the node element of the Element.
   * @memberOf Element
   * @type {Element}
   *
   * @example
   *
   *var elem = new Element({
   *  element:{
   *    css:"style"
   *  }
   *})
   *
   * //This element will be a <div></div> by default.
   *
   * console.log(element.node) // <div class="style"></div>
   */
  node: {
    get () {
      var node = this._node
      if (!node) {
        node = document.createElement('div')
        node.base = this
        let key = this.key
        if (key) {
          this.setNodeKey(node, key)
        }
        this._node = node
      } else {
        let context = this._context
        if (context) {
          node = context.node

          let path = this.path
          let length = path.length
          let childNodes = node.childNodes
          let contextLevel = this._contextLevel
          let i = length - contextLevel - 1

          for (; i < length; i++) {
            for (let j = childNodes.length - 1; j >= 0; j--) {
              node = childNodes[j]
              if (node.nodeType !== 3) {
                if (this.getNodeKey(node) === path[i]) {
                  childNodes = node.childNodes
                  break
                }
              }
            }
          }
        }
      }

      return node
    }
  },
  /**
   * This internal function checks if there's a property called css in the element, if not, it will create
   * a data-key attibute on the tag with the node key. Otherwise it will create a class attribute with this value
   * @memberOf Element
   * @function setNodeKey
   * @todo refactor this so it uses the css internals (one place for engine switching)
   * @example
   *var elem = new Element({
   *
   *})
   *
   * app.set({
   *  userBox :new elem.Constructor
   * })
   *
   * // This element will be a <div class="userBox"></div> by default.
   *
   */
  setNodeKey (node, key) {
    if (this.css) {
      node.setAttribute('data-key', key)
      node.className = key + ' ' + node.className
    } else {
      node.className = key
    }
  },
  getNodeKey (node) {
    if (this.css) {
      return node.getAttribute('data-key')
    } else {
      return node.className
    }
  }
}

exports.properties = {
  /**
   * This is a node flag, and it allows you to specify the node type that you want to create.
   * The default element will be a <div></div>
   * @memberOf Element
   * @function node
   *
   * @example
   *
   *var elem = new Element({
   *  node:'section'
   *})
   *
   * //This element will be a <section></section> by default.
   *
   */
  node (node) {
    var originalNode
    var attributes
    var attribute

    // TODO remove the old node
    if (typeof node === 'string') { // maybe move this to the getter
      node = document.createElement(node)
        // if there are attributes, copy these to new node
      if (originalNode = this._node) {
        attributes = originalNode.attributes
        for (var i = attributes.length - 1; i >= 0; i--) {
          attribute = attributes[i]
          node.setAttribute(attribute.nodeName, attribute.value)
        }
      }
    }

    if (node) {
      node.base = this
      this._node = node
    }
  },
  insertBefore:true//,
  // setBefore (val) {
  //   var parentNode = this.node
  //   for (var i in val) {
  //     let refNode = this[i].node
  //     this.set(val[i])
  //     parentNode.insertBefore(refNode)
  //     console.log('----->',i, val[i])
  //   }
  // }
}
