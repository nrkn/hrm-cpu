const assert = require( 'assert' )
const HrmCpu = require( '../hrm-cpu' )

const fixtures = {
  simple: {
    source: 'INBOX OUTBOX',
    inbox: [ 1 ],
    outbox: [ 1 ]
  },
  tiles: {
    source: 'INBOX ADD 0 OUTBOX',
    tiles: { 0: 2 },
    inbox: [ 1 ],
    outbox: [ 3 ]
  },
  floor: {
    source: 'INBOX ADD 0 OUTBOX',
    floor: {
      columns: 2,
      rows: 2,
      tiles: { 0: 2 }
    },
    inbox: [ 1 ],
    outbox: [ 3 ]
  },
  state: {
    state: {
      program: [ [ 'INBOX' ], [ 'OUTBOX' ] ],
      accumulator: null,
      inbox: [ 1 ],
      outbox: [],
      memory: [],
      counter: 0,
      steps: 0,
      running: false
    },
    outbox: [ 1 ]
  }
}

const ctor = {
  "HrmCpu( state )": done => {
    const outbox = HrmCpu( fixtures.state.state ).run()
    
    assert.deepEqual( outbox, fixtures.state.outbox )
    
    done()
  },    
  "HrmCpu( options )": done => {
    const options = {
      source: fixtures.tiles.source,
      inbox: fixtures.tiles.inbox,
      tiles: fixtures.tiles.tiles
    }
    
    const outbox = HrmCpu( options ).run()
    
    assert.deepEqual( outbox, fixtures.tiles.outbox )
    
    done()    
  },
  "HrmCpu( source, inbox )": done => {    
    const outbox = HrmCpu( fixtures.simple.source, fixtures.simple.inbox ).run()
    
    assert.deepEqual( outbox, fixtures.simple.outbox )
    
    done()
  },    
  "HrmCpu( source, options )": done => {
    const options = {
      inbox: fixtures.tiles.inbox,
      tiles: fixtures.tiles.tiles
    }
    
    const outbox = HrmCpu( fixtures.tiles.source, options ).run()
    
    assert.deepEqual( outbox, fixtures.tiles.outbox )

    done()
  },   
  "HrmCpu( source, inbox, tiles )": done => {
    const outbox = HrmCpu( 
      fixtures.tiles.source, fixtures.tiles.inbox, fixtures.tiles.tiles 
    ).run()
    
    assert.deepEqual( outbox, fixtures.tiles.outbox )
    
    done()
  },    
  "HrmCpu( source, inbox, floor )": done => {
    const outbox = HrmCpu( 
      fixtures.floor.source, fixtures.floor.inbox, fixtures.floor.floor 
    ).run()
    
    assert.deepEqual( outbox, fixtures.floor.outbox )

    done()
  }
}

describe( 'hrm-cpu API', () => {
  describe( 'ctor', () =>
    Object.keys( ctor ).forEach( name => 
      it( name, ctor[ name ] )
    )
  )
  
  describe( 'step', () => {
    it( 'HrmCpu( source, inbox ).step()', done => {
      const hrm = HrmCpu( fixtures.simple.source, fixtures.simple.inbox )
      
      var state = hrm.step()
      
      assert.equal( fixtures.simple.inbox, state.accumulator )
      
      state = hrm.step()
      
      assert.deepEqual( state.outbox, fixtures.simple.outbox )
      
      done()
    })
    
    it( 'HrmCpu( state ).step()', done => {
      const hrm1 = HrmCpu( fixtures.simple.source, fixtures.simple.inbox )      
      const state1 = hrm1.step()
      
      const hrm2 = HrmCpu( state1 )
      const state2 = hrm2.step()
      
      assert.deepEqual( state2.outbox, fixtures.simple.outbox )
      
      done()      
    })
  })
  
  describe( 'async', () => {
    it( 'HrmCpu( source, inbox ).run( cb )', done => {
      HrmCpu( fixtures.simple.source, fixtures.simple.inbox ).run( ( err, outbox, state ) => {
        assert.equal( err, null )        
        assert.deepEqual( outbox, fixtures.simple.outbox )  
        assert.deepEqual( state.outbox, fixtures.simple.outbox )
        
        HrmCpu( 'OUTBOX', fixtures.simple.inbox ).run( ( err ) => {
          assert( err !== null )
          
          done()
        })
      })    
    })
    
    it( 'HrmCpu( source, inbox ).step( cb )', done => {
      const hrm = HrmCpu( fixtures.simple.source, fixtures.simple.inbox )
      
      hrm.step( 
        ( err, state ) => {
          assert.equal( err, null )
          assert.equal( fixtures.simple.inbox, state.accumulator )
          
          hrm.step( ( err, state ) => {
            assert.equal( err, null )
            assert.deepEqual( state.outbox, fixtures.simple.outbox )
            
            const hrm2 = HrmCpu( 'OUTBOX', fixtures.simple.inbox )
            
            hrm2.step( err => {
              assert( err !== null )
              
              done()  
            })
          })
        }
      )
    })    
  })
})