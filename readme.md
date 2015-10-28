# hrm-cpu
## Run Human Resource Machine programs in JavaScript

This is a JavaScript runtime for the programs you write in the game 
[Human Resource Machine](http://tomorrowcorporation.com/humanresourcemachine)

![Screenshot](http://tomorrowcorporation.com/blog/wp-content/themes/tcTheme2/images/hrm/screenshots/hrm_04.png)

> Human Resource Machine is a puzzle game. In each level, your boss gives you a job. Automate it by programming your little office worker! If you succeed, you'll be promoted up to the next level for another year of work in the vast office building. Congratulations!

### NPM

`npm install hrm-cpu`

### Usage

Requires node 4.x - uses ES6

#### Basic Usage

```javascript
const HrmCpu = require( 'hrm-cpu' )

//source is a string in the Human Resource Machine program format
const source = loadSomeSourceFile()

//the initial state of the inbox - treated as FIFO
const inbox = [ 5, 18 ]

//initial memory state - set just slot 9 to 0
const tiles = {
  9: 0
}

const outbox = HrmCpu( source, inbox, tiles ).run()

console.log( outbox )

```

Some levels don't require any floor tiles, in which case you can do:

```javascript
const outbox = HrmCpu( source, inbox ).run()
```

Some levels don't require an inbox, but if this is the case they must have floor 
tiles:

```javascript
const outbox = HrmCpu( source, [], tiles ).run()
```

#### Advanced Usage

Also see examples directory or try running the tests with mocha

##### Factory overloads

```javascript
HrmCpu( state ) 
HrmCpu( options )
HrmCpu( source, inbox )
HrmCpu( source, options )
HrmCpu( source, inbox, tiles )
HrmCpu( source, inbox, floor )
```

HrmCpu is a factory function that returns an object with some properties and 
the functions `run` and `step`

```javascript
{
  options: {...},
  state: {...},
  run: ( cb ) => ...,
  step: ( cb ) => ...
}
```

Regardless of which overloads you choose, the factory requires a source file, and 
either of, or both of, inbox and floor state

If `run` is called synchronously it runs the whole program and returns the outbox

If `step` is called synchronously it executes a single line of the program, and 
returns the program state

If `run` is called asynchronously it runs the whole program and then calls the 
callback with `( err, outbox, state )`

If `step` is called asynchronously it executes a single line and calls with
`( err, state )`

##### State

The state object when set to the initial defaults looks like:

```javascript
{
  program: [], 
  accumulator: null,
  inbox: [],
  outbox: [],
  memory: [],
  counter: 0,  
  steps: 0,
  running: false
}
```

##### Options

Passed in options extend the default options, which are:

```
{
  source: '',
  inbox: [],
  tiles: [],
  columns: Infinity,
  rows: Infinity,
  commands: [ 'INBOX', 'OUTBOX', 'COPYFROM', 'COPYTO', 'ADD', 'SUB', 'BUMPUP', 'BUMPDN', 'JUMP', 'JUMPZ', 'JUMPN' ],
  dereferencing: true,
  maxSteps: 5000,
  maxSize: 255,
  minValue: -999,
  maxValue: 999  
}
```

These match the constraints of the actual game

`source`, `inbox` and `tiles` are described above

`columns` and `rows` describe the floor layout - these determine the valid floor 
addresses and if set and your program tries to access a tile outside of these,
an error will be thrown or sent to your callback, depending on whether you used
the sync or async call

`commands` are the commands allowed for the current program - for example, in 
the early levels many commands are not yet available

`dereferencing` is whether or not the program can access memory indirectly eg `[12]`

`maxSteps` is the maximum number of steps your program can run

`maxSize` is the maximum length of a program, not counting labels and comments. 
A jump only counts as one line

`minValue` is the minimum value that you can hold in your hand

`maxValue` is the maximum value that you can hold in your hand

##### Async example

```javascript
HrmCpu( source, inbox, tiles ).run( ( err, outbox ) => {
  if( err ){
    console.error( err )
  } else {
    console.log( outbox )
  }
})
```

##### Get program state from run

```javascript
HrmCpu( source, inbox, tiles ).run( ( err, outbox, state ) => {
  if( err ){
    console.error( err )
  } else {
    console.log( state )
  }
})
```

### Related projects

* [hrmsandbox]( https://github.com/sixlettervariables/hrmsandbox ) - has a web interface, command line bin, expression grammar and many other cool features
* [hrm-level-data]( https://github.com/atesgoral/hrm-level-data ) - metadata for each level in the game, hrm-cpu uses this in its tests
* [hrm-solutions]( https://github.com/atesgoral/hrm-solutions ) - solutions and size/speed hacks for each level

Please let me know if you know of any others!

### License

MIT