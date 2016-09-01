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
var SEF = require('cordova/plugin/SEF');
var OrsayActiveConnectionType = {
    WIFI: 0,
    ETHERNET: 1
};
var OrsayConnectionState = {
    OFFLINE: '0',
    ONLINE: '1'
};

module.exports = {
    getConnectionInfo: function(successCallback, errorCallback) {
        var networkType = Connection.NONE;
        var NetworkPlugin = SEF.get('Network');

        try {
            NetworkPlugin.OnEvent = function(event, data1, data2) {
                var networkEvent = document.createEvent('Event');

                if(event == OrsayActiveConnectionType.WIFI || event == OrsayActiveConnectionType.ETHERNET) {
                    checkNetworkType();
                    switch(data1) {
                    case OrsayConnectionState.OFFLINE:
                        setTimeout(function() {
                            if(!navigator.onLine) { // When network state changed in short time.
                                networkEvent.initEvent('offline', true, true);
                                window.dispatchEvent(networkEvent);
                            }
                        }, 0);
                        break;
                    case OrsayConnectionState.ONLINE:
                        setTimeout(function() {
                            if(navigator.onLine) { // When network state changed in short time.
                                networkEvent.initEvent('online', true, true);
                                window.dispatchEvent(networkEvent);
                            }
                        }, 0);
                        break;
                    }
                }
            };
            checkNetworkType();

            setTimeout(function() {
                successCallback(networkType);
            }, 0);
        }
        catch (e) {
            setTimeout(function() {
                errorCallback(e);
            }, 0);
        }

        function isActive(type) {
            if( webapis._plugin('NETWORK', 'CheckDNS', type) == 1 && webapis._plugin('NETWORK', 'CheckGateway', type) == 1 && webapis._plugin('NETWORK', 'CheckHTTP', type) == 1 && webapis._plugin('NETWORK', 'CheckPhysicalConnection', type) == 1 ) {
                return true;
            }
            else {
                return false;
            }
        }

        function checkNetworkType() {
            if(isActive(OrsayActiveConnectionType.ETHERNET)) {
                console.log('connection network type is Ethernet');
                networkType = Connection.ETHERNET;
            }
            else if(isActive(OrsayActiveConnectionType.WIFI)) {
                console.log('connection network type is Wifi');
                networkType = Connection.WIFI;
            }
            else {
                console.log('network disconnected');
                networkType = Connection.NONE;
            }
            if(navigator.connection) {
                navigator.connection.type = networkType;
            }
        }
    }
};

require('cordova/exec/proxy').add('NetworkStatus', module.exports);
