'use strict'
const props = require('../render/static').property
const getParent = require('../render/dom/parent')
const raf = global.requestAnimationFrame
var addedListener

exports.class = {
  properties: {
    focus: {
      render: {
        static (target, pnode, store) {
          target.collect(target.compute(), store, target.uid())
        },
        state (target, state, type, stamp, subs, tree, id, pid) {
          const pnode = getParent(type, stamp, subs, tree, pid)
          const focus = state.compute()
          var focused
          if (focus) {
            const mypath = pnode._s.path().join('.')
            if (focused = target.compute(focus.path().join('.') === mypath)) {
              const rootfocus = focus.getRoot().focus
              if (rootfocus && rootfocus.compute().path().join('.') === mypath) {
                pnode.focus()
                if (document.activeElement !== pnode) {
                  raf(() => pnode.focus())
                }
              }
            }
          }
          target.collect(focused, target.getStore(tree, pid + 'class'), id)
        }
      }
    }
  }
}

exports.properties = {
  focus (val) {
    this.hasEvents = true
    if (!this.props || !this.props.tabindex) {
      this.setKey('props', { tabindex: 0 }, false)
    }
    this.setKey('class', { focus: val }, false)

    if (!addedListener) {
      document.addEventListener('focus', function (e, stamp) {
        const target = e.target
        const elem = target._
        if (elem) {
          const f = elem.class.focus
          if (f && '$' in f) {
            focus(target._s, stamp)
          }
        }
      }, true)
      addedListener = true
    }
  }
}

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
  let y = pos.y + target.offsetHeight + 10
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

function focus (state, stamp) {
  const focus = state.lookUp('focus')
  const rootfocus = focus.getRoot().focus
  rootfocus.set(focus, stamp)
  focus.set(state, stamp)
}