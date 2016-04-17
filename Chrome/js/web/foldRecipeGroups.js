/*
 *Adds folding capabilities to your recipes page
 *
 */

if( canExec( /\/World\/Popmundo.aspx\/Character\/Recipes\/[0-9]*/g ) ) {
	execFoldRecipeGroups();
}

function execFoldRecipeGroups() {
	chrome.storage.sync.get( 'userOptions', function( userOptions ) {
		var canUse = true;

		//Check ifobject exists in the sync storage
		if( Object.keys( userOptions ).length !== 0 ) {
			userOptions = userOptions[ 'userOptions' ];
			canUse = userOptions ['FoldRecipes'];
		}

		if( !canUse )
			return;

		$( 'table.data.sortable' ).each( function() {
			var tblId = $( this ).attr( 'id' );
			$( this ).find( 'th.header' ).not( '.width60' ).each( function() {
				var btnCode = frgGetClickImage( '/img/uncheck.png', 'l10nFRunCheck', "jQuery( '#" + tblId + " tbody' ).hide();" );
				btnCode += frgGetClickImage( '/img/check.png', 'l10nFRCheck', "jQuery( '#" + tblId + " tbody' ).show();" );
				$( this ).append( btnCode );
			} );
		} );
	} );
}

function frgGetClickImage( image, label, onclick ) {
	return	'<div class="spcBox spcBox-button--small" title="'
			+ getLabel( label )
			+ '" onclick="'
			+ onclick
			+ '" style="background-image: url(\''
			+ chrome.extension.getURL( image )
			+ '\');">&nbsp;</div>';
}