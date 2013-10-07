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
    watchify: {
      options: {
        debug: true,
        callback: function(b) {
          b.require('./lib/client.js', { expose: '../lib/client' });
          return b;
        }
      },
      lib: {
        src: ['./lib/client.js'],
        dest: './client.js'
      }
    },
    watch: {}
  });

  grunt.registerTask('server', 'Start app server', function() {
    var done = this.async();
    var app =require('./lib/app.js');
    app.start(function(err) {
      if (err) grunt.log.error(err);
      done(!err);
    });
  });

  // Loading dependencies
  for (var key in grunt.file.readJSON("package.json").devDependencies) {
    if (key !== "grunt" && key.indexOf("grunt") === 0) grunt.loadNpmTasks(key);
  }

  grunt.registerTask("dev", ["server", "watchify", "connect", "watch"]);
  grunt.registerTask("test", [/*"mochaTest", */"server", "watchify", "connect", "saucelabs-mocha"]);
};
