module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! Copy P.Csoma <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/**/*.js',
                dest: 'build/js/all.js'
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*.js', 'src/**/*.html', 'src/**/*.css', 'src/**/*.jade'],
                tasks: ['dev'],
                options: {
                    spawn: false,
                }
            }
        },
        clean: ["build/**"],
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['**/*.html', 'img/*'],
                        dest: 'build/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        jshint: {
            // jshintrc: './.jshintrc',
            options: {
                "curly": true,
                "eqnull": true,
                "eqeqeq": true,
                "undef": true,
                "globals": {
                    "jQuery": true,
                    "console": true,
                    "module": true
                }
            },
            all: ['Gruntfile.js', 'src/js/*.js']
        },
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 2,
                    svgoPlugins: [{
                        removeViewBox: false
                    }]
                },
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/img/'
                }]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // Default task(s).
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('dev', ['jshint', 'clean', 'copy', 'uglify']);
    //    grunt.registerTask('dev', ['jshint', 'clean', 'copy', 'uglify', 'imagemin']);

};
