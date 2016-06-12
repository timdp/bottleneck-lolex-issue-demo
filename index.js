var log = require('./lib/log')
var lolex = require('./lib/lolex-mock')
var Bottleneck = require('bottleneck')

var clock = (process.argv[2] === 'fake') ? lolex.install() : null
var limiter = new Bottleneck(1, 100)
var done = false

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
  done = true
  return Promise.resolve()
})

if (clock) {
  var interval = setInterval(function () {
    clock.tick(1)
    if (done) {
      log('done')
      clearInterval(interval)
    }
  }, 1)
}
