'use strict'
module.exports = function createCurrentState (key, current, prev) {
  if (!current.state.props) {
    current.state.props = (prev && prev.state.props) || {}
  } else if (prev && !current.state.props[key]) {
    current.state.props[key] = prev.state.props[key]
  }
}
