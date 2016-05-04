'use strict'
// -------------------------
// for comparable results
// https://github.com/Matt-Esch/virtual-dom/issues/371
// -------------------------
require('../style.css')
const benchmark = require('../benchmark')
benchmark.init(
  2500,
  {
    key: 'app',
    text: 'basic',
    holder: {
      $: 'collection',
      $any: true,
      Child: {
        class: 'basic-item',
        text: { $: 'title' }
      }
    }
  },
  (i, cnt) => {
    return { title: i + cnt }
  }
)
