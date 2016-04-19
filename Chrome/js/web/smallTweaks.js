// Prevent for submit with enter keypress. Stops failed messages
$( document ).ready( function() {
	$( window ).keydown( function( event ) {
		if( event.keyCode == 13 ) {
			event.preventDefault();
			console.log( "Submit by enter key prevented." )
			return false;
		}
	} );
} );