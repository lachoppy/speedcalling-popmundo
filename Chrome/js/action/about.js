$( '#aboutOptions' ).attr( 'href', chrome.runtime.getURL( 'options.html' ) );

var manifestData = chrome.app.getDetails();
$( "#lblVersion" ).text( manifestData.version );