const assert = require( 'assert' )
const fs = require( 'fs' )
const path = require( 'path' )
const tests = require( './tests.json' )
const hrm = require( '../hrm' )

Object.keys( tests ).forEach( name => {
  const test = tests[ name ]
  
  describe( name, () => {
    it( 'produces the correct output', done => {
      fs.readFile( path.join( './asm', name + '.asm' ), 'utf8', ( err, source ) => {
        if( err ){
          throw( err )
          return
        }
        
        const outbox = hrm( source, test.inbox, test.floor )
        
        assert.deepEqual( test.outbox, outbox )
        
        done()
      })      
    })
  })
})