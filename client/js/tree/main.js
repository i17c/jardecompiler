define( function( require ) {
  var Backbone = require( 'backbone' );

  var Tree = require( 'utils' ).Tree;

  var TreeView = Backbone.View.extend( {
    el: '#tree',

    initialize: function() {
      _.bindAll( this, "nodeSelected" );
      this.listenTo( Backbone, 'treedata', this.convertData );
    },

    convertData: function( file, data ) {
      this.jar = this.getFileName( file );
      var tree = new Tree( this.jar );
      tree.build( data );
      var treedata = tree.toTreeView();
      this.render( treedata );
    },

    render: function( data ) {
      this.$el.treeview( 'remove' );
      this.$el.treeview( {
        data: data,
        showBorder: false,
        nodeIcon: '',
        onNodeSelected: this.nodeSelected
      } );
    },

    nodeSelected: function( event, node ) {
      if ( node.pkg ) {
        Backbone.trigger( 'decompile', this.jar, node.pkg );
      }
    },

    getFileName: function( file ) {
      return file.replace(/^.*[\\\/]/, '');
    }

  } );

  return {
    View: TreeView
  };
} );