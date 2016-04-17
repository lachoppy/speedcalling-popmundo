// Adds the filter items in locale functionaly

if( canExec( /\/World\/Popmundo.aspx\/Locale\/ItemsEquipment\/.*/g ) ) {

	execAddFilterLocaleItems();
}

function execAddFilterLocaleItems() {
	chrome.storage.sync.get( 'userOptions', function( userOptions ) {
		var canUse = true;

		//Check ifobject exists in the sync storage
		if( Object.keys( userOptions ).length !== 0 ) {
			userOptions = userOptions[ 'userOptions' ];
			canUse = userOptions ['FilterItems'];
		}

		if( !canUse )
			return;

		var jsButton = "window.location.assign( '" + getFilterLocaleBaseURL() + "' + document.getElementById( 'textFilterID' ).value ); window.location.reload();";

		var addElement = '<tr class="group"><td id="ctl00_cphLeftColumn_ctl00_repItemGroups_ctl01_tdCheckboxFiller"></td><td colspan="2">' + getLabel( 'l10nFIFilterItems' ) + '</td></tr>'
				+ '<tr class="even hoverable"><td id="ctl00_cphLeftColumn_ctl00_repItemGroups_ctl01_tdCheckboxFiller"></td>'
				+ '<td>'
				+ '<input type="number" id="textFilterID" name="textFilterID" placeholder="' + getLabel( 'l10nFIPlaceHolder' ) + '" value="' + getFilterCharacterID() + ' > '
				+ '&nbsp;&nbsp;<button type="button" onclick="'
				+ jsButton
				+ '">' + getLabel( 'l10nFIFilter' ) + '</button>'
				+ '</td></tr>';

		$( "#checkedlist thead" ).append( addElement );

	} );
}

// In Get your items, finds the characer ID
function getFilterCharacterID() {
	var url = location.href;
	var idx = url.indexOf( "#" ) + 1;
	return idx !== -1 ? url.substring( idx ) : "";
}

// In Get your items, finds the base URL
function getFilterLocaleBaseURL() {
	var url = location.href;
	var idxIni = url.lastIndexOf( "/World" );
	var idxLength = url.lastIndexOf( "#" );

	return idxLength < 0 ?
			url.substring( idxIni ) + "#" :
			url.substring( idxIni, idxLength ) + "#";
}