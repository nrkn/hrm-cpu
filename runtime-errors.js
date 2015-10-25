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

const OutOfBoundsError = instrName => {
  return {
    name: 'No Such Tile',
    message: `No such tile! You can't ${ instrName } with a tile that isn't on the floor!`
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

module.exports = ( instr, arg, state ) => {
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
        throw OutOfBoundsError( name )

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