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

module.exports = {
    id: 'sectv-orsay',
    cordovaVersion: '3.4.0',

    bootstrap: function() {
        console.log('cordova/platform: orsay bootstrap BEGIN');

        var modulemapper = require('cordova/modulemapper');
        var channel = require('cordova/channel');
        var SEF = require('cordova/plugin/SEF');
        var isWebapisLoaded = false;
        var isOnShowEventFire = false;

        modulemapper.clobbers('cordova/exec/proxy', 'cordova.commandProxy');

        var fireNativeReadyEvent = function() {
            if(isWebapisLoaded && isOnShowEventFire) {
                channel.onNativeReady.fire();
            }
        };

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
            isWebapisLoaded = true;
            fireNativeReadyEvent();
            require('cordova/plugin/ime-via-input');
        };
        head.appendChild(script);

        window.onPause = function () {
            channel.onPause.fire();
        };
        window.onResume = function () {
            channel.onResume.fire();
        };
        window.addEventListener('load', function () {
            var AppCommonPlugin = null;
            var NNaviPlugin = null;
            window.onShow = function () {
                try {
                    AppCommonPlugin = SEF.get('AppCommon');
                }
                catch(e) {
                    Error(e);
                }
                AppCommonPlugin.Execute('UnregisterAllKey');
                AppCommonPlugin.Execute('RegisterKey',29460); //up
                AppCommonPlugin.Execute('RegisterKey',29461); //down
                AppCommonPlugin.Execute('RegisterKey',4); //left
                AppCommonPlugin.Execute('RegisterKey',5); //right
                AppCommonPlugin.Execute('RegisterKey',29443); //enter
                AppCommonPlugin.Execute('RegisterKey',88); // return

                try {
                    NNaviPlugin = SEF.get('NNavi');
                }
                catch(e) {
                    Error(e);
                }

                NNaviPlugin.Execute('SetBannerState',2);
                isOnShowEventFire = true;
                fireNativeReadyEvent();
            };

            if(window.curWidget && typeof window.curWidget.setPreference == 'function') {
                window.curWidget.setPreference('ready', 'true');
            }
        });

        window.addEventListener('unload', function () {
            SEF.close();
        });

        window.addEventListener('keydown', function (e) {
            switch(e.keyCode) {
                case 88: // RETURN key
                    // default action disabled.
                    // Calling 'setPreference('return', 'true')' is needed explicitly to exit the application
                    e.preventDefault();
                    break;
                case 45: // EXIT key
                    // NOTHING to prevent.
                    break;
            }
        });

        // End of bootstrap
        console.log('cordova/platform: orsay bootstrap END');
    }
};
