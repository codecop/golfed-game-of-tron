# (Golfed) Game of Tron JavaScript

This code is based on the [javascript game of tron in 219 bytes](http://quaxio.com/tron/)
prepared as Refactoring Kata in different programming languages.

## Game of Tron

The usual "Game of Tron" refers to the Light Cycles race from the
[Tron video game](https://en.wikipedia.org/wiki/Tron_(video_game)) which is a variant of the
[Snake video game](https://en.wikipedia.org/wiki/Snake_(video_game_genre)).

### Game Rules

The particular game follows these rules:

1. The Tron starts in the centre, facing any direction.
1. The game controls are 'i', 'j', 'k', 'l'.
1. When the Tron hits it's trail or an edge, "game over" is shown to the user.

### javascript game of tron in 219 bytes

The [javascript game of tron in 219 bytes](http://quaxio.com/tron/)
by Alok Menghrajani is the smallest possible game of Tron in Javascript
(an exercise known as Javascript [golfing](https://en.wikipedia.org/wiki/Code_golf)).

## Refactoring Kata

I expanded some (of the more extreme) golfing tricks to make the code more readable.
The code is compact and lacks proper names and abstractions.
I added some basic tests and the tests all pass.
Now it is time to refactor! Tidy up the code and add some design.

The code can be found in `code.js`. The game can be run by opening `code.html`.

### Project Setup

This is JavaScript code with support for modern JavaScript features (i.e. "ES6").
[Node.js](https://nodejs.org/) must be installed.
This is a [npm](https://www.npmjs.com/) project with [Mocha](https://mochajs.org/) and
[Sinon.JS](http://sinonjs.org/) as dependencies.

To download all required node modules of this package:

    npm install

To run the test:

    npm test
