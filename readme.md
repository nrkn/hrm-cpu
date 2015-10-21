# hrm-cpu
## Run Human Resources Machine programs in JavaScript

This is a JavaScript runtime for the programs you write in the game [Human Resource Machine](http://tomorrowcorporation.com/humanresourcemachine)

![Screenshot](http://tomorrowcorporation.com/blog/wp-content/themes/tcTheme2/images/hrm/screenshots/hrm_04.png)

> Human Resource Machine is a puzzle game. In each level, your boss gives you a job. Automate it by programming your little office worker! If you succeed, you'll be promoted up to the next level for another year of work in the vast office building. Congratulations!

### NPM

`npm install hrm-cpu`

### Usage

Requires node 4.x - uses ES6

```javascript
const hrm = require( 'hrm' )

//source is a string in the Human Resources Machine program format
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
 
### TODO

* Haven't got to the levels involving strings yet so not sure how they look  
* Transpile for older node?
* Browserify?
* More tests would be nice!
