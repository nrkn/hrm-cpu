const parseArgs = require( './parse-args' )
const runtimeErrors = require( './runtime-errors' )

require( './polyfills' )

//no rest parameters in node yet :/
const HrmCpu = function(){
  const setup = parseArgs( Array.from( arguments ) )
  
  const options = setup.options
  const state = setup.state
  
  const step = () => {
    var line = state.program[ state.counter ]
    var instr = line[ 0 ]
    var arg = line[ 1 ]        
    var dereferenced = false        
    
    if( arg && ( String( arg ) ).startsWith( '[' ) ){
      arg = state.memory[ parseInt( arg.substr( 1 ) ) ]
      dereferenced = true
    }        
    
    var errorState = ErrorState( dereferenced, options, state )

    try{
      runtimeErrors( instr, arg, errorState )
    } catch( err ){
      state.running = false
      
      return err      
    } 
    
    executor( state )[ instr ]( arg )
    
    state.running = state.counter < state.program.length
  }
  
  return {
    options,
    state,
    run: cb => {
      const isCb = typeof cb === 'function'

      state.running = state.counter < state.program.length
      
      while( state.running ){
        var err = step()

        if( err ){
          if( isCb ){
            cb( err, state )
            return
          }
          
          throw err
        }
      }
      
      if( isCb ){
        cb( null, state.outbox, state )
        return
      }      
      
      return state.outbox
    },
    step: cb => {
      const isCb = typeof cb === 'function'
      
      state.running = state.counter < state.program.length
      
      var err = null
      
      if( state.running ){
        err = step()
      }
      
      if( err ){
        if( isCb ){
          cb( err, state )
          return
        }
        
        throw err
      }
      
      if( isCb ){
        cb( null, state )
        return
      }      
      
      return state
    }
  }
}

const cpu = {
  INBOX: state => 
    state.accumulator = state.inbox.shift(),
  
  OUTBOX: state => {
    state.outbox.push( state.accumulator )      
    state.accumulator = null
  },
  
  COPYFROM: ( state, address ) => 
    state.accumulator = state.memory[ address ],
  
  COPYTO: ( state, address ) =>
    state.memory[ address ] = state.accumulator,
  
  ADD: ( state, address ) => 
    state.accumulator = add( state.accumulator, state.memory[ address ] ),
  
  SUB: ( state, address ) => 
    state.accumulator = sub( state.accumulator, state.memory[ address ] ),
  
  BUMPUP: ( state, address ) => {
    state.memory[ address ] = add( state.memory[ address ], 1 )      
    state.accumulator = state.memory[ address ] 
  },
  
  BUMPDN: ( state, address ) => {
    state.memory[ address ] = sub( state.memory[ address ], 1 )
    state.accumulator = state.memory[ address ] 
  },
  
  JUMP: ( state, line ) =>
    state.counter = line,
    
  JUMPZ: ( state, line ) =>
    state.counter = state.accumulator === 0 ? line : state.counter + 1,
    
  JUMPN: ( state, line ) =>
    state.counter = state.accumulator < 0 ? line : state.counter + 1
}

const executor = state =>
  Object.keys( cpu ).reduce( ( execute, instr ) => {
    execute[ instr ] = arg => {
      if( instr === 'INBOX' && state.inbox.length === 0 ){
        state.counter = Infinity
        
        return
      }
      
      cpu[ instr ]( state, arg )
      
      if( !jumps.includes( instr ) ) 
        state.counter++
      
      state.steps++
      
      return
    }
    
    return execute
  }, {})
  
const ErrorState = ( dereferenced, options, state ) => {
  return {
    dereferenced,
    commands: options.commands,
    dereferencing: options.dereferencing,
    maxSteps: options.maxSteps,
    memorySize: options.columns * options.rows,
    maxSize: options.maxSize,
    minValue: options.minValue,
    maxValue: options.maxValue,
    steps: state.steps,
    accumulator: state.accumulator,
    memory: state.memory,
    size: state.program.length
  }  
}

const asNumber = s =>
  typeof s === 'string' ? s.charCodeAt( 0 ) : s

const add = ( a, b ) => 
  asNumber( a ) + asNumber( b )

const sub = ( a, b ) =>
  asNumber( a ) - asNumber( b )
  
const jumps = [ 'JUMP', 'JUMPZ', 'JUMPN' ]  

module.exports = HrmCpu