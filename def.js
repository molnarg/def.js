var schema // = require('js-schema')
  , global = function(){ return this }()

var define = function(self, args) {
  var entry = {}
  
  // determining the implementation function
  entry.implementation = Array.prototype.pop.call(args)
  
  if (!(entry.implementation instanceof Function)) {
    throw new Error('The last arguments should be a function.')
  }
  
  // determining the domain of the function
  if (self !== this) args.self = self

  if (args.length || args.self) {
    schema = schema || require('js-schema')
    entry.domain = schema(args)
  }
  
  // adding definition  
  this.defs.unshift(entry)

  return this
}

var exec = function(self, args) {
  var ret
  
  if (self !== global) args.self = self

  for (var i in this.defs) {
    if (!this.defs[i].domain || this.defs[i].domain(args)) {
      ret = this.defs[i].implementation.apply(self, args)
      if (ret !== undefined) return ret
    }
  }

  //throw new Error('NotImplementedError')
}

var def = function() {
  var fn = function() {
    return exec.call(fn, this.valueOf(), arguments)
  }

  fn.def = function() {
    return define.call(fn, this.valueOf(), arguments)
  }

  fn.defs = []
  
  if (arguments.length !== 0) fn.def.apply(fn, arguments)

  return fn
}

module.exports = def
