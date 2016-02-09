'use strict'
module.exports = function createCurrentState (key, current, prev) {
  if (!current.state.props) {
    current.state.props = (prev && prev.state && prev.state.props) || {}
  } else if (prev && prev.state && !current.state.props[key]) {
    current.state.props[key] = prev.state.props[key]
  }
}
