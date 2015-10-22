const compile = require( './compile' )

const asNumber = s =>
  typeof s === 'string' ? s.charCodeAt( 0 ) : s

const add = ( a, b ) => 
  asNumber( a ) + asNumber( b )

const sub = ( a, b ) =>
  asNumber( a ) - asNumber( b )

module.exports = ( source, inbox, floor, verbose ) => {
  const outbox = []
  const memory = []
  
  var accumulator = null
  var counter = 0
  var steps = 0
  
  Object.keys( floor || {} ).forEach( key =>
    memory[ key ] = floor[ key ]
  )
  
  const cpu = {
    INBOX: () => {
      if( inbox.length === 0 ){
        counter = Infinity        
        steps--
        
        return
      }
      
      accumulator = inbox.shift()
      counter++
    },
    
    OUTBOX: () => {
      outbox.push( accumulator )
      counter++
    },
    
    COPYFROM: i => {
      accumulator = memory[ i ]
      counter++
    },
    
    COPYTO: i => {
      memory[ i ] = accumulator
      counter++
    },
    
    ADD: i => {
      accumulator = add( accumulator, memory[ i ] )
      counter++
    },
    
    SUB: i => {
      accumulator = sub( accumulator, memory[ i ] )
      counter++
    },
    
    BUMPUP: i => {
      memory[ i ] = add( memory[ i ], 1 )
      accumulator = memory[ i ] 
      counter++
    },
    
    BUMPDN: i => {
      memory[ i ] = sub( memory[ i ], 1 )
      accumulator = memory[ i ] 
      counter++
    },
    
    JUMP: i =>
      counter = i,
      
    JUMPZ: i =>
      counter = accumulator === 0 ? i : counter + 1,
      
    JUMPN: i =>
      counter = accumulator < 0 ? i : counter + 1
  }
  
  const execute = ( program, i ) => {
    if( i >= program.length ){
      return outbox
    }
    
    const instr = program[ i ]
    
    if( instr.length > 1 ){
      var arg = instr[ 1 ]  
      
      if( ( String( arg ) ).startsWith( '[' ) ){
        arg = memory[ parseInt( arg.substr( 1 ) ) ]
      }
      
      cpu[ instr[ 0 ] ]( arg )
    } else {
      cpu[ instr[ 0 ] ]()
    }
    
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