// Handles the code necessary for the addressbook page
if( globalCanRender( [ /\/World\/Popmundo.aspx\/Character\/AddressBook/ ], [ 'SpeedCalling_enabled' ] ) ) {

	//link javascript in the page
	var myScript = document.createElement( 'script' );
	myScript.type = 'text/javascript';
	myScript.src = chrome.extension.getURL( 'js/accessible/injection.js' );
	$( 'head' ).append( myScript );

	execAddressBook();
}

function execAddressBook() {

	var myCallOptions = new classPossibleCallOptions();
	var words = new classWordList( globalLocalStorageGet( 'Language' ) );

	// Array with all Character ID keys
	var myCharacterIDs = [ ];

	//Runtime values for character options
	var myCharacterOptions_RunTime = { };

	//Saved values for character options
	var myCharacterOptions_Storage = { };

	//Sets a cookie with the main ID of the character
	if( ( $( '.idHolder' ).first().html() !== null ) && ( $( '.idHolder' ).first().html() !== undefined ) ) {
		globalSetCookie( "scMainCharID", $( '.idHolder' ).first().html() );
		globalSetCookie( "scMainStorageId", "_GEX_MAIN_ID_" + $( '.idHolder' ).first().html() );
	}

	var myTR = document.createElement( "tr" );
	myTR.className = 'even';

	var myTD = document.createElement( "td" );
	myTD.colspan = 8;

	var myButton = document.createElement( "input" );
	myButton.type = 'button';
	myButton.value = words.get( 'SP_CallButton' );
	myButton.onclick = "inpageCallEveryone('" + getCookie( 'scMainStorageId' ) + "');";
	myTD.appendChild( myButton );

	var myLink = document.createElement( "a" );
	myLink.className = 'callEveryone';
	myLink.href = '/World/Popmundo.aspx/Conversations/Conversation/3248185';
	myLink.textContent = words.get( 'SP_ReportBugs' );
	myTD.appendChild( myLink );

	myTR.appendChild( myTD );
	$( myTR ).insertAfter( 'thead' );

	//Loads all current contacts (existant in the links)
	$( "a[id^='ctl00_cphLeftColumn_ctl00_repAddressBook_ctl'][id$=_lnkCharacter]" ).each( function( ) {
		var splitUrl = $( this ).attr( 'href' ).split( '/' );
		myCharacterIDs.push( splitUrl[ splitUrl.length - 1 ] );
	} );

	//TO REMOVE var locMainStorageID = getCookie( 'scMainStorageId' );

	//Loads default call action value for each contact (existant in the links)
	for( i = 0; i < myCharacterIDs.length; i++ ) {
		myCharacterOptions_RunTime[ myCharacterIDs[ i ] ] = myCallOptions.default();
	}

	//Updates the localStorage if not present
	if( window.localStorage.getItem( getCookie( 'scMainStorageId' ) ) === null ) {
		window.localStorage.setItem( getCookie( 'scMainStorageId' ), JSON.stringify( myCharacterOptions_RunTime ) );
		myCharacterOptions_Storage = myCharacterOptions_RunTime;
	} else {
		myCharacterOptions_Storage = JSON.parse( window.localStorage.getItem( getCookie( 'scMainStorageId' ) ) );
	}

	//Loads stored values into runtime values
	for( i = 0; i < myCharacterIDs.length; i++ ) {
		if( typeof ( myCharacterOptions_Storage[ myCharacterIDs[ i ] ] ) !== 'undefined' ) {
			myCharacterOptions_RunTime[ myCharacterIDs[ i ] ] = myCharacterOptions_Storage[ myCharacterIDs[ i ] ];
		}
	}

	//Saves the localStorage
	window.localStorage.setItem( getCookie( 'scMainStorageId' ), JSON.stringify( myCharacterOptions_RunTime ) );

	//Loops trhough all the contacts and change their links
	$( "a[id^='ctl00_cphLeftColumn_ctl00_repAddressBook_ctl'][id$=_lnkCharacter]" ).each( function() {

		var objId = $( this ).attr( 'id' );
		var splitUrl = $( this ).attr( 'href' ).split( '/' );
		var currentCharID = splitUrl[ splitUrl.length - 1 ];

		$( this ).attr( 'href', myCallOptions.callURI + currentCharID + myCallOptions.callToken + getCookie( 'scMainCharID' ) );
		$( this ).attr( 'target', '_BLANK' );

		//Creates the select objects
		var mySelect = document.createElement( "select" );
		mySelect.id = getCookie( 'scMainStorageId' ) + '_ContId_' + currentCharID;
		mySelect.name = mySelect.id;
		mySelect.className = "callEveryone";
		mySelect.onchange = "inpageStoreCharacterOption('" + myCallOptions.default() + "', '" + getCookie( 'scMainStorageId' ) + "', '" + currentCharID + "', '" + mySelect.id + "')";

		// Goes trough all possible values and creates the options
		for( var i = 0; i < myCallOptions.options - 1; i++ ) {
			//Create the option object
			var myOption = document.createElement( "option" );
			myOption.value = myCallOptions.charOptions[i];
			myOption.textContent = words.get( 'SP_' + myCallOptions.getOptions()[i] );

			//Selects if it's the chosen option by the charId
			if( myCharacterOptions_RunTime[currentCharID] === myCallOptions.options[i] ) {
				myOption.selected = true;
			}

			mySelect.appendChild( myOption );
		}

		$( this ).closest( 'td' ).append( mySelect );

	} );
}
