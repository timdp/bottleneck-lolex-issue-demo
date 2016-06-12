var lolex = require('lolex')

module.exports = (process.argv[2] === 'fake') ? lolex.install() : null
