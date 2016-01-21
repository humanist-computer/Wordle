'use strict';

(function() {

class MainController {

  constructor($scope, $http, $q, documents, folders) {
    this.$http = $http;
    this.documents = [];
    this.folders = [];
    this.tree = null;
    this.$scope = $scope;
    // this.data = this.scope;

    console.log(documents);

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

    // this.$scope.$watch('tree', function() {
    //   console.log('hey, myVar has changed!', arguments);
    // }, true);

    // this.$scope.treeOptions = {
    //   dropped: function(e) {
    //     console.log('EEE', e);
    //   }
    // };

    // this.$scope.treeOptions = {
    //   dropped: function (e) {
    //     var sourceValue = e.source.nodeScope.$modelValue,
    //       destValue = e.dest.nodesScope.$nodeScope
    //         ? e.dest.nodesScope.$nodeScope.$modelValue : undefined;
    //     console.log('EEE', sourceValue, destValue);
    //     var document = {
    //       content: sourceValue.content,
    //       title: sourceValue.title,
    //       folderId: destValue.title
    //     };
    //     documents.update({ _id: sourceValue._id }, document);
    //     // Notes.update({ id:$id }, note);
    //   },
    //   accept: function(sourceNode, destNodes, destIndex) {
    //     var data = sourceNode.$modelValue;
    //     var destType = destNodes.$element.attr('data-type');
    //     return (data.type == destType); // only accept the same type
    //   }
    // }



    // $scope.models = {
    //        selected: null,
    //        folders: {"Folder 1": [], "Folder 2": []}
    //    };

       // // Generate initial model
       // for (var i = 1; i <= 3; ++i) {
       //     $scope.models.folders["Folder 1"].push({title: "Item A" + i});
       //     $scope.models.folders["Folder 2"].push({title: "Item B" + i});
       // }

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

       $scope.dropRecieveCb = function(folderName, e) {
           console.log(folderName, e, arguments, $scope);
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

    console.log(this.$scope);
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
  .controller('MainController', MainController);

})();
