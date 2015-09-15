'use strict';

angular.module('calendarModule').controller('indexCalendarController', ['$scope', 'connectCalendarFactory', '$modal', 'registerUserConfigFactory', function ($scope, connectCalendarFactory, $modal, registerUserConfigFactory) {
	connectCalendarFactory.query({}, function(response){
		$scope.tasks = response;
	});

	$scope.user = registerUserConfigFactory.getUser();


	$scope.showNewTaskForm = function(){
		$modal.open({
			templateUrl: 'public/modules/calendar/view/create.task.calendar.view.html',
			controller: 'createTaskCalendarController',
			backdrop: 'static',
			resolve: {
				tasks: function(){
					return $scope.tasks;
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
					}
				}
			});
		}
	}


}]);