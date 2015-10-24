# hrm-cpu
## Run Human Resource Machine programs in JavaScript

This is a JavaScript runtime for the programs you write in the game [Human Resource Machine](http://tomorrowcorporation.com/humanresourcemachine)

![Screenshot](http://tomorrowcorporation.com/blog/wp-content/themes/tcTheme2/images/hrm/screenshots/hrm_04.png)

> Human Resource Machine is a puzzle game. In each level, your boss gives you a job. Automate it by programming your little office worker! If you succeed, you'll be promoted up to the next level for another year of work in the vast office building. Congratulations!

### NPM

`npm install hrm-cpu`

### Usage

Requires node 4.x - uses ES6

```javascript
const hrm = require( 'hrm-cpu' )

//source is a string in the Human Resource Machine program format
const source = loadSomeSourceFile()

//the initial state of the inbox - treated as FIFO
const inbox = [ 5, 18 ]

//initial memory state - set just slot 9 to 0
const floor = {
  9: 0
}

const outbox = hrm( source, inbox, floor )

console.log( outbox )

```

Also see examples directory or try running the tests with mocha

If you have no initial floor state (like the early levels) you can omit floor:

```javascript
const outbox = hrm( source, inbox )
```

You can also get verbose output (for checking your size and steps):

```javascript
const info = hrm( source, inbox, floor, true )
```

If you want verbose output but have no floor, pass an empty array or object:

```javascript
const info = hrm( source, inbox, {}, true )
```

There is also an alternative floor syntax to allow the use of data from 
[hrm-level-data](https://github.com/atesgoral/hrm-level-data/blob/master/hrm-level-data-schema.json):

```javascript
const floor = {
  tiles: {
    9: 0
  }
}
```

### Related projects

* [hrmsandbox]( https://github.com/sixlettervariables/hrmsandbox ) - has a web interface, command line bin, expression grammar and many other cool features
* [hrm-level-data]( https://github.com/atesgoral/hrm-level-data ) - metadata for each level in the game, hrm-cpu uses this in its tests
* [hrm-solutions]( https://github.com/atesgoral/hrm-solutions ) - solutions and size/speed hacks for each level

Please let me know if you know of any others!

### License

MIT