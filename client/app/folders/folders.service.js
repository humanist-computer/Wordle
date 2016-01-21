'use strict';

angular.module('wordleApp')
  .service('folders', function ($http) {
    return $http.get('/api/folders');
  });
