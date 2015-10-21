const compile = require( './compile' )

module.exports = ( source, inbox, floor ) => {
  const outbox = []
  const memory = []
  
  var accumulator = null
  var counter = 0
  
  Object.keys( floor || {} ).forEach( key =>
    memory[ key ] = floor[ key ]
  )
  
  const cpu = {
    INBOX: () => {
      if( inbox.length === 0 ){
        counter = Infinity
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
      accumulator += memory[ i ]
      counter++
    },
    
    SUB: i => {
      accumulator -= memory[ i ]
      counter++
    },
    
    BUMPUP: i => {
      memory[ i ]++
      accumulator = memory[ i ] 
      counter++
    },
    
    BUMPDN: i => {
      memory[ i ]--
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
    
    cpu[ instr[ 0 ] ]( instr[ 1 ] )  
    
    return execute( program, counter )
  }
  
  return execute( compile( source ), 0 )    
}