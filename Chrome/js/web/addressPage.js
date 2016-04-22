/*
 *Execute on your contact page based on the automatic calling
 */
if( globalCanRender( [ /.*#toCall[0-9]+/ ], [ 'SpeedCalling_enabled' ] ) ) {
	execAddressPage();
}

function execAddressPage() {

	//Runtime values for character options
	var myCharacterOptions_RunTime = { };

	//Calls current char if activated
	var tmpAction = 9999;
	$( "select[id='ctl00_cphTopColumn_ctl00_ddlInteractionTypes']" ).each( function() {
		myCharacterOptions_RunTime = JSON.parse( window.localStorage.getItem( globalGetCookie( 'scMainStorageId' ) ) );
		tmpAction = myCharacterOptions_RunTime[$( '.idHolder' ).eq( 1 ).html()];
	} );

	//Don't call if set to not to call
	if( tmpAction !== 9999 ) {
		//Changes the select to the right value
		$( "select option:selected" ).attr( "selected", false );
		$( "select option[value='" + tmpAction + "']" ).attr( "selected", true );
		$( "#ctl00_cphTopColumn_ctl00_btnInteract" ).click();
	}

}