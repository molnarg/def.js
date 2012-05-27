def.js
======
A [multiple-dispatch function overloading](http://en.wikipedia.org/wiki/Multiple_dispatch)
library for JavaScript.

Examples
========

Function overloading:

```javascript
var def = require('def.js');

var fibonacci = def(Number       , function(n) { return fibonacci(n-1) + fibonacci(n-2); })
               .def(Number.max(1), function(n) { return 1; });

fibonacci(0); // 1
fibonacci(1); // 1
fibonacci(2); // 2
fibonacci(3); // 3
```

Simple router for node.js HTTP servers:

```javascript
var http = require('http'),
    def = require('def.js'),
    handler = def();

handler.def({url : '/hello'}, function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello\n');
});

handler.def({url : '/world'}, function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('World\n');
});

http.createServer(handler).listen(1337, '127.0.0.1');
```

Usage
=====

Overloaded functions can be created using the `def` function. It returns a dispatcher
function, which will later check the function arguments, and call the appropriate implementation
functions. Implementation functions are always associated with a function signature,
and can be defined with the `def` method of the dispatcher. The first implementation and signature
may be defined when initally calling the standalone `def` function.

The first parameters of the `def` function are called the function signature or the filters.
Filters are described as [JS schema](https://github.com/molnarg/js-schema). The first filter
applies to the first argument, the second applies to the second, etc. A typical function overloading
with signature definitions looks like this:

```javascript
f = def(Number, String        , function(n, s) { console.log(n, s); })
   .def(42    , /The Answer.*/, function(n, s) { console.log('The answer is: ' + s); });
```

The most generic implementation must come first, then the special cases. It is explained
by the way def.js executes the implementation functions. It goes like this:

1. Select the last defined unchecked function implementation and signature
2. Check the function signature against the function call's `arguments` and the value of `this`
3. If the signature matches the `arguments` and the value of `this`:
  * Execute the implementation function with the given `arguments` and `this`
  * If the return value `ret` is not `undefined` then stop executing and return `ret`
4. Go to step 1 if there are unchecked implementations left

License
=======

The MIT License

Copyright (C) 2012 Gábor Molnár <gabor.molnar@sch.bme.hu>
