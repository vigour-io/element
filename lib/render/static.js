'use strict'

exports.property = function (target, div, param) {
  const props = target._staticProps !== void 0
      ? target._staticProps : target.keys('_staticProps', isStaticProperty)
  if (props) {
    for (let i = 0, len = props.length; i < len; i++) {
      let iteratee = target[props[i]]
      iteratee.render.static(iteratee, div, param)
    }
  }
  return props
}

exports.element = function (target, div) {
  const elements = target._staticElements !== void 0
    ? target._staticElements : target.keys('_staticElements', isStaticElement)
  if (elements) {
    for (let i = 0, len = elements.length; i < len; i++) {
      let iteratee = target[elements[i]]
      iteratee.render.static(iteratee, div)
    }
  }
  return elements
}

function isStaticElement (val, key) {
  const target = val[key]
  return target && target.isStatic && target.isElement
}

function isStaticProperty (val, key) {
  const target = val[key]
  return target && target.isStatic && !target.isElement
}
