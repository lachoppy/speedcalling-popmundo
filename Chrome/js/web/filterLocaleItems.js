// Adds the filter items in locale functionaly

if( canExec( /\/World\/Popmundo.aspx\/Locale\/ItemsEquipment\/[0-9]*#[0-9]*$/g ) ) {

	execFilterLocaleItems();
}

function execFilterLocaleItems() {
	chrome.storage.sync.get( 'userOptions', function( userOptions ) {
		var canUse = true;

		//Check ifobject exists in the sync storage
		if( Object.keys( userOptions ).length !== 0 ) {
			userOptions = userOptions[ 'userOptions' ];
			canUse = userOptions ['FilterItems'];
		}

		$( "#checkedlist tbody tr.hoverable" ).each( function() {
			var toHide = true;
			$( this ).find( 'a[id$="_lnkItemOwner"][href$="' + getFilterCharacterID() + '"]' ).each( function() {
				toHide = false;
			} )
			if( toHide ) {
				$( this ).hide();
			}

		} );

		if( !canUse )
			return;
	} );
}

// In Get your items, finds the characer ID
function getFilterCharacterID() {
	var url = location.href;
	var idx = url.indexOf( "#" ) + 1;
	return idx !== -1 ? url.substring( idx ) : "";
}