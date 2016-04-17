//Checks a regex expression with and URI and verifies if the current URL has it
function canExec( execRegex ) {
	var execCurrentUrl = window.location.href;
	if( execCurrentUrl.match( execRegex ) ) {
		return true;
	} else {
		return false;
	}
}

//Sets a cookie and its value
function setCookie( cname, cvalue ) {
	var temp = cname + "=" + cvalue + "; "
			+ "max-age=604800; "
			+ "path=/; "
			+ "domain=popmundo.com"
	document.cookie = temp;
}

//Gets a cookie value
function getCookie( cname ) {
	var name = cname + "=";
	var ca = document.cookie.split( ';' );
	for( var i = 0; i < ca.length; i++ ) {
		var c = ca[i];
		while( c.charAt( 0 ) == ' ' )
			c = c.substring( 1 );
		if( c.indexOf( name ) == 0 )
			return c.substring( name.length, c.length );
	}
	return "";
}

//Gets translated messages from the translation file
function getLabel( label ) {
	return chrome.i18n.getMessage( label );
}

//Gets a span with the color based on the value
//ValueType: 1= Money, 2=Percentage, 3=Number, 4=none
function getValuePill( value, valueType ) {

	var myType = parseInt( valueType );

	var pill = '<div class="spcBox ';

	var myValue;
	if( valueType === 4 ) {
		myValue = value;
	} else {
		myValue = parseInt( value );
		myValue = ( myValue < 10 ) ? ( "0" + myValue ) : myValue;
	}

	if( myType === 1 ) {
		pill += 'spcBox-value--money">';
	}

	if( myType === 2 ) {
		switch( true ) {
			case( value <= 10 ):
				pill += 'spcBox-value--dark-red">';
				break;
			case( value <= 25 ):
				pill += 'spcBox-value--light-red">';
				break;
			case( value <= 40 ):
				pill += 'spcBox-value--dark-green">';
				break;
			case( value <= 60 ):
				pill += 'spcBox-value--light-green">';
				break;
			case( value <= 80 ):
				pill += 'spcBox-value--dark-yellow">';
				break;
			case( value <= 90 ):
				pill += 'spcBox-value--light-red">';
				break;
			case( value >=91 ):
				pill += 'spcBox-value--full">';
				break;				
			default:
				pill += 'spcBox-value--white">';
				break;
		}
	}

	if( myType === 3 ) {
		switch( true ) {
			case( value <= 2 ):
				pill += 'spcBox-value--dark-red">';
				break;
			case( value <= 5 ):
				pill += 'spcBox-value--light-red">';
				break;
			case( value <= 8 ):
				pill += 'spcBox-value--dark-green">';
				break;
			case( value <= 13 ):
				pill += 'spcBox-value--light-green">';
				break;
			case( value <= 17 ):
				pill += 'spcBox-value--dark-yellow">';
				break;
			case( value <= 22 ):
				pill += 'spcBox-value--light-yellow">';
				break;
			case( value >= 23 ):
				pill += 'spcBox-value--full">';
				break;
			default:
				pill += 'spcBox-value--white">';
				break;
		}
	}

	if( myType === 4 ) {
		pill += 'spcBox-value--white-medium">';
	}

	switch( myType ) {
		case( 1 ):
			pill += '<p>' + myValue + '€</p></div>';
			break;
		case( 2 ):
			pill += '<p>' + myValue + '%</p></div>';
			break;
		default:
			pill += '<p>' + myValue + '&nbsp;</p></div>';
	}

	return pill;
}

//Updates the localStorage with the new values
function scStoreCharacterOption( mainId, charId, cbbId ) {
//Gets the value for the given cbbId
	var tmpValue = 24;
	if( typeof document.getElementById( cbbId ) != 'undefined' ) {
		tmpValue = document.getElementById( cbbId ).value;
	}

	storedValues = JSON.parse( window.localStorage.getItem( mainId ) );
	storedValues[charId] = tmpValue;
	window.localStorage.setItem( mainId, JSON.stringify( storedValues ) );
}

// Calls everyone in the contact list
function scCallEveryone( mainId ) {
	itemListId = 1;
	scRunCalling = window.open( '', 'gexWindow', '' );
	var toCall = JSON.parse( window.localStorage.getItem( mainId ) );
	var doit = function( key ) {
		var tmpitemListId = itemListId;
		if( tmpitemListId <= 9 ) {
			tmpitemListId = 'ctl00_cphLeftColumn_ctl00_repAddressBook_ctl0' + tmpitemListId + '_lnkCharacter';
		} else {
			tmpitemListId = 'ctl00_cphLeftColumn_ctl00_repAddressBook_ctl' + tmpitemListId + '_lnkCharacter';
		}
		var callObject = document.getElementById( tmpitemListId );
		var callUrl = 'http://' + window.location.hostname + callObject.getAttribute( "href" );
		scRunCalling.location = callUrl;
		itemListId++;
	};
	var i = 0;
	for( var key in toCall ) {
		( function( ) {
			var k = key;
			setTimeout(
					function( ) {
						doit( key );
					}, 8000 * i );
		} )( );
		i += 1;
	}
}

// Calls everyone in the contact list
function spCallEveryone( mainId ) {
	itemListId = 1;
	scRunCalling = window.open( '', 'gexWindow', '' );
	var toCall = JSON.parse( window.localStorage.getItem( mainId ) );

	var doit = function( key ) {
		var tmpitemListId = itemListId;
		if( tmpitemListId <= 9 ) {
			tmpitemListId = 'ctl00_cphLeftColumn_ctl00_repAddressBook_ctl0' + tmpitemListId + '_lnkCharacter';
		} else {
			tmpitemListId = 'ctl00_cphLeftColumn_ctl00_repAddressBook_ctl' + tmpitemListId + '_lnkCharacter';
		}
		var callObject = document.getElementById( tmpitemListId );
		var callUrl = 'http://' + window.location.hostname + callObject.getAttribute( "href" );
		scRunCalling.location = callUrl;
		itemListId++;
	};

	var i = 0;
	for( var key in toCall ) {
		( function() {
			var k = key;
			setTimeout(
					function() {
						doit( key );
					}, 8000 * i );
		} )();
		i += 1;
	}
}
