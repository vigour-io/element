'use strict'
// "budo": "budo -p 8080 --css ./bundle.css --live -- -r ./package.json:package.json -g [ babelify --presets [ es2015 ] ]",
const spawn = require('child_process').spawn
const budo = spawn('budo', [
  './example/collection.js',
  `-p 8080
  --css ./example/bundles/bundle.css
  --live -- -r ./package.json:package.json
  -g [ babelify --presets [ es2015 ] ]`
])

console.log(process.argv)

budo.stdout.on('data', (data) => {
  console.log(' ' + data)
})

budo.stderr.on('data', (data) => {
  console.log(' ' + data)
})

budo.on('close', (code) => {
  console.log(`budo closed with code ${code}`)
})
