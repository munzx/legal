'use strict';

angular.module('caseModule').controller('memosCaseController', ['$scope', 'connectCaseFactory', '$modal', 'registerUserConfigFactory', 'socketConfigFactory', function ($scope, connectCaseFactory, $modal, registerUserConfigFactory, socketConfigFactory) {
	$scope.user = registerUserConfigFactory.getUser();
	if($scope.user === false) $state.go('signin');
	$scope.isAdmin = ($scope.user.role === 'admin')? true: false;
	$scope.searchInfo = {};


	//listen to session add
	socketConfigFactory.on('memos.add', function (memo) {
		if($scope.activePending == 'active' && memo.isOld == false){
			$scope.memos.unshift(memo.info);
		} else if($scope.activeClosed == 'active' && memo.isOld == true){
			$scope.memos.unshift(memo.info);
		}
	});

	//listen to session update
	socketConfigFactory.on('memos.update', function (caseInfo) {
		if($scope.activePending == 'active'){
			$scope.memosPending();
		} else if($scope.activeClosed == 'active'){
			$scope.memosClosed();
		}
	});

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

	$scope.showMemoDetails = function(index){

	}

}]);