'use strict'
var ua = require('../ua')
const PREFIX = ua.prefix
const DISPLAYFLEX = '-' + PREFIX + '-flex'
const DIRECTION = PREFIX + 'FlexDirection'
const JUSTIFY = PREFIX + 'JustifyContent'
const WRAP = PREFIX + 'FlexWrap'
const ALIGNITEMS = PREFIX + 'AlignItems'
const ALIGNCONTENT = PREFIX + 'AlignContent'
const ALIGNSELF = PREFIX + 'AlignSelf'
const GROW = PREFIX + 'FlexGrow'
const SHRINK = PREFIX + 'FlexShrink'
const BASIS = PREFIX + 'FlexBasis'
const ORDER = PREFIX + 'Order'
const FLEX = PREFIX + 'Flex'

exports.properties = {
  flex: {
    type: 'style',
    render (val, properties) {
      properties.style[FLEX] = val
    },
    Child: { type: 'style' },
    properties: {
      direction: {
        render (val, properties) {
          setDisplayFlex(properties)
          properties.style[DIRECTION] = val
        }
      },
      justify: {
        render (val, properties) {
          setDisplayFlex(properties)
          properties.style[JUSTIFY] = val
        }
      },
      wrap: {
        render (val, properties) {
          setDisplayFlex(properties)
          properties.style[WRAP] = val
        }
      },
      alignItems: {
        render (val, properties) {
          setDisplayFlex(properties)
          properties.style[ALIGNITEMS] = val
        }
      },
      alignContent: {
        render (val, properties) {
          setDisplayFlex(properties)
          properties.style[ALIGNCONTENT] = val
        }
      },
      alignSelf: {
        render (val, properties) {
          properties.style[ALIGNSELF] = val
        }
      },
      grow: {
        render (val, properties) {
          properties.style[GROW] = val
        }
      },
      order: {
        render (val, properties) {
          properties.style[ORDER] = val
        }
      },
      basis: {
        render (val, properties) {
          properties.style[BASIS] = val
        }
      },
      shrink: {
        render (val, properties) {
          properties.style[SHRINK] = val
        }
      }
    }
  }
}

function setDisplayFlex (properties) {
  if (!properties.style.display) {
    properties.style.display = DISPLAYFLEX
  }
}
