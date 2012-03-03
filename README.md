def.js
======
A message passing library inspired by EventEmitter2 and
[multiple-dispatch function overloading](http://en.wikipedia.org/wiki/Multiple_dispatch)
libraries.

Examples
========

Function overloading:

```javascript
var def = require('def.js');

var fibonacci = def(Number.max(1)  , function(n) { return 1; })
               .def(Number.above(1), function(n) { return fibonacci(n-1) + fibonacci(n-2); });

fibonacci(0); // 1
fibonacci(1); // 1
fibonacci(2); // 2
fibonacci(3); // 3
```

Function overloading with filter for the value of this:

```javascript
var print = def.call(42,     function() { return 'Answer to the Ultimate Question of ' +
                                                 'Life, the Universe, and Everything'; })
           .def.call(Number, function() { return 'Number: ' + this; })
           .def.call(String, function() { return 'String: ' + this; })

print.call(42);   // Answer to the Ultimate Question of Life, the Universe, and Everything
print.call(5);    // Number: 5
print.call('MG'); // String: MG
```

Filter for the value of this, alternative syntax (`.on   === .def.call`, `.emit === .call`):

```javascript
var ee = def()

ee.on('eventname1', function(x) { console.log('Handler1 -- event:' + this + ', parameter:', x); });
ee.on('eventname2', function(x) { console.log('Handler2 -- event:' + this + ', parameter:', x); })
ee.on(String,       function(x) { console.log('Handler3 -- this is a string type event.'); })
ee.on({x:3},        function(x) { console.log('Handler4 -- Object type event with x = 3.'); })

ee.emit('eventname1', 1) // Handler1 -- event: eventname1, parameter: 1
                         // Handler3 -- this is a string type event.
ee.emit('eventname2', 2) // Handler2 -- event: eventname2, parameter: 2
                         // Handler3 -- this is a string type event.
ee.emit({x:3, y:4})      // Handler4 -- Object type event with x = 3.
```

Usage
=====

The function returned by the first call to `def` is a message dispatcher.
Messages can be sent by calling this function, and messages consist of the
`arguments` array and the value of `this` if `this` is not the global object.

Message listeners can be registered by using the `def` method of the
dispatcher. When calling the `def` method, the last parameter is the actual
listener function and the other parameters (and the value of `this`) are
the message filters. The set.js library is used to create the filters, so the
syntax for creating filters is identical to the syntax used in set.js to create
sets.

When there's an incoming message (e.g. calling the dispatcher as a function),
the dispatcher examines the registered filters and calls the listener functions
associated with matching filters with arguments and `this` defined by the
message. The listener functions are called in the order of registration. The
return value is the first non-undefined value returned by the called listener
functions (and undefined if there's no matching listener or none of the matching
listeners return non-undefined values).

Calling `.on(...args)` and `.emit(...args)` are equivalent to using
`.def.call(...args)` and `.call(...args)`. This ensures the compatibility with
other message passing libraries.

License
=======
The MIT License

Copyright (C) 2012 Gábor Molnár

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

