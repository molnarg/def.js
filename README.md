def.js
======
A message passing library inspired by EventEmitter2 and contracts.coffee.
Possible use-cases include function contracts, advanced event handling and
[multiple-dispatch function overloading](http://en.wikipedia.org/wiki/Multiple_dispatch)

Examples
========
```javascript
var def = require('def'), set = require('set');

// Simple function contract
var parity = String.def(Number, function(value) {
  return (value % 2 === 0) ? 'even' : 'odd';
})

// Function contract with function overloading
var fibonacci = Number.def(set(0,1), function(n) { return 1; })
                      .def(Number,   function(n) { return fibonacci(n-1) + fibonacci(n-2); });

// Function overloading with filter for the value of this
var print = def.call(42,     function() { console.log('Answer to the Ultimate Question of ' +
                                                      'Life, the Universe, and Everything'); }
           .def.call(Number, function() { console.log('Number: ', this); })
           .def.call(String, function() { console.log('String: ', this); })

print.call(42);   // Answer to the Ultimate Question of Life, the Universe, and Everything
                  // Number: 42
print.call(5);    // Number: 5
print.call('MG'); // String: MG

// Filter for the value of this, alternative syntax:
// on   === .def.call
// emit === .call
var ee = def()

ee.on('eventname1', function(x) { console.log('Handler1 -- event:', this, ', parameter:', x); });
ee.on('eventname2', function(x) { console.log('Handler2 -- event:', this, ', parameter:', x); })

ee.emit('eventname1', 1) // Handler 1 -- event: eventname1, parameter: 1
ee.emit('eventname2', 2) // Handler 2 -- event: eventname2, parameter: 2
```

License
=======
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

