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

module.exports = ( instr, arg, state ) => {
  const errorChecks = {
    accumulator: name => {
      if( state.accumulator === null )
        throw EmptyHandsError( name )
    },
    memory: ( name, address ) => {
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