let matchdep = require('matchdep');
let mergeFiles = require('./grunt-scripts/mergeFiles.js');

module.exports = function (grunt) {
	var config = require('./.screeps.json')
	var branch = grunt.option('branch') || config.branch;
	var email = grunt.option('email') || config.email;
	var password = grunt.option('password') || config.password;
	var ptr = grunt.option('ptr') ? true : config.ptr


	matchdep.filterAll(['grunt-*', '!grunt-cli']).forEach(grunt.loadNpmTasks);
	mergeFiles(grunt);

	grunt.initConfig({
		screeps: {
			options: {
				email:    config.email,
				password: config.password,
				branch:   config.branch,
				ptr:      config.ptr
			},
			dist:    {
				src: ['dist/*.js']
			}
		},

		copy:      {
			main: {
				expand:  true,
				flatten: true,
				filter:  'isFile',
				cwd:     'dist/',
				src:     '**',
				dest:    '/Users/mievro/Desktop/ScreepsCode/screeps-starter-master'
			},
		},
	});

	grunt.registerTask('default', ['main']);
	grunt.registerTask('main', ['merge', 'write']);
	grunt.registerTask('sandbox', ['merge', 'write-private']);
	grunt.registerTask('merge', 'mergeFiles');
	grunt.registerTask('write', 'screeps');
	grunt.registerTask('write-private', 'copy');
};
