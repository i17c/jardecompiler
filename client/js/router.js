// Filename: router.js
define([
  'backbone',
  'tree/main',
  'upload/main',
  'content/main'
], function (Backbone, Tree, Upload, Code) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'index',
      'decompile/:jar/:pkg': 'decompile'
    },

    index: function () {
      // upload form
      var uploadView = new Upload.View();
      uploadView.render();

      // treeview
      var treeView = new Tree.View();
      
      // code
      var codeView = new Code.View();
    },

    decompile: function (jar, pkg) {
      //console.log('decompile', jar, pkg);
    }
  });

  var initialize = function () {
    var app_router = new AppRouter();
    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});