'use strict'
const test = require('tape')
const Elem = require('../lib/element')


test('Elem map', function (t) {
  t.plan(1)
  const elem1 = new Elem({
    holder: {
      $: 'field'
    }
  })
  const map1 = reset(elem1.$map())


  const elem2 = new Elem({
    holder: {
      $: 'field'
    }
  })

  const map2 = reset(elem2.$map())

  console.log(map1, map2)


  // testmap(t, elem1, {
  //   field: {
  //     val: 1,
  //     _: {
  //       t: {
  //         1: elem1.holder
  //       }
  //     }
  //   },
  //   _: {
  //     t: {
  //       2: elem1
  //     }
  //   }
  // })

  // const elem1 = new Elem({ holder: { $: 'field' } })
  // const map1 = elem1.$map()

  // t.same(map1, {
  //   field: {
  //     val: 1,
  //     _: {
  //       t: {
  //         1: elem1.holder
  //       }
  //     }
  //   },
  //   _: {
  //     t: {
  //       2: elem1
  //     }
  //   }
  // })

  // return elem
})

function reset (map) {
  let cnt = 1
  for (let i in map) {
    if (typeof map[i] === 'object' && !map[i].isElement) {
      console.log(i)
      map[i] = reset(map[i])
    }
    if (!isNaN(i)) {
      if (i != cnt) { // eslint-disable-line
        map[cnt] = map[i]
        delete map[cnt]
      }
      cnt++
    }
  }
  return map
}