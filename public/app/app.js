var app = angular.module('fastrApp', ['ui.router', 'ngMaterial', 'ngMessages', 'chart.js', 'countUpModule']).config(function($stateProvider, $urlRouterProvider, $mdThemingProvider, $httpProvider, ChartJsProvider){


$httpProvider.defaults.headers.post['Content-Type'] = 'text/plain'; 

$mdThemingProvider.theme('default')
    .primaryPalette('deep-purple')
    .accentPalette('blue-grey')
    .dark();

    

$stateProvider.state('speedtest', {
                url: '/',
                views: {
                    
                    'speedtest': {
                        templateUrl: "app/views/speedtest.view.html",
                        controller: 'SpeedTestController'
                    }
                }
            })

        

  $urlRouterProvider.otherwise('/');

});


