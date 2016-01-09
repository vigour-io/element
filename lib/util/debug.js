'use strict'
global.wl = function walklisteners (obs, cnt) {
  var x
  if (!cnt) {
    x = true
    cnt = { cnt: 0 }
  }
  // cnt.cnt++
  obs.each(function (p, key) {
    walklisteners(p, cnt)
  })
  if (obs._on) {
    if (obs._on.data && obs._on.data.attach) {
      console.log(obs._path)
      for (var i in obs._on.data.attach) {
        if (obs._on.data.attach[i] && obs._on.data.attach[i] instanceof Array) {
          console.log('   ', i, obs._on.data.attach[i], obs._on.data.attach[i][1]._path)
        }
      }
      cnt.cnt++
    }
  }
  if (x) {
    console.log('listeners!', cnt.cnt)
  }
}
