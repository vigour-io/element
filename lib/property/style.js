'use strict'
var Property = require('./')

module.exports = new Property({
  properties: {
    render (fn) {
      this.define({
        render (val, properties) {
          if (!properties.style) {
            console.error('???')
            properties.style = {}
          }
          fn.apply(this, arguments)
        }
      })
    }
  },
  define: {
    compare (property, data, props, children, current, prev) {
      let key = property.key
      if (prev && prev.vnode) {
        let dom = property.dom
        if (dom) {
          let stamp = property.getStamp(data)
          let vstyle = prev.vnode.properties.style
          if (vstyle) {
            let prevstateprops = prev.state.props
            if (prevstateprops && prevstateprops[key] == stamp) { // eslint-disable-line
              if (!props.style) {
                props.style = {}
              }
              props.style[dom] = vstyle[dom]
              if (!current.state.props) {
                current.state.props = prevstateprops
              }
              return true
            }
          }
        }
      }
      if (!current.state.props) {
        current.state.props = {}
      }
      current.state.props[key] = property.$ && data ? data._lstamp : property._lstamp
    }
  }
}).Constructor
