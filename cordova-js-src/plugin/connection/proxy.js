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

var Connection = require('cordova/plugin/Connection');
var OrsayActiveConnectionType = {
    WIFI: 0,
    ETHERNET: 1
};

module.exports = {
    getConnectionInfo: function(successCallback, errorCallback) {
        var networkType = Connection.NONE;
        try {
            webapis.network.getAvailableNetworks(function(networkList) {
                for( var i = 0; i < networkList.length; i++ ) {
                    if(networkList[i].isActive) {
                        if(networkList[i].interfaceType == OrsayActiveConnectionType.WIFI) {
                            networkType = Connection.WIFI;
                        }
                        else if(networkList[i].interfaceType == OrsayActiveConnectionType.ETHERNET) {
                            networkType = Connection.ETHERNET;
                        }
                        else {
                            networkType = Connection.UNKNOWN;
                        }
                    }
                }
                setTimeout(function() {
                    successCallback(networkType);
                },0);
            },function() {
                networkType = Connection.NONE;
                setTimeout(function() {
                    successCallback(networkType);
                },0);
            });
        }
        catch (e) {
            setTimeout(function() {
                errorCallback(e);
            },0);
        }
    }
};

require('cordova/exec/proxy').add('NetworkStatus', module.exports);
