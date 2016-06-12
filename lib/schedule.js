var limiter = require('./limiter')
var clock = require('./clock')
var log = require('./log')

log('schedule 1')
limiter.schedule(function () {
  log('call 1')
  return Promise.resolve()
})

log('schedule 2')
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
