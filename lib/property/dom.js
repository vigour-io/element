'use strict'
var flatParse = require('vigour-js/lib/base').prototype.parseValue
var Emitter = require('vigour-js/lib/emitter')
var ua = require('../ua')
var Prop = require('./')
var prefix = ua.prefix

var transform = new Emitter({
  val (node, event) {
    var str = ''
    var x = this.x && this.x.parseValue(void 0, event) | 0
    var y = this.y && this.y.parseValue(void 0, event) | 0
    var rotate = this.rotate && this.rotate.parseValue(void 0, event) | 0
    var scale = this.scale && this.scale.parseValue(void 0, event)
    if (x || y) {
      str += 'translate3d(' + (x || 0) + 'px, ' + (y || 0) + 'px, 0px)'
    }
    if (rotate) {
      str += 'rotate(' + rotate + 'deg)'
    }
    if (scale || scale === 0) {
      if (scale < 1e-6) {
        scale = 1e-6
      }
      str += 'scale(' + scale + ')'
    }
    transform.node.style[prefix + 'Transform'] = str
  }
})

exports.properties = {
  text: new Prop({
    render (node) {
      if (!node.__) {
        node.__ = document.createTextNode(this.parseValue())
        node.appendChild(node.__)
      } else {
        node.__.nodeValue = flatParse.call(this.parseValue()) // this.parseValue()
      }
    }
  }),
  css: new Prop({
    render (node) {
      node.className += ' ' + flatParse.call(this)
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
          this.set(cssArr.join(' '), event)
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
      transform.node = node
      transform.emit(node, event, this.parent)
    }
  }),
  y: new Prop({
    render (node, event) {
      transform.node = node
      transform.emit(node, event, this.parent)
    }
  }),
  node (val, event) {
    this.setKey('type', val, event)
  },
  insertBefore: true,
  type: true
}
