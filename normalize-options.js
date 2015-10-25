const tv4 = require( 'tv4' )
const schema = require( './node_modules/hrm-level-data/hrm-level-data-schema.json' )

const defaults = {
  tiles: {},
  memorySize: Infinity,
  commands: [ 'INBOX', 'OUTBOX', 'COPYFROM', 'COPYTO', 'ADD', 'SUB', 'BUMPUP', 'BUMPDN', 'JUMP', 'JUMPZ', 'JUMPN' ],
  dereferencing: true,
  maxSteps: 5000
}

module.exports = options => {
  //level
  if( tv4.validate( [ options ], schema ) ){
    const commands = options.commands
    const dereferencing = !!options.dereferencing
    const maxSteps = options.maxSteps || defaults.maxSteps
    var memorySize = defaults.memorySize
    var tiles = defaults.tiles
    
    if( options.floor ){
      memorySize = options.floor.columns * options.floor.rows
      tiles = options.floor.tiles || tiles      
    }
    
    return { commands, dereferencing, memorySize, tiles, maxSteps }
  } 
  
  if( options ){
    if( !options.tiles ){
      options = Object.assign( {}, { tiles: options } )
    }
    
    return Object.assign( {}, defaults, options )
  }
  
  return defaults
}