var Element = require('../../lib/element')
var Property = require('../../lib/property')
var Base = require('vjs/lib/observable')
var Observable = require('vjs/lib/observable')

Element.prototype.inject(
  require('../../lib/property/style')
)

describe('style properties for inline css', function(){
  var el = new Element({})

  it('should show empty string when nothing is set on "style"',function(){
    expect(el.$node.style.background).to.equal('')
  })

  it('should set new style background property',function(){
    el.set({
      $style: {
        backgroundColor: 'red'
      }
    })

    console.log(el.$node.style)
    expect(el.$node.style.backgroundColor).to.equal('red')
  })

  it('should remove style background property',function(){
    el.set({
      $style: {
        backgroundColor: ''
      }
    })

    expect(el.$node.style.backgroundColor).to.equal('')
  })
})