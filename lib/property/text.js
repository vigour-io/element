'use strict'
var Property = require('./')
exports.properties = {
  text: new Property({
    // needs to be run as an element this is fucked! -- no good -- or compare overwrite
    // text is very common!
    $type: 'string',
    render (val, properties, children) {
      // console.log('hello!', this.path, children)
      console.log(val)
      if (val) {
        // change later
        // properties.innherHTML = val
        // its coming here twice totally wrong
        // special handle
        children.push(val)
      }
    }
  })
}
