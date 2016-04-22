// Adds numbers to Progressbars in all pages
if( globalCanRender( [ "\/World\/Popmundo.aspx\/.*" ], [ 'QualityToValue_showPercentages' ] ) ) {
	execValueToProgressbar();
}

function execValueToProgressbar() {
	$( 'div[class*="rogressBar"]' ).each( function() {

		//Creates the hide button
		var mySpan = document.createElement( "span" );
		mySpan.className = "progressBar";

		var tmpValue = $( this ).attr( 'title' );
		tmpValue = tmpValue.substr( 0, tmpValue.indexOf( "%" ) );
		mySpan.textContent = tmpValue + '%';
		$( this ).children( "div:first" ).append( mySpan );

	} );

	$( '.plusMinusBar' ).each( function() {

		//Creates the hide button
		var mySpan = document.createElement( "span" );

		var tmpValue = $( this ).attr( 'title' );
		tmpValue = tmpValue.substr( 0, tmpValue.indexOf( "%" ) );
		mySpan.textContent = tmpValue + '%';

		if( tmpValue >= 0 ) {
			$( this ).children( "div" ).eq( 1 ).children().append( mySpan );
		} else {
			$( this ).children( "div" ).eq( 0 ).children().append( mySpan );
		}
	} );

}