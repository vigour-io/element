// courtesy of Robert Penner
// t: current time, b: beginning value, c: change In value, d: duration

module.exports = exports = {
  inCubic: function (t, b, c, d) {
    return c * (t /= d) * t * t + b
  },
  outCubic: function (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b
  },
  outBack: function (t, b, c, d, s) {
    s = 1.70158
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
  }
}
