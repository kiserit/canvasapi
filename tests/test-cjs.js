const modName = 'CommonJS:'
const CanvasAPI = require('../lib/canvasapi.cjs')
const chaining = require('./chaining.js')


module.exports = async function() {
  chaining(CanvasAPI, modName)

}
