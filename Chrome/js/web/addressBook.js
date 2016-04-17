// Handles the code necessary for the addressbook page

if( canExec( /\/World\/Popmundo.aspx\/Character\/AddressBook/g ) ) {


	var objScript = '<script type="text/javascript" src="' + chrome.extension.getURL( 'js/global/speedcalling.js' ) + '"></script>';

	$( 'body' ).append( objScript );


	execAddressBook();
}

function execAddressBook() {
	chrome.storage.sync.get( 'userOptions', function( userOptions ) {
		var canUse = true;

		//Default call action value
		var scCharacterDefaultCallOption = 24;

		//Check ifobject exists in the sync storage
		if( Object.keys( userOptions ).length !== 0 ) {
			userOptions = userOptions[ 'userOptions' ];
			canUse = userOptions ['SpeedCalling'];
			if( userOptions ['Gossip'] ) {
				scCharacterDefaultCallOption = 121;
			}
		}

		if( !canUse )
			return;

		// Character ID keys
		var scCharacterIDs = [ ];

		//Runtime values for character options
		var scCharacterOptionsRunTime = { };

		//Saved values for character options
		var scCharacterOptionsStorage = { };

		// All possible values for calling
		var scPossibleOptions = Array( 9999, 121, 24, 61, 58, 26, 25, 73, 74 );

		// Url to make the calls
		var scUrlToCall = '/World/Popmundo.aspx/Interact/Phone/';

		// Url to mark the page as usable by this script
		var scUrlToCallToken = '#toCall';

		abInjectSpeedCalling();

		abCreatesCallButton();

		//Loads all current contacts (existant in the links)
		$( "a[id^='ctl00_cphLeftColumn_ctl00_repAddressBook_ctl'][id$=_lnkCharacter]" ).each( function( ) {
			scCharacterIDs.push( scGetIdFromUrl( $( this ).attr( 'href' ) ) );
		} );

		//Loads all contact entries values into memory and updates localStorage
		var locMainStorageID = getCookie( 'scMainStorageId' );

		//Loads default call action value for each contact (existant in the links)
		for( i = 0; i < scCharacterIDs.length; i++ ) {
			scCharacterOptionsRunTime[ scCharacterIDs[ i ] ] = scCharacterDefaultCallOption;
		}

		//Updates the localStorage if not present
		if( window.localStorage.getItem( locMainStorageID ) === null ) {
			window.localStorage.setItem( locMainStorageID, JSON.stringify( scCharacterOptionsRunTime ) );
			scCharacterOptionsStorage = scCharacterOptionsRunTime;
		} else {
			scCharacterOptionsStorage = JSON.parse( window.localStorage.getItem( locMainStorageID ) );
		}


		//Loads stored values into runtime values
		for( i = 0; i < scCharacterIDs.length; i++ ) {
			if( typeof ( scCharacterOptionsStorage[ scCharacterIDs[ i ] ] ) !== 'undefined' ) {
				scCharacterOptionsRunTime[ scCharacterIDs[ i ] ] = scCharacterOptionsStorage[ scCharacterIDs[ i ] ];
			}
		}

		//Saves the localStorage
		window.localStorage.setItem( locMainStorageID, JSON.stringify( scCharacterOptionsRunTime ) );

		scCreateCharacterOptionComboboxes( scUrlToCall, scUrlToCallToken, scPossibleOptions, scCharacterOptionsRunTime );
	} );
}

function abInjectSpeedCalling() {
	var jScript = document.createElement( 'script' );
	// TODO: add "script.js" to web_accessible_resources in manifest.json
	jScript.src = chrome.extension.getURL( 'js/global/speedcalling.js' );
	( document.head || document.documentElement ).appendChild( jScript );
}

//Adds Call button line to the Address button
function abCreatesCallButton() {

	var locMainStorageID = getCookie( 'scMainStorageId' );

	var objLine = '<tr class="even"><td colspan="8">'

			+ '<div class="spcBox spcBox-button--big" title="'
			+ getLabel( 'l10nSPCallButton' )
			+ '" onclick="'
			+ "spCallEveryone('" + locMainStorageID + "')"
			+ '" style="background-image: url(\''
			+ chrome.extension.getURL( '/img/16.png' )
			+ '\');"><p>'
			+ getLabel( 'l10nSPCallButton' )
			+ '</p></div>'
			+ '<a class="CallEveryone" href="/World/Popmundo.aspx/Conversations/Conversation/3248185">'
			+ getLabel( 'l10nSPReportBugs' )
			+ '</a>'
			+ '</td></tr>';
	$( objLine ).insertAfter( 'thead' );
}

// Returns the character ID based on the link URI
function scGetIdFromUrl( urlValue ) {
	var urlItems = urlValue.split( '/' );
	return urlItems[urlItems.length - 1];
}

// Creates the comboboxes based on contact ID to call, passed on toCallCharID
function scGetCharacterOptionCombobox( toCallCharID, charOptions, charOptionsRunTime ) {

	var locMainStorageID = getCookie( 'scMainStorageId' );

	var objSelect = document.createElement( "select" );
	objSelect.id = locMainStorageID + '_ContId_' + toCallCharID;
	objSelect.name = objSelect.id;
	objSelect.className = "CallEveryone";
	objSelect.setAttribute( "onchange", "scStoreCharacterOption( '" + locMainStorageID + "', '" + toCallCharID + "', '" + objSelect.id + "' )" );

	// Goes trough all possible values and creates the options
	for( var i = 0; i < charOptions.length; i++ ) {
		var objOption = document.createElement( "option" );
		objOption.value = charOptions[i];
		objOption.text = getLabel( 'l10nSP' + charOptions[i] );

		if( charOptionsRunTime[toCallCharID] == charOptions[i] ) {
			objOption.setAttribute( "selected", "selected" );
		}

		objSelect.appendChild( objOption );
	}

	return objSelect;
}

//Creates the selects to be used with the contacts
function scCreateCharacterOptionComboboxes( urlToCall, urlToken, charOptions, charOptionsRunTime ) {
	$( "a[id^='ctl00_cphLeftColumn_ctl00_repAddressBook_ctl'][id$=_lnkCharacter]" ).each( function() {

		var objId = $( this ).attr( 'id' );
		currentCharID = scGetIdFromUrl( $( this ).attr( 'href' ) );
		$( this ).attr( 'href', urlToCall + currentCharID + urlToken + getCookie( 'scMainCharID' ) );
		$( this ).attr( 'target', '_BLANK' );
		var objSelect = scGetCharacterOptionCombobox( currentCharID, charOptions, charOptionsRunTime );

		$( this ).closest( 'td' ).append( objSelect );

	} );
}