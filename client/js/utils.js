define( function( requie ) {
  var $ = require( 'jquery' );
  var _ = require( 'underscore' );

  var Tree = function( root ) {
    this.root = Tree.createNode( root || 'root' );
  };

  Tree.createNode = function( name ) {
    return {
      name: name,
      children: []
    };
  };

  Tree.prototype.build = function( paths ) {
    var self = this;
    _.each( paths, function( path ) {
      self.addPath( path );
    } );
  };

  Tree.prototype.addPath = function( path ) {
    var self = this;
    var names = path.split( '/' );
    var parent = this.root;
    _.each( names, function( name ) {
      parent = self.addChild( parent, name );
    } );
  };

  Tree.prototype.addChild = function( parent, name ) {
    var children = _.pluck( parent.children, 'name' );
    var idx = children.indexOf( name );
    var node;
    if ( idx === -1 ) {
      node = Tree.createNode( name );
      parent.children.push( node );
    } else {
      node = parent.children[ idx ];
    }
    return node;
  };

  Tree.prototype.toTreeView = function() {
    var treedata = [];
    this.traverseTree( this.root, treedata, '', this.root.name );
    return treedata;
  };

  Tree.prototype.traverseTree = function( node, data, pkg, jar ) {
    var self = this;
    var treenode = {
      text: node.name
    };

    data.push( treenode );

    pkg += pkg.length === 0 ? node.name : '.' + node.name;

    if ( node.children.length === 0 ) {
      pkg = pkg.replace(jar + '.', '');
      pkg = pkg.replace( '.class', '' );
      treenode.pkg = pkg;
    } else {
      treenode.nodes = [];
      _.each( node.children, function( child ) {
        self.traverseTree( child, treenode.nodes, pkg, jar );
      } );
    }

  };


  return {
    Tree: Tree
  };


} );