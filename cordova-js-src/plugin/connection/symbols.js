var modulemapper = require('cordova/modulemapper');

modulemapper.clobbers('cordova/plugin/network', 'navigator.connection');
modulemapper.clobbers('cordova/plugin/network', 'navigator.network.connection');
modulemapper.clobbers('cordova/plugin/Connection', 'Connection');