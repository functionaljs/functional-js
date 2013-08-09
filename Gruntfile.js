module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            all: [
                "*.js"
            ]
        },
        watch: {
            files: [
                "*.js"
            ],
            tasks: ["test"]
        },
        jasmine: {
            src: "functional.js",
            options: {
                specs: "spec.js"
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-jasmine");
    grunt.registerTask("test", ["jshint", "jasmine"]);
};