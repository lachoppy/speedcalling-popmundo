var bkgStorage = chrome.storage.sync;

var bkgOptionsClass;

//Used to restore objects by the start os the extension
function bkgOptionsRestore() {
	bkgStorage.get( 'userOptions', function( userOptions ) {

		//Check ifobject exists in the sync storage
		if( Object.keys( userOptions ).length !== 0 ) {
			bkgOptionsClass = userOptions[ 'userOptions' ];
			console.log( bkgOptionsClass ); 
		}
	} );
}

function liko(){
	return 'pill'+bkgOptionsClass;
}