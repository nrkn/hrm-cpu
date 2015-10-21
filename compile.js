require( './polyfills' )

const instructions = [ 'INBOX', 'OUTBOX', 'COPYFROM', 'COPYTO', 'ADD', 'SUB', 'BUMPUP', 'BUMPDN', 'JUMP', 'JUMPZ', 'JUMPN' ]

const lineToWords = line =>
  line
    .replace( /\r/g, '' )
    .split( ' ' )
    .filter( word =>
      word.trim() !== ''
    )

const isInstructionOrLabel = words =>
  words.length > 0 && 
    ( instructions.includes( words[ 0 ] ) || words[ 0 ].endsWith( ':' ) )
    
const compile = source => {
  var labels = {}
  var i = 0
  
  const lines = source.split( '\n' )  
  
  const words = lines.map( lineToWords )
  
  const code = words.filter( isInstructionOrLabel )
  
  const labelsExtracted = code.reduce( ( lines, words ) => {
    const first = words[ 0 ]
    
    if( first.endsWith( ':' ) ){
      const label = first.replace( ':', '' )
      
      labels[ label ] = i
      
      return lines
    }
    
    lines.push( words )
    i++
    
    return lines
  }, [] )
    
  const labelsInserted = labelsExtracted.map( words => {
    const word = words[ 0 ]
    
    if( word.startsWith( 'JUMP' ) ){        
      words[ 1 ] = labels[ words[ 1 ] ]
    } else if( words.length > 1 ){
      words[ 1 ] = Number( words[ 1 ] )
    }
    
    return words
  })
  
  return labelsInserted
}    

module.exports = compile    