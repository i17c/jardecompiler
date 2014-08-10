/*
 * This file runs right after main.js
 */
require(['underscore'], function(_){

	// add format functionality to all strings
  	String.prototype.format = function () {
		var args = arguments;
		return this.replace(/\{(\d+)\}/g, function (m, n) { return args[n]; });
	}

});