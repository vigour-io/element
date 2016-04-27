'use strict'
// feels dirty -- maybe better to just not do this...
const isNumber = require('vigour-util/is/number')
const px = {
  type: 'style',
  $transform (val) {
    if (isNumber(val)) {
      // this is where the pnode thing becomes interesseting
      return val + 'px' // dont use a transform make this easy to do!
    }
  }
}
const pxval = { type: 'px' }
const properties = {}
const pxprops = [
  'width', 'height', 'left', 'height', 'left', 'top', 'bottom', 'right'
]
for (let i = 0, len = pxprops.length; i < len; i++) {
  properties[pxprops[i]] = pxval
}

exports.components = { px: px }
exports.properties = properties
