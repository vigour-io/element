'use strict'
const isObj = require('vigour-util/is/obj')
const Elem = require('../lib/element')
const test = require('tape')
const e = (set) => new Elem(set)
const slice = [].slice

test('simple element map', function (t) {
  var elem, map
  t.plan(4)

  elem = e()
  map = prep(elem.$map())
  t.same(map, {
    _: obj('t', elem)
  }, 'empty element, no subs')

  elem = e({ holder: {} })
  map = prep(elem.$map())
  t.same(map, {
    _: obj('t', elem)
  }, 'element with child, no subs')

  elem = e({ $: 'field' })
  map = prep(elem.$map())
  t.same(map, {
    field: sub(1, 't', elem)
  }, 'element, sub')

  elem = e({ holder: { $: 'field' } })
  map = prep(elem.$map())
  t.same(map, {
    field: sub(1, 't', elem.holder),
    _: obj('t', elem)
  }, 'element with child, nested sub')
})

test('simple element with properties map', function (t) {
  var elem, map
  t.plan(4)

  elem = e({ style: { x: 10 } })
  map = prep(elem.$map())
  t.same(map, {
    _: obj('t', elem)
  }, 'property, no subs')

  elem = e({ text: { $: 'textField' } })
  map = prep(elem.$map())
  t.same(map, {
    textField: sub(true, 's', elem.text),
    _: obj('t', elem)
  }, 'text property, subs')

  elem = e({
    style: { x: { $: 'xField' } }
  })
  map = prep(elem.$map())
  t.same(map, {
    xField: sub(true, 's', elem.style.x),
    _: obj('t', elem.style, elem)
  }, 'style property, subs')

  elem = e({
    text: { $: 'textField' },
    style: {
      x: { $: 'xField' },
      y: { $: 'yField' }
    }
  })

  map = prep(elem.$map())
  t.same(map, {
    xField: sub(true, 's', elem.style.x),
    yField: sub(true, 's', elem.style.y),
    textField: sub(true, 's', elem.text),
    _: obj('t', elem.style, elem)
  }, 'mixed properties, subs')
})

test('simple collection map', function (t) {
  var elem, map
  t.plan(3)

  elem = e({ $: 'things.$any' })
  map = prep(elem.$map())
  t.same(map, {
    things: sub(1, 't', elem, {
      $any: sub(1, 't', child(elem))
    })
  }, 'collection, no child subs')

  elem = e({
    $: 'things.$any',
    Child: { $: 'field' }
  })
  map = prep(elem.$map())
  t.same(map, {
    things: sub(1, 't', elem, {
      $any: sub(1, 't', child(elem), {
        field: sub(1, 't', child(elem))
      })
    })
  }, 'collection, child subs')

  elem = e({
    Child: {
      $: 'field',
      holder: { text: { $: 'title' } }
    },
    $: 'things.$any'
  })
  map = prep(elem.$map())

  t.same(map, {
    things: sub(1, 't', elem, {
      $any: sub(1, 't', child(elem), {
        field: sub(1, 't', child(elem), child(elem).holder, {
          title: sub(true, 's', child(elem).holder.text)
        })
      })
    })
  }, 'collection, child subs')
})

// starts uids from 1 in each object and removes parent field
function prep (map) {
  if (isObj(map)) {
    let remap = {}
    for (let i in map) {
      if (i !== 'p' && i !== 'da' && i !== 'sa' && i !== 'ta') {
        remap[i] = prep(map[i])
      }
    }
    return remap
  } else {
    return map
  }
}

function sub (val) {
  var set = arguments[arguments.length - 1]
  var arr
  if (isObj(set)) {
    arr = slice.call(arguments, 1, -1)
  } else {
    arr = slice.call(arguments, 1)
    set = {}
  }
  set.val = val
  set._ = obj.apply(null, arr)
  return set
}
// creates store for every string argument and populates with following arguments
function obj () {
  const l = arguments.length
  const obj = {}
  let target
  for (let i = 0; i < l; i++) {
    const val = arguments[i]
    if (typeof val === 'string') {
      target = obj[val] = {}
    } else {
      const elem = arguments[i]
      // @todo needs context uid
      target[elem._uid] = elem
    }
  }
  return obj
}

function child (elem) {
  return elem.Child.prototype
}
