// Adds the filter items in locale functionaly

if( globalCanRender( [ /\/World\/Popmundo.aspx\/Locale\/ItemsEquipment\/.*/ ], [ 'FilterItems_enabled' ] ) ) {
	execAddFilterLocaleItems();
}

function execAddFilterLocaleItems() {

	var words = new classWordList( globalLocalStorageGet( 'Language' ) );

	//Creates the line with DOM elements
	var myTR = document.createElement( "tr" );
	myTR.className = "group";

	var myTD = document.createElement( "td" );
	myTD.innerHTML = '&nbsp;';
	myTR.appendChild( myTD );

	myTD = document.createElement( "td" );
	myTD.id = '';
	myTD.colspan = 2;
	myTD.innerHTML = words.get( 'FI_FilterItems' );
	myTR.appendChild( myTD );
	$( myTR ).insertBefore( '#checkedlist > tbody > tr:first' )

	//Creates the line with DOM elements
	var myTR = document.createElement( "tr" );
	myTR.className = "even hoverable";

	var myTD = document.createElement( "td" );
	myTD.innerHTML = '&nbsp;';
	myTR.appendChild( myTD );

	myTD = document.createElement( "td" );

	var myInput = document.createElement( "input" );
	myInput.type = 'number';
	myInput.id = 'textFilterID';
	myInput.name = 'textFilterID';
	myInput.placeholder = words.get( 'FI_PlaceHolder' );

	//If there's an anchor in the URI, gets the characterID	 for the input value	
	var url = location.href;
	if( url.indexOf( "#" ) > -1 ) {
		myInput.value = url.substring( url.indexOf( "#" ) + 1 );
	}
	myTD.appendChild( myInput );
	myTR.appendChild( myTD );

	var myButton = document.createElement( "input" );
	myButton.type = 'button';
	myButton.className = 'spcInputButton';
	myButton.value = words.get( 'FI_Filter' );
	var myClickCode = "window.location.assign(";
	myClickCode += "'" + window.location.pathname + "#' + "
	myClickCode += "document.getElementById( 'textFilterID' ).value ); ";
	myClickCode += "window.location.reload();";
	myButton.setAttribute('onclick', myClickCode);
	myTD.appendChild( document.createTextNode( '  ' ) );
	myTD.appendChild( myButton );
	myTR.appendChild( myTD );
	$( myTR ).insertAfter( '#checkedlist > tbody > tr:first' )
}