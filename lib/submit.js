var limiter = require('./limiter')
var clock = require('./clock')
var log = require('./log')

log('submit 1')
limiter.submit(function (cb) {
  log('call 1')
  process.nextTick(cb)
})

log('submit 2')
limiter.submit(function (cb) {
  log('call 2')
  if (clock) {
    clock.uninstall()
  }
  process.nextTick(cb)
})

while (clock) {
  clock.tick(1)
}
