/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var cordova = require('cordova');

function SEF() {
   this.PluginName = ['TV', 'TVMW', 'NNavi', 'Audio', 'AppCommon', 'FrontPanel', 'ImageViewer', 'Player', 'AUI',
                         'Storage', 'Network', 'Download', 'Screen', 'Time', 'Video', 'Window',
                         'ExternalWidgetInterface', 'FileSystem', 'Gamepad', 'Michrophone',
                         'CustomDevice', 'MIDIDevice','RECOG', 'AllShare'];
   this.currentPlugin = null;
   this.pluginSEF = "cordova_plugin_SEF"
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
            console.log('fail to SEF Plugin open')
            throw 'fail to SEF Plugin open'
        }
    } else {
        console.log('this SEF Plugin is not supported')
        throw 'this SEF Plugin is not supported'
    }
};

SEF.prototype.close = function() {
    if(this.currentPlugin) {
        this.currentPlugin.Close();
    } else {
        console.log('this SEF Plugin is NULL')
    }
}

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
