'use strict';
require('./closure/goog/bootstrap/nodejs');
goog.require('goog.array');


var fs = require('fs');
var grunt = require('grunt');

console.log('start');
var closureFiles = grunt.file.expand(
//    ['./closure/**/*.js', './third_party/**/*.js']
    './closure/**/prioritypool.js'
);
goog.array.forEach(closureFiles, function(closureFile) {
  fs.readFile(closureFile, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(/^(\s*)goog\.(.+)\.base\(this, 'constructor'(.*)$/gm, "$1goog.base(this$3");
    result = result.replace(/^(\s*)goog\.(.+)\.base\(this,(.*)$/gm, "$1goog.base(this,$3");
    //result = result.replace(/\b(Array|Object|goog\.iter\.Iterator|goog\.structs\.Trie|goog\.events\.EventHandler|goog\.array\.ArrayLike|goog\.events\.EventId|goog\.iter\.Iterable|goog\.structs\.Map|goog\.Thenable|goog\.Promise|goog\.promise\.Resolver|IThenable|goog\.structs\.Node|goog\.structs\.Queue|goog\.structs\.Set|goog\.structs\.Pool|goog\.structs\.PriorityQueue|goog\.structs\.Heap|goog\.structs\.Collection)</gm, "$1.<");
    fs.writeFile(closureFile, result, 'utf8', function (err) {
      if (err) {
        return console.log(err);
      }
      console.log(closureFile);
    });
  });
});

