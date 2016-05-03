'use strict'
module.exports = function attachEvent (e, data) {
  const touch = e.changedTouches
  if (touch) { e = touch[0] }
  data.x = e.clientX
  data.y = e.clientY
  data.event = e
  return data
}
