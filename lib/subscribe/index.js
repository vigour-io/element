'use strict'
exports.properties = {
  $ (val) {
    if (this.noState) { this.noState = null }
    this.$ = val
  },
  $any: true,
  noState: true,
  defaultSubscription: true,
  render (val) {
    this.define({
      render: {
        value: val
      }
    })
  }
}
