var set = require('set.js')
  , hiddenProperty
  , global = function(){return this}()
  , def = module.exports = {}
  , define, exec

hiddenProperty = function(obj, prop, value) {
  if (!Object.defineProperty && value !== undefined) {
    obj[prop] = value
  } else {
    Object.defineProperty(obj, prop, value === undefined ? {enumerable : false}
                                                         : {enumerable : false,
                                                            value : value})
  }
}

def.Custom = function(options) {
  var i, fn

  fn = function() {
    return exec.call(fn, this.valueOf(), arguments)
  }

  fn.def = function() {
    return define.call(fn, this.valueOf(), arguments)
  }

  fn.on = function() {
    return fn.def.call.apply(fn.def, arguments)
  }

  fn.emit = Function.prototype.call

  fn.defs = []
  fn.options = options || { 'exec' : 'first'
                          , 'return' : 'first'
                          }

  for (i in fn) hiddenProperty(fn, i)

  return fn
}

define = function(self, args) {
  var domain = Array.prototype.slice.call(args)
    , implementation = domain.pop()

  if (args.length === 0) return this;

  if (typeof implementation !== 'function') {
    throw new Error('The last arguments should be a function.')
  }

  if (self !== this) domain.self = self

  //console.log('defining: ', this, self, domain, implementation)

  this.defs.push({ domain : set(domain)
                 , implementation : implementation
                 })

  return this
}

exec = function(self, args) {
  var i

  if (self !== global) args.self = self

  for (i in this.defs) {
    if (this.defs[i].domain(args)) {
      return this.defs[i].implementation.apply(self, args)
    }
  }

  throw new Error('NotImplementedError')
}


def.Function = function() {
  return def.Custom({ 'exec' : 'first'
                    , 'return' : 'first'
                    })
}

def.EventEmitter = function() {
  return def.Custom({ 'exec' : 'all'
                    , 'return' : 'none'
                    })
}
