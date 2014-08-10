define( function( require ) {
  var _ = require( 'underscore' );
  var Backbone = require( 'backbone' );

  var uploadTemplate = require( 'text!upload/form.htm' );

  var UploadView = Backbone.View.extend( {
    el: '#uploadForm',
    template: _.template( uploadTemplate ),

    events: {
      'change input': 'uploadFile'
    },

    render: function() {
      this.$el.html( this.template() );
    },

    uploadFile: function( e ) {
      e.preventDefault();

      var file = $( 'input[name="jarfile"]' )[ 0 ].files[ 0 ];
      var data = new FormData();
      data.append( 'jarfile', file );

      $.ajax( {
        url: 'upload',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function( data ) {
          Backbone.trigger( 'treedata', file.name, data.files );
        },
        error: function() {
          console.log( 'error uploading file' );
        }
      } );
    }

  } );

  return {
    View: UploadView
  };
} );