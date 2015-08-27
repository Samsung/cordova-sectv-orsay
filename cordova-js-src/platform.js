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
                var body = document.getElementsByTagName('body')[0];
                var objectElem = '<OBJECT id="SEFObject" classid="clsid:SAMSUNG-INFOLINK-SEF" style="display:block;position:absolute;width:0px;height:0px;"></OBJECT>';
                body.innerHTML += objectElem;
                var SEFObject = document.getElementById('SEFObject');
                retval = SEFObject.Open('AppCommon','1.000','AppCommon');
                console.log('SEF AppCommon Open.......'+retval);
                //모든 키 해제 후 4-way navigation / enter / return key 만 등록
                SEFObject.Execute('UnregisterAllKey');
                SEFObject.Execute('RegisterKey',29460); //up
                SEFObject.Execute('RegisterKey',29461); //down
                SEFObject.Execute('RegisterKey',4); //left
                SEFObject.Execute('RegisterKey',5); //right
                SEFObject.Execute('RegisterKey',29443); //enter
                SEFObject.Execute('RegisterKey',88); // return
                retval = SEFObject.Close();
                console.log('SEF AppCommon close.......'+retval);

                retval = SEFObject.Open('NNavi','1.000','NNavi');
                console.log('SEF NNavi Open.......'+retval);
                // volume / channel banner 보이도록 설정.
                SEFObject.Execute('SetBannerState',2);
                retval = SEFObject.Close();
                console.log('SEF NNavi close.......'+retval);

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
