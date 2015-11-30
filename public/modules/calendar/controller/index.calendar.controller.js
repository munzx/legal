'use strict';

angular.module('calendarModule').controller('indexCalendarController', ['$scope', 'connectCalendarFactory', '$modal', 'registerUserConfigFactory', '$filter', function ($scope, connectCalendarFactory, $modal, registerUserConfigFactory, $filter) {
	connectCalendarFactory.query({}, function(response){
		$scope.tasks = response;
		$scope.filterdTasks = response;
	});

	$scope.user = registerUserConfigFactory.getUser();

	$scope.memosAll = function () {
		$scope.filterdTasks = $scope.tasks;
		activeStatus('all');
	}

	$scope.memosClosed = function () {
		$scope.filterdTasks = $filter('filter')($scope.tasks, 'close');
		activeStatus('close');
	}

	$scope.memosPending = function () {
		$scope.filterdTasks = $filter('filter')($scope.tasks, 'pending');
		activeStatus('pending');
	}

	var activeStatus = function (value) {
		switch(value){
			case 'close':
				$scope.activeClosed = 'active';
				$scope.activePending = '';
				$scope.activeAll = '';
				break;
			case 'pending':
				$scope.activeClosed = '';
				$scope.activePending = 'active';
				$scope.activeAll = '';
				break;
			case 'all':
			case 'default':
				$scope.activeClosed = '';
				$scope.activePending = '';
				$scope.activeAll = 'active';
		}
	}

	//init acive status
	activeStatus('all');

	$scope.showNewTaskForm = function(){
		$modal.open({
			templateUrl: 'public/modules/calendar/view/create.task.calendar.view.html',
			controller: 'createTaskCalendarController',
			backdrop: 'static',
			resolve: {
				tasks: function(){
					return $scope.tasks;
				},
				user: function () {
					return $scope.user;
				}
			}
		});
	}

	$scope.showTaskActions = function(index){
		if(($scope.filterdTasks[index].removed === false) && ($scope.filterdTasks[index].rejected === false) && ($scope.filterdTasks[index].status == 'pending') && (($scope.filterdTasks[index].responsibility._id == $scope.user._id) ||  ($scope.filterdTasks[index].user._id == $scope.user._id))){
			$modal.open({
				templateUrl: 'public/modules/calendar/view/actions.calander.view.html',
				controller: 'actionsCalendarController',
				backdrop: 'static',
				size: 'sm',
				resolve: {
					task: function(){
						return $scope.filterdTasks[index];
					},
					user: function(){
						return $scope.user;
					},
					remarks: function () {
						return $scope.remarks;
					}
				}
			});
		}
	}
}]);