'use strict'
// -------------------------
// for comparable results
// https://github.com/Matt-Esch/virtual-dom/issues/371
// -------------------------
require('../style.css')
const benchmark = require('../benchmark')
benchmark.loop(
  2500,
  {
    key: 'app',
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
  }
)
