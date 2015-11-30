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

var SEF = {
    pluginName: ['TV', 'TVMW', 'NNavi', 'Audio', 'AppCommon', 'FrontPanel', 'ImageViewer', 'Player', 'AUI',
                     'Storage', 'Network', 'Download', 'Screen', 'Time', 'Video', 'Window',
                     'ExternalWidgetInterface', 'FileSystem', 'Gamepad', 'Michrophone',
                     'CustomDevice', 'MIDIDevice','RECOG', 'AllShare'],
    insertPluginList: {}
};

var pluginPrefix = 'cordova_plugin_SEF_';
SEF.get = function(name) {
    if(__checkPluginName.apply(this,arguments)) {
        if(!this.insertPluginList.hasOwnProperty(name)) {
            var containerDiv = document.createElement('div');
            containerDiv.style.position = 'absolute';
            containerDiv.style.left = '0px';
            containerDiv.style.top = '0px';
            document.body.appendChild(containerDiv);
            containerDiv.innerHTML += '<OBJECT id="'+ pluginPrefix + name + '" classid="clsid:SAMSUNG-INFOLINK-SEF" style="display:block;position:absolute;width:0px;height:0px;"></OBJECT>';
        }

        var currentPlugin = document.getElementById(pluginPrefix + name);
        currentPlugin.Close();
        if(currentPlugin.Open(name,'1.000',name) === 1) {
            this.insertPluginList[name] = currentPlugin;
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

SEF.close = function(name) {
    var plugin = null;
    if(!name) {
        for(var key in this.insertPluginList) {
            plugin = document.getElementById(this.insertPluginList[key].id);
            plugin.Close();
            delete this.insertPluginList[key];
        }
    }
    else if(name && this.insertPluginList.hasOwnProperty(name)) {
        plugin = document.getElementById(this.insertPluginList[name].id);
        plugin.Close();
        delete this.insertPluginList[name];
    }
};

function __checkPluginName(name) {
    for(var i=0; i<this.pluginName.length; i++) {
        if(this.pluginName[i].toUpperCase() == name.toUpperCase()) {
            console.log('\treturn '+this.pluginName[i]);
            return this.pluginName[i];
        }
    }
    return null;
}

module.exports = SEF;
