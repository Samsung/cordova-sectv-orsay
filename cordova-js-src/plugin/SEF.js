
function SEF() {
   this.PluginName = ['TV', 'TVMW', 'NNavi', 'Audio', 'AppCommon', 'FrontPanel', 'ImageViewer', 'Player', 'AUI',
                     'Storage', 'Network', 'Download', 'Screen', 'Time', 'Video', 'Window',
                     'ExternalWidgetInterface', 'FileSystem', 'Gamepad', 'Michrophone',
                     'CustomDevice', 'MIDIDevice','RECOG', 'AllShare'];
   this.currentPlugin = null;
   this.pluginSEF = "cordova_plugin_SEF";
}

/**
 * Get SEF Plugin module
 *
 * @param {Function} successCallback The function to call when the heading data is available
 * @param {Function} errorCallback The function to call when there is an error getting the heading data. (OPTIONAL)
 */
SEF.prototype.get = function(name) {
    if(__checkPluginName.apply(this,arguments)){
        if(!document.getElementById(this.pluginSEF)) {
            var body = document.getElementsByTagName('body')[0];
            body.innerHTML += '<OBJECT id="'+ this.pluginSEF + '" classid="clsid:SAMSUNG-INFOLINK-SEF" style="display:block;position:absolute;width:0px;height:0px;"></OBJECT>';
        } else {
            this.currentPlugin.Close();
        }

        this.currentPlugin = document.getElementById(this.pluginSEF);
        if(this.currentPlugin.Open(name,'1.000',name) === 1) {
            return this.currentPlugin;
        } else {
            console.log('Failed to open SEF Plugin');
            throw Error('Failed to open SEF Plugin');
        }
    } else {
        console.log('This SEF Plugin name is not supported');
        throw Error('This SEF Plugin name is not supported');
    }
};

SEF.prototype.close = function() {
    
    if(this.currentPlugin) {
        this.currentPlugin.Close();
    } else {
        console.log('Failed to close SEF Plugin');
        throw Error('Failed to close SEF Plugin');
    }
};

function __checkPluginName(name){
    for(var i=0; i<this.PluginName.length; i++) {
        if(this.PluginName[i].toUpperCase() == name.toUpperCase()) {
            console.log('\treturn '+this.PluginName[i]);
            return this.PluginName[i];
        }
    }
    return null;
}

module.exports = new SEF();
