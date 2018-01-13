/*

Copies the assets directory over to /build

*/

var shell = require("shelljs");

module.exports = function(grunt) {

  grunt.registerTask("copy", "Copy assets directory", function() {
    if (grunt.file.exists("src/assets")) {
      if (!grunt.file.exists("build/assets")) shell.mkdir("-p", "build/assets");
      shell.cp("-r", "src/assets", "build");
      shell.cp("src/assets/css.css", "build");
      shell.cp("src/assets/animation/maxcon_banner_bg.jpg", "build");
      shell.cp("src/assets/animation/maxcon_banner_biker.png", "build");
    }
  });

}