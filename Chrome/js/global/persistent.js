//Sets a cookie with the main ID of the character
if( ( $( '.idHolder' ).first().html() !== null ) && ( $( '.idHolder' ).first().html() !== undefined ) ) {
	setCookie( "scMainCharID", $( '.idHolder' ).first().html() );
	setCookie( "scMainStorageId", "_GEX_MAIN_ID_" + $( '.idHolder' ).first().html() );
}

var scRunCalling = null;
var scRunAuthor = null;
var scOptionValues = null;

chrome.storage.sync.get( 'userOptions', function( userOptions ) {

	//Check ifobject exists in the sync storage
	if( Object.keys( userOptions ).length !== 0 ) {
		scOptionValues = userOptions[ 'userOptions' ];
	}
} );
