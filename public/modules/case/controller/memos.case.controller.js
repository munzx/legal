'use strict';

angular.module('caseModule').controller('memosCaseController', ['$scope', 'connectCaseFactory', '$modal', 'registerUserConfigFactory', function ($scope, connectCaseFactory, $modal, registerUserConfigFactory) {
	$scope.user = registerUserConfigFactory.getUser();
	if($scope.user === false) $state.go('signin');
	$scope.isAdmin = ($scope.user.role === 'admin')? true: false;

	$scope.memosPending = function(){
		connectCaseFactory.query({'action': 'memos', 'subaction': 'pending'}, function(response){
			$scope.memos = response;
			$scope.activeClosed = '';
			$scope.activePending = 'active';
		}, function(error){
			$scope.error = error.data.message;
		});
	}

	$scope.memosClosed = function(){
		connectCaseFactory.query({'action': 'memos', 'subaction': 'closed'}, function(response){
			$scope.memos = response;
			$scope.activeClosed = 'active';
			$scope.activePending = '';
		}, function(error){
			$scope.error = error.data.message;
		});
	}

	//init with the pending memos
	$scope.memosPending();

	$scope.fullName = function(consultants){
		if(consultants.length == 0) return '';
		var info = consultants[consultants.length - 1];
		return info.firstName + ' ' + info.lastName;
	}

	$scope.showUpdateConsultantForm = function(index){
		$modal.open({
			templateUrl: 'public/modules/case/view/update.consultant.case.view.html',
			controller: 'updateConsultantCaseController',
			backdrop: 'static',
			resolve: {
				memoInfo: function(){
					return $scope.memos[index];
				}
			}
		});
	}

	$scope.showmemoDetails = function(index){

	}


}]);