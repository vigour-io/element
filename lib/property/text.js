'use strict'

var Property = require('./')

/**
 * Use text to specify a text to an element
 * @type {string}
 * @memberOf Property
 *
 * @example
 * var a = new Element({
 *   text: {
 *     val: "some text"
 *   }
 * })
 *
 */
//
// var isNode = require('vjs/lib/util/is/node')
// if (isNode) {
//   exports.properties = { text: new Property() }
// } else {
//   exports.properties = {
//     text: new Property({
//       on: {
//         data: {
//           text: function (data, event) {
//             // this is super heavy
//             var element = this.parent
//             // this is whats heavy getting the val
//             var v = this.val
//             if (!v && v !== 0) {
//               v = ''
//             }
//             if (element) {
//               var node = element.node
//               var nodes = node.childNodes
//
//               if (/text/.test(node.type)) {
//                 node.value = v
//                 return
//               }
//
//               if (nodes) {
//                 for (var i = 0, l = nodes.length; i < l; i++) {
//                   node = nodes[i]
//                   if (node.nodeType === 3) {
//                     node.nodeValue = v
//                     return
//                   }
//                 }
//               }
//               node.appendChild(document.createTextNode(v))
//             }
//           }
//         }
//       }
//     }).Constructor
//   }
// }
//

var React = require('react')

var Text = React.createClass({
  render: function() {
    var text = this.props.text
    // console.log('???')
    return React.createElement('div', {}, text.val)
  },
  componentDidMount: function() {
    console.log('?', arguments, this)
    this.props.text._mounted = this
  }
})

var ReactDOM = require('react-dom')


exports.properties = {
  text: new Property({
    on: {
      data: {
        text: function (data, event) {
          // if(!this._react) {
            // console.log('???')
            // )
            if(this._mounted) {
              // this._mounted
              // ReactDOM.render( React.createElement(Text, {text: this}), this._mounted.getDOMNode())
                // this.parent.node.props.children[0] = React.createElement(Text, {text: this})
              // ReactDOM.render(this._mounted)
              // this.parent.node.
              // ReactDOM
            } else {
              this.parent.node.props.children[0] = React.createElement(Text, {text: this})
            }
            //
            // .setState({text: this})\
            // console.log(this.parent.node.props.children[0])

          // } else {
            // this._react.setProps({ text : this.val })
          // }
          // this.parent.node.props.xxx = this.val
        }
      }
    }
  }).Constructor
}
