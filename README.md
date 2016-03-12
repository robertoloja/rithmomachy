## Rithmomachy

A late-medieval mathematical board game. In fact, this is 'The Philosopher's
Game' (a monicker I'm sure many of my chess player philosophy major friends 
might strongly object to).

Here's [wikipedia](https://en.wikipedia.org/wiki/Rithmomachy) on the subject,
and [here's](http://www.gamecabinet.com/rules/Rithmomachia.html) a more 
thorough look at the rules.

## Development progress:
Currently, this implementation includes Rounds, Triangles, Squares and
Pyramids. They can all move according to (a set of) the rules, but no captures
are implemented and certainly no victories. 

Currently, I am striving to take a fully test-driven approach to developing
this app, using mocha. At any given time in the development cycle, several
tests will be failing; I am using failing tests as to-do lists. 

This is taking a while, as I am also learning how to write proper tests.

## Dependencies:
The app runs on ES6, whenever possible. I.e., I have been using as much
ECMAScript6 as Node.js (and, therefore, Google's V8) allows. Nonetheless, 
since I use JSHint for linting, and have not yet decided on the project's
deployment platform, 'strict mode' is avoided (e.g. 'var' instead of 'let' and
'require' rather than 'import'). Still, I use arrow functions liberally and
periodically check to see if Node has fully caught up to the ES2015 spec. 
