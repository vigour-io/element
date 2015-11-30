'use strict'

require('./style.less')

// var ui = require('vigour-uikit')
var Element = require('../../lib/element')
Element.prototype.inject(
  require('../../lib/property/text'),
  require('../../lib/events/nav/down'),
  require('../../lib/events/nav/right'),
  require('../../lib/events/nav/up'),
  require('../../lib/events/nav/left'),
  require('../../lib/events/nav/back'),
  require('../../lib/events/nav/menu'),
  require('../../lib/events/click')
)

// var statusBar = require('vigour-status-bar')

// var env = require('vigour-env')

var app = new Element({
  node: document.body,
  on:{
    ready () {

    }
  }
})

var envTester = new Element({
   teste : {
    node:"h1",
    text: 'Event test'
  },
  text1: {
    node : "textarea",

    on:{
      focus () {
        console.log("I'm focus")
      },
      arrowDown () {
        console.log("donw")
        // this.parent.node.nextSibling.children[0].focus()
      },
      // arrowLeft () {
      //   console.log("left")
      // },
      arrowRight () {
        this.node.parentNode.nextSibling.children[0].focus()
        console.log("right")
      },
      arrowUp () {
        console.log("up")
      },
      backButton () {
        console.log("Back")
      },
      menuButton () {
        console.log("Menu")
      },
      click () {
        console.log('click or enter')
      }
    }
  },
  text2: {
    node : "textarea",
    on:{
      focus () {
        console.log("I'm focus")
      },
      arrowDown () {
        // this.parent.node.nextSibling.children[0].focus()
      },
      // arrowLeft () {
      //   console.log("left")
      // },
      arrowRight () {
        document.getElementsByClassName("env3")[0].children[0].focus()
        console.log("right")
      },
      arrowUp () {
        console.log("up")
      }
    }
  }
})
var pluginTester = new Element({
  env: envTester,
  env2:{
    node:"div",
    text3 :{
      node:"textarea",
      on:{
      focus () {
        console.log("I'm focus")
      },
      arrowDown () {
        // this.parent.node.nextSibling.children[0].focus()
      },
      arrowLeft () {
        console.log("left")
        document.getElementsByClassName("env")[0].children[1].focus()
      },
      arrowRight () {
        console.log("right")
      },
      arrowUp () {
        console.log("up")
      }
    }
    },
    text4: {
      node:"textarea",
      on:{
      focus () {
        console.log("I'm focus")
      },
      arrowDown () {
        // this.parent.node.nextSibling.children[0].focus()
      },
      arrowLeft () {
        console.log("left")
      },
      arrowRight () {
        console.log("right")
      },
      arrowUp () {
        console.log("up")
      }
    }
    },
    text5: {
      node:"textarea",
      on:{
      focus () {
        console.log("I'm focus")
      },
      arrowDown () {
        // this.parent.node.nextSibling.children[0].focus()
      },
      arrowLeft () {
        console.log("left")
      },
      arrowRight () {
        console.log("right")
      },
      arrowUp () {
        console.log("up")
      }
    }
    },
    text6: {
      node:"textarea",
      on:{
      focus () {
        console.log("I'm focus")
      },
      arrowDown () {
        // this.parent.node.nextSibling.children[0].focus()
      },
      arrowLeft () {
        console.log("left")
      },
      arrowRight () {
        console.log("right")
      },
      arrowUp () {
        console.log("up")
      }
    }
    }
  },
  env3:{
    node:"div",
    text3 :{
      node:"textarea",
      on:{
      focus () {
        console.log("I'm focus")
      },
      arrowDown () {
        // this.parent.node.nextSibling.children[0].focus()
      },
      arrowLeft () {
        console.log("left")
        document.getElementsByClassName("env")[0].children[2].focus()
      },
      arrowRight () {
        console.log("right")
      },
      arrowUp () {
        console.log("up")
      }
    }
    },
    text4: {
      node:"textarea",
      on:{
      focus () {
        console.log("I'm focus")
      },
      arrowDown () {
        // this.parent.node.nextSibling.children[0].focus()
      },
      arrowLeft () {
        console.log("left")
      },
      arrowRight () {
        console.log("right")
      },
      arrowUp () {
        console.log("up")
      }
    }
    },
    text5: {
      node:"textarea",
      on:{
      focus () {
        console.log("I'm focus")
      },
      arrowDown () {
        // this.parent.node.nextSibling.children[0].focus()
      },
      arrowLeft () {
        console.log("left")
      },
      arrowRight () {
        console.log("right")
      },
      arrowUp () {
        console.log("up")
      }
    }
    },
    text6: {
      node:"textarea",
      on:{
      focus () {
        console.log("I'm focus")
      },
      arrowDown () {
        // this.parent.node.nextSibling.children[0].focus()
      },
      arrowLeft () {
        console.log("left")
      },
      arrowRight () {
        console.log("right")
      },
      arrowUp () {
        console.log("up")
      }
    }
    }
  }
})

app.set({
  pluginTester: pluginTester
})
document.getElementsByClassName("text1")[0].focus()
