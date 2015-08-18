module.exports = {
    logLevel: function (success, fail, args);
};

require("cordova/exec/proxy").add("Console",module.exports);