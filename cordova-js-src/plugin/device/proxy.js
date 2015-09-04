var orsay = require('cordova/platform');

module.exports = {
    getDeviceInfo: function(success, error) {
        try {
            setTimeout(function{
                success({
                    cordova: orsay.cordovaVersion,
                    platform: 'sectv-orsay',
                    model: webapis.tv.info.getModel(), // "15_HAWKP_UHD"
                    version: webapis.tv.info.getFirmware(), // "T-HKPAKUC-0017.10"
                    uuid: webapis.tv.info.getDeviceID(), // "U7CJYBPYKOKD6"
                    manufacturer : "Samsung Orsay TV"
                });
            },0);
        } catch (e) {
            setTimeout(function{
                error (e);
            },0);
        }
    }
};

require("cordova/exec/proxy").add("Device", module.exports);