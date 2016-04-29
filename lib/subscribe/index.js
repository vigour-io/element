'use strict'
exports.properties = {
  $ (val) {
    if (this.noState) {
      this.noState = null
    }
    this.$ = val
  },
  $any: true,
  noState: true,
  render (val) {
    this.define({
      render: val
    })
  }
}
