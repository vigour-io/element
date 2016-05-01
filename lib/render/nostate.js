'use strict'
exports.property = function (target, type, stamp, subs, tree, div) {
  const nostatesproperties = target._noStatesP !== void 0
      ? target._noStatesP : target.keys('_noStatesP', noStateProperty)

  if (nostatesproperties) {
    for (let i in nostatesproperties) {
      let iteratee = target[nostatesproperties[i]]
      iteratee.render(void 0, type, stamp, subs, tree, div, iteratee.uid())
    }
  }
  return nostatesproperties
}

exports.element = function (target, type, stamp, subs, tree, div) {
  let nostates = target._noStates !== void 0
    ? target._noStates : target.keys('_noStates', noStateElement)
    console.log('nostate:', nostates)
  if (nostates) {
    for (let i in nostates) {
      let iteratee = target[nostates[i]]
      iteratee.render(void 0, type, stamp, subs, tree, div, iteratee.uid())
    }
  }
  return nostates
}

function noStateElement (val, key) {
  const target = val[key]
  return target && target.noState && target.isElement
}

function noStateProperty (val, key) {
  const target = val[key]
  return target && target.noState && !target.isElement
}
