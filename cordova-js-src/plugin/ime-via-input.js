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

var focusFlag = true;
var elInput = null;
document.body.addEventListener('focus', function (e) {
    if(document.activeElement && document.activeElement.tagName.toUpperCase() === 'INPUT' && (document.activeElement.type === 'text' || document.activeElement.type === 'password')) {
        if(focusFlag) {
            elInput = document.activeElement;
            onFocus();
            focusFlag = false;
        }
        else {
            focusFlag = true;
        }
    }
}, true);

var imeInstance = null;
function onFocus() {
    if(!bIMEJSInserted) {
        insertIMEJS(onFocus.bind(null));
        return;
    }

    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    /*jshint camelcase: false */
    /*jshint undef: false */
    imeInstance = new IMEShell_Common();

    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
    /*jshint camelcase: true */
    elInput.id = elInput.id || ('ime_'+Date.now());
    imeInstance.inputboxID = elInput.id;
    var title = elInput.getAttribute('data-ime-title') || '';
    imeInstance.inputTitle = title;

    imeInstance.context = this;
    if(elInput.type === 'password') {
        imeInstance.setPasswordMode(false);
        if(elInput.getAttribute('data-ime-show-password') === 'true') {
            imeInstance.setUseShowHidePasswordMenu(true);
        }
    }

    imeInstance.setBlockSpace(true);
    imeInstance.onKeyPressFunc = onKeyCallback;

    elInput.setAttribute('data-toast-ime-shown', 'true');

    imeInstance.onShow();
}

window.onHide = function () {
    onBlur();
};

/*jshint unused: false */
function onKeyCallback(key, str, id) {
    var event = document.createEvent('Event');

    switch(key){
        case 29443: // Orsay ENTER
            event.initEvent('submit', true, true);
            elInput.dispatchEvent(event);
            onBlur();
            break;
        case 88: // Orsay RETURN
        case 45: // Orsay EXIT
            event.initEvent('cancel', true, true);
            elInput.dispatchEvent(event);
            onBlur();
            break;
    }
}

function onBlur() {
    if(imeInstance) {
        imeInstance.onClose();

        elInput.setAttribute('data-toast-ime-shown', 'false');
        elInput.blur();

        imeInstance = null;
    }
}

var bIMEJSInserted = false;
function insertIMEJS(onLoad) {
    if(bIMEJSInserted) {
        return;
    }
    var count = 0;
    var scriptIme = document.createElement('script');
    scriptIme.src = '$MANAGER_WIDGET/Common/IME_XT9/ime.js';
    scriptIme.onload = checkLoaded;
    document.body.appendChild(scriptIme);
    var scriptImeInput = document.createElement('script');
    scriptImeInput.src = '$MANAGER_WIDGET/Common/IME_XT9/inputCommon/ime_input.js';
    scriptImeInput.onload = checkLoaded;
    document.body.appendChild(scriptImeInput);

    function checkLoaded() {
        count++;
        if(count >= 2) {
            bIMEJSInserted = true;
            onFocus && onFocus();
        }
    }
}
