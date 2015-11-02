const assert = require( 'assert' )
const fs = require( 'fs' )
const path = require( 'path' )
const levels = require( 'hrm-level-data' )
const HrmCpu = require( '../hrm-cpu' )

//cannot get my head around mocha's order execution, hence sync
const levelAsm = level => {
  const filename = level.name.split( ' ' ).join( '-' ) + '.asm'
  const filepath = path.join( './asm', filename )
  
  if( fs.existsSync( filepath ) ){
    return fs.readFileSync( filepath, 'utf8' )
  }
  
  return null
}

const sources = {}

levels.forEach( level =>
  sources[ level.number ] = levelAsm( level )
)

const testLevel = ( level, source ) => {  
  describe( level.number + ' - ' + level.name, () =>
    level.examples.forEach( ( test, i ) => {
      it( 'produces the correct output for test #' + ( i + 1 ), done => {
        const hrm = HrmCpu( source, test.inbox, level.floor || {} )
        
        const outbox = hrm.run()
        
        assert.deepEqual( test.outbox, outbox )
        
        done()          
      })
    })    
  )
}

describe( 'hrm-cpu levels', () =>
  levels
    .filter( level => sources[ level.number ] !== null )
    .forEach( level => testLevel( level, sources[ level.number ] ) )     
)