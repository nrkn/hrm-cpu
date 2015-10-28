const fs = require( 'fs' )

fs.readFile( '../asm/Mail-Room.asm', 'utf8', ( err, source ) => {
  if( err ){
    throw( err )
    return
  }
  
  execute( source )
})

const execute = source => {
  const HrmCpu = require( '../hrm-cpu' )

  const inbox = [ 1, 9, 4 ]
  
  const program = HrmCpu( source, inbox )

  console.log( JSON.stringify( program, null, 2 ) )
  
  console.log( program.run() )
  
  console.log( JSON.stringify( program, null, 2 ) )
}