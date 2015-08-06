//Dependencies

var moment = require('moment');

module.exports = function dateInput (dateFrom, dateTo, callback) {
	if(dateFrom){
		dateFrom = moment(new Date(dateFrom)).isValid() ? moment(new Date(dateFrom)).format() : moment().format();
	} else {
		dateFrom = moment().subtract(28, 'day').format();
	}

	if(dateTo){
		dateTo = moment(new Date(dateTo)).isValid() ? moment(new Date(dateTo)).format() : moment().format();
	} else {
		dateTo = moment().add(28, 'day').format();
	}

	callback({"from": dateFrom, "to": dateTo});
}