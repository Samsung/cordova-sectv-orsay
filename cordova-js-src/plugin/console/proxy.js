var logger = require('cordova/plugin/logger');

var logLvAlertMap = {};
logLvAlertMap[logger.LOG] = 1;
logLvAlertMap[logger.ERROR] = 2;
logLvAlertMap[logger.WARN] = 3;
logLvAlertMap[logger.INFO] = 4;
logLvAlertMap[logger.DEBUG] = 5;
var levelNameMap = {};
var levelNames = ["LOG", "ERROR", "WARN", "INFO", "DEBUG"];
for(var i=0; i<levelNames.length; i++) {
	levelNameMap[logger[levelNames[i]]] = levelNames[i];
}

var winAlert = window.alert;
// if((winAlert+"").indexOf("[native code]") < 0) { // "function alert() { [native code] }" is expected
//     winAlert = null;
//     console.warn("window.alert is already overriden. cordova-plugin-console will not work.");
// }

module.exports = {
    logLevel: function (success, fail, args) {	// args contains [level, message]
        winAlert && winAlert('[cordova-plugin-console][' + (levelNameMap[args[0]] || args[0]) + '] ' + args[1], logLvAlertMap[args[0]] || 5);
    }
};

require("cordova/exec/proxy").add("Console",module.exports);