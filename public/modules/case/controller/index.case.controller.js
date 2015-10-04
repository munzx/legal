'use strict';

angular.module('adminModule').controller('indexCaseController', ['$scope', 'connectCaseFactory', '$state', '$modal', 'registerUserConfigFactory', '$http', 'limitToFilter', function ($scope, connectCaseFactory, $state, $modal, registerUserConfigFactory, $http, limitToFilter) {
	$scope.user = registerUserConfigFactory.getUser();
	if($scope.user === false) $state.go('signin');

	//scope dates
	$scope.searchDates = {};

	connectCaseFactory.query({}, function(response){
		$scope.cases = response;
	});

	$scope.searchResult = function(val){
		console.log($scope.searchDates.searchDateFrom);
	    return $http.get('/api/v1/case/search/' + val + '/' + $scope.searchDates.searchDateFrom + '/' + $scope.searchDates.searchDateTo).then(function(response){
	    	return limitToFilter(response.data, 15);
	    });	
	}

	$scope.updateSearch = function(){
		if($scope.searchPhrase){
			$scope.searchResult();
		}
	}

	//when selecting a row in search results
	$scope.onSelect = function ($item, $model, $label) {
		$scope.cases = [$item];
	}

	$scope.clearSearchPhrase = function(){
		$scope.searchDates.searchDateFrom = undefined;
		$scope.searchDates.searchDateTo = undefined;
	}

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