'use strict';

angular.module('wordleApp')
  .service('documents', function ($http, $resource) {
    console.log('Resouce', $resource);
   	return $resource('/api/documents/:_id', {id: '@id'}, {
    	'update': { method:'PUT' }
	}); 
  });
