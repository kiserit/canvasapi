const cjs = require('./test-cjs')
const esm = require('./test-esm')

cjs().then(() => esm())
