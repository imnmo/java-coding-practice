/* helper functions */

function _getAttribute(value) {
    return Xrm.Page.getAttribute(value);
};

function _getAttributeValue(value) {
    return _getAttribute(value) ? _getAttribute(value).getValue() : "";
};

function _setDisabled(fieldName, disabledValue) {
    try {
        Xrm.Page.getControl(fieldName).setDisabled(disabledValue);
    }
    catch (e) {
        console.log(e.message);
    }
};

function _setVisible(fieldName, visible) {
    try {
        Xrm.Page.getControl(fieldName).setVisible(visible);
    }
    catch (e) {
        console.log(e.message);
    }
};

function _toRequirementLevel(boolValue) {
    try {
        return boolValue ? "required" : "none";
    }
    catch (e) {
        console.log(e.message);
    }
};

function _addEventHandler(elem, eventType, handler) {
    if (elem.addEventListener)
        elem.addEventListener(eventType, handler, false);
    else if (elem.attachEvent)
        elem.attachEvent('on' + eventType, handler);
}

function _removeEventHandler(elem, eventType, handler) {
    if (elem.removeEventListener)
        elem.removeEventListener(eventType, handler, false);
    else if (elem.detachEvent)
        elem.detachEvent('on' + eventType, handler);
}

/* helper functions */

if (typeof (accountProductMain) == "undefined")
    accountProductMain = new Object();

accountProductMain.IFRAME_Dsystem_onload = function () {
    try {
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

accountProductMain.OnLoadForm = function () {
    //debugger;
    try {
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

accountProductMain.OnSaveForm = function () {
    try {
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

accountProductMain.SetNewAccProductIdName = function () {
    try {        
        //var selectedProduct = crmForm.all.new_productid.DataValue;
        //if (selectedProduct == null)
        //    crmForm.new_accproductidname.DataValue = "";
        //else
        //    crmForm.all.new_accproductidname.DataValue = selectedProduct[0].name + " " + "(" + crmForm.new_productkey.DataValue + ")";

        var newAccProductIdName = _getAttribute('new_accproductidname');
        var newProductKeyValue = _getAttributeValue('new_productkey');

        var selectedProduct = _getAttributeValue('new_productid');
        if (selectedProduct == null)
            newAccProductIdName.setValue('');
        else
            newAccProductIdName.setValue(selectedProduct[0].name + " " + "(" + newProductKeyValue + ")");
    }
    catch (e) {
        console.log(e.message);
    }
};

accountProductMain.onChange_new_productid = function () {
    try {
        // field "new_productid" onchange
        accountProductMain.SetNewAccProductIdName();
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

accountProductMain.onChange_new_productkey = function () {
    try {
        // field "new_productkey" onchange
        accountProductMain.SetNewAccProductIdName();
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};