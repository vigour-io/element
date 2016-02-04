'use strict'
var Property = require('./')
exports.properties = {
  text: new Property({
    // needs to be run as an element this is fucked! -- no good -- or compare overwrite
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
            console.log(prev.vnode)
            return true
          }
        }
        if (!current.state.props) {
          current.state.props = {}
        }
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
