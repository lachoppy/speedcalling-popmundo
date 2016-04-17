/*
 *Execute on your contact page based on the automatic calling
 *
 */

if( canExec( /.*#toCall[0-9]+/g ) ) {
	execAddressPage();
}

function execAddressPage() {
	chrome.storage.sync.get( 'userOptions', function( userOptions ) {
		var canUse = true;

		//Check ifobject exists in the sync storage
		if( Object.keys( userOptions ).length !== 0 ) {
			userOptions = userOptions[ 'userOptions' ];
			canUse = userOptions ['SpeedCalling'];
		}

		if( !canUse )
			return;

		//Runtime values for character options
		var scCharacterOptionsRunTime = { };

		//Gets current char Id
		tmpIdCurrentChar = $( '.idHolder' ).eq( 1 ).html();

		//Calls current char if activated
		var tmpAction = 9999;
		$( "select[id='ctl00_cphTopColumn_ctl00_ddlInteractionTypes']" )
				.each( function() {
					scCharacterOptionsRunTime = JSON.parse( window.localStorage.getItem( getCookie( 'scMainStorageId' ) ) );
					tmpAction = scCharacterOptionsRunTime[tmpIdCurrentChar];
				} );

		//Don't call if set to not to call
		if( tmpAction !== 9999 ) {
			//Changes the select to the right value
			$( "select option:selected" ).attr( "selected", false );
			$( "select option[value='" + tmpAction + "']" ).attr( "selected", true );
			$( "#ctl00_cphTopColumn_ctl00_btnInteract" ).click();
		}


	} );
}