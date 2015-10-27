const defaults = {
  tiles: {},
  memorySize: Infinity,
  commands: [ 'INBOX', 'OUTBOX', 'COPYFROM', 'COPYTO', 'ADD', 'SUB', 'BUMPUP', 'BUMPDN', 'JUMP', 'JUMPZ', 'JUMPN' ],
  dereferencing: true,
  maxSteps: 5000
}

const regex = {
  digit: /^\d+$/
}

const isTiles = obj =>
  Array.isArray( obj ) || Object.keys( obj ).every( key => 
    regex.digit.test( key )
  )

module.exports = options => {
  //nothing
  if( !options )
    return defaults
    
  //{ 0: 9 }
  if( isTiles( options ) ){
    return Object.assign( {}, defaults, { tiles: options } )
  }
  
  //{ columns, rows, tiles }
  if( options.columns && options.rows ){
    return Object.assign( {}, defaults, {
      memorySize: options.columns * options.rows,
      tiles: options.tiles || {}
    })
  }
  
  return Object.assign( {}, defaults, options )
}