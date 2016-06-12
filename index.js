var lolex = require('lolex')
var Bottleneck = require('bottleneck')

// Logs elapsed time + message
var log = (function () {
  var _Date = Date
  var start = _Date.now()
  return function (msg) {
    console.log('[+' + (_Date.now() - start) + '] ' + msg)
  }
})()

var clock = (process.argv[2] === 'fake') ? lolex.install() : null

var limiter = new Bottleneck(1, 100)

log('start')
limiter.schedule(function () {
  log('call 1')
  return Promise.resolve()
})

limiter.schedule(function () {
  log('call 2')
  if (clock) {
    clock.uninstall()
  }
  return Promise.resolve()
})

while (clock) {
  clock.tick(1)
}
