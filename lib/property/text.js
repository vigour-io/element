'use strict'
var Property = require('./')
exports.properties = {
  text: new Property({
    // text is very common!
    $type: 'string',
    define: {
      compare (property, data, props, children, current, prev) {
        if (prev && prev.vnode) {
          let stamp = property.$ && data ? data._lstamp : property._lstamp
          if (prev.state.props && prev.state.props.text == stamp) {
            if (!current.state.props) {
              current.state.props = prev.state.props
              // also remove stuff! super importante
            }
            // TODO FIX THIS BETTER!
            children.push(prev.vnode.children[current.state.props.textIndex])
            current.state.props.textIndex = children.length - 1
            return true
          }
        }
        if (!current.state.props) {
          current.state.props = {}
        }
        current.state.props.textIndex = children.length
        current.state.props.text = property.$ && data ? data._lstamp : property._lstamp
      }
    },
    render (val, properties, children) {
      if (val) {
        children.push(val)
      }
    }
  })
}
