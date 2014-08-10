var express = require( 'express' );
var path = require( 'path' );
var AdmZip = require( 'adm-zip' );
var multer = require( 'multer' );

var PATH_UPLOADS = path.join( __dirname, '..', 'uploads' );

module.exports = function( app ) {
  var router = express.Router();

  app.use( multer( {
    dest: PATH_UPLOADS,
    rename: function( fieldname, filename ) {
      return filename;
    } //,
    // onFileUploadStart: function( file ) {
    //   if ( file.originalname == 'cityTop.png' ) {
    //     console.log( 'file already uploaded' );
    //     return false;
    //   }
    // }
  } ) );

  router.route( '/' )
    .post( function( req, res, next ) {
      var files = getClassFiles( req.files.jarfile.path );
      res.json( {
        files: files
      } );
    } );

  return router;
};

function getClassFiles( file ) {
  var classFiles = [];

  var jar = new AdmZip( file );
  var zipEntries = jar.getEntries();

  zipEntries.forEach( function( zipEntry ) {
    var name = zipEntry.name;
    var isClassFile = !zipEntry.isDirectory && path.extname( name ) === '.class';
    if ( isClassFile ) {
      classFiles.push(zipEntry.entryName);
    }
  } );

  return classFiles;
}