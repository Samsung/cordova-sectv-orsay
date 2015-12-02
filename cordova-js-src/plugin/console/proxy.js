/*
 * Copyright 2015 Samsung Electronics Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var logger = require('cordova/plugin/logger');

var logLvAlertMap = {};
logLvAlertMap[logger.LOG] = 1;
logLvAlertMap[logger.ERROR] = 2;
logLvAlertMap[logger.WARN] = 3;
logLvAlertMap[logger.INFO] = 4;
logLvAlertMap[logger.DEBUG] = 5;
var levelNameMap = {};
var levelNames = ['LOG', 'ERROR', 'WARN', 'INFO', 'DEBUG'];
for(var i=0; i<levelNames.length; i++) {
    levelNameMap[logger[levelNames[i]]] = levelNames[i];
}

var winAlert = window.alert;

module.exports = {
    logLevel: function (success, fail, args) {	// args contains [level, message]
        winAlert && winAlert('[cordova-plugin-console][' + (levelNameMap[args[0]] || args[0]) + '] ' + args[1], logLvAlertMap[args[0]] || 5);
    }
};

require('cordova/exec/proxy').add('Console',module.exports);
