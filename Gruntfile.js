module.exports = function(grunt) {
  var browsers = [{
      browserName: "firefox",
      platform: "XP"
  }, {
      browserName: "chrome",
      platform: "linux"
  }, {
      browserName: "internet explorer",
      platform: "WIN8",
      version: "10"
  }, {
      browserName: "iphone",
      platform: "OSX 10.8",
      version: "6"
  }, {
      browserName: "chrome",
      platform: "XP"
  }, {
      browserName: "internet explorer",
      platform: "VISTA",
      version: "9"
  }];

  grunt.initConfig({
    connect: {
      server: {
        options: {
          base: "",
          port: 9999
        }
      }
    },
    'saucelabs-mocha': {
      all: {
        options: {
          urls: ["http://127.0.0.1:9999/test/index.html"],
          tunnelTimeout: 5,
          build: process.env.BUILD_NUMBER,
          concurrency: 3,
          browsers: browsers,
          testname: "mocha tests",
          tags: ["master"]
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },
    watch: {}
  });

  // Loading dependencies
  for (var key in grunt.file.readJSON("package.json").devDependencies) {
    if (key !== "grunt" && key.indexOf("grunt") === 0) grunt.loadNpmTasks(key);
  }

  grunt.registerTask("dev", ["connect", "watch"]);
  grunt.registerTask("test", ["mochaTest", "connect", "saucelabs-mocha"]);
};
