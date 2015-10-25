const assert = require( 'assert' )
const hrm = require( '../hrm' )

const floor = {
  1: 0
}

const fails = {
  "OUTBOX empty hands": `
    OUTBOX
  `,
  "COPYFROM empty floor": `
    COPYFROM 0
  `,
  "COPYTO empty hands": `
    COPYTO 0
  `,
  "ADD empty hands": `
    ADD 1
  `,
  "ADD empty floor": `
    COPYFROM 1
    ADD 0
  `,
  "SUB empty hands": `
    SUB 1
  `,
  "SUB empty floor": `
    COPYFROM 1
    SUB 0
  `,
  "BUMPUP empty floor": `
    BUMPUP 0
  `,
  "BUMPDN empty floor": `
    BUMPDN 0
  `,
  "JUMPZ empty hands": `
a:    
    JUMPZ a
  `,
  "JUMPN empty hands": `
a:  
    JUMPN a
  `  
}

describe( 'hrm-cpu runtime errors', () =>
  Object.keys( fails ).forEach( key => {
    const source = fails[ key ]
    it( 'throws on ' + key, done => {
      assert.throws( () => {
        hrm( source, floor )
      })
      done()
    })    
  })
)