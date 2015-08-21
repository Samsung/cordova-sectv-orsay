var modulemapper = require('cordova/modulemapper');

modulemapper.clobbers('cordova/plugin/logger', 'cordova.logger');
modulemapper.clobbers('cordova/plugin/console-via-logger', 'console');