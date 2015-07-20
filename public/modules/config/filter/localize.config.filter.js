'use strict';

angular.module('yousufalsharif').filter('localize', ['arLang', function (arLang) {
	return function (text, lang) {
		if(!lang || !text) return text;

		text = text.toLowerCase();

		var localLang,
			result;
		//select language
		switch(lang){
			case "ar":
				localLang = arLang;
				break;
		}

		result = (localLang[text] == undefined)? text: localLang[text];
		return result;
	}
}]);