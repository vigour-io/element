'use strict'
var StyleProp = require('./style')
var ua = require('../ua')
var PREFIX = ua.prefix
var DISPLAYFLEX = '-' + PREFIX + '-flex'
var DIRECTION = PREFIX + 'FlexDirection'
var JUSTIFY = PREFIX + 'JustifyContent'
var WRAP = PREFIX + 'FlexWrap'
var ALIGNITEMS = PREFIX + 'AlignItems'
var ALIGNCONTENT = PREFIX + 'AlignContent'
var ALIGNSELF = PREFIX + 'AlignSelf'
var GROW = PREFIX + 'FlexGrow'
var SHRINK = PREFIX + 'FlexShrink'
var BASIS = PREFIX + 'FlexBasis'
var ORDER = PREFIX + 'Order'
var FLEX = PREFIX + 'Flex'

exports.properties = {
  flex: new StyleProp({
    render (val, properties) {
      properties.style[FLEX] = val
    },
    properties: {
      direction: new StyleProp({
        render (val, properties) {
          setDisplayFlex(properties)
          properties.style[DIRECTION] = val
        }
      }),
      justify: new StyleProp({
        render (val, properties) {
          setDisplayFlex(properties)
          properties.style[JUSTIFY] = val
        }
      }),
      wrap: new StyleProp({
        render (val, properties) {
          setDisplayFlex(properties)
          properties.style[WRAP] = val
        }
      }),
      alignItems: new StyleProp({
        render (val, properties) {
          setDisplayFlex(properties)
          properties.style[ALIGNITEMS] = val
        }
      }),
      alignContent: new StyleProp({
        render (val, properties) {
          setDisplayFlex(properties)
          properties.style[ALIGNCONTENT] = val
        }
      }),
      alignSelf: new StyleProp({
        render (val, properties) {
          properties.style[ALIGNSELF] = val
        }
      }),
      grow: new StyleProp({
        render (val, properties) {
          properties.style[GROW] = val
        }
      }),
      order: new StyleProp({
        render (val, properties) {
          properties.style[ORDER] = val
        }
      }),
      basis: new StyleProp({
        render (val, properties) {
          properties.style[BASIS] = val
        }
      }),
      shrink: new StyleProp({
        render (val, properties) {
          properties.style[SHRINK] = val
        }
      })
    }
  })
}

function setDisplayFlex (properties) {
  if (!properties.style.display) {
    properties.style.display = DISPLAYFLEX
  }
}
