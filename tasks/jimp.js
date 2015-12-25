/*
 * grunt-jimp
 * 
 *
 * Copyright (c) 2015 Max Barry
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('jimp', 'Grunt wrapper for JIMP, the Javascript Image Manipulation Program', function () {


    var done = this.async(),
        jimp = require('jimp'),
        async = require('async'),
        path = require('path');

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      suffix: '',
      actions: {}
    });

    // async.each(this.files, function(file, callback){
    // this.files.forEach( function(file) {
    async.eachSeries(this.files, function(file, callback){

      async.eachSeries(file.src, function(filepath, cb){

        var filenameParts = path.parse(file.dest),
            // n.b. that file extension is always jpg. You need a format where the quality
            // can be reduced so as to have a small image being loaded as the placeholder
            // ipso facto PNGs will become JPEGs.
            outName = filenameParts.name + '.' + options.suffix + filenameParts.ext,
            outPath = path.join(filenameParts.dir, outName);

        if (!grunt.file.exists(filenameParts.dir)) {
          grunt.file.mkdir(filenameParts.dir);
        }

        jimp.read(filepath, function(err, im) {

            if (err) {
              grunt.log.error('Error processing ' + outName + '\n');
              grunt.fail.warn(err);
            }

            for ( var key in options.actions ) {

              var val = options.actions[key];

              try {

                var methCheck = this[key];

                if ( this[key] === undefined ) {

                  this.color([{
                    apply: key,
                    params: [].concat(val)
                  }]);
                  
                } else if (typeof(val) === "boolean" && val) {
                  // Some methods are simply called without argument (e.g. sepia())
                  // Check whether the object is a boolean, and if so only apply method if true
                  this[key]();
                } else {
                  this[key].apply(this, [].concat(val));
                }
                
              } catch (err) {
                grunt.log.error(outPath);
                grunt.fail.warn(err + " for method " + key);
                cb();
              }

            }

            im.write(outPath, function(){
              grunt.log.ok(outPath);
              cb();
            });

        });
      }, callback);

    }, null )



    









    // Merge task-specific and/or target-specific options with these defaults.
    // var options = this.options({
    //   punctuation: '.',
    //   separator: ', '
    // });



    // // Iterate over all specified file groups.
    // this.files.forEach(function (file) {
    //   // Concat specified files.
    //   var src = file.src.filter(function (filepath) {
    //     // Warn on and remove invalid source files (if nonull was set).
    //     if (!grunt.file.exists(filepath)) {
    //       grunt.log.warn('Source file "' + filepath + '" not found.');
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   }).map(function (filepath) {
    //     // Read file source.
    //     return grunt.file.read(filepath);
    //   }).join(grunt.util.normalizelf(options.separator));

    //   // Handle options.
    //   src += options.punctuation;

    //   // Write the destination file.
    //   grunt.file.write(file.dest, src);

    //   // Print a success message.
    //   grunt.log.writeln('File "' + file.dest + '" created.');
    // });



  });

};
