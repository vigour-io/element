'use strict'
var VText = require('virtual-dom/vnode/vtext')

exports.properties = {
  text: {
    type: 'property',
    $type: 'string',
    define: {
      compare (property, data, props, children, current, prev) {
        let dstamp = (property.$ || property._datarender) && data && data._lstamp
        let lstamp = property._lstamp
        let stamp = (dstamp && (lstamp ? dstamp + lstamp : dstamp)) || lstamp
        if (!(prev && prev.state && prev.state.elem.uid !== current.state.elem.uid)) {
          if (prev && prev.vnode && children.length) {
            if (prev.state.props && prev.state.props.text === stamp) {
              if (!current.state.props) {
                current.state.props = prev.state.props
              }
              if (children.length !== prev.state.props.textIndex) {
                return
              }
              if (data && data.__input === null) {
                return true
              }
              children.push(prev.vnode.children[prev.state.props.textIndex].text)
              current.state.props.textIndex = prev.state.props.textIndex
              return true
            }
          }
        }
        if (!current.state.props) {
          current.state.props = {}
        }
        current.state.props.textIndex = children.length
        current.state.props.text = stamp
      }
    },
    render (val, properties, children) {
      if (val) {
        children.push(new VText(val))
      }
    }
  }
}
