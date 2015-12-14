describe('Element css property', function () {
  var Element = require('../../../lib/element')

  Element.prototype.inject(
    require('../../../lib/property/css')
  )
  var element
  var childElement

  beforeEach(function () {
    element = new Element({
      key: 'elem',
      css: 'vigourClass'
    })
  })

  it('should add the css class on the Element', function () {
    expect(element.node.className).to.be.equals('elem vigourClass')
  })

  it('should change the css class', function () {
    element.css.set({
      val: 'newClass'
    })
    expect(element.node.className).to.be.equals('elem newClass')
  })

  it('should add another css class on the same element', function () {
    element.css.set({
      addClass: 'newClass'
    })
    expect(element.node.className).to.be.equals('elem vigourClass newClass')
  })

  it('should add and remove specific css class on the element', function () {
    element.css.set({
      addClass: 'newClass',
      removeClass: 'vigourClass'
    })

    expect(element.node.className).to.be.equals('elem newClass')
  })

  it('should add multiple css classes on the element', function () {
    element.css.set({
      addClass: 'newClass test test2'
    })

    expect(element.node.className).to.be.equals('elem vigourClass test2 test newClass')
  })

  it('should toggle css class on the element', function () {
    element.css.set({
      toggleClass: 'test'
    })
    expect(element.node.className).to.be.equals('elem vigourClass test')
  })

  it('should remove and toggle multiple css classes on the element', function () {
    element.css.set({
      addClass: 'test2',
      toggleClass: 'test'
    })
    expect(element.node.className).to.be.equals('elem vigourClass test2 test')
  })

  it('should remove multiple css classes on the element', function () {
    element.css.set({
      val: 'newClass test2',
      removeClass: 'newClass test2'
    })
    expect(element.node.className).to.be.equals('elem')
  })
})

