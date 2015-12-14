'use strict';

angular.module('timelineModule').controller('indexTimelineController', ['$scope', 'connectTimelineFactory', 'socketConfigFactory', function ($scope, connectTimelineFactory, socketConfigFactory) {
	//listen to add
	socketConfigFactory.on('timeline', function (feeds) {
		getFeeds();
	});
	var getFeeds = function () {
		connectTimelineFactory.query(function (response) {
			$scope.feeds = response;
		});
	}
	//init the feeds
	getFeeds();
}]);