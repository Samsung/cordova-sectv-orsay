function SEF() {
   this.pluginName = ['TV', 'TVMW', 'NNavi', 'Audio', 'AppCommon', 'FrontPanel', 'ImageViewer', 'Player', 'AUI',
                     'Storage', 'Network', 'Download', 'Screen', 'Time', 'Video', 'Window',
                     'ExternalWidgetInterface', 'FileSystem', 'Gamepad', 'Michrophone',
                     'CustomDevice', 'MIDIDevice','RECOG', 'AllShare'];
   
   this.insertPluginList = {};
}

var pluginPrefix = 'cordova_plugin_SEF_';
SEF.prototype.get = function(name) {
    if(__checkPluginName.apply(this,arguments)){
        if(!this.insertPluginList.hasOwnProperty(name)) {
            var body = document.getElementsByTagName('body')[0];
            body.innerHTML += '<OBJECT id="'+ pluginPrefix + name + '" classid="clsid:SAMSUNG-INFOLINK-SEF" style="display:block;position:absolute;width:0px;height:0px;"></OBJECT>';
        } 
        var currentPlugin = document.getElementById(pluginPrefix + name);

        if(currentPlugin.Open(name,'1.000',name) === 1) {
            this.insertPluginList.name = currentPlugin;
            return currentPlugin;
        } 
        else {
            console.log('Failed to open SEF Plugin');
            throw Error('Failed to open SEF Plugin');
        }
    } 
    else {
        console.log('This SEF Plugin name is not supported');
        throw Error('This SEF Plugin name is not supported');
    }
};

SEF.prototype.close = function(name) {
    if(!name){
        for(var key in this.insertPluginList){
            this.insertPluginList[key].Close();
            delete this.insertPluginList[key];
        }
    }
    else if(name && this.insertPluginList.hasOwnProperty(name)) {
        this.insertPluginList.name.Close();
        delete this.insertPluginList.name;
    } 

};

function __checkPluginName(name){
    for(var i=0; i<this.pluginName.length; i++) {
        if(this.pluginName[i].toUpperCase() == name.toUpperCase()) {
            console.log('\treturn '+this.pluginName[i]);
            return this.pluginName[i];
        }
    }
    return null;
}

module.exports = new SEF();
