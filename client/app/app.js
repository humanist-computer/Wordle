'use strict';

angular.module('wordleApp', [
  'wordleApp.auth',
  'wordleApp.admin',
  'wordleApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'validation.match',
  'ui.tree',
  'dndLists'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
