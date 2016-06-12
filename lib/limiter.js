var Bottleneck = require('bottleneck')

Bottleneck.prototype.Promise = global.Promise

module.exports = new Bottleneck(1, 100)
