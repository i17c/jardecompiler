var express = require( 'express' );
var app = express();

var PORT = 3000;

global.devmode = false;
global.api = false;
process.argv.forEach( function( val, index, array ) {
  if ( val.toUpperCase() === 'API' ) {
    global.api = true;
  } else if ( val.toUpperCase() === 'DEV' ) {
    global.devmode = true;
  }
} );

app.use( function logAllReqs( req, res, next ) {
  console.log( '%s %s', req.method, req.url );
  next();
} );
app.use( express.static( __dirname + ( global.devmode ? '/../client/' : '/../dist/' ) ) );

// If API passed in during startup we serve json response from files
if ( global.api ) {
  console.log( 'Running STATIC mode...' );
  // app.use( '/', require( './some-file-static' ) );
  useErrorHandling();
} else {
  console.log( 'Running PROD mode...' );
  app.use( '/upload', require( './routes/upload' )( app ) );
  app.use( '/decompile', require( './routes/decompile' )( app ) );
  useErrorHandling();
}

function useErrorHandling() {
  // catch all undefined routes
  app.all( '/*', function( req, res, next ) {
    res.status( 404 ).end();
  } );
  // error middleware
  app.use( function( err, req, res, next ) {
    console.log( err );
    res.status( 500 ).end();
  } );
}

app.listen( PORT );
console.log( 'http://localhost:' + PORT );