const assert = require( 'assert' )
const HrmCpu = require( '../hrm-cpu' )

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
  "Bad Tile Address": `
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
    JUMP a
  `,
  "Overflow": `
    BUMPUP 1
a:
    COPYFROM 1
    ADD 1
    COPYTO 1
    JUMP a
  `
}

var tooLong = ''
for( var i = 0; i < 256; i++ ){
  tooLong += ' COPYFROM 1'
}

fails[ 'Program Too Long' ] = tooLong

const Options = () => {
  return {
    commands: [ 'OUTBOX', 'COPYFROM', 'COPYTO', 'ADD', 'SUB', 'BUMPUP', 'BUMPDOWN', 'JUMP', 'JUMPN', 'JUMPZ' ],
    tiles: {
      1: 0
    },
    columns: 1,
    rows: 2
  }
}

describe( 'hrm-cpu runtime errors', () =>
  Object.keys( fails ).forEach( key => {
    const source = fails[ key ]

    it( key, done => {
      const inbox = [ 1 ]
      const options = Object.assign( Options(), { source, inbox } )
      
      const hrm = HrmCpu( options )
      
      assert.throws( () => {
        hrm.run()
      })
      
      done()
    })    
  })
)