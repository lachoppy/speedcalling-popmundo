/**
 * Defaults give items pay for delivery checkbox to checked
 */
if( globalCanRender( [ "\/World\/Popmundo.aspx\/Character\/OfferItem\/[0-9]*" ], [ 'DeliveryCheck_enabled' ] ) ) {
	$( '[id$=chkDelivery]' ).prop( 'checked', true );
}