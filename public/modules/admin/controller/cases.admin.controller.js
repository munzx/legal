'use strict';

angular.module('adminModule').controller('casesAdminController', ['$scope', 'connectAdminFactory', '$state', '$modal', function ($scope, connectAdminFactory, $state, $modal) {
	connectAdminFactory.query({page: 'case'}, function(response){
		$scope.cases = response;
	});

	$scope.showNewCaseForm = function(){
		$modal.open({
			templateUrl: 'public/modules/case/view/create.case.view.html',
			controller: 'indexCaseController',
			size: 'lg',
			resolve: {
				cases: function(){
					return $scope.cases;
				}
			}
		});
	}
}]);