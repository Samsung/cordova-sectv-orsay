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

var appParams;
var GlobalizationError = require('cordova/plugin/GlobalizationError');

function parseAppParams() {
    // Example: ?country=US&samsung_country=US&language=1&lang=en&modelid=13_FOXP&server=development&remocon=2_35_259_12&area=USA&product=0&mgrver=5.014&totalMemory=1744830464&webbrowser=true&sourcetype=0&preload=true
    var query = window.location.search || '';
    query = query.split('?');
    query = query.length >= 2 ? query[1] : '';
    var data = query.split('&');
    appParams = {};
    for(var i=0; i<data.length; i++) {
        var tmp = data[i].split('=');
        if(tmp.length >= 2) {
            appParams[tmp[0]] = decodeURIComponent(tmp.slice(1).join(''));
        }
    }
}

module.exports = {
    getPreferredLanguage: function(success, error) {
        if(!appParams) {
            parseAppParams();
        }
        if(appParams && typeof appParams.lang === 'string' && appParams.lang.length > 0) {
            success && setTimeout(function () {
                success({
                    value: appParams.lang
                });
            }, 0);
        }
        else {
            error && setTimeout(function () {
                error(new GlobalizationError(GlobalizationError.UNKNOWN_ERROR));
            }, 0);
        }
    },
    getLocaleName: function(success, error) {
        if(!appParams) {
            parseAppParams();
        }
        if(appParams && typeof appParams.country === 'string' && appParams.country.length > 0) {
            success && setTimeout(function () {
                success({
                    value: appParams.country
                });
            }, 0);
        }
        else {
            error && setTimeout(function () {
                error(new GlobalizationError(GlobalizationError.UNKNOWN_ERROR));
            }, 0);
        }
    }
};

require('cordova/exec/proxy').add('Globalization', module.exports);
