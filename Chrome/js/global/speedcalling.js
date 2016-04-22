/*
 * Checks if regex match the current URI and if options allow the execution
 * @param {type} regex - the regex to be verified
 * @param {type} options - array with options
 * @returns {Boolean} true if can render, false if not
 */
function globalCanRender( regex, options ) {

	//Return false if parameters are not correctly passed
	if( regex === null || regex === undefined || typeof regex === 'string' ) {
		return false;
	}

	//Return true if one of the regexes match the URL
	for( var i = 0; i < regex.length; i++ ) {
		if( window.location.href.match( regex[i] ) ) {
			return true;
		}
	}

	//If no options, return true
	if( options === null || options === undefined ) {
		return true;
	}

	//If one of the options is negative, return false
	for( var i = 0; i < options.length; i++ ) {
		if( !globalLocalStorageGet( options[i] ) ) {
			return false;
		}
	}

	//Finally
	return false;

}

/*
 * Loads localStorage and checks if a key exists
 * @param {type} key - the key you are looking for
 * @returns {Boolean|String} the key value or false, if there's no key
 */
function globalLocalStorageGet( key ) {
	var myOptions = JSON.parse( localStorage.getItem( 'speedCalling' ) );
	if( myOptions === null || myOptions === undefined ) {
		myOptions = new classOptions();
	}

	if( !( key in myOptions ) ) {
		return false;
	} else {
		return myOptions[ key ];
	}
}

/**
 * Returns a classPillValues object
 *
 * @param {integer} value - the number value which will be used in the pill
 * @return {classPillValues}
 */
function globalGetPillValue( value ) {

	var values = new classPillValues();

	var className = ( globalLocalStorageGet( 'TicketPrice_useHighColors' ) ) ? 'pill high--level-' : 'pill pastel--level-';

	if( isNaN( value ) ) {
		values.text = value;
	} else {
		//Handles the single values
		switch( true ) {
			case parseInt( value ) <= 0:
				values.number = '00';
				values.classNumber = className + values.number;
				values.currency = values.number + '$';
				values.classCurrency = className + 'money';
				break;
			case parseInt( value ) < 10:
				values.number = '0' + value;
				values.classNumber = className + values.number;
				values.currency = values.number + '$';
				values.classCurrency = className + 'money';
				break;
			default:
				values.number = ( value >= 26 ) ? 26 : value;
				values.classNumber = className + parseInt( values.number );
				values.currency = values.number + '$';
				values.classCurrency = className + 'money';
				break;
		}
		//Handles percentage
		switch( true ) {
			case parseInt( value ) === 0:
				values.classPercentage = className + '00';
				values.percentage = values.classPercentage + '%';
				break;
			case parseInt( value ) >= 100:
				values.classPercentage = className + '26';
				values.percentage = value + '%';
				break;
			case parseInt( value ) < 40:
				values.classPercentage = className + ( '0' + parseInt( ( ( value - ( value % 4 ) ) / 4 ) ) );
				values.percentage = value + '%';
				break;
			default:
				values.classPercentage = className + ( parseInt( ( value - ( value % 4 ) ) / 4 ) );
				values.percentage = value + '%';
				break;
		}
	}
	return values;
}

/**
 * returns a "pill", a box HTML object with a color and a value
 *
 * @param {integer} value - the number value which will be used in the pill
 * @param {integer} useType - the type of the pill. 1 for percentage. 2 for currency. 3 for string. Anything else to number
 * @return {object} an html object
 */
function globalGetPill( value, useType ) {
	var myValue = globalGetPillValue( value );

	var mySpan = document.createElement( "span" );
	switch( useType ) {
		case 1:
			mySpan.className = myValue.classPercentage;
			mySpan.textContent = myValue.percentage;
			break;
		case 2:
			mySpan.className = myValue.classCurrency;
			mySpan.textContent = myValue.currency;
			break;
		case 3:
			mySpan.className = myValue.classText;
			mySpan.textContent = myValue.text;
			break;
		default:
			mySpan.className = myValue.classNumber;
			mySpan.textContent = myValue.number;
			break;
	}
	return mySpan;
}

//Sets a cookie and its value
function globalSetCookie( cname, cvalue ) {
	var temp = cname + "=" + cvalue + "; "
			+ "max-age=604800; "
			+ "path=/; "
			+ "domain=popmundo.com";
	document.cookie = temp;
}

//Gets a cookie value
function globalGetCookie( cname ) {
	var name = cname + "=";
	var ca = document.cookie.split( ';' );
	for( var i = 0; i < ca.length; i++ ) {
		var c = ca[i];
		while( c.charAt( 0 ) === ' ' )
			c = c.substring( 1 );
		if( c.indexOf( name ) === 0 )
			return c.substring( name.length, c.length );
	}
	return "";
}

//Definition of the object which will be used to store the options
//Attention, must be equal as background page bkgOptionsClass
function globalOptionsDefaultValues() {
	return {
		option_DeliveryCheck_enabled: true,
		option_FilterItems_enabled: true,
		option_FoldRecipes_enabled: true,
		option_GlobalFame_enabled: true,
		option_QualityToValue_showPercentages: true,
		option_QualityToValue_showValues: true,
		option_SpeedCalling_enabled: true,
		option_SpeedCalling_useGossip: false,
		option_TicketPrice_enabled: true,
		option_TicketPrice_useHighColors: false,
		option_TicketPrice_useHigherPrices: false,
		option_Language: 'en',
		option_numberOfCities: 49
	};
}

//Loads values and pass to the coontrols
function globalOptionsLoadToLocalStorage( ) {

	//Load Chrome synched values loads them into the options interface
	chrome.storage.local.get( globalOptionsDefaultValues(), function( userOptions ) {

		var myItems = new classOptions();

		myItems.DeliveryCheck_enabled = userOptions.option_DeliveryCheck_enabled;
		myItems.FilterItems_enabled = userOptions.option_FilterItems_enabled;
		myItems.FoldRecipes_enabled = userOptions.option_FoldRecipes_enabled;
		myItems.GlobalFame_enabled = userOptions.option_GlobalFame_enabled;
		myItems.QualityToValue_showPercentages = userOptions.option_QualityToValue_showPercentages;
		myItems.QualityToValue_showValues = userOptions.option_QualityToValue_showValues;
		myItems.SpeedCalling_enabled = userOptions.option_SpeedCalling_enabled;
		myItems.SpeedCalling_useGossip = userOptions.option_SpeedCalling_useGossip;
		myItems.TicketPrice_enabled = userOptions.option_TicketPrice_enabled;
		myItems.TicketPrice_useHighColors = userOptions.option_TicketPrice_useHighColors;
		myItems.TicketPrice_useHigherPrices = userOptions.option_TicketPrice_useHigherPrices;

		localStorage.setItem( "speedCalling", JSON.stringify( myItems ) );

		console.log( "SpeedCalling Options Data loaded into localStorage!" );
	} );
}
