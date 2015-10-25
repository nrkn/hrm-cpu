const compile = require( './compile' )
const runtimeErrors = require( './runtime-errors' )

const asNumber = s =>
  typeof s === 'string' ? s.charCodeAt( 0 ) : s

const add = ( a, b ) => 
  asNumber( a ) + asNumber( b )

const sub = ( a, b ) =>
  asNumber( a ) - asNumber( b )

module.exports = ( source, inbox, floor, verbose ) => {
  const input = inbox.slice()
  const output = []
  const memory = []
  
  var accumulator = null
  var counter = 0
  var steps = 0
  
  if( floor ){
    const tiles = floor.tiles || floor
    
    Object.keys( tiles ).forEach( key =>
      memory[ key ] = tiles[ key ]
    )
  }
  
  const cpu = {
    INBOX: () => {
      if( input.length === 0 ){
        counter = Infinity        
        steps--
        
        return
      }
      
      accumulator = input.shift()
      
      counter++
    },
    
    OUTBOX: () => {
      output.push( accumulator )
      
      accumulator = null
      
      counter++
    },
    
    COPYFROM: address => {
      accumulator = memory[ address ]
      
      counter++
    },
    
    COPYTO: address => {
      memory[ address ] = accumulator
      
      counter++
    },
    
    ADD: address => {
      accumulator = add( accumulator, memory[ address ] )
      
      counter++
    },
    
    SUB: address => {
      accumulator = sub( accumulator, memory[ address ] )
      
      counter++
    },
    
    BUMPUP: address => {
      memory[ address ] = add( memory[ address ], 1 )
      
      accumulator = memory[ address ] 
      
      counter++
    },
    
    BUMPDN: address => {
      memory[ address ] = sub( memory[ address ], 1 )
      
      accumulator = memory[ address ] 
      
      counter++
    },
    
    JUMP: line =>
      counter = line,
      
    JUMPZ: line =>
      counter = accumulator === 0 ? line : counter + 1,
      
    JUMPN: line =>
      counter = accumulator < 0 ? line : counter + 1
  }
  
  const execute = ( program, i ) => {
    if( i >= program.length ){
      return output
    }
    
    const line = program[ i ]
    const instr = line[ 0 ]
    var arg = null
    
    if( line.length > 1 ){
      var arg = line[ 1 ]  
      
      if( ( String( arg ) ).startsWith( '[' ) ){
        arg = memory[ parseInt( arg.substr( 1 ) ) ]
      }
    }
    
    runtimeErrors( instr, arg, { accumulator, memory } )
    cpu[ instr ]( arg )
    
    steps++
    
    return execute( program, counter )
  }
  
  const program = compile( source )
  
  const result = execute( program, 0 )    
  
  return verbose ? {
    accumulator,
    memory,
    outbox: result,
    size: program.length,
    steps
  } : result
}