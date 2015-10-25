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

const emptyHands = name =>
  `Empty value! You can't ${ name } with empty hands!`
  
const emptyTile = name =>
  `Empty value! You can't ${ name } with an empty tile on the floor! Try writing something to that tile first.`

module.exports = ( instr, arg, state ) => {
  const errorChecks = {
    accumulator: name => {
      if( state.accumulator === null )
        throw Error( emptyHands( name ) )
    },
    memory: ( name, i ) => {
      if( state.memory[ i ] === null )
        throw Error( emptyTile( name ) )
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