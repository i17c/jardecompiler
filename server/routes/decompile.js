var express = require( 'express' );
var path = require( 'path' );
var exec = require( 'child_process' ).exec;
var AdmZip = require( 'adm-zip' );

var PATH_UPLOADS = path.join( __dirname, '..', 'uploads' );
var PATH_EXTRACTED = path.join( PATH_UPLOADS, 'class' );
var JAD_EXE = path.join( __dirname, '..', '/libs/jad.exe' );
var JAD_ARGS = ' -pi999 -lnc -b -ff -i -o -p -space ';

module.exports = function( app ) {
  var router = express.Router();

  router.route( '/:jar/:entry' )
    .get( function( req, res, next ) {
      var jarfile = req.params.jar;
      var entry = req.params.entry.replace( /\./g, '/' ) + '.class';

      var jar = new AdmZip( path.join( PATH_UPLOADS, jarfile ) );
      var file = path.join( PATH_EXTRACTED, entry );
      var cmd = JAD_EXE + JAD_ARGS + file;

      jar.extractEntryTo( entry, PATH_EXTRACTED, true, true );

      var child = exec( cmd, function( error, stdout, stderr ) {
        if ( !stdout ) {
          return next( {
            err: stderr
          } );
        }
        // success
        res.json( {
          source: stdout
        } );
      } );

    } );

  return router;
};