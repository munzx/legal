'use strict';

angular.module('yousufalsharif').directive('inlineEditConfigDirective', [function () {
	return {
		require: '?ngModel',
        restrict: 'A',
        transclude: true,
        replace: true,
        link: function(scope, elem, attrs, ngModel) {
        	elem.html('الصفة');
        	var stop = false;
        	var template = "
        	<select ng-model='client.role' class='form-control'>
        		<option value='test'>test</option>
        		<option value='test'>test</option>
        		<option value='test'>test</option>
        		<option value='test'>test</option>
        	</select>
        	";
        	elem.bind('click', function(){
        		if(!stop){
        			ngModel.$setViewValue('test');
        			ngModel.$render();
        			stop = true;
        		}
        	});

        	elem.on('change', function(){
        		console.log(ngModel.$viewValue);
        	});


        }
	}
}]);