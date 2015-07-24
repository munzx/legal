'use strict';

angular.module('adminModule').controller('casesAdminController', ['$scope', 'connectCaseFactory', '$state', '$modal', function ($scope, connectCaseFactory, $state, $modal) {
	connectCaseFactory.query({}, function(response){
		$scope.cases = response;
	});

	$scope.showNewCaseForm = function(){
		$modal.open({
			templateUrl: 'public/modules/case/view/create.case.view.html',
			controller: 'indexCaseController',
			size: 'lg',
			backdrop : 'static',
			resolve: {
				cases: function(){
					return $scope.cases;
				}
			}
		});
	}
}]);