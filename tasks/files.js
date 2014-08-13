var files = {
  grunt: 'Gruntfile.js',

  source: [
    'src/js/spectrumColorpicker.module.js',
    'src/js/spectrumColorpicker.directive.js'
  ],


  dist: 'dist/<%= pkg.name %>.js',
  distMin: 'dist/<%= pkg.name %>.min.js',
  dists: 'dist/*',


  allHTML: '*.html',


  unitTests: 'test/unit/**/*.+(js|coffee)',
  e2eTests: ['test/e2e/SpecHelper.+(js|coffee)', 'test/e2e/*Spec.+(js|coffee)'],
  testEnvKarma: [
    'bower_components/angular/angular.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'bower_components/spectrum/spectrum.js'
  ],

  package: ['package.json', 'bower.json']
};

/* Prepare environments */
files.testEnvKarma = files.testEnvKarma.concat(files.source);


files.testEnv = JSON.parse(JSON.stringify(files.testEnvKarma));
files.demoEnv = JSON.parse(JSON.stringify(files.testEnv));

files.testEnvKarma.unshift('bower_components/jquery/dist/jquery.js');

if (typeof module === 'object') {
  module.exports = files;
}
