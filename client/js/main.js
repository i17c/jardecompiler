require.config( {
  paths: {
    underscore: 'libs/underscore-min',
    jquery: 'libs/jquery',
    backbone: 'libs/backbone-min',
    text: 'libs/text',
    moment: 'libs/moment.min',
    bootstrap: 'libs/bootstrap.min',
    bootstrap_treeview: 'libs/bootstrap-treeview',
    prism: 'libs/prism'
  },

  shim: {
    'underscore': {
      exports: '_'
    },

    'backbone': {
      deps: [ 'underscore', 'jquery' ],
      exports: 'Backbone'
    },

    'bootstrap': {
      deps: [ 'jquery' ]
    },

    'bootstrap_treeview': {
      deps: [ 'jquery', 'bootstrap' ]
    },

    'prism' : {
      deps: [],
      exports: 'Prism'
    }
  }
} );

require( [
  'globals',
  'bootstrap',
  'bootstrap_treeview',
  'app'
 ], function( globals, bootstrap, bootstrap_treeview, app ) {
  app.initialize();
} );