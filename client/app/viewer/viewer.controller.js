'use strict';

(function() {

class ViewerCtrl {
  //start-non-standard
  // menu = [{
  //   'title': 'Home',
  //   'state': 'main'
  // }];

  // isCollapsed = true;
  //end-non-standard

  constructor($scope, $http, $q, documents, folders) {
    this.$http = $http;
    this.documents = [];
    this.folders = [];
    this.tree = null;
    this.$scope = $scope;

    var dataReady = function() {
      this.deserialiseTree($scope);
    }

    var getDocuments = documents.query().$promise;

    getDocuments.then(documents => {
      this.documents = documents;
    });

    folders.then(folders => {
      this.folders = folders.data;
    });

    $q.all([getDocuments, folders]).then(_.bind(dataReady, this));

     // Model to JSON for demo purpose
     $scope.$watch('models', function(model) {
        console.log('Model changed', arguments);
         $scope.modelAsJson = angular.toJson(model, true);
     }, true);

     $scope.dragoverCallback = function(event, index, external, type) {
         $scope.logListEvent('dragged over', event, index, external, type);
         // Disallow dropping in the third row. Could also be done with dnd-disable-if.
         return index < 10;
     };

     $scope.dropCallback = function() {
         console.log('ARGS', arguments);
     };

     $scope.logEvent = function(message, event) {
         console.log(message, '(triggered by the following', event.type, 'event)');
         console.log(event);
     };

     $scope.dragendCallback = function(event, document, folder) {
         console.log(event, document, folder);
     };

     $scope.dropRecieveCb = function(folderName, e, a) {
         console.log(folderName, e, a, $scope);
     };

     $scope.logEvent = function(message, event, z) {
         console.log(message, '(triggered by the following', event.type, 'event)');
         console.log(event);
     };

     $scope.dropCb = function(e, f) {
      if (e.srcElement && e.srcElement.dataset) {
        var docId = e.srcElement.dataset.docId;
      }

      console.log('dropCb', e, f);
     };

     $scope.logListEvent = function(action, event, index, external, type) {
         var message = external ? 'External ' : '';
         message += type + ' element is ' + action + ' position ' + index;
         $scope.logEvent(message, event);
     };

    $scope.toggleFolder = function(){
      // if ($scope.class === "red")
      //   $scope.class = "blue";
      // else
      //   $scope.class = "red";
      //
      console.log('Toggle folder');
    };
  }

  remove(scope) {
    scope.remove();
  };

  toggle(scope) {
    scope.toggle();
  }

  moveLastToTheBeginning() {
    var a = this.$scope.tree.pop();
    $scope.tree.splice(0, 0, a);
  };

  newSubItem(scope) {
    var nodeData = scope.$modelValue;
    nodeData.nodes.push({
      id: nodeData.id * 10 + nodeData.nodes.length,
      title: nodeData.title + '.' + (nodeData.nodes.length + 1),
      nodes: []
    });
  };

  collapseAll() {
    $scope.$broadcast('collapseAll');
  };

  expandAll() {
    $scope.$broadcast('expandAll');
  };

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }

  /**
   * serialiseTree: takes an angular ui.tree client-side model and packs it
   * into the data store as a collection of mongo documents
   */
  serialiseTree() {

  }

  /**
   * deserialiseTree: takes a collection of 'documents' and builds a single
   * client-side 'tree' model for use with angular ui.tree
   */
  deserialiseTree($scope) {

    var models = {
      folders: {

      }
    };

    _.forEach(this.folders, _.bind(function(folder, i) {
      var folderId = folder.id;

      models.folders[folderId] = _.filter(this.documents, {'folderId':
        folder.id});

      // tree.push({
      //   id: i,
      //   title: folder.id,
      //   nodes: _.filter(this.documents, {'folderId': folder.id})
      // });
    }, this));

    $scope.models = models;
  }
}

angular.module('wordleApp')
  .controller('ViewerCtrl', ViewerCtrl);

  })();
