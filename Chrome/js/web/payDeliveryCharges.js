/**
 * "Pay delivery charges, if any"
 * Defaults give items pay for delivery checkbox to checked
 */

if( canExec( /\/World\/Popmundo.aspx\/Character\/OfferItem\/[0-9]*/g ) ) {
	execPayDeliveryCharges( );
}

function execPayDeliveryCharges( ) {
	chrome.storage.sync.get( 'userOptions', function( userOptions ) {

		var canUse = true;

		//Check ifobject exists in the sync storage
		if( Object.keys( userOptions ).length !== 0 ) {
			userOptions = userOptions[ 'userOptions' ];
			canUse = userOptions ['Delivery'];
		}

		if( !canUse )
			return;

		$( '[id$=chkDelivery]' ).prop( 'checked', true );

	} );
}