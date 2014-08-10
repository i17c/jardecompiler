define( function( require ) {
  var Prism = require('prism');
  var Backbone = require( 'backbone' );

  var CodeModel = Backbone.Model.extend( {
    url: function() {
      return 'decompile/{0}/{1}'.format( this.get( 'jar' ), this.get( 'pkg' ) );
    }
  } );

  var CodeView = Backbone.View.extend( {
    el: '#source',

    initialize: function() {
      this.model = new CodeModel();
      this.listenTo( this.model, 'change', this.render );
      this.listenTo( Backbone, 'decompile', this.decompile );
    },

    decompile: function( file, pkg ) {
      this.model.set( {
        jar: file,
        pkg: pkg
      }, {silent: true } );
      this.model.fetch();
    },

    render: function() {
      this.$( 'code' ).html( this.model.get( 'source' ) );
      Prism.highlightAll();
      this.$el.scrollTop( 0 );
    }

  } );

  return {
    View: CodeView
  };

} );