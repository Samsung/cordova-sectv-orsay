# cordova-sectv-orsay
`cordova-sectv-orsay` is an TV application library that allows for Cordova-based projects to be built for the Legacy Samsung Smart TV (A.K.A Orsay) Platform.
Cordova based applications are, at the core, applications written with web technology: HTML, CSS and JavaScript.

# Supported Platform
* 2014's Samsung Smart TV

# Project Structure
```
    ./
     |-cordova-js-src/ .... cordova-js sectv-orsay platform implementation
     |  |-plugin/ ......... cordova plugin implementations
     |  |-exec.js ......... cordova/exec module
     |  `-platform.js ..... cordova/platform module having platform definition and bootstrap
     |-www/ ............... Project template for Orsay platform
     |-package.json ....... NPM package configuration
     '-README.md .......... this file
```

# How to Build
* Please see [Cordova-js](http://github.com/apache/cordova-js) for more detail.
* Clone the [Cordova-js](http://github.com/apache/cordova-js) project as sibling of this project.
    ```
    ./
     |-cordova-js
     `-cordova-sectv-orsay
    ```

* Add "sectv-orsay" as a target for `Gruntfile.js` in the cordova-js project.
    ```js
    ...
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        "compile": {
            ...
            "sectv-orsay": {},
            "sectv-tizen": {}
        },
        "compile-browserify": {
        ...
    });
    ```

* Add "sectv-orsay" property to "cordova-platforms" to the cordova-js project's `package.json` with path to this project as its value.
    ```JSON
    "cordova-platforms": {
      ...
      "cordova-sectv-orsay": "../cordova-sectv-orsay",
      "cordova-sectv-tizen": "../cordova-sectv-tizen"
    }
    ```
* in the `cordova-js` directory's root:
    ```sh
    $ grunt compile:sectv-orsay
    ```

* Above command will creates `cordova-js/pkg/cordova.sectv-orsay.js`. Let's copy the file to `www` directory which is including Orsay Application project template for further use. In the `cordova-js` directory:
    ```sh
    $ cp ./pkg/cordova.sectv-orsay.js ../cordova-sectv-orsay/www/cordova.js
    ```

# How to use
For creating application package for Orsay TV:

1. Copy the `www` directory's content from your Cordova app to a directory for new orsay project.
2. Create the Orsay's config.xml in the project.
3. Copy the built `cordova-js/pkg/cordova.sectv-orsay.js` or `www/cordova.js` in this project to your cordova `www` directory root with name `cordova.js`.
4. Zip the project's `www` directory to package.

* We recommand to use the [grunt-cordova-sectv](http://github.com/Samsung/grunt-cordova-sectv) task for these process.

# Known Issues
Not yet
