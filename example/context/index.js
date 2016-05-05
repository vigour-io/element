'use strict'
require('../style.css')
const render = require('../../lib/render')
const s = require('vigour-state/s')
const state = s({ greeting: 'hello' })

document.body.appendChild(render({
  text: 'context',
  key: 'app',
  Child: { class: 'holder' }
}, state, (state, type, stamp, tree, subs, sType) => {
  console.log('%cFIRE', 'color: white;background-color: #333; padding: 2px;', state.path().join('/'), ' - ', type, ' - ', sType || 'normal', '\n\n')
}))

// props
// then group
// then style
// then transform
