angular.module('main', ['ngRoute'])
config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('home', {
            templateUrl: '/Home/index',
            controller: 'otherCtrl'
    })
    .when('/employee', {
            templateUrl: '/Employee/Index',
            controller: 'otherCtrl'
    })
    .when('/emp', {
            templateUrl: '/Emp/Index',
            controller: 'otherCtrl'
    })
    .when('/document', {
            templateUrl: '/Document/Index',
            controller: 'otherCtrl'
    })
     .when('/department', {
             templateUrl: '/Department/Index',
             controller: 'otherCtrl'
         }).otherwise({ redirectTo: '/Admin/Index' });

    $locationProvider.html5Mode(true);

}]).controller("otherCtrl", function ($scope, $location) { });


   
