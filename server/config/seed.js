/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import Document from '../api/document/document.model';
import Folder from '../api/folder/folder.model';
import User from '../api/user/user.model';

// Thing.find({}).removeAsync()
//   .then(() => {
//     Thing.create({
//       name: 'Development Tools',
//       info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
//              'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
//              'Stylus, Sass, and Less.'
//     }, {
//       name: 'Server and Client integration',
//       info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
//              'AngularJS, and Node.'
//     }, {
//       name: 'Smart Build System',
//       info: 'Build system ignores `spec` files, allowing you to keep ' +
//              'tests alongside code. Automatic injection of scripts and ' +
//              'styles into your index.html'
//     }, {
//       name: 'Modular Structure',
//       info: 'Best practice client and server structures allow for more ' +
//              'code reusability and maximum scalability'
//     }, {
//       name: 'Optimized Build',
//       info: 'Build process packs up your templates as a single JavaScript ' +
//              'payload, minifies your scripts/css/images, and rewrites asset ' +
//              'names for caching.'
//     }, {
//       name: 'Deployment Ready',
//       info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
//              'and openshift subgenerators'
//     });
//   });

Document.find({}).removeAsync()
  .then(() => {
    Document.create({
      title: 'Development Tools',
      content: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.',
      folderId: 'First folder'
    }, {
      title: 'Server and Client integration',
      content: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.',
      folderId: 'First folder'
    }, {
      title: 'Smart Build System',
      content: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html',
      folderId: 'First folder'
    }, {
      title: 'Modular Structure',
      content: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability',
      folderId: 'Second folder'
    }, {
      title: 'Optimized Build',
      content: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.',
      folderId: ''
    }, {
      title: 'Deployment Ready',
      content: 'Easily deploy your app to Heroku or Openshift with the ' +
             'heroku and openshift subgenerators',
      folderId: 'First folder'
    });
  });

Folder.find({}).removeAsync()
  .then(() => {
    Folder.create({
      id: 'First folder'
    }, {
      id: 'Second folder'
    });
  });

User.find({}).removeAsync()
  .then(() => {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
