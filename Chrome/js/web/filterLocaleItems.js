// Adds the filter items in locale functionaly
if( globalCanRender( [ "\/World\/Popmundo.aspx\/Locale\/ItemsEquipment\/[0-9]*#[0-9]*$" ], [ 'FilterItems_enabled' ] ) ) {
	execFilterLocaleItems();
}

function execFilterLocaleItems() {

	//If the URI has the trigger anchor, hides all items with charId
	$( "#checkedlist tbody tr.hoverable" ).each( function() {

		//Gets the CharacterId
		var url = location.href;

		$( this ).find( 'a[id$="_lnkItemOwner"]:not([href$="'
				+ ( ( ( url.indexOf( "#" ) + 1 ) !== -1 ) ? url.substring( url.indexOf( "#" ) + 1 ) : "" )
				+ '"])' ).each( function() {
			$( this ).hide();
		} );
	} );
}