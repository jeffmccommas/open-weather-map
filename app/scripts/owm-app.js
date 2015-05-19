/**
 * Created by jmccommas on 5/16/15.
 */
(function () {
    "use strict";
    var OWMApp = angular.module('OWMApp', [
        //  'ui.router',
        'ngRoute',
        'ngAnimate'
    ])


        .value('owmCities', ['New York', 'Dallas', 'Chicago'])


        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'views/home.html',
                controller: 'homeController as homeCtrl'
            })
                .when('/cities/:city', {
                    templateUrl: 'views/city.html',
                    controller: 'cityController as cityCtrl',
                    resolve: {
                        city: function (owmCities, $route, $location) {
                            var city = $route.current.params.city;
                            if (owmCities.indexOf(city) == -1) {
                                $location.path('/error');
                                return;
                            }
                            return city;
                        }
                    }
                })

                .when('/error', {
                    template: '<p>Error - Page Not Found</p>'
                })
                .otherwise('/error')
        }])

        .controller('homeController', function ($scope) {
            var homeCtrl = this;
            //empty for now
        })
        .controller('cityController', ['$scope', 'city', function ($scope, city) {
            var cityCtrl = this;

            cityCtrl.city = city;

        }])

        .run(function($rootScope, $location) {
            $rootScope.$on('$routeChangeError', function() {
                $location.path('/error');
            });
        })

}());








