const assert = require( 'assert' )
const hrm = require( '../hrm' )

const floor = {
  1: 0
}

const fails = {
  "OUTBOX: Empty Hands": `
    OUTBOX
  `,
  "COPYFROM: Empty Floor": `
    COPYFROM 0
  `,
  "COPYTO: Empty Hands": `
    COPYTO 0
  `,
  "ADD: Empty Hands": `
    ADD 1
  `,
  "ADD: Empty Floor": `
    COPYFROM 1
    ADD 0
  `,
  "SUB: Empty Hands": `
    SUB 1
  `,
  "SUB: Empty Floor": `
    COPYFROM 1
    SUB 0
  `,
  "BUMPUP: Empty Floor": `
    BUMPUP 0
  `,
  "BUMPDN: Empty Floor": `
    BUMPDN 0
  `,
  "JUMPZ: Empty Hands": `
a:    
    JUMPZ a
  `,
  "JUMPN: Empty Hands": `
a:  
    JUMPN a
  `  
}

describe( 'hrm-cpu runtime errors', () =>
  Object.keys( fails ).forEach( key => {
    const source = fails[ key ]

    it( key, done => {
      assert.throws( () => hrm( source, [ 1 ], floor ) )
      done()
    })    
  })
)