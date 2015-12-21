'use strict';


angular.module('caseModule').controller('memoConsultantCaseController', ['$scope', 'memoInfo', '$modalInstance', '$modal', 'socketConfigFactory', 'connectCaseFactory', function ($scope, memoInfo, $modalInstance, $modal, socketConfigFactory, connectCaseFactory) {
	var init = function () {
		connectCaseFactory.get({caseId: memoInfo.caseId, action: 'memos', actionId: memoInfo.updateId}, function (response) {
			$scope.memoInfo = response;
			//to get the consultant first name and last name
			var consultantInfo = $scope.memoInfo.memoConsultant[$scope.memoInfo.memoConsultant.length -1];
			$scope.consultant = consultantInfo.firstName + ' ' + consultantInfo.lastName;
			$scope.docs = $scope.memoInfo.memosUploaded;
		});
	}

	//get the memo info
	init();

	//listen to memo update
	socketConfigFactory.on('memos.update', function (memo) {
		init();
	});

	$scope.closeModal = function () {
		$modalInstance.dismiss('cancel');
	}

	$scope.downloadDoc = function(docId){
		return '/api/v1/case/' + $scope.memoInfo.caseId +'/download/' + docId;
	}

	$scope.showUploadMemoForm = function () {
		$modal.open({
			templateUrl: 'public/modules/case/view/upload.memo.consultant.case.view.html',
			controller: 'uploadMemoConsultantCaseController',
			backdrop: 'static',
			resolve: {
				memoInfo: function(){
					return $scope.memoInfo;
				}
			}
		});
	}
}]);