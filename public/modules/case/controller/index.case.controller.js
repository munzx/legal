'use strict';

angular.module('adminModule').controller('indexCaseController', ['$scope', 'connectCaseFactory', '$state', '$modal', 'registerUserConfigFactory', '$http', 'limitToFilter', function ($scope, connectCaseFactory, $state, $modal, registerUserConfigFactory, $http, limitToFilter) {
	$scope.user = registerUserConfigFactory.getUser();
	if($scope.user === false) $state.go('signin');

	//scope dates
	$scope.searchInfo = {};

	connectCaseFactory.query({}, function(response){
		$scope.cases = response;
	});

	$scope.searchInOptions = ['client', 'defendant', 'consultant', 'case', 'update', 'session'];

	$scope.searchResult = function(val){
		var search = {};
		search.phrase = val;
		search.dateTo = $scope.searchInfo.searchDateFrom;
		search.dateFrom = $scope.searchInfo.searchDateTo;
		search.searchIn = $scope.searchInfo.searchIn || undefined;

	    return $http.post('/api/v1/case/search/', {"search": search}).then(function(response){
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
		$scope.searchInfo.searchDateFrom = undefined;
		$scope.searchInfo.searchDateTo = undefined;
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

	$scope.removeCase = function (index, id) {
		var modalInstance = $modal.open({
			templateUrl: 'public/modules/config/view/message/confirm.message.config.view.html',
			backdrop: 'static',
			controller: ['$scope', '$modalInstance', 'id', 'cases', 'index', '$filter', function($scope, $modalInstance, id, cases, index, $filter){
				var caseDate = $filter('date')(cases[index].caseDate, 'yyyy/MM/dd');

				$scope.message = {};
				$scope.message.title = 'حذف قضية';
				$scope.message.text = ' هل ترغب بحذف القضية ' + cases[index].caseType  + ' رقم ' + cases[index].caseNumber  + ' بتاريخ ' + caseDate + ' ?';
				$scope.message.confirm = 'نعم';
				$scope.message.cancel = 'لا';

				$scope.confirm = function(){
					connectCaseFactory.remove({caseId: id}, function(response){
						cases[index] = response;
						$modalInstance.dismiss('cancel');
					},function(error){
						$scope.error = error.data.message;
					});
				}

				$scope.cancel = function(){
					$modalInstance.dismiss('cancel');
				}

				$scope.closeModal = function(){
					$modalInstance.dismiss('cancel');
				}
			}],
			resolve: {
				id: function(){
					return id;
				},
				cases: function () {
					return $scope.cases;
				},
				index: function(){
					return index;
				}
			}
		});


	}

}]);