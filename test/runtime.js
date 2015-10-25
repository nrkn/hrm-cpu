const assert = require( 'assert' )
const hrm = require( '../hrm' )

const level = {
  number: 1,
  name: 'Runtime Tests',
  instructions: 'Fail.',
  commands: [ 'OUTBOX', 'COPYFROM', 'COPYTO', 'ADD', 'SUB', 'BUMPUP', 'BUMPDOWN', 'JUMP', 'JUMPN', 'JUMPZ' ],
  expect: [
    {
      inbox: [ 1 ],
      outbox: []
    }
  ],
  floor: {
    tiles: {
      1: 0
    },
    columns: 1,
    rows: 2
  },
  challenge: {
    size: 1,
    speed: 1
  }
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
  `,
  "Out Of Bounds": `
    COPYFROM 2
  `,
  "Instruction Not Allowed": `
    INBOX
  `,
  "Dereferencing Not Allowed": `
    COPYFROM [0]
  `,
  "Too Many Steps": `
a:
    JUMP A
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