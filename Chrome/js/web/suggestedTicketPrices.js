/**
 * "Suggested Ticket Prices"
 * Adds suggested ticket prices to your invitations and popularity page
 */

if( canExec( /\/World\/Popmundo.aspx\/Artist\/Popularity\/[0-9]*/g )
		|| canExec( /\/World\/Popmundo.aspx\/Artist\/InviteArtist\/[0-9]*/g ) ) {
	execSuggestedTicketPrices();
}

function execSuggestedTicketPrices() {
	chrome.storage.sync.get( 'userOptions', function( userOptions ) {
		var canUse = true;
		var higerPrice = true;

		//Check ifobject exists in the sync storage
		if( Object.keys( userOptions ).length !== 0 ) {
			userOptions = userOptions[ 'userOptions' ];
			canUse = userOptions ['TicketPrice'];
			higerPrice = userOptions ['HigherPrices'];
		}

		if( !canUse )
			return;

		$( "a[href^='/World/Popmundo.aspx/Help/Scoring/']" ).each( function() {
			//media value;
			fame = $( this ).attr( 'title' );
			fame = fame.replace( '/26', '' );
			$( this ).before( getValuePill( stpGetPriceFame( fame, higerPrice ), 1 ) );
		} );

	} );
}

//Selects a suggested prive according to your fame in a given city
function stpGetPriceFame( fame, higher ) {
	switch( parseInt( fame ) ) {
		case( 0 ):
			return ( higher ) ? 6 : 5;
			break;
		case( 1 ):
			return ( higher ) ? 6.5 : 5;
			break;
		case( 2 ):
			return ( higher ) ? 7 : 5;
			break;
		case( 3 ):
			return ( higher ) ? 8 : 7;
			break;
		case( 4 ):
			return ( higher ) ? 9 : 9;
			break;
		case( 5 ):
			return ( higher ) ? 11 : 12;
			break;
		case( 6 ):
			return ( higher ) ? 13 : 15;
			break;
		case( 7 ):
			return ( higher ) ? 15 : 18;
			break;
		case( 8 ):
			return ( higher ) ? 20 : 20;
			break;
		case( 9 ):
			return ( higher ) ? 25 : 25;
			break;
		case( 10 ):
			return ( higher ) ? 30 : 30;
			break;
		case( 11 ):
			return ( higher ) ? 35 : 35;
			break;
		case( 12 ):
			return ( higher ) ? 45 : 40;
			break;
		case( 13 ):
			return ( higher ) ? 50 : 45;
			break;
		case( 14 ):
			return ( higher ) ? 55 : 50;
			break;
		case( 15 ):
			return ( higher ) ? 60 : 65;
			break;
		case( 16 ):
			return ( higher ) ? 75 : 70;
			break;
		case( 17 ):
			return ( higher ) ? 80 : 75;
			break;
		case( 18 ):
			return ( higher ) ? 85 : 80;
			break;
		case( 19 ):
			return ( higher ) ? 90 : 85;
			break;
		case( 20 ):
			return ( higher ) ? 95 : 90;
			break;
		case( 21 ):
			return ( higher ) ? 100 : 95;
			break;
		case( 22 ):
			return ( higher ) ? 105 : 100;
			break;
		default:
			return ( higher ) ? 110 : 105;
			break;
	}
}