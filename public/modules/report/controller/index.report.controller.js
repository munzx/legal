'use strict';

angular.module('reportModule').controller('indexReportController', ['$scope', '$state', 'registerUserConfigFactory', '$timeout', 'connectAdminFactory', function ($scope, $state, registerUserConfigFactory, $timeout, connectAdminFactory) {
	$scope.user = registerUserConfigFactory.getUser();
	$scope.report = {};

	var getReport = function () {
		connectAdminFactory.get({'page': 'report', "from": $scope.report.searchDateFrom, "to": $scope.report.searchDateTo},
		function (response) {
			var info = response.info;
			var dateInfo = response.dateInfo;
			var dateInput = response.dateInput;

			//set the search dates
			$scope.report.searchDateFrom = new Date(dateInput.from);
			$scope.report.searchDateTo = new Date(dateInput.to);


			//Acivities
			$scope.line = {};
			$scope.line.labels = [];
			$scope.line.series = ['المهام', 'القضايا', 'الجلسات', 'المذكرات'];
			$scope.line.data = [ [],[],[],[] ];

			for(var y in dateInfo){
				for(var m in dateInfo[y]){
					$scope.line.labels.push(y + "/" + m);
					$scope.line.data[3].push(dateInfo[y][m].memo);
					$scope.line.data[2].push(dateInfo[y][m].session);
					$scope.line.data[1].push(dateInfo[y][m].case);
					$scope.line.data[0].push(dateInfo[y][m].task);
				}
			}

			//Open and closed cases
			$scope.doughnut = {};
			$scope.doughnut.labels = ["القضايا المفتوحة", "القضايا المغلقة"];
			$scope.doughnut.data = [info.openCaseCount, info.closedCaseCount];


			//Courts and cases
			$scope.pie = {};
			$scope.pie.labels = [];
			$scope.pie.data = [];
			for(var i in info.courtCase){
				$scope.pie.labels.push(i);
				$scope.pie.data.push(info.courtCase[i]);
			}


			//Employees and sessions
			$scope.bar = {};
			$scope.bar.labels = [];
			$scope.bar.data = [[]];
			for(var i in info.sessions){
				$scope.bar.labels.push(i);
				$scope.bar.data[0].push(info.sessions[i]);
			}


			//Consultants and memos
			$scope.bar2 = {};
			$scope.bar2.labels =[];
			$scope.bar2.data = [[]];
			for(var i in info.consultantCase){
				$scope.bar2.labels.push(i);
				$scope.bar2.data[0].push(info.consultantCase[i]);
			}

			//Tasks
			$scope.bar3 = {};
			$scope.bar3.labels =[];
			$scope.bar3.data = [[]];
			for(var i in info.taskClosed.user){
				$scope.bar3.labels.push(i);
				$scope.bar3.data[0].push(info.taskClosed.user[i]);
			}

			//Tasks closed
			$scope.polarArea = {};
		    $scope.polarArea.labels = ["مغلقة", "معلقة", "مرفوضة"];
		    $scope.polarArea.data = [info.taskClosed.total, info.taskPendding.total, info.taskRejected.total];
		});	
	}


	//Init get report
	getReport();

	$scope.searchReport = function () {
		getReport();
	}

	
}]);