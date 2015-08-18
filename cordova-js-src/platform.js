/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

module.exports = {
    id: 'sectv-orsay',
    cordovaVersion: '3.4.0',

    bootstrap: function() {

        var modulemapper = require('cordova/modulemapper');
        var channel = require('cordova/channel');

        modulemapper.clobbers('cordova/exec/proxy', 'cordova.commandProxy');

        for (var k in define.moduleMap) {
            if (/cordova.*\/proxy/.exec(k)) {
                require(k);
            }
            if (/cordova.*\/symbols/.exec(k)) {
                require(k);
            }
        }

        channel.onNativeReady.fire();

        window.onPause = function () {
            channel.onPause.fire();
        };
        window.onResume = function () {
            channel.onResume.fire();
        };
        document.addEventListener('load', function () {
            window.onShow = function () {
                channel.onDeviceReady.fire();
            };
            if(window.curWidget && typeof curWidget.setPreference == 'function') {
                curWidget.setPreference('ready', 'true');
            }
        });

    // End of bootstrap
    }
};
