describe('On mousedown',function(){
	require('./mousedown')
})

describe('On mouseup',function(){
	require('./mouseup')
})

describe('On scroll',function(){
	require('./scroll')
})


// Element.prototype.inject(
//   require( '../../lib/property/css' ),
//   require( '../../lib/property/text' ),
//   require( 'vjs/lib/methods/lookUp' )
// )

// var click = 0
// var grab = 0
// var a = new Element( {
// 	$on:{
// 		$click:function (argument) {
// 			this.$val = ++click
// 		},
// 		$grab:function (argument) {
// 			this.$val = ++grab
// 		}
// 	}
// } )

// var b = new a.$Constructor({
// 	$val:'own value'
// })

// describe( 'Events', function ( done ) {
// 	it( 'Click event available inside an element', function ( done ) {
		
// 		a.$emit('$click')
// 		expect(a.$val).to.be.equal(1)
// 		expect(b.$val).to.be.equal('own value')
		
// 		b.$emit('$click')
// 		expect(a.$val).to.be.equal(1)
// 		expect(b.$val).to.be.equal(2)

// 		done()
// 	})

// 	it( 'Grab event available inside an element', function ( done ) {
// 		a.$emit('$grab')
// 		expect(a.$val).to.be.equal(1)
// 		expect(b.$val).to.be.equal(2)
// 		done()
// 	})

// 	it( 'Override an event', function( done ) { 
// 		a.$on.$click.$val = function () {
// 			this.$val = 'overridden click'
// 		}
// 		a.$emit('$click')
// 		expect(a.$val).to.be.equal('overridden click')
// 		done()
// 	})

// 	it( 'Remove an event', function( done ) { 
		
// 		a.$on.$click.$val = function () {
// 			this.$val = 'not removed'
// 		}

// 		a.$on.$click.remove()
// 		a.$emit('$click')
// 		expect(a.$val).to.be.equal('overridden click')
// 		done()
// 	})
	
// })