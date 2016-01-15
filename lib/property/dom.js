'use strict'
var ua = require('../ua')
var Prop = require('./')
var prefix = ua.prefix

exports.inject = [
  require('./attributes'),
  require('./style')
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
      if (!node) {
        console.error(this, this.path)
      }
      if (!node.__) {
        node.__ = document.createTextNode(this.parseValue())
        node.appendChild(node.__)
      } else {
        node.__.nodeValue = this.parseValue() // this.parseValue()
      }
    }
  }),
  css: new Prop({
    render (node, event, element) {
      let key = element.key
      let val = this.parseValue()
      node.className = key ? key + ' ' + val : val
    },
    properties: {
      addClass (val, event) {
        var css = this.parseValue()
        if (typeof css === 'string') {
          let cssArr = css.split(' ')
          let valArr = val.split(' ')
          let i = valArr.length - 1
          for (; i >= 0; i--) {
            let val = valArr[i]
            let index = cssArr.indexOf(valArr[i])
            if (index === -1) {
              cssArr.push(val)
            }
          }
          this.set(cssArr.join(' '), event)
        } else {
          this.set(val, event)
        }
      },
      removeClass (val, event) {
        var css = this.parseValue()
        if (typeof css === 'string') {
          let cssArr = css.split(' ')
          let valArr = val.split(' ')
          let i = valArr.length - 1
          for (; i >= 0; i--) {
            let index = cssArr.indexOf(valArr[i])
            if (~index) {
              cssArr.splice(index, 1)
            }
          }
          this.set(cssArr.join(' '))
        }
      },
      toggleClass (val, event) {
        var css = this.parseValue()
        if (typeof css === 'string') {
          let cssArr = css.split(' ')
          let valArr = val.split(' ')
          let i = valArr.length - 1
          for (; i >= 0; i--) {
            let val = valArr[i]
            let index = cssArr.indexOf(val)
            if (~index) {
              cssArr.splice(index, 1)
            } else {
              cssArr.push(val)
            }
          }
          this.set(cssArr.join(' '), event)
        } else {
          this.set(val, event)
        }
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
  type: true
}
