'use strict';

angular.module('calendarModule').controller('createTaskCalendarController', ['$scope', '$modalInstance', 'connectCalendarFactory', 'connectUserFactory', 'tasks', 'user', function ($scope, $modalInstance, connectCalendarFactory, connectUserFactory, tasks, user) {
	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	connectUserFactory.query({'action': 'available'}, function(response){
		//only the admin can assign tasks to other users and him/her self
		//other users can only assign tasks to themselves
		if(user.role !== 'admin'){
			$scope.users = [user];
		} else {
			$scope.users = response;
			$scope.users.push(user);
		}
	});

	$scope.createNewTask = function(){
		//get the selected user from users by index
		$scope.info.responsibility = $scope.users[$scope.info.responsibilityIndex]._id;
		connectCalendarFactory.save({}, {'info': $scope.info}, function(response){
			$modalInstance.dismiss('cancel');
		}, function(error){
			console.log(error);
		});
	}
}]);