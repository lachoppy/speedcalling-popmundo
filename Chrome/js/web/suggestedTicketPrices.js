/**
 * Adds suggested ticket prices to your invitations and popularity page
 */
if( globalCanRender( [ "\/World\/Popmundo.aspx\/Artist\/Popularity\/[0-9]*", "\/World\/Popmundo.aspx\/Artist\/InviteArtist\/[0-9]*" ], [ 'TicketPrice_enabled' ] ) ) {
	execSuggestedTicketPrices();
}


function execSuggestedTicketPrices() {

	var myPrices = new classTicketPrices();
	$( "a[href^='/World/Popmundo.aspx/Help/Scoring/']" ).each( function() {
		//Gets the media value;
		$( this ).before( globalGetPill( myPrices.get( $( this ).attr( 'title' ).replace( '/26', '' ) ), 2 ) );
	} );

}