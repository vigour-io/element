describe( 'Removing children', function(){

  var app = require( '../../../lib/app' )
  var Element = require( '../../../lib/element' )
  var util = require( 'vjs/lib/util' )

  var elem = new Element({
    $key: 'a',
    elemChild: {},
    elemChild2: {}
  })

  var elemInstance = new elem.$Constructor({
    $key: 'b',
    elemInstanceChild: {}
  })

  app.set({
  	elem:elem,
  	elemInstance:elemInstance
  })

  describe( 'Removing child from original', function(){
  	it('app.elem.elemChild.remove()',function(){
      // console.clear()

      //what goes wrong here is

      // elem with isntances

      // context word geset in emit

      // emit is after orig -- set instance
      // not orignal anumore??

      // console.log(elem, elem.elemChild._$context)
      // elem.elemChild.$resetContextsUp()

  		elem.elemChild.remove()
      // console.log(elem.
  	})

  	it( 'app.elem.elemChild is removed', function () {
      //this test is wrong
      // console.log('1!@#!@#?',elem.elemChild )
  		expect( elem.elemChild ).to.not.be.ok
  	})

  	it( 'app.elemInstance.elemChild is also removed', function () {
      // console.clear()
  		expect(elemInstance.elemChild).to.not.be.ok

  	})
    //
  	// //TODO: this test is good, we need to fix remove for nodes, and uncomment the test
  	it( 'app.elem.elemChild and app.elemInstance.elemChild nodes are removed', function () {
  		expect(document.getElementsByClassName('elemChild').length).to.not.be.ok
  	})

  })
  //
  //remove child from instance
  describe( 'Remove child from instance', function(){

  	it('app.elemInstance.elemChild2.remove()',function(){
  		elemInstance.elemChild2.remove()
  	})

  	it( 'app.elemInstance.elemChild2 is removed', function () {
  		expect( elemInstance.elemChild2 ).to.be.null
  	})

  	it( 'app.elem.elemChild2 is not removed', function () {

      //nu deze nog!

  		expect(elem.elemChild2).to.be.ok
  	})

  	//TODO: this test is good, we need to fix remove for nodes, and uncomment the test
  	it( 'only app.elemInstance.elemChild2 node is removed', function () {
  		expect(document.getElementsByClassName('elemChild2').length).to.not.be.one
  	})

  })

  describe( 'Removing original', function(){
  	it('app.elem.remove()',function(){
  		app.elem.remove()
  	})

  	it( 'app.elem is removed', function () {
  		expect(app.elem).to.not.be.ok
  	})

  	it( 'app.elemInstance is removed', function () {
  		expect(app.elemInstance).to.not.be.ok
  	})

  	//TODO: this test is good, we need to fix remove for nodes, and uncomment the test
  	it( 'app.elem.elemChild and app.elemInstance.elemChild nodes are removed', function () {
  		expect(document.getElementsByClassName('elemChild').length).to.not.be.ok
  	})

  })

})
