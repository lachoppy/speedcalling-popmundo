// Calls everyone in the contact list
function inpageCallEveryone( mainId ) {
	var itemListId = 1;
	var windowRunTime = window.open( '', 'gexWindow', '' );
	var toCall = JSON.parse( window.localStorage.getItem( mainId ) );

	//Changes the locatioin of windowRunTime
	var doit = function() {

		var myId = 'ctl00_cphLeftColumn_ctl00_repAddressBook_ctl'
				+ ( ( itemListId < 10 ) ? '0' : '' )
				+ itemListId
				+ '_lnkCharacter';

		windowRunTime.location = window.location.origin + jQuery( '#' + myId ).attr( 'href' );
		itemListId++;
	};

	var i = 0;
	//Loops trough contacts each 3 seconds
	for( var key in toCall ) {
		( function( ) {
			setTimeout(
					function( ) {
						doit( key );
					}, 3000 * i );
		} )( );
		i += 1;
	}
}

//Updates the localStorage with the new values
function inpageStoreCharacterOption( defaultOptionValue,  mainStorageId, currentCharId, selectId ) {
	
	//Stores the value on the localStorage
	storedValues = JSON.parse( window.localStorage.getItem( mainStorageId ) );
	//Gets the value of the select with the cbbId or return the default option value
	storedValues[currentCharId] = ( typeof document.getElementById( selectId ) !== 'undefined' )? document.getElementById( selectId ).value: defaultOptionValue;
	window.localStorage.setItem( mainStorageId, JSON.stringify( storedValues ) );
	/*@TODO: Add option to sync these values*/
}