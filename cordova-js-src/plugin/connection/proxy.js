var Connection = require('cordova/plugin/Connection');
var OrsayActiveConnectionType = {
    WIFI : 0,
    ETHERNET : 1
};

module.exports = {
    getConnectionInfo: function(successCallback, errorCallback) {
        var networkType = Connection.NONE;
        try {
            webapis.network.getAvailableNetworks(function(networkList){
                for( var i = 0; i < networkList.length; i++ ) {
                    if(networkList[i].isActive) {
                        if(networkList[i].interfaceType == OrsayActiveConnectionType.WIFI){
                            networkType = Connection.WIFI;
                        } else if(networkList[i].interfaceType == OrsayActiveConnectionType.ETHERNET) {
                            networkType = Connection.ETHERNET;
                        } else {
                            networkType = Connection.UNKNOWN;
                        }
                    }
                }
                setTimeout(function(){
                    successCallback(networkType);
                },0);
            },function(){
                networkType = Connection.NONE;
                setTimeout(function(){
                    successCallback(networkType);
                },0);
            });
        } catch (e) {
            setTimeout(function(){
                errorCallback(e);
            },0);
        }
        
    }
};

require("cordova/exec/proxy").add("NetworkStatus", module.exports);