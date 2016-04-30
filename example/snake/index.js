'use strict'
require('../style.css')
const benchmark = require('../benchmark')

benchmark.loop(
  1000,
  {
    key: 'app',
    holder: {
      $: 'collection',
      $any: true,
      Child: {
        node: 'img',
        class: 'snake-dot',
        props: {
          src: {
            $: 'bg'
          }
        },
        style: {
          transform: {
            y: { $: 'y' },
            x: { $: 'x' },
            rotate: { $: 'i' }
          }
        }
      }
    }
  },
  (i, cnt) => {
    var val = i + cnt
    val /= 5
    return {
      bg: 'http://loremflickr.com/320/240?' + i,
      i: cnt / 2,
      x: Math.sin(val / 5 + cnt / 40) * 400 +
        i * 0.3 + 500 +
        Math.cos(val + cnt / (40 - i / 1000)) * 10,
      y:
        Math.cos(val / 10) * 400 +
        i * 0.3 + 500 +
        Math.sin(val + cnt / (40 - i / 1000)) * 10
    }
  }
)
