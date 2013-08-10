module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            all: [
                "*.js",
                "!functional.min.js"
            ]
        },
        watch: {
            files: [
                "*.js",
                "!functional.min.js"
            ],
            tasks: ["test"]
        },
        jasmine: {
            src: "functional.js",
            options: {
                specs: "spec.js"
            }
        },
        uglify: {
            my_target: {
                files: {
                    "functional.min.js": [
                        "functional.js"
                    ]
                }
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-jasmine");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask("test", ["jshint", "uglify", "jasmine"]);
};