/*
 *Adds global fame media to your artist popularity page
 *
 */

if( canExec( /\/World\/Popmundo.aspx\/Artist\/Popularity\/[0-9]*/g ) ) {
	execGlobalAverageFame();
}


function execGlobalAverageFame() {
	chrome.storage.sync.get( 'userOptions', function( userOptions ) {
		var canUse = true;

		var numCities = 49;
		var mediaFame = 0;
		var mediaMC = 0;

		//Check ifobject exists in the sync storage
		if( Object.keys( userOptions ).length !== 0 ) {
			userOptions = userOptions[ 'userOptions' ];
			canUse = userOptions ['GlobalFame'];
		}

		if( !canUse )
			return;

		//Calculates the total fame value
		$( "a[href^='/World/Popmundo.aspx/Help/Scoring/']" ).each( function() {
			//media value;
			var tmpVal = $( this ).attr( 'title' );
			tmpVal = tmpVal.replace( '/26', '' );
			//Increases the media
			mediaFame += parseInt( tmpVal );
		} );

		//Calculates the total media coverage
		$( "#tablefame div[class$='ProgressBar']" ).each( function() {
			//media value;
			var tmpVal = $( this ).attr( 'title' );
			tmpVal = tmpVal.replace( '%', '' );

			//Increases the media
			mediaMC += parseInt( tmpVal );
		} );

		//Add global line to table
		$( "tr:first" ).after( function() {
			var mediaFame_val = mediaFame / numCities;
			mediaFame_val = mediaFame_val.toFixed( 2 );

			var mediaMC_val = mediaMC / numCities;
			mediaMC_val = mediaMC_val.toFixed( 2 );

			var tmpVal = '<tr class="even"><td>' + getValuePill( getLabel( 'l10nAFGlobal' ), 4 ) + '</td><td>' + getValuePill( mediaFame_val, 3 ) + '</div></td><td>' + getValuePill( mediaMC_val, 2 ) + '</div></td></tr>';
			$( this ).after( tmpVal );
		} );

	} );

}


