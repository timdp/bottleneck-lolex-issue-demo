// Logs elapsed time + message

var _Date = Date

var start = _Date.now()

module.exports = function (msg) {
  console.log('[+' + (_Date.now() - start) + '] ' + msg)
}
