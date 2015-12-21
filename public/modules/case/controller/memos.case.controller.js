'use strict';

angular.module('caseModule').controller('memosCaseController', ['$scope', 'connectCaseFactory', '$modal', 'registerUserConfigFactory', 'socketConfigFactory', function ($scope, connectCaseFactory, $modal, registerUserConfigFactory, socketConfigFactory) {
	$scope.user = registerUserConfigFactory.getUser();
	if($scope.user === false) $state.go('signin');
	$scope.isAdmin = ($scope.user.role === 'admin')? true: false;
	$scope.searchInfo = {};

	//listen to memo add
	socketConfigFactory.on('memos.add', function (memo) {
		if($scope.activePending == 'active' && memo.isOld == false){
			$scope.memos.unshift(memo.info);
		} else if($scope.activeClosed == 'active' && memo.isOld == true){
			$scope.memos.unshift(memo.info);
		}
	});

	//listen to memo update
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

	//case consultants is an array that contains all consultant that have been assigned to the case
	//as we can only assign one consultant to a case at a time then this means that we need the last one
	//to know the one is currently assigned to the case
	var getCaseLastConsultant = function (consultants) {
		if(consultants.length == 0) return false;
		return consultants[consultants.length - 1];		
	}

	$scope.fullName = function(consultants){
		var info = getCaseLastConsultant(consultants);
		if(!info) return '';
		return info.firstName + ' ' + info.lastName;
	}

	//check if the user is the consultant which the memo is assigned to
	$scope.isCaseConsultant = function (consultants) {
		var info = getCaseLastConsultant(consultants);
		if(!info) return '';
		return ($scope.user._id === info._id)? true: false;
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

	$scope.showUploadedMemos = function(index){
		$modal.open({
			templateUrl: 'public/modules/case/view/memos.consultant.case.view.html',
			controller: 'memoConsultantCaseController',
			backdrop: 'static',
			resolve: {
				memoInfo: function(){
					return $scope.memos[index];
				}
			}
		});
	}

}]);