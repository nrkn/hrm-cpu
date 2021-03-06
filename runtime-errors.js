require( './polyfills' )

const checks = {
  OUTBOX: {
    checks: [ 'accumulator' ]
  },
  COPYFROM: {
    checks: [ 'memory' ]
  },
  COPYTO: {
    checks: [ 'accumulator' ]
  },  
  ADD: {
    checks: [ 'accumulator', 'memory' ]
  },
  SUB: {
    checks: [ 'accumulator', 'memory' ]
  },
  BUMPUP: {
    name: 'BUMP+',
    checks: [ 'memory' ]
  },
  BUMPDN: {
    name: 'BUMP-',
    checks: [ 'memory' ]
  },
  JUMPZ: {
    name: 'JUMP IF ZERO',
    checks: [ 'accumulator' ]
  },
  JUMPN: {
    name: 'JUMP IF NEGATIVE',
    checks: [ 'accumulator' ]      
  }
}

const EmptyHandsError = instrName => {
  return {
    name: 'Empty Hands',
    message: `Empty value! You can't ${ instrName } with empty hands!`
  }
}

const EmptyTileError = instrName => {
  return {
    name: 'Empty Tile',
    message: `Empty value! You can't ${ instrName } with an empty tile on the floor! Try writing something to that tile first.`
  }
}

const BadTileAddressError = address => {
  return {
    name: 'Bad Tile Address',
    message: `Bad tile address! Tile with address ${ address } does not exist! Where do you think you're going?`
  }
}

const InstrNotAllowedError = instrName => {
  return {
    name: 'Instruction Not Allowed',
    message: `Instruction not allowed! You can't use ${ instrName } on this level!`
  }
}

const DereferencingNotAllowedError = () => {
  return {
    name: 'Dereferencing Not Allowed',
    message: `Dereferencing not allowed! You can't dereference on this level!`
  }
}

const TooManyStepsError = maxSteps => {
  return {
    name: 'Too Many Steps',
    message: `Too many steps! The maximum steps allowed is ${ maxSteps }!`
  }  
}

const ProgramTooLongError = maxSize => {
  return {
    name: 'Program Too Long',
    message: `Program too long! The maximum program length is ${ maxSize }!`
  }  
}

const OverflowError = ( minValue, maxValue ) => {
  return {
    name: 'Overflow!',
    message: `Overflow! Each data unit is restricted to values between ${ minValue } and ${ maxValue }. That should be enough for anybody.`
  }
}

module.exports = ( instr, arg, state ) => {
  if( state.accumulator < state.minValue || state.accumulator > state.maxValue )
    throw OverflowError( state.minValue, state.maxValue )
  
  if( state.size > state.maxSize )
    throw ProgramTooLongError( state.maxSize )
  
  if( !state.commands.includes( instr ) )
    throw InstrNotAllowedError( instr )
  
  if( state.dereferenced && !state.dereferencing )
    throw DereferencingNotAllowedError()
  
  if( state.steps > state.maxSteps )
    throw TooManyStepsError( state.maxSteps ) 
  
  const errorChecks = {
    accumulator: name => {
      if( state.accumulator === null )
        throw EmptyHandsError( name )
    },
    memory: ( name, address ) => {
      if( address >= state.memorySize )
        throw BadTileAddressError( address )

      if( state.memory[ address ] === undefined || state.memory[ address ] === null )
        throw EmptyTileError( name )
    }
  }

  if( instr in checks ){
    const check = checks[ instr ]
    const name = check.name || instr
    
    check.checks.forEach( key =>
      errorChecks[ key ]( name, arg )
    )
  }
}