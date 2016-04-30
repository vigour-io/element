'use strict'
const exec = require('child_process').exec
const fs = require('fs')
const port = process.argv[3] || 8080
const command = `budo ./index.js -p ${port} --css ./bundle.css --live -- -r ../../package.json:package.json`

var target = process.argv[2]

if (!target) {
  var examples = fs.readdirSync('./example')
  if (examples) {
    examples = examples.filter((val) => !/\..{0,10}$/.test(val))
    target = examples[Math.round(Math.random() * (examples.length - 1))]
    console.log(`no target passed choosing random example "${target}"`)
  }
}

console.log(`starting budo on port "${port}" running example "${target}"`)

const budo = exec(command, { cwd: 'example/' + target })
budo.stdout.pipe(process.stdout)
budo.stderr.pipe(process.stderr)
