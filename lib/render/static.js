'use strict'
exports.property = function (target, type, stamp, subs, tree, div) {
  const props = target._staticProps !== void 0
      ? target._staticProps : target.keys('_staticProps', staticProperty)

  if (props) {
    for (let i = 0, len = props.length; i < len; i++) {
      let iteratee = target[props[i]]
      iteratee.render(void 0, type, stamp, subs, tree, div, iteratee.uid())
    }
  }
  return props
}

exports.element = function (target, type, stamp, subs, tree, div) {
  const elements = target._staticElements !== void 0
    ? target._staticElements : target.keys('_staticElements', staticElement)
  if (elements) {
    for (let i = 0, len = elements.length; i < len; i++) {
      let iteratee = target[elements[i]]
      iteratee.render(void 0, type, stamp, subs, tree, div, iteratee.uid())
    }
  }
  return elements
}

function staticElement (val, key) {
  const target = val[key]
  return target && target.isStatic && target.isElement
}

function staticProperty (val, key) {
  const target = val[key]
  return target && target.isStatic && !target.isElement
}
