'use strict';

angular.module('wordleApp.auth', [
  'wordleApp.constants',
  'wordleApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
