// Adds numbers to quality values in all pages
if( canExec( /\/World\/Popmundo.aspx\/.*/g ) ) {

	execValueToQuality();
}

function execValueToQuality() {
	chrome.storage.sync.get( 'userOptions', function( userOptions ) {
		var canUse = true;

		//Check ifobject exists in the sync storage
		if( Object.keys( userOptions ).length !== 0 ) {
			userOptions = userOptions[ 'userOptions' ];
			canUse = userOptions ['ShowValues'];
		}

		$( "a[href*='Scoring']" ).each( function() {
			value = $( this ).attr( 'title' );
			value = value.substr( 0, value.lastIndexOf( "/" ) );
			$( this ).after( getObjPill( value, 4 ) );
		} );

		if( !canUse )
			return;
	} );
}