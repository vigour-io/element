'use strict'
// -------------------------
require('../style.css')
const benchmark = require('../benchmark')
benchmark.loop(
  2500,
  {
    key: 'app',
    text: 'basic-root',
    holder: {
      $: 'collection',
      $any: true,
      Child: {
        class: 'basic',
        text: { $: '$root.title' }
      }
    }
  },
  (i, cnt) => {
    return { title: i + cnt }
  },
  (state, cnt) => {
    state.set({ title: cnt })
  }
)
