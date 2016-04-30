'use strict'
require('../style.css')
console.clear()
const benchmark = require('../benchmark')
const app = {
  key: 'app',
  main: {
    holder3: {
      $: 'collection',
      $any: true,
      Child: {
        class: 'basic',
        text: { $: 'title' },
        props: {
          bla: 'hello!'
        },
        style: {
          border: '1px dotted white'
        }
      }
    },
    holder: {
      $: 'collection',
      $any: true,
      Child: {
        class: 'nestchild',
        on: {
          remove (val, stamp, node) {
            console.log('FIRE REMOVE:', val, stamp, node)
          }
        },
        star: {},
        something: {
          a: {
            b: {
              c: {
                text: 'haha'
              }
            }
          }
        },
        title: {
          text: { $: 'title' }
        },
        header: {
          a: {
            bla: {
              x: {
                text: { $: 'x', $prepend: 'x:' }
              },
              lastname: {
                text: {
                  $: 'title.lastname',
                  $prepend: 'lname: '
                }
              }
            },
            text: {
              $: 'title',
              $prepend: 'h:',
              $transform (val) { return val }
            }
          }
        }
      }
    }
  }
}

benchmark.loop(1000, app, (i, cnt) => {
  return {
    title: {
      val: i + cnt,
      lastname: i + cnt
    },
    x: i + cnt
  }
})
