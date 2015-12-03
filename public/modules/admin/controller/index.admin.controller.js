'use strict';

angular.module('adminModule').controller('indexAdminController', ['$scope', '$state', 'registerUserConfigFactory', '$timeout', function ($scope, $state, registerUserConfigFactory, $timeout) {
	$scope.user = registerUserConfigFactory.getUser();

	$scope.line = {};
	$scope.line.labels = ["January", "February", "March", "April", "May", "June", "July"];
	$scope.line.series = ['Series A', 'Series B'];
	$scope.line.data = [
	[65, 59, 80, 81, 56, 55, 40],
	[28, 48, 40, 19, 86, 27, 90]
	];
	$scope.line.onClick = function (points, evt) {
		console.log(points, evt);
	};

	// Simulate async data update
	$timeout(function () {
		$scope.line.data = [
			[28, 48, 40, 19, 86, 27, 90],
			[65, 59, 80, 81, 56, 55, 40]
		];
	}, 3000);



	$scope.doughnut = {};
	$scope.doughnut.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
	$scope.doughnut.data = [300, 500, 100];


	$scope.pie = {};
	$scope.pie.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
	$scope.pie.data = [300, 500, 100];


	$scope.bar = {};
	$scope.bar.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	$scope.bar.series = ['Series A', 'Series B'];
	$scope.bar.data = [
		[65, 59, 80, 81, 56, 55, 40],
		[28, 48, 40, 19, 86, 27, 90]
	];


	$scope.radar = {};
	$scope.radar.labels =["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];
	$scope.radar.data = [
		[65, 59, 90, 81, 56, 55, 40],
		[28, 48, 40, 19, 96, 27, 100]
	];



}]);