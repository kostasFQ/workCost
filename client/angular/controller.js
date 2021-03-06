'use strict';

var angularApp = angular.module('angularApp',[]);


angularApp.controller('ctrl', function($scope, $http, $interval) {

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();

    let daysInMonth = 33 - new Date(year, month, 33).getDate();
    let workDays = 0;
    for(let i = 1; i <=daysInMonth; i++) {
        if( (new Date(year, month, i)).getDay() > 0 && (new Date(year, month, i)).getDay() < 6 ) {
            workDays++;
        }
    }

    $scope.Math = window.Math;

    $scope.disabled = false;
    $scope.show = false;
    $scope.text = 'Расчет';

    $scope.bonus = null;
    $scope.currenties = [];
    $scope.salary = 0;

    let ms = 0;
    let seconds = '00';
    let mins = '00';
    let hours = '00';
    $scope.clock = null;

    $http.get('/bonus')
    .then( function( response ) {
        $scope.bonus = response.data.bonusList;

        $scope.bonus.sort( function( a,b ) {
            return a.bonusCost - b.bonusCost;
        } );
    } );
    $http.get('https://www.nbrb.by/API/ExRates/Rates?Periodicity=0')
    .then( function ( response ) {
        let curAns = response.data;
        curAns.map( function(val, i) {
            if(val.Cur_Abbreviation === "USD" || 
            val.Cur_Abbreviation === "EUR" || 
            val.Cur_Abbreviation === "RUB" ||
            val.Cur_Abbreviation === "UAH") {
                $scope.currenties.push({'scale':val.Cur_Scale, 'name':val.Cur_Name, 'rate':val.Cur_OfficialRate, abbreviation: val.Cur_Abbreviation})
            };
        } )
        $scope.currenties.sort(function (a,b){
            return a.rate - b.rate;
        });
    } )

    $scope.calc = function(){
        if( isNaN(+$scope.inputSalary+1) || ($scope.inputSalary).length < 3 || $scope.inputSalary[0] === '0') {
            alert('Ошибка ввода');
            return;
        }
        
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
            $scope.salary += $scope.inputSalary/workDays/8/60/60/100;
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
