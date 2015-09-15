'use strict';

angular.module('adminModule').controller('casesAdminController', ['$scope', 'connectCaseFactory', '$state', '$modal', function ($scope, connectCaseFactory, $state, $modal) {
	connectCaseFactory.query({}, function(response){
		$scope.cases = response;
	});

	$scope.showNewCaseForm = function(){
		$modal.open({
			templateUrl: 'public/modules/case/view/create.case.view.html',
			controller: 'createCaseController',
			size: 'lg',
			backdrop : 'static',
			resolve: {
				cases: function(){
					return $scope.cases;
				}
			}
		});
	}

	$scope.showCaseDetails = function(index){
		$modal.open({
			templateUrl: 'public/modules/case/view/details.case.view.html',
			controller: 'detailsCaseController',
			size: 'lg',
			backdrop: 'static',
			resolve: {
				selectedCase: function(){
					return $scope.cases[index];
				}
			}
		});
	}

}]);