'use strict'
module.exports = exports = function attachEvent (e, data) {
  const touch = e.changedTouches
  const ev = touch ? touch[0] : e
  data.prevX = data.x
  data.prevY = data.y
  data.x = ev.clientX
  data.y = ev.clientY
  data.event = e
  return data
}

exports.start = function attachStartPos (data) {
  data.startX = data.x
  data.startY = data.y
  return data
}
