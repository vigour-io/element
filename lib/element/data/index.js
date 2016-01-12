'use strict'
var Base = require('vigour-js/lib/base')
var Observable = require('vigour-js/lib/observable')
var Element = require('../')
var Prop = require('../../property')
var render

function $map (map, path, nolog) {
  if (this.storedmap) {
    return this.storedmap // not allways correct but good in 99% of the cases
  }
  // this can be optmized a lot!
  var maker
  if (!map) {
    path = []
    maker = true
    map = this.storedmap = {}
    if (this.$) {
      map.$ = this.$
      if (this.$collection) {
        map.$collection = this.ChildConstructor.prototype.$map(void 0, void 0, true)
      }
    } else {
      map.$context = true
    }
  }
  function each (prop, key) {
    var isProp = prop instanceof Prop
    if (prop.$) {
      var p = path.concat([key])
      var mymap = map
      if (!isProp && mymap.$context) {
        delete mymap.$context
      }
      for (var i = 0, len = p.length; i < len; i++) {
        if (mymap[p[i]]) {
          mymap = mymap[p[i]]
          if (!isProp && mymap.$context) {
            delete mymap.$context
          }
        } else {
          mymap = mymap[p[i]] = {}
          if (isProp) {
            mymap.$context = true
          }
        }
        if (i === p.length - 1) {
          mymap.$ = prop.$
          if (prop.$collection) {
            mymap.$collection = prop.ChildConstructor.prototype.$map(void 0, void 0, true)
          }
        }
      }
    }
    prop.$map(map, path.concat([key]))
  }
  this.each(each, (p) => p instanceof Element || p instanceof Prop)
  if (maker && !nolog) {
    // console.log(JSON.stringify(map, false, 2))
  }
  return map
}

function defBind () {
  return (this._contextLevel === 1 ? this._context : this._parent).parseValue()
}

function getit (field) {
  // save ram by storing in a map !
  return function fieldbind () {
    var self
    var parent = this._contextLevel === 1 ? this._context : this._parent
    while (parent) {
      self = parent._input
      if (self) {
        let a = self.retrieve && self.retrieve(field)
        return a ? a.parseValue() : 'smurky:' + field
      }
      parent = parent._contextLevel === 1 ? parent._context : parent._parent
    }
    return ''
  }
}

Prop.prototype.set({
  properties: {
    $storedmap: true,
    $ (val) {
      this.$ = val
      if (val === true) {
        this.set(defBind)
      } else {
        this.set(getit(val))
      }
    }
  },
  define: {
    $map: $map,
    origin: {
      get () {
        // without context polution!
        var field = this.$
        var reference = this
        if (field) {
          let self
          let up = reference.parent
          while (up) {
            self = up.refOrigin
            if (self) {
              reference = self.retrieve(field)
              break
            }
            up = up.parent
          }
        } else {
          while (reference._input instanceof Base) {
            reference = reference._input
          }
        }
        return reference
      }
    }
  }
})

exports.define = {
  $map: $map,
  $subscribeProperty (p, target) {
    var element = this
    if (p.$) {
      let cntxt = element._context
      let level = element._contextLevel
      let subscontext = cntxt || element
      // element._marked = true
      // console.log('!!!', p.$)
      target.subscribe(p.$, 'data', [ function (data, event) {
        // Element
        if (cntxt) {
          element._context = cntxt
          element._contextLevel = level
        }
        p._context = element
        p._contextLevel = level ? level + 1 : 1
        let node = element.getNode()
        if (node) {
          p.render(node, event, element)
        }
      }, subscontext ], subscontext.uid + '.' + this.uid)
    }
  },
  renderData (target, oldVal, event, old$, map) {
    var element = this
    if (!map) {
      map = this.$map()
    }
    walk(map, element, target)
    function walk (obj, element, target, rerenderinherit) {
      if (!target) {
        // trarget is null unsubscribe --- target is different -- unsubscribe nested
        return
      }
      if (obj.$context) {
        // if (rerenderinherit) {
        //   console.warn('CONTEXT prop have to do or something', element.path, 'X', element._context._path)
        // }
        for (let i in obj) {
          if (element[i] && element[i] instanceof Prop) {
            element.$subscribeProperty(element[i], target)
            if (rerenderinherit) {
              let nodex = element.getNode()
              // if (nodex) {
                element[i].render(nodex, event, element)
              // }
            }
          } else {
            if (element[i]) {
              walk(obj[i], element[i], target, rerenderinherit)
            }
          }
        }
      } else {
        if (element._context) {
          element = element.resolveContext(void 0, event, element._context) // moet nog met false
        }

        if (element.listensOnAttach && element._input !== target) {
          element.listensOnAttach.each(function (p, i) {
            // this can become 1000x faster (also dont do for nested)
            var keep
            for (var j in p.attach) {
              if (p.attach[j] && p.attach[j][1] === element) {
                // if (p.attach[j][0] === thisone) {
                //   keep = true
                // }
              }
            }
            // have to handle collection as well!
            if (!keep) {
              element.listensOnAttach[i].remove()
            }
          })
        }

        if (obj.$) {
          if (obj.$collection) {
            target.subscribe(obj.$, 'property', [
              function (data, event) {
                // console.error('--------', this._path, element._path, obj.$)
                var origin = this.origin
                if (origin._input === null) {
                  element.each(function (p) {
                    p instanceof Element && p.remove(event)
                  })
                } else {
                  if (element._input !== origin) {
                    element.each(function (p) {
                      p instanceof Element && p.remove(event)
                    })
                  } else if (data && data.removed) {
                    for (let n in data.removed) {
                      if (element[data.removed[n]]) {
                        element[data.removed[n]].remove(event)
                      }
                    }
                  }
                  element._input = origin
                  origin.each(function (property, key) {
                    if (!property) {
                      return
                    }
                    var elem = element[key]
                    var origin = property.origin
                    if (origin && ((!elem || elem._input !== origin) && origin._input !== null)) {
                      element.set({ [key]: origin }, event)
                      if (!element[key].$) {
                        element[key].renderData(origin, oldVal, event)
                      }
                    }
                  })
                }
              }, element
            ], element.uid, true, event)
          } else {
            // console.log('go go go', obj.$)
            // console.log('subscribe bitch')
            // first --- different
            let stamp = event.stamp
            target.subscribe(obj.$, 'data', [
              function thisone (data, event) {
                // console.log('change listener AGAIN!', element._path)
                var origin = this.origin
                // console.log('yo yo yo!', origin)
                var rerender
                // this check is not enough!
                if (element._input && this.origin !== element._input || (stamp === event.stamp && oldVal)) {
                  if (element.listensOnAttach) {
                    element.listensOnAttach.each(function (p, i) {
                      // this can become 1000x faster (also dont do for nested)
                      var keep
                      for (var j in p.attach) {
                        if (p.attach[j] && p.attach[j][1] === element) {
                          if (p.attach[j][0] === thisone) {
                            keep = true
                          }
                        }
                      }
                      // have to handle collection as well!
                      if (!keep) {
                        element.listensOnAttach[i].remove()
                      }
                    })
                  }
                  // console.log('SWITCH')
                  if (origin && origin._input !== null) {
                    rerender = element.getNode()
                  }
                }
                element._input = origin //eslint-disable-line
                if (!rerenderinherit && element.getNode()) {
                  rerender = element.getNode()
                }
                for (let i in obj) {
                  if (element[i] && element[i] instanceof Prop) {
                    element.$subscribeProperty(element[i], origin)
                    if (rerender || rerenderinherit) {
                      element[i].render(rerender || element.getNode(), event, element)
                    }
                  } else if (i !== '$') {
                    // console.error('rewalk!', i)
                    // this is super annoying
                    walk(obj[i], element[i], origin, rerender || rerenderinherit)
                  }
                }
                if (rerender && !rerenderinherit) {
                  // this is only render props
                  // console.error('!!!rerender!!!', element) // only do for top!
                  // render(element, rerender.parentNode, Element, event, element.engine)
                }
              }, element
            ], element.uid, true, event)
          }
        } else {
          for (let i in obj) {
            if (i !== '$' && i !== '$collection') {
              if (element[i] && element[i] instanceof Prop) {
                element.$subscribeProperty(element[i], target)
                // element[i].
                if (rerenderinherit) {
                  element[i].render(element.getNode(), event, element)
                }
              } else {
                walk(obj[i], element[i], target, rerenderinherit)
              }
            }
          }
        }
      }
    }
    // return
  },
  handleReference (val, event, oldVal) {
    var valIsObservable = val instanceof Observable
    if (valIsObservable) {
      this._input = val
      if (this.$) {
        this.renderData(val, oldVal, event)
      }
    } else if (oldVal instanceof Observable) {
      if (this.$) {
        this.renderData(val, oldVal, event)
      }
    }
  }
}

exports.properties = {
  $storedmap: true,
  $collection (val, event) {
    this.$collection = val
    this.properties.$.call(this, val, event)
  },
  $ (val, event) {
    this.$ = val
  }
}
