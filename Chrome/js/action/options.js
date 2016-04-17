var storage = chrome.storage.sync;

//Definition of the object which will be used to store the options
//Attention, must be equal as background page bkgOptionsClass
function classOptions() {
	this.Delivery = true;
	this.SpeedCalling = true;
	this.Gossip = false;
	this.FoldRecipes = true;
	this.GlobalFame = true;
	this.TicketPrice = true;
	this.HigherPrices = false;
	this.ShowValues = true;
	this.ShowPercentages = true;
	this.FilterItems = true;
}

function optionsRestore() {
	storage.get( 'userOptions', function( userOptions ) {

		//Check ifobject exists in the sync storage
		if( Object.keys( userOptions ).length === 0 ) {
			
			userOptions = new classOptions();
		} else {
			userOptions = userOptions[ 'userOptions' ];
		}
		document.getElementById( 'ckbDeliveryCharges' ).checked = userOptions.Delivery;
		document.getElementById( 'ckbSpeedCalling' ).checked = userOptions.SpeedCalling
		document.getElementById( 'ckbGossip' ).checked = userOptions.Gossip
		document.getElementById( 'ckbFoldRecipes' ).checked = userOptions.FoldRecipes;
		document.getElementById( 'ckbGlobalFame' ).checked = userOptions.GlobalFame;
		document.getElementById( 'ckbTicketPrice' ).checked = userOptions.TicketPrice;
		document.getElementById( 'ckbHigherPrices' ).checked = userOptions.HigherPrices;
		document.getElementById( 'ckbQualityValueNumbers' ).checked = userOptions.ShowValues;
		document.getElementById( 'ckbQualityValuePercentages' ).checked = userOptions.ShowPercentages;
		document.getElementById( 'ckbFilterItems' ).checked = userOptions.FilterItems;
	} );
}

function optionsSave() {

	var userOptions = new classOptions();

	userOptions.Delivery = document.getElementById( 'ckbDeliveryCharges' ).checked;
	userOptions.SpeedCalling = document.getElementById( 'ckbSpeedCalling' ).checked;
	userOptions.Gossip = document.getElementById( 'ckbGossip' ).checked;
	userOptions.FoldRecipes = document.getElementById( 'ckbFoldRecipes' ).checked;
	userOptions.GlobalFame = document.getElementById( 'ckbGlobalFame' ).checked;
	userOptions.TicketPrice = document.getElementById( 'ckbTicketPrice' ).checked;
	userOptions.HigherPrices = document.getElementById( 'ckbHigherPrices' ).checked;
	userOptions.ShowValues = document.getElementById( 'ckbQualityValueNumbers' ).checked;
	userOptions.ShowPercentages = document.getElementById( 'ckbQualityValuePercentages' ).checked;
	userOptions.FilterItems = document.getElementById( 'ckbFilterItems' ).checked;

	storage.set( { 'userOptions': userOptions }, function( ) {

		var bkpBackground = chrome.extension.getBackgroundPage();
		bkpBackground.bkgOptionsRestore();

		setTimeout( function() {
			window.close();
		}, 750 );
	} );

}

document.addEventListener( 'DOMContentLoaded', optionsRestore );

if( ( document.getElementById( 'save' ) !== null ) && ( document.getElementById( 'save' ) !== undefined ) ) {
	document.getElementById( 'save' ).addEventListener( 'click', optionsSave );
}
