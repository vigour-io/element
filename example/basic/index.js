'use strict'
// -------------------------
// for comparable results
// https://github.com/Matt-Esch/virtual-dom/issues/371
// -------------------------
require('../style.css')
const benchmark = require('../benchmark')
benchmark.init(
  2,
  {
    key: 'app',
    text: 'basic',
    holder: {
      $: 'collection.$any',
      Child: {
        class: 'basic-item',
        text: { $: 'title' } // lookup 2 per thing and then one extra for the parent very very bad
      }
    }
  },
  (i, cnt) => {
    return { title: i + cnt }
  }
)
