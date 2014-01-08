module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            all: [
                "*.js",
                "!functional.min.js",
                "!functional.min.client.js"
            ]
        },
        watch: {
            files: [
                "*.js",
                "!functional.min.js",
                "!functional.min.client.js"
            ],
            tasks: ["test"]
        },
        jasmine: {
            src: "functional.min.js",
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
            },
            options: {
                banner: "/*!\n    " +
                        "<%= pkg.name %> (v<%= pkg.version %>) <%= grunt.template.today('dd-mm-yyyy') %>\n    " +
                        "(c) <%= pkg.author %>\n" +
                        "*/\n"
            }
        },
        "string-replace": {
            my_target: {
                files: {
                    "functional.min.client.js": "functional.min.js"
                },
                options: {
                    replacements: [{
                        pattern: /λ/g,
                        replacement: "lambda"
                    }]
                }
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-jasmine");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-string-replace");
    grunt.registerTask("test", ["jshint", "uglify", "jasmine", "string-replace"]);
};