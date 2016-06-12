var log = require('./log')

var _setTimeout = setTimeout

module.exports = {
  install: function () {
    var clock = {
      _count: 0,

      _time: 0,

      _timeouts: [],

      tick: function (delta) {
        clock._time += delta
        // log('clock at ' + clock._time)
        var timeouts = []
        for (var i = clock._timeouts.length - 1; i >= 0; --i) {
          if (clock._timeouts[i].when <= clock._time) {
            timeouts.push(clock._timeouts[i])
            clock._timeouts.splice(i, 1)
          }
        }
        for (var j = 0; j < timeouts.length; ++j) {
          log('call timeout ' + timeouts[j].id + ' at ' + clock._time)
          timeouts[j].cb()
        }
      },

      uninstall: function () {
        global.setTimeout = _setTimeout
      },

      setTimeout: function (cb, time) {
        var id = ++clock._count
        log('schedule timeout ' + id + ' at ' + time + ': ' + cb)
        clock._timeouts.push({id: id, cb: cb, when: clock._time + time})
        clock.tick(0)
      }
    }
    global.setTimeout = clock.setTimeout
    return clock
  }
}
