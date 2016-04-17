// Adds numbers to Progressbars in all pages
if( canExec( /\/World\/Popmundo.aspx\/.*/g ) ) {

	execValueToProgressbar();
}

function execValueToProgressbar() {
	chrome.storage.sync.get( 'userOptions', function( userOptions ) {
		var canUse = true;

		//Check ifobject exists in the sync storage
		if( Object.keys( userOptions ).length !== 0 ) {
			userOptions = userOptions[ 'userOptions' ];
			canUse = userOptions ['ShowPercentages'];
		}

		$( 'div[class*="rogressBar"]' ).each( function() {
			value = $( this ).attr( 'title' );
			value = value.substr( 0, value.indexOf( "%" ) );
			span = '<span class="scProgressBar">&nbsp;&nbsp;&nbsp;' + value + '%</span>';
			value = $( this ).children( "div:first" ).append( span );
		} );

		$( '.plusMinusBar' ).each( function() {
			value = $( this ).attr( 'title' );
			value = value.substr( 0, value.indexOf( "%" ) );
			span = '<span class="scProgressBar">&nbsp;&nbsp;&nbsp;' + value + '%</span>';
			if( value >= 0 ) {
				$( this ).children( "div" ).eq( 1 ).children().append( span );
			} else {
				$( this ).children( "div" ).eq( 0 ).children().append( span );
			}
		} );

		if( !canUse )
			return;
	} );
}