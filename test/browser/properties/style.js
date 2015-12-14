describe('Element inline style', function () {
  var Element = require('../../../lib/element')

  Element.prototype.inject(
    require('../../../lib/property/style')
  )
  var el = new Element({})

  it('should show empty string when nothing is set on "style"', function () {
    expect(el.node.style.background).to.equal('')
  })

  it('should set new style background property', function () {
    el.set({
      style: {
        backgroundColor: 'red'
      }
    })

    expect(el.node.style.backgroundColor).to.equal('red')
  })

  it('should remove style background property', function () {
    el.set({
      style: {
        backgroundColor: ''
      }
    })

    expect(el.node.style.backgroundColor).to.equal('')
  })
})
