var buttons = require( '../lib/buttons' );
describe( 'Line parser', () => {
    it( 'should recognize lowercase rows', () => {

    } )
} );
describe( 'Modifier parser', () => {
    it( 'parses rows', () => {
        expect( buttons.decodeModifier( 'r4:' ) ).toEqual( { row: true, nr: 4 } );
        expect( buttons.decodeModifier( 'R0:' ) ).toEqual( { row: true, nr: 0 } );
        expect( buttons.decodeModifier( 'r8 ' ) ).toEqual( { row: true, nr: 8 } );
        expect( buttons.decodeModifier( 'r:' ) ).toEqual( { error: true } );
    } );
    it( 'parses columns', () => {
        expect( buttons.decodeModifier( 'c4:' ) ).toEqual( { row: false, nr: 4 } );
        expect( buttons.decodeModifier( 'C0:' ) ).toEqual( { row: false, nr: 0 } );
        expect( buttons.decodeModifier( 'c8 ' ) ).toEqual( { row: false, nr: 8 } );
        expect( buttons.decodeModifier( 'c:' ) ).toEqual( { error: true } );
    } );
    it( 'parses scene buttons', () => {
        expect( buttons.decodeModifier( 'sc:' ) ).toEqual( { row: true, nr: 8 } );
        expect( buttons.decodeModifier( 'SC ' ) ).toEqual( { row: true, nr: 8 } );
    } );
    it( 'parses automap buttons', () => {
        expect( buttons.decodeModifier( 'am:' ) ).toEqual( { row: false, nr: 8 } );
        expect( buttons.decodeModifier( 'AM ' ) ).toEqual( { row: false, nr: 8 } );
    } );
    it( 'returns error for invalid modifier', () => {
        expect( buttons.decodeModifier( 'xy:' ) ).toEqual( { error: true } );
        expect( buttons.decodeModifier( 'ry:' ) ).toEqual( { error: true } );
        expect( buttons.decodeModifier( undefined ) ).toEqual( { error: true } );
        expect( buttons.decodeModifier( '' ) ).toEqual( { error: true } );
    } );
} );
describe( 'Number parser', () => {
    it( 'recognizes x and X as marker', function () {
        expect( buttons.numbersFromCoords( 'x.X.x.X.x.X.' ) ).toEqual( [ 0, 2, 4, 6, 8, 10 ] );
    } );
    it( 'returns empty array for empty/invalid args', () => {
        expect( buttons.numbersFromCoords( 'asdf' ) ).toEqual( [] );
        expect( buttons.numbersFromCoords( '' ) ).toEqual( [] );
        expect( buttons.numbersFromCoords( undefined ) ).toEqual( [] );
    } );
} );
describe( 'Row/col converter', () => {
    it( 'creates rows', () => {
        expect( buttons.asRow( 2, [ 0, 3 ] ) ).toEqual( [ [ 2, 0 ], [ 2, 3 ] ] );
    } );
    it( 'creates cols', () => {
        expect( buttons.asCol( 2, [ 0, 3 ] ) ).toEqual( [ [ 0, 2 ], [ 3, 2 ] ] );
    } );
} );
describe( 'Line parser', () => {
    it( 'reads row', () => {
        expect( buttons.decodeString( 'r4:x..x' ) ).toEqual( [ [ 4, 0 ], [ 4, 3 ] ] );
    } );
    it( 'reads scene buttons', () => {
        expect( buttons.decodeString( 'sc:..xx' ) ).toEqual( [ [ 8, 2 ], [ 8, 3 ] ] );
    } );
    it( 'reads automap buttons', () => {
        expect( buttons.decodeString( 'AM ..X X' ) ).toEqual( [ [ 2, 8 ], [ 4, 8 ] ] );
    } );
} );