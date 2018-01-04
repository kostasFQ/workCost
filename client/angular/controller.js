'use strict';

var angularApp = angular.module('angularApp',[]);


angularApp.controller('ctrl', function($scope, $http, $interval) {

    $scope.Math = window.Math;

    $scope.disabled = false;
    $scope.show = true; //todo false!!!!
    $scope.text = 'Расчет';

    $scope.bonus = null;
    $scope.currensies = null;
    $scope.salary = 0;

    let ms = 0;
    let seconds = '00';
    let mins = '00';
    let hours = '00';
    $scope.clock = null;

    $http.get('/cur')
    .then( function( response ) {
        $scope.bonus = response.data.bonusList;
        $scope.currensies = response.data.values;

        $scope.bonus.sort( function( a,b ) {
            return a.bonusCost - b.bonusCost;
        } );
    } )

    $scope.calc = function(){
        
        $scope.disabled = true;
        $scope.show = true;

        $interval( function(){
            ms++;
            if(ms === 100){
                seconds++;
                ms=0;
                if(seconds < 10) seconds = "0"+seconds;
                if( seconds === 60 ) {
                    $scope.vis = true;
                    seconds = '0'+0;
                    mins++;
                    if(mins > 0 && mins < 10) mins = '0'+mins;
                    if(mins === 60 ) {
                        mins = '0'+0; 
                        hours++;
                        if(hours < 10) hours = '0'+hours;
                    }
                }
            };
            $scope.clock = hours+':'+mins+':'+seconds;
            $scope.salary += $scope.inputSalary/21/8/60/60/100;
            $scope.text = $scope.clock;
        },10);
        
    };

    
});

angularApp.directive('handEnter', function(){
    return function(scope, element, attrs) {
        element.bind('keydown keypress', function(event){
            if(event.which === 13) {
                scope.$apply( function(){
                    scope.$eval(attrs.handEnter)
                } );

                event.preventDefault();
            }
        });
    };
} );
