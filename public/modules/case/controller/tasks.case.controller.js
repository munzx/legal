'use strict';

angular.module('caseModule').controller('tasksCaseController', ['$scope', '$modalInstance', 'connectAdminFactory', 'connectCaseFactory', '$timeout', 'upcoming', function ($scope, $modalInstance, connectAdminFactory, connectCaseFactory, $timeout, upcoming) {
	$scope.closeModal = function () {
		$modalInstance.close('cancel');
	}

	var sysMsg = function(type, msg, dismiss){
		if(type == 'success'){
			$scope.success = msg;
			$scope.error = false;
		} else if(type == 'error'){
			$scope.error = msg;
			$scope.success = false;
		}

		var timer = $timeout(function(){
			$scope.success = false;
			$scope.error = false;
			$timeout.cancel(timer);
			if(dismiss){
				$modalInstance.close('cancel');
			}
		}, 1500);
	}

	$scope.radioModel = 'byDate';

	connectAdminFactory.query({page: 'court'}, function(response){
		$scope.courts = response;
	});

	connectAdminFactory.query({page: 'employee'}, function(response){
		$scope.employees = response;
	});

	connectCaseFactory.query({}, function(response){
		$scope.cases = response;
	});

	$scope.updateTaskBydate = function(courtID, index){
		$scope.error = false;
		$scope.success = false;
		if(index){
			var info = {
				courtID: courtID,
				dateFrom: angular.copy($scope.updateTaskByDateFrom),
				dateTo: angular.copy($scope.updateTaskByDateTo),
				lawyerID: angular.copy($scope.employees[index]._id)
			}

			//empty fields
			$scope.selectedEmployeeIndex = '';
			$scope.updateTaskByDateFrom = '';
			$scope.updateTaskByDateTo = '';

			connectCaseFactory.save({'action': 'tasks', 'subaction': 'updatebydate'}, {'info': info}, function(response){
				sysMsg('success', response.message);
				//update the parent "sessions"
				upcoming();
			}, function(error){
				sysMsg('error', error.data.message, true);
			});
		}
	}

	$scope.updateTaskbyCase = function(caseID, index){
		$scope.error = false;
		$scope.success = false;
		var info = {
			caseID: caseID,
			lawyerID: angular.copy($scope.employees[index]._id)
		}
		connectCaseFactory.save({'action': 'tasks', 'subaction': 'updatebycase'}, {'info': info}, function(response){
			sysMsg('success', response.message);
			//update the parent "sessions"
			upcoming();
		}, function(error){
			sysMsg('error', error.data.message)
		});
	}

}]);