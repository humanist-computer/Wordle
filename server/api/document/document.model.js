'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var DocumentSchema = new mongoose.Schema({
  title: String,
  content: String,
  folderId: String
});

export default mongoose.model('Document', DocumentSchema);
