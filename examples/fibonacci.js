const fs = require( 'fs' )

fs.readFile( 'fibonacci.asm', 'utf8', ( err, source ) => {
  if( err ){
    throw( err )
    return
  }
  
  execute( source )
})

const execute = source => {
  const hrm = require( '../hrm' )

  const inbox = [ 5, 18 ]

  const floor = {
    9: 0
  }

  console.log( hrm( source, inbox, floor ) )
}