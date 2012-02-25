var def = require('./lib/def')
  , i

module.exports = function() {
  var fn = def.Function()

  return fn.def.apply(fn, arguments)
}

for (i in def) module.exports[i] = def[i]
