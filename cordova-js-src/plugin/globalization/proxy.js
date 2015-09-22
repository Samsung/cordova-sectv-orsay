var appParams;
var GlobalizationError = require("cordova/plugin/GlobalizationError");

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
        if(appParams && typeof appParams.country === 'string' && appParams.lang.length > 0) {
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

require("cordova/exec/proxy").add("Globalization", module.exports);
