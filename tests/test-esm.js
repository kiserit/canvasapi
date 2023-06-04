const modName = 'ESM:'
const chaining = require('./chaining.js')


module.exports = async function() {
  import('../lib/canvasapi.mjs').then(mod => {
    chaining(mod.default, modName)
  })    
}