// Adds numbers to quality values in all pages
if( globalCanRender( [ /\/World\/Popmundo.aspx\/.*/ ], [ 'QualityToValue_showValues' ] ) ) {
	execValueToQuality();
}

function execValueToQuality() {

	$( "a[href*='Scoring']" ).each( function() {
		var tmpValue = $( this ).attr( 'title' );
		tmpValue = tmpValue.substr( 0, tmpValue.lastIndexOf( "/" ) );
		$( this ).after( globalGetPill( tmpValue, 4 ) );
	} );

}