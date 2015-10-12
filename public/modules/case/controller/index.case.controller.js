'use strict';

angular.module('adminModule').controller('indexCaseController', ['$scope', 'connectCaseFactory', '$state', '$modal', 'registerUserConfigFactory', '$http', 'limitToFilter', function ($scope, connectCaseFactory, $state, $modal, registerUserConfigFactory, $http, limitToFilter) {
	$scope.user = registerUserConfigFactory.getUser();
	if($scope.user === false) $state.go('signin');

	//scope dates
<<<<<<< HEAD
	$scope.searchInfo = {};
=======
	$scope.searchDates = {};
>>>>>>> origin/master

	connectCaseFactory.query({}, function(response){
		$scope.cases = response;
	});

<<<<<<< HEAD
	$scope.searchInOptions = ['client', 'defendant', 'consultant', 'case', 'update', 'session'];

	$scope.searchResult = function(val){
		console.log($scope.searchInfo.searchDateFrom);
		var search = {};
		search.phrase = val;
		search.dateTo = $scope.searchInfo.searchDateFrom;
		search.dateFrom = $scope.searchInfo.searchDateTo;
		search.searchIn = $scope.searchInfo.searchIn || undefined;

	    return $http.post('/api/v1/case/search/', {"search": search}).then(function(response){
=======
	$scope.searchResult = function(val){
		console.log($scope.searchDates.searchDateFrom);
	    return $http.get('/api/v1/case/search/' + val + '/' + $scope.searchDates.searchDateFrom + '/' + $scope.searchDates.searchDateTo).then(function(response){
>>>>>>> origin/master
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
<<<<<<< HEAD
		$scope.searchInfo.searchDateFrom = undefined;
		$scope.searchInfo.searchDateTo = undefined;
=======
		$scope.searchDates.searchDateFrom = undefined;
		$scope.searchDates.searchDateTo = undefined;
>>>>>>> origin/master
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