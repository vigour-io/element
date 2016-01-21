'use strict'
var ua = require('../ua')
var Prop = require('./')
var prefix = ua.prefix

exports.inject = [
  require('./attributes'),
  require('./style'),
  require('./css'),
  require('./focus')
  // require('./background/image')
]

exports.properties = {
  value: new Prop({
    render (node) {
      var val = this.parseValue()
      if (node.value !== val) {
        // has to be solved by adding a EventType dom event that we do an instanceof check for
        node.value = this.parseValue()
      }
    }
  }),
  opacity: new Prop({
    render (node) {
      node.style.opacity = this.parseValue()
    }
  }),
  display: new Prop({
    render (node) {
      var val = this.parseValue()
      if (val === true) {
        node.style.display = 'block'
      } else if (typeof val !== 'string') {
        node.style.display = 'none'
      } else {
        node.style.display = val
      }
    }
  }),
  text: new Prop({
    inject: require('vigour-js/lib/operator/prepend'),
    render (node) {
      if (!node.__) {
        node.__ = document.createTextNode(this.parseValue())
        node.appendChild(node.__)
      } else {
        node.__.nodeValue = this.parseValue() // this.parseValue()
      }
    }
  }),
  html: new Prop({
    render (node) {
      node.innerHTML = this.parseValue()
    }
  }),
  src: new Prop({
    render (node) {
      node.src = this.parseValue()
    }
  }),
  w: new Prop({
    render (node) {
      var val = this.parseValue()
      node.style.width = typeof val === 'string' ? val : val + 'px'
    }
  }),
  h: new Prop({
    render (node) {
      var val = this.parseValue()
      node.style.height = typeof val === 'string' ? val : val + 'px'
    }
  }),
  x: new Prop({
    render (node, event) {
      var x = this.parseValue() || 0
      var y = node._y || 0
      node._x = x
      if (this._input !== null) {
        node.style[prefix + 'Transform'] = 'translate3d(' + x + 'px, ' + y + 'px, 0px)'
      }
    }
  }),
  y: new Prop({
    render (node, event) {
      var y = this.parseValue() || 0
      var x = node._x || 0
      node._y = y
      if (this._input !== null) {
        node.style[prefix + 'Transform'] = 'translate3d(' + x + 'px, ' + y + 'px, 0px)'
      }
    }
  }),
  order: new Prop({
    render (node) {
      var order = this.parseValue() || 0
      node.style.order = order
    }
  }),
  node (val, event) {
    this.setKey('type', val, event)
  },
  insertBefore: true,
  type: true,
  index:true,
}
