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
        console.log("cordova/platform: orsay bootstrap BEGIN");

        var modulemapper = require('cordova/modulemapper');
        var channel = require('cordova/channel');
        var SEF = require('cordova/plugin/SEF');

        modulemapper.clobbers('cordova/exec/proxy', 'cordova.commandProxy');

        for (var k in define.moduleMap) {
            if (/cordova.*\/proxy/.exec(k)) {
                require(k);
            }
            if (/cordova.*\/symbols/.exec(k)) {
                require(k);
            }
        }

        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '$MANAGER_WIDGET/Common/webapi/1.0/webapis.js';
        script.onload = function() {
            channel.onNativeReady.fire();
        }
        head.appendChild(script);

        window.onPause = function () {
            channel.onPause.fire();
        };
        window.onResume = function () {
            channel.onResume.fire();
        };
        window.addEventListener('load', function () {
            window.onShow = function () {
                var retval = null;
                try {
                    var AppCommonPlugin = SEF.get('AppCommon');
                } catch(e){
                    console.log('error....................'+e);
                }
                AppCommonPlugin.Execute('UnregisterAllKey');
                AppCommonPlugin.Execute('RegisterKey',29460); //up
                AppCommonPlugin.Execute('RegisterKey',29461); //down
                AppCommonPlugin.Execute('RegisterKey',4); //left
                AppCommonPlugin.Execute('RegisterKey',5); //right
                AppCommonPlugin.Execute('RegisterKey',29443); //enter
                AppCommonPlugin.Execute('RegisterKey',88); // return

                 try {
                    var NNaviPlugin = SEF.get('NNavi');
                } catch(e){
                    console.log('error....................'+e);
                }

                NNaviPlugin.Execute('SetBannerState',2);
                channel.onDeviceReady.fire();
            };
            if(window.curWidget && typeof curWidget.setPreference == 'function') {
                curWidget.setPreference('ready', 'true');
            }
        });

    // End of bootstrap
        console.log("cordova/platform: orsay bootstrap END");
    }
};
