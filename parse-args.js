const parse = require( 'hrm-parser' )

const parseArgs = args => {
  const arity = args.length
  
  if( arity in argsToSetup ){
    const handlers = argsToSetup[ arity ]
    
    const handlerKey = Object.keys( handlers ).find( key => {
      const handler = handlers[ key ]
      
      return handler.test( args )
    })
    
    if( handlerKey ){
      const handler = handlers[ handlerKey ]
      
      return handler.setup( args )
    }
    
    throw ArgumentError( 'Unexpected arguments' )
  }
  
  throw ArgumentError( 'Expected no more than 3 arguments' )
}

const ArgumentError = message => {
  return {
    name: 'Argument Error',
    message
  }
}

const regex = {
  digit: /^\d+$/
}

const isSource = obj =>
  typeof obj === 'string' || Array.isArray( obj )

const isOptions = obj =>
  !Array.isArray( obj ) && typeof obj === 'object'
  
const isState = obj =>  
  Object.keys( State() ).every( key => 
    key in obj
  )
 
const isTiles = obj =>
  typeof obj === 'object' &&
  Object.keys( obj ).every( key => 
    regex.digit.test( key )
  )
  
const isFloor = obj =>
  obj.columns && obj.rows
 
const optionsToState = ( options ) => {
  const state = State()
  
  state.inbox = options.inbox.slice()
  
  Object.keys( options.tiles ).forEach( key => 
    state.memory[ key ] = options.tiles[ key ]
  )
  
  state.program = Array.isArray( options.source ) ? 
    options.source : 
    parse( options.source )

  return state        
}
 
const argsToSetup = {
  1: {
    state: {
      test: args => 
        isState( args[ 0 ] ),
        
      setup: args => {
        const state = args[ 0 ]
        
        return { options: Options(), state }
      }
    },
    
    options: {
      test: args => 
        isOptions( args[ 0 ] ),        
        
      setup: args => {
        const options = Object.assign( Options(), args[ 0 ] )
        const state = optionsToState( options )
        
        return { options, state }
      }
    }
  },
  2: {
    sourceInbox: {
      test: args =>
        isSource( args[ 0 ] ) && 
        Array.isArray( args[ 1 ] ),
      
      setup: args => {
        const options = Object.assign( Options(), {
          source: args[ 0 ],
          inbox: args[ 1 ]
        })
        
        const state = optionsToState( options )
        
        return { options, state }
      }
    },
    
    sourceOptions: {
      test: args =>
        isSource( args[ 0 ] ) &&
        isOptions( args[ 1 ] ),
        
      setup: args => {
        const options = Object.assign( Options(), args[ 1 ], {
          source: args[ 0 ]
        })
        
        const state = optionsToState( options )
        
        return { options, state }
      }
    }    
  },
  
  3: {
    sourceInboxTiles: {
      test: args =>
        isSource( args[ 0 ] ) &&
        Array.isArray( args[ 1 ] ) &&
        isTiles( args[ 2 ] ),
        
      setup: args => {
        const options = Object.assign( Options(), {
          source: args[ 0 ],
          inbox: args[ 1 ],
          tiles: args[ 2 ]
        })
        
        const state = optionsToState( options )
        
        return { options, state }
      }        
    },
    
    sourceInboxFloor: {
      test: args =>
        isSource( args[ 0 ] ) &&
        Array.isArray( args[ 1 ] ) &&
        isFloor( args[ 2 ] ),
      
      setup: args => {
        const floor = args[ 2 ]
        
        const options = Object.assign( Options(), {
          source: args[ 0 ],
          inbox: args[ 1 ]
        }, floor )
        
        const state = optionsToState( options )
        
        return { options, state }
      }
    }
  }
}

const Options = () => {
  return {
    source: '',
    inbox: [],
    tiles: [],
    columns: Infinity,
    rows: Infinity,
    commands: [ 'INBOX', 'OUTBOX', 'COPYFROM', 'COPYTO', 'ADD', 'SUB', 'BUMPUP', 'BUMPDN', 'JUMP', 'JUMPZ', 'JUMPN' ],
    dereferencing: true,
    maxSteps: 5000,
    maxSize: 255,
    minValue: -999,
    maxValue: 999  
  }
}

const State = () => {
  return {
    program: [], 
    accumulator: null,
    inbox: [],
    outbox: [],
    memory: [],
    counter: 0,  
    steps: 0,
    running: false
  }
}

module.exports = parseArgs