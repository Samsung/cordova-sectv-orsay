[![Build Status](https://travis-ci.org/Samsung/cordova-sectv-orsay.svg?branch=master)](https://travis-ci.org/Samsung/cordova-sectv-orsay)

# cordova-sectv-orsay
`cordova-sectv-orsay` is an application library that allows for Cordova-based projects to be built for the Legacy Samsung Smart TV (A.K.A Orsay) Platform.
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
This section describes the build process which creates `cordova.js` file for the `sectv-orsay` cordova platform.
Please see [Cordova-js](http://github.com/apache/cordova-js) for more detail of `compile` task.

1. Clone the [Cordova-js](http://github.com/apache/cordova-js) project as sibling of this project.
    ```sh
    $ git clone https://github.com/Samsung/cordova-sectv-orsay.git
    $ git clone https://github.com/apache/cordova-js.git
    ```
    
    Repositories will be created like below directory structure.
    ```
    ./
     |-cordova-js
     `-cordova-sectv-orsay
    ```

2. Add "sectv-orsay" as a target of "compile" task on `Gruntfile.js` in the cordova-js project.
    ```js
    ...
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        "compile": {
            ...,
            "sectv-orsay": {}
        },
        "compile-browserify": {
        ...
    });
    ```

3. Add "sectv-orsay" property to "cordova-platforms" object in the cordova-js project's `package.json` with path to this project's repository as its value.
    ```JSON
    "cordova-platforms": {
        ...,
        "cordova-sectv-orsay": "../cordova-sectv-orsay"
    }
    ```

4. In the `cordova-js` directory's root, run below command to create `cordova-js/pkg/cordova.sectv-orsay.js` file.
    ```sh
    $ grunt compile:sectv-orsay
    ```

5. We recommend to copy the created file to the `www` directory which is including Orsay Application project templates for further use. In the `cordova-js` directory:
    ```sh
    $ cp ./pkg/cordova.sectv-orsay.js ../cordova-sectv-orsay/www/cordova.js
    ```

# How to use
For creating application package for Orsay TV:

1. Copy your Cordova project's `www` directory which includes your application implementation to a new directory for the orsay project.

    Assuming we've developed a Cordova project named as "MyProject" and it is located as a sibling of `cordova-sectv-orsay`.
    ```
    ./
     |-cordova-js
     |-cordova-sectv-orsay
     `-MyProject
       |- platforms
       |- plugins
       |- www
       |  |- index.html
       |  `- ...
       `- config.xml
    ```

    ```sh
    $ cd MyProject
    $ cp -rf ./www ./orsayprj
    ```
    
2. Create the Orsay `config.xml` file in the orsay project.
3. Copy the built `cordova-js/pkg/cordova.sectv-orsay.js` to your new orsay project root with name `cordova.js`.
    ```sh
    $ cp ../cordova-js/pkg/cordova.sectv-orsay.js ./orsayprj/cordova.js
    ```

4. Zip the orsay project directory to package.
    ```sh
    $ zip -r MyProject_sectv-orsay.zip ./orsayprj
    ```

* We recommand to use the [grunt-cordova-sectv](http://github.com/Samsung/grunt-cordova-sectv) Grunt task to automate these process.

# Known Issues
Not yet

[![Analytics](https://ga-beacon.appspot.com/UA-70262254-1/cordova-sectv-orsay/README)](https://github.com/igrigorik/ga-beacon)
