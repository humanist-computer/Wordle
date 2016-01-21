'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var FolderSchema = new mongoose.Schema({
  id: String
});

export default mongoose.model('Folder', FolderSchema);
