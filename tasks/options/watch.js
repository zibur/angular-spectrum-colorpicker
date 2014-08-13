var grunt = require('grunt');
var files = require('../files');
var testfiles = files.source.concat([files.grunt]);
var unitTestfiles = grunt.util._.clone(testfiles).concat([files.unitTests]);
var e2eTestfiles = grunt.util._.clone(testfiles).concat([files.e2eTests]);
var bothTestfiles = grunt.util._.clone(unitTestfiles).concat([files.e2eTests]);


module.exports = {
  andtestunit: {
    files: unitTestfiles,
    tasks: ['karma:watch:run']
  },
  andteste2e: {
    files: e2eTestfiles,
    tasks: ['protractor:tdd']
  },
  andtestboth: {
    files: bothTestfiles,
    tasks: ['karma:watch:run', 'protractor:tdd']
  }
};
