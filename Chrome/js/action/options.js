var chromeStorage = chrome.storage.local;
//Definition of the object which will be used to store the options
//Attention, must be equal as background page bkgOptionsClass
function optionsDefaultValues() {
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
	}
}

//Loads values and pass to the coontrols
function optionsRestore( ) {

	//Load Chrome synched values loads them into the options interface
	chromeStorage.get( optionsDefaultValues(), function( userOptions ) {
		//Check ifobject exists in the sync storage
		document.getElementById( 'option_DeliveryCheck_enabled' ).checked = userOptions.option_DeliveryCheck_enabled;
		document.getElementById( 'option_FilterItems_enabled' ).checked = userOptions.option_FilterItems_enabled;
		document.getElementById( 'option_FoldRecipes_enabled' ).checked = userOptions.option_FoldRecipes_enabled;
		document.getElementById( 'option_GlobalFame_enabled' ).checked = userOptions.option_GlobalFame_enabled;
		document.getElementById( 'option_QualityToValue_showPercentages' ).checked = userOptions.option_QualityToValue_showPercentages;
		document.getElementById( 'option_QualityToValue_showValues' ).checked = userOptions.option_QualityToValue_showValues;
		document.getElementById( 'option_SpeedCalling_enabled' ).checked = userOptions.option_SpeedCalling_enabled;
		document.getElementById( 'option_SpeedCalling_useGossip' ).checked = userOptions.option_SpeedCalling_useGossip;
		document.getElementById( 'option_TicketPrice_enabled' ).checked = userOptions.option_TicketPrice_enabled;
		document.getElementById( 'option_TicketPrice_useHighColors' ).checked = userOptions.option_TicketPrice_useHighColors;
		document.getElementById( 'option_TicketPrice_useHigherPrices' ).checked = userOptions.option_TicketPrice_useHigherPrices;
		
		console.log( "SpeedCalling Options Data loaded to chromeStorage!" );
	} );
}

function optionsSave( ) {

	//Loads default values
	var userOptions = optionsDefaultValues();
	userOptions.option_DeliveryCheck_enabled = document.getElementById( 'option_DeliveryCheck_enabled' ).checked;
	userOptions.option_FilterItems_enabled = document.getElementById( 'option_FilterItems_enabled' ).checked;
	userOptions.option_FoldRecipes_enabled = document.getElementById( 'option_FoldRecipes_enabled' ).checked;
	userOptions.option_GlobalFame_enabled = document.getElementById( 'option_GlobalFame_enabled' ).checked;
	userOptions.option_QualityToValue_showPercentages = document.getElementById( 'option_QualityToValue_showPercentages' ).checked;
	userOptions.option_QualityToValue_showValues = document.getElementById( 'option_QualityToValue_showValues' ).checked;
	userOptions.option_SpeedCalling_enabled = document.getElementById( 'option_SpeedCalling_enabled' ).checked;
	userOptions.option_SpeedCalling_useGossip = document.getElementById( 'option_SpeedCalling_useGossip' ).checked;
	userOptions.option_TicketPrice_enabled = document.getElementById( 'option_TicketPrice_enabled' ).checked;
	userOptions.option_TicketPrice_useHighColors = document.getElementById( 'option_TicketPrice_useHighColors' ).checked;
	userOptions.option_TicketPrice_useHigherPrices = document.getElementById( 'option_TicketPrice_useHigherPrices' ).checked;
	chromeStorage.set( userOptions, function( ) {
		console.log( "SpeedCalling Options Data synched to chromeStorage!" );
	} );
}

document.addEventListener( 'DOMContentLoaded', optionsRestore );
if( ( document.getElementById( 'save' ) !== null ) && ( document.getElementById( 'save' ) !== undefined ) ) {
	document.getElementById( 'save' ).addEventListener( 'click', optionsSave );
}

document.addEventListener( 'DOMContentLoaded', function( ) {
	var myCheckboxes = document.getElementsByTagName( "input" );
	for( var i = 0; i < myCheckboxes.length - 1; i++ ) {
		if( myCheckboxes[i].getAttribute( 'type' ) !== 'checkbox' )
			continue;
		myCheckboxes[i].addEventListener( 'click', function( ) {
			optionsSave( );
		} );
	}

} );