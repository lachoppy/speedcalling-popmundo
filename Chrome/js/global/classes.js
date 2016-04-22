//Definition of the object which will be used to store the options
//Attention, must be equal as background page bkgOptionsClass
function classOptions() {
	this.Language = 'en';
	this.DeliveryCheck_enabled = true;
	this.FilterItems_enabled = true;
	this.FoldRecipes_enabled = true;
	this.GlobalFame_enabled = true;
	this.QualityToValue_showPercentages = true;
	this.QualityToValue_showValues = true;
	this.SpeedCalling_enabled = true;
	this.SpeedCalling_useGossip = false;
	this.TicketPrice_enabled = true;
	this.TicketPrice_useHighColors = false;
	this.TicketPrice_useHigherPrices = false;
	this.Const_numberOfCities = 49;
}

//Definition of the object which will be used to return translations
function classWordList( lang ) {
	//If no language, assume English as default and initiates a new lang object
	this.words = eval( 'new ' + ( ( ( lang === null ) || ( lang === undefined ) ) ? 'lang_en' : 'lang_' + lang ) + '()' );

	this.get = function( key ) {
		if( !( key in this.words ) ) {
			return key;
		} else {
			return this.words[ key ];
		}
	};
}

// Definition of the object to store the pills
function classPillValues() {
	this.number = '00';
	this.classNumber = '00';
	this.percentage = '00%';
	this.classPercentage = '00';
	this.currency = '00$';
	this.classCurrency = 'money';
	this.text = 'nothing';
	this.classText = 'none';
}

//Definition of the suggested prices to be used. The second element is the
// higher price 
function classTicketPrices() {
	this.fame_0 = [ 6, 5 ];
	this.fame_1 = [ 6, 5 ];
	this.fame_2 = [ 7, 5 ];
	this.fame_3 = [ 8, 7 ];
	this.fame_4 = [ 9, 9 ];
	this.fame_5 = [ 11, 12 ];
	this.fame_6 = [ 13, 15 ];
	this.fame_7 = [ 15, 18 ];
	this.fame_8 = [ 20, 20 ];
	this.fame_9 = [ 25, 25 ];
	this.fame_10 = [ 30, 30 ];
	this.fame_11 = [ 35, 35 ];
	this.fame_12 = [ 45, 40 ];
	this.fame_13 = [ 50, 45 ];
	this.fame_14 = [ 55, 50 ];
	this.fame_15 = [ 60, 65 ];
	this.fame_16 = [ 75, 70 ];
	this.fame_17 = [ 80, 75 ];
	this.fame_18 = [ 85, 80 ];
	this.fame_19 = [ 90, 85 ];
	this.fame_20 = [ 95, 90 ];
	this.fame_21 = [ 100, 95 ];
	this.fame_22 = [ 105, 100 ];
	this.fame_23 = [ 110, 105 ];

	this.get = function( key ) {
		if( !( 'fame_' + key in this ) ) {
			return 6;
		}

		//Checks from localStorage if it's to use higher prices
		var myOptions = JSON.parse( localStorage.getItem( 'speedCalling' ) );
		if( myOptions === null || myOptions === undefined ) {
			myOptions = new classOptions();
		}

		var tmpValue = this[ 'fame_' + key ];
		if( myOptions.TicketPrice_useHigherPrices ) {
			return tmpValue[1];
		}

		return tmpValue[0];

	};
}

//Possible call options to be used with speedCalling
function classPossibleCallOptions() {
	this.option_121 = 121;
	this.option_24 = 24;
	this.option_25 = 25;
	this.option_26 = 26;
	this.option_58 = 58;
	this.option_61 = 61;
	this.option_73 = 73;
	this.option_74 = 74;
	this.option_9999 = 9999;
	this.callURI = '/World/Popmundo.aspx/Interact/Phone/';
	this.callToken = '#toCall';
	this.options = 9;

	//Returns an array with all the options
	this.getOptionS = function(){
		return [ 121, 24, 25, 26, 58, 61, 73, 74, 999 ];
	}

	//Returns the default value based on the localStorage
	this.default = function() {
		//Checks from localStorage if it's to use higher prices
		var myOptions = JSON.parse( localStorage.getItem( 'SpeedCalling_useGossip' ) );
		if( myOptions === null || myOptions === undefined ) {
			myOptions = new classOptions();
		}

		if( myOptions.SpeedCalling_useGossip ) {
			return this.option_121;
		} else {
			return this.option_24;
		}
	};

	this.getOption = function( key ) {
		if( !( 'option_' + key in this ) ) {
			return this.default();
		}

		return this['option_' + key];
	};
}