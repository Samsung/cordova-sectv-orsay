# cordova-sectv-orsay
cordova-sectv-orsay is an TV application library that allows for Cordova-based projects to be built for the Legacy Samsung Smart TV Platform. Cordova based applications are, at the core, applications written with web technology: HTML, CSS and JavaScript.

# Requires
* 2014's Samsung Smart TV

# Installation
```shell
$ cordova plugin add {{Local or git path to this project}}
```

# How to use
In the 2014's TV
1. Copy the built/cordova.js to your cordova `www` directory root.
2. Insert below code to your `index.html`
```HTML
<script src="cordova.js"></script>
```
3. Zip your `www` directory

# Project Structure
```
    ./
     |-cordova-js-src/ ...... cordova-js orsay platform implementation
     |  |-exec.js ........... cordova/exec module
     |  |-platform.js ....... cordova/platform module having platform definition and bootstrap
     |  |-plugin/ ........... cordova plugin implementations
     |-package.json ......... NPM package configuration
     '-README.md ............ this file
```

# How to Build

# Known Issues
