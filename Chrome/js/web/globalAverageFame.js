/*
 *Adds global fame media to your artist popularity page
 */
if( globalCanRender( [ "\/World\/Popmundo.aspx\/Artist\/Popularity\/[0-9]*" ], [ 'GlobalFame_enabled' ] ) ) {
	execFoldRecipeGroups();
}

function execGlobalAverageFame() {

	//If the stored data is not OK, don't execute
	if( !globalLocalStorageGet( 'Const_numberOfCities' ) ) {
		return;
	}

	var words = new classWordList( globalLocalStorageGet( 'Language' ) );
	var numberOfCities = globalLocalStorageGet( 'Const_numberOfCities' );
	var averageFame = 0;
	var averageMediaCoverage = 0;

	$( "a[href^='/World/Popmundo.aspx/Help/Scoring/']" ).each( function() {

		//Increases the average fame value
		averageFame += parseInt( $( this ).attr( 'title' ).replace( '/26', '' ) );
	} );

	$( "#tablefame div[class$='ProgressBar']" ).each( function() {

		//Increases the total average media coverage
		averageMediaCoverage += parseInt( $( this ).attr( 'title' ).tmpVal.replace( '%', '' ) );
	} );

	//Calculates the average fame and media coverage
	averageFame = parseInt( averageFame / numberOfCities );
	averageMediaCoverage = parseInt( averageMediaCoverage / numberOfCities );

	//Add a new line with the average values to the table
	$( "tr:first" ).after( function() {

		myTR.className = 'even';

		var myTD = document.createElement( "td" );
		myTD.appendChild( globalGetPill( words.get( 'AF_Global' ), 3 ) );
		myTR.appendChild( myTD );

		myTD = document.createElement( "td" );
		myTD.appendChild( globalGetPill( averageFame, 4 ) );
		myTR.appendChild( myTD );

		myTD = document.createElement( "td" );
		myTD.appendChild( globalGetPill( averageMediaCoverage, 1 ) );
		myTR.appendChild( myTD );

		$( this ).after( myTR );
	} );
}
