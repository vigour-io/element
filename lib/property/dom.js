'use strict'
var flatParse = require('vigour-js/lib/base').prototype.parseValue
var Prop = require('../property')

exports.properties = {
  text: new Prop({
    render (node) {
      if (!node.__) {
        node.__ = document.createTextNode(flatParse.call(this))
        node.appendChild(node.__)
      } else {
        node.__.nodeValue = this.parseValue()
      }
    }
  }),
  css: new Prop({
    render (node) {
      node.className = this.parseValue()
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
  type: true
}
