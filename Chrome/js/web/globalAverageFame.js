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

			$( this ).after( getObjGlobalAverageFameTR( mediaFame_val, mediaMC_val ) );
		} );

	} );

}

/**
 * Gets a TR object to be used in Global Average Fame
 *
 *  @param {int} media - value with the media  
 *  @param {int} popularity - value with the popularity
 * @return {object} an html object  
 */

function getObjGlobalAverageFameTR( media, popularity ) {
	var myTR = document.createElement( "tr" );
	myTR.className = 'even';

	var myTD01 = document.createElement( "td" );
	myTD01.appendChild( getObjPill( getLabel( 'l10nAFGlobal' ), 3 ) );

	var myTD02 = document.createElement( "td" );
	myTD02.appendChild( getObjPill( media, 4 )  );

	var myTD03 = document.createElement( "td" );
	myTD03.appendChild( getObjPill( popularity, 1 ) );

	myTR.appendChild( myTD01 );
	myTR.appendChild( myTD02 );
	myTR.appendChild( myTD03 );

	return myTR;
}

