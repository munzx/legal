'use strict';

angular.module('adminModule').controller('indexAdminController', ['$scope', '$state', 'registerUserConfigFactory', '$timeout', 'connectAdminFactory', function ($scope, $state, registerUserConfigFactory, $timeout, connectAdminFactory) {
	$scope.user = registerUserConfigFactory.getUser();
	connectAdminFactory.get({'page': 'report'}, function (response) {
		var info = response.info;

		$scope.line = {};
		$scope.line.labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novmber", "December"];
		$scope.line.series = ['المهام', 'القضايا', 'الجلسات', 'المذكرات'];
		$scope.line.data = [
			[65, 59, 80, 81, 56, 55, 40, 34, 56, 38, 95, 47],
			[28, 48, 40, 19, 86, 27, 90, 34, 45, 73, 59, 96],
			[28, 70, 46, 44, 47, 57, 60, 48, 99, 24, 120, 45],
			[88, 98, 20, 59, 46, 77, 30, 49, 55, 39, 120, 34]
		];
		$scope.line.onClick = function (points, evt) {
			console.log(points, evt);
		};

		// Simulate async data update
		// $timeout(function () {
		// 	$scope.line.data = [
		// 		[28, 48, 40, 19, 86, 27, 90],
		// 		[65, 59, 80, 81, 56, 55, 40]
		// 	];
		// }, 3000);


		$scope.doughnut = {};
		$scope.doughnut.labels = ["القضايا المفتوحة", "القضايا المغلقة"];
		$scope.doughnut.data = [info.openCaseCount, info.closedCaseCount];


		$scope.pie = {};
		$scope.pie.labels = [];
		$scope.pie.data = [];
		for(var i in info.courtCase){
			$scope.pie.labels.push(i);
			$scope.pie.data.push(info.courtCase[i]);
		}


		$scope.bar = {};
		$scope.bar.labels = [];
		$scope.bar.data = [[]];
		$scope.bar.series = ['الموظفسن'];
		for(var i in info.sessions){
			$scope.bar.labels.push(i);
			$scope.bar.data[0].push(info.sessions[i]);
		}


		$scope.bar2 = {};
		$scope.bar2.labels =[];
		$scope.bar2.data = [[]];
		for(var i in info.consultantCase){
			$scope.bar2.labels.push(i);
			$scope.bar2.data[0].push(info.consultantCase[i]);
		}

		$scope.bar3 = {};
		$scope.bar3.labels =[];
		$scope.bar3.data = [[]];
		for(var i in info.taskClosed.user){
			$scope.bar3.labels.push(i);
			$scope.bar3.data[0].push(info.taskClosed.user[i]);
		}


		$scope.polarArea = {};
	    $scope.polarArea.labels = ["مغلقة", "معلقة", "مرفوضة"];
	    $scope.polarArea.data = [info.taskClosed.total, info.taskPendding.total, info.taskRejected.total];
	});

}]);