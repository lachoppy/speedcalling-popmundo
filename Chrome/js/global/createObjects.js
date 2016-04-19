/**
 * returns a "pill", a box HTML object with a color and a value
 *
 * @param {integer} value - the number value which will be used in the pill
 * @param {integer} useType - the type of the pill. 1 for percentage. 2 for currency. 3 for string. Anything else to number
 * @param {booleam} useHigh - if the pill should use high colors scheme. Default = true
 * @return {object} an html object
 */
function getObjPill( value, useType, useHigh ) {
	var useHigh = ( useHigh === null || useHigh === undefined || useHigh === false ) ? '--pastel': '--high';
	var className = 'pill level-';
	var myValue = getPillValue( value );

	myP = document.createElement( "p" );

	switch( parseInt( useType ) ) {

		case 1:
			myP.appendChild( document.createTextNode( myValue.percentage ) );
			className += myValue.classPercentage + useHigh + ' pill--small';
			break;
		case 2:
			myP.appendChild( document.createTextNode( myValue.currency ) );
			className += myValue.classCurrency + useHigh + ' pill--small';
			break;
		case 3:
			myP.appendChild( document.createTextNode( value ) );
			className += 'none' + ' pill--medium';
			break;			
		default:
			myP.appendChild( document.createTextNode( myValue.classNumber ) );
			className += myValue.classNumber + useHigh + ' pill--smaller';
			break;
	}

	var myDIV = document.createElement( "div" );

	myDIV.className = className;
	myDIV.appendChild( myP );

	return myDIV;
}

// Definition of the object to store the pills
function pillValues() {
	this.number = '00';
	this.classNumber = '00';
	this.currency = '00';
	this.classCurrency = 'none';
	this.percentage = '00';
	this.classPercentage = '00';
}

/**
 * Returns a pillValues object
 *
 * @param {integer} value - the number value which will be used in the pill
 * @return {pillValues}
 */
function getPillValue( value ) {

	var values = new pillValues();

	//Handles the single values
	switch( true ) {
		case parseInt( value ) <= 0:
			values.number = '00';
			values.classNumber = values.number;
			values.currency = values.number + '$';
			break;
		case parseInt( value ) < 10:
			values.number = '0' + value;
			values.classNumber = values.number;
			values.currency = values.number + '$';
			break;
		default:
			values.number = ( value >= 26 ) ? 26 : value;
			values.classNumber = parseInt( values.number );
			values.currency = values.number + '$';
			break;
	}

	//Handles percentage
	switch( true ) {
		case parseInt( value ) === 0:
			values.classPercentage = '00';
			values.percentage = values.classPercentage + '%';
			break;
		case parseInt( value ) >= 100:
			values.classPercentage = '26';
			values.percentage = value + '%';
			break;
		case parseInt( value ) < 40:
			values.classPercentage = '0' + parseInt( ( ( value - ( value % 4 ) ) / 4 ) );
			values.percentage = value + '%';
			break;
		default:
			values.classPercentage = parseInt( ( value - ( value % 4 ) ) / 4 );
			values.percentage = value + '%';
			break;
	}
	return values;
}