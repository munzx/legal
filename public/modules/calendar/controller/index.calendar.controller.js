'use strict';

angular.module('calendarModule').controller('indexCalendarController', ['$scope', 'connectCalendarFactory', '$modal', 'registerUserConfigFactory', '$filter', 'socketConfigFactory', 'helperConfigFactory', function ($scope, connectCalendarFactory, $modal, registerUserConfigFactory, $filter, socketConfigFactory, helperConfigFactory) {
	//init scope, for some reason if we update the tasks later and if we did not init this it wont update!
	$scope.tasks = [];

	connectCalendarFactory.query({}, function(response){
		$scope.tasks = response;
	});

	//listen to tasks
	socketConfigFactory.on('tasks.add', function (task) {
		var activeStatus = getActiveStatus();
		if(activeStatus == 'pending'){
			$scope.memosPending();
		} else if(activeStatus == 'close'){
			$scope.memosClosed();
		} else {
			$scope.memosAll();
		}
	});

	//listen to tasks
	socketConfigFactory.on('tasks.update', function (task) {
		var activeStatus = getActiveStatus();
		if(activeStatus == 'pending'){
			$scope.memosPending();
		} else if(activeStatus == 'close'){
			$scope.memosClosed();
		} else {
			$scope.memosAll();
		}
	});


	$scope.user = registerUserConfigFactory.getUser();

	$scope.isTodayOrMissed = function (deadline) {
		var deadline = new Date(deadline);
		var today = new Date();
		deadline.setHours(0,0,0,0);
		today.setHours(0,0,0,0);
		var check = (deadline.getTime() <= today.getTime())? true: false;
		return check;
	}

	$scope.memosAll = function () {
		connectCalendarFactory.query({}, function(response){
			$scope.tasks = response;
		});
		activeStatus('all');
	}

	$scope.memosClosed = function () {
		connectCalendarFactory.query({'action': 'close'}, function(response){
			$scope.tasks = response;
		});
		activeStatus('close');
	}

	$scope.memosPending = function () {
		connectCalendarFactory.query({'action': 'pending'}, function(response){
			$scope.tasks = response;
		});
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

	var getActiveStatus = function () {
		if($scope.activeClosed == 'active'){
			return 'close';
		} else if($scope.activePending == 'active'){
			return 'pending';
		} else {
			return 'all';
		}
	}

	//init active status
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
		if(($scope.tasks[index].removed === false) && ($scope.tasks[index].rejected === false) && ($scope.tasks[index].status == 'pending') && (($scope.tasks[index].responsibility._id == $scope.user._id) ||  ($scope.tasks[index].user._id == $scope.user._id))){
			$modal.open({
				templateUrl: 'public/modules/calendar/view/actions.calander.view.html',
				controller: 'actionsCalendarController',
				backdrop: 'static',
				size: 'sm',
				resolve: {
					task: function(){
						return $scope.tasks[index];
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