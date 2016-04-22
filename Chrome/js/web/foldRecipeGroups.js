//Adds folding capabilities to your recipes page
if( globalCanRender( [ "\/World\/Popmundo.aspx\/Character\/Recipes\/[0-9]*" ], [ 'FoldRecipes_enabled' ] ) ) {
	execFoldRecipeGroups( );
}

function execFoldRecipeGroups( ) {

	var tableId = '';
	$( 'table.data.sortable' ).each( function( ) {

		//Gets the ID of the table to be hidden
		tableId = $( this ).attr( 'id' );
		$( this ).find( 'thead tr:first' ).each( function( ) {

			var words = new classWordList( globalLocalStorageGet( 'Language' ) );
			//Created a new row
			var myTR = document.createElement( 'tr' );
			myTR.className = 'odd';
			var myTD = document.createElement( 'td' );
			myTD.colspan = 2;
			//Creates the hide button
			var myButton = document.createElement( "input" );
			myButton.type = 'button';
			myButton.className = 'spcInputButton';
			myButton.value = words.get( 'FR_HideGroup' );
			myButton.setAttribute( "onclick", "jQuery( '#" + tableId + " tbody' ).hide();" );
			myTD.appendChild( myButton );
			//Creates the show button
			myButton = document.createElement( "input" );
			myButton.type = 'button';
			myButton.className = 'spcInputButton';
			myButton.value = words.get( 'FR_ShowGroup' );
			myButton.setAttribute( "onclick", "jQuery( '#" + tableId + " tbody' ).show();" );
			myTD.appendChild( myButton );
			myTR.appendChild( myTD );
			$( myTR ).insertBefore( $( this ) );



		} );


	} );


}