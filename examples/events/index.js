var Element = require('../../lib/element')

//-------- example implementation----------

var app = new Element({
  $key:'app',
  $node: document.body
})

var YUZI = new Element({
  $key:'YUZI',
  a: {
    b: {
      c: {
        d: {
          $on: {
            mousemove:function( event ) {
              // console.log(event.toString())
              this.$node.style.opacity = Math.random()
            }
          }
        }
      }
    }
  }
})

console.log('???', YUZI.$node)

app.$set({
  yus: new YUZI.$Constructor(),
  xyus: new YUZI.$Constructor(),
  xx:  new YUZI.$Constructor()
})

console.log( YUZI )



console.log( app.yus )

console.log( app.yus.a.$parent.$node )

console.log( app.yus.a === YUZI.a )

console.log( app.yus.a.b === YUZI.a.b )

/*
  check tot $base
  
  sla path op hoe je er bent gekomen ( in nodes )
  
  op $base kijk path naar benedend resolve instances
    zoek de fields bij het path

  a.b.c

  'a ( context )'
  'a.b.c
  
  zoeken tot base sla node path op

  dan enmaal bij base aangekomen
    loop path af door je props -- en resolve

  //x.x.x 

  //CONTEXT.path

*/


/*

  node resolven op maken nieuwe instance op een set van een ding wat al bestaat


  //new node moet zoeken of er al een parent node is en resolven
  a.b.c.d.$set({x:true})
  
  a is context (is real )
  //er word al van alles gedaan


*/

console.clear()

app.yus.a.b.c.$set({
  flups: {}
})

app.$node.style.border = '1px solid black'

var perf = require('vjs/dev/perf')
var holder 
perf(function() {
  holder = new Element({})
  for(var i = 0 ; i < 10000; i++) {
    var obj = {}
    obj[i] = new YUZI.$Constructor()
    holder.$set(obj)
  }
  app.$set({
    h: holder
  })
})


// //-------- example implementation----------

// var app = new Element({
//   $key:'app',
//   $node: document.body
// })

// // var aa = new Element()

// // aa.define({
// //   $node: {
// //     get:function() {
// //      if(!this._$node)  {
// //         this._$node = document.createElement( 'div' )
// //         this._$node.$base = this
// //         this._$node.style.border = '4px solid purple'
// //         this._$node.style.background = 'pink'
// //         this._$node.style.padding = '4px'
// //         this._$node.style.borderRadius = '50%'
// //       }
// //       return this._$node
// //     }
// //   },
// //   $ChildConstructor: aa.$Constructor
// // })

// // // aa.$node.style.borderRadius = '50%'
// // // aa.$node.style.padding = '10px'

// // var extraSpesh = new aa.$Constructor({
// //   a: {
// //     b: {
// //       c: {
// //         d:{}
// //       }
// //     }
// //   }
// // })

// var Y = new Element({
//   $border:'10px solid blue',
//   $on: {
//     click:function() {
//       this.$border.$val = ~~(Math.random() * 20) + 'px solid black'
//     }
//   },
//   burbur:{
//     // $border:'10px solid green',
//     $on: {
//       click:function() {
//         console.log('burbur')
//         this.$node.style.border = ~~(Math.random() * 20) + 'px solid black'
//       }
//     }
//   }
// }).$Constructor

// app.$set({
//   yuzi: new Y(),
//   // jax: new Y()
// })


// // console.log(app.xx.a.b.c.d.$node)

// // console.log(app.xx.a.$node.$base._$parent.$node === app.xx.$node)

// app.$node.style.border = '1px solid black'

// // var X = new Element({
// //   $border:'20px solid blue',
// //   $on: {
// //     click:function() {
// //       console.log(this.$path)
// //       console.log(this._$parent)
// //     }
// //   }
// // }).$Constructor

// // app.$set({
// //   y: {
// //     // $border:'10px solid blue',
// //     $on: {
// //       mousemove:function() {
// //         this.$node.style.opacity = Math.random()
// //       }
// //     }
// //   },
// //   xxxxxx:new X(),
// //   yyy:new X(),
// //   zzz:new X(),
// //   xy:{
// //     // $border:'10px solid red',
// //     $on: {
// //       click: function() {
// //         this.$node.style.opacity = Math.random()
// //       }
// //     },
// //     blurf: {
// //       // $border:'200px solid red',
// //       $on: {
// //         click: function() {
// //           this.$node.style.marginTop = Math.random()*99+'px'
// //         }
// //       }
// //     }
// //   }
// // })

// // app.$set({
// //   x:{
// //     // $border:'100px solid pruple',
// //     $on: {
// //       click: function() {
// //         this.$node.style.opacity = Math.random()
// //       }
// //     }
// //   }
// // })

// // console.log( '?', app.xxxxxx._$parent )

// // console.log( app.xxx)

// // app.hhh.$border.$val = '10px solid blue'

// /*
// this._node = node.cloneNode(true); //especialy good to do for memory 
// (also saves 20% on cpu)
// */