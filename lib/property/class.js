'use strict'
const getParent = require('../render/dom/parent')
const $ = require('../subscribe').properties.$

exports.properties = {
  class: {
    type: 'group',
    storeContextKey: true,
    render: {
      static (target, pnode) {
        setClassName(target.cParent().key, target.storeStatic(pnode), target, pnode)
      },
      state (target, state, type, stamp, subs, tree, id, pid) {
        setClassName(
          key(target, pid),
          target.storeState(state, type, stamp, subs, tree, pid + 'class', pid),
          target,
          getParent(type, stamp, subs, tree, pid)
        )
      }
    },
    Child: {
      render: {
        static (target, pnode, store) {
          collect(target.compute(), target, store, target.uid())
        },
        state (target, state, type, stamp, subs, tree, id, pid) {
          collect(target.compute(state), target, target.getStore(tree, pid + 'class'), id)
        }
      }
    },
    properties: {
      focus: {
        properties: {
          $ (val) {
            const elem = this._parent._parent
            elem.set({
              props: { tabindex: 0 },
              on: {
                arrowup (data) {
                  const target = data.target
                  focusup(target)
                  // const rect = target.getBoundingClientRect()
                  // const xpos = x(rect)
                  // const ypos = y(rect)
                  // const inc = -10
                  // focusvertical(target, xpos, ypos, inc, rect.width)
                },
                arrowdown (data) {
                  const target = data.target
                  focusdown(target)
                  // const rect = target.getBoundingClientRect()
                  // const xpos = x(rect)
                  // const ypos = y(rect) + rect.height
                  // const inc = 10
                  // focusvertical(target, xpos, ypos, inc, rect.width)
                }
              }
            }, false)
            $.call(this, val)
          }
        },
        render: {
          static (target, pnode, store) {
            collect(target.compute(), target, store, target.uid())
          },
          state (target, state, type, stamp, subs, tree, id, pid) {
            const pnode = getParent(type, stamp, subs, tree, pid)
            const focus = state.compute()
            var focused
            if (focus) {
              const mypath = pnode._s.path().join('.')
              if (focused = target.compute(focus.path().join('.') === mypath)) {
                // const rootfocus = focus.getRoot().focus.compute().path().join('.')
                pnode.focus()
                if (document.activeElement !== pnode) {
                  window.requestAnimationFrame(() => pnode.focus())
                }
              }
            }
            collect(focused, target, target.getStore(tree, pid + 'class'), id)
          }
        }
      }
    }
  }
}

function collect (val, target, store, id) {
  const _ = store._ || (store._ = {})
  const index = _[id] || (_[id] = store.length + 1)
  store[index] = val ? typeof val === 'string' ? val : target.key : ''
}

function setClassName (key, val, target, pnode) {
  if (val) {
    pnode.className = key ? key + ' ' + val : val
  } else if (key) {
    pnode.className = key
  }
}

function key (target, pid) {
  if (pid[0] === 'c') {
    for (let i = pid.length - 1; i >= 0; i--) {
      if (pid[i] === '-') {
        return pid.slice(1, i)
      }
    }
  }
  return target.cParent().key
}

// default makes sure it always sets "key"
exports.class = ''

//focus things

function focusup (target) {
  const previous = target.previousSibling
  if (previous && focusable(previous)) {
    const prect = previous.getBoundingClientRect()
    const rect = target.getBoundingClientRect()
    if (prect.top + prect.height <= rect.top) {
      previous.focus()
      return previous
    }
  }
  const pos = getpos(target)
  const startx = pos.x
  let x = startx
  let y = pos.y - 10
  const max = x + target.offsetWidth
  while (y >= 0) {
    while (x <= max) {
      let elem = document.elementFromPoint(x, y)
      if (elem !== target) {
        if (focusable(elem)) {
          elem.focus()
          return elem
        } else {
          target = elem
        }
      }
      x = x + 10
    }
    y = y - 10
    x = startx
  }
}

function focusdown (target) {
  const next = target.nextSibling
  if (next && focusable(next)) {
    const prect = next.getBoundingClientRect()
    const rect = target.getBoundingClientRect()
    if (prect.top + prect.height <= rect.top) {
      next.focus()
      return next
    }
  }
  const pos = getpos(target)
  const startx = pos.x
  let x = startx
  let y = pos.y + 10
  const max = x + target.offsetWidth
  const height = global.innerHeight
  while (y <= height) {
    while (x <= max) {
      let elem = document.elementFromPoint(x, y)
      if (elem !== target) {
        if (focusable(elem)) {
          elem.focus()
          return elem
        } else {
          target = elem
        }
      }
      x = x + 10
    }
    y = y + 10
    x = startx
  }
}

function getpos(el) {
  var x = 0
  var y = 0
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      const xscroll = el.scrollLeft || document.documentElement.scrollLeft
      const yscroll = el.scrollTop || document.documentElement.scrollTop

      x = x + (el.offsetLeft - xscroll + el.clientLeft)
      y = y + (el.offsetTop - yscroll + el.clientTop)
    } else {
      x = x + (el.offsetLeft - el.scrollLeft + el.clientLeft)
      y = y + (el.offsetTop - el.scrollTop + el.clientTop)
    }

    el = el.offsetParent
  }
  return { x: x, y: y }
}

function focusable (target) {
  return target._ && target._.class.focus
}

document.addEventListener('focus', function (e) {
  const target = e.target
  const elem = target._
  console.log(e)
  if (elem) {
    const focus = elem.class.focus
    if (focus && '$' in focus) {
      const state = target._s
      state.lookUp('focus').set(state)
    }
  }
}, true)