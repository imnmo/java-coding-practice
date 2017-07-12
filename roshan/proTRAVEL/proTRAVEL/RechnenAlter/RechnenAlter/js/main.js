// Your code here!

function Form_OnChange() 
{
    alert("hi");

    debugger;
    var age = 0;

    var now = new Date(); //Todays Date 
    var birthday = Xrm.Page.getAttribute("birthdate").getValue();

    if (birthday != null)
    {

        var bd2 = Now.getFullYear() - birthday.getFullYear();
        age = bd2;
        Xrm.Page.getAttribute("crm1st_alter").getValue().setValue(age);
    }
}


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

if (typeof (cashflowMain) == "undefined")
    cashflowMain = new Object();

cashflowMain.OnLoadForm = function () {
    //debugger;
    try {
        var isCreateForm = Xrm.Page.ui.getFormType() == 1;
        var isUpdateForm = Xrm.Page.ui.getFormType() == 2;
        var isBulkEdit = Xrm.Page.ui.getFormType() == 6;
        var tabs = Xrm.Page.ui.getTabs();

        if (isCreateForm || isBulkEdit) {            
            if (tabs.get(0))
                tabs.get(0).setVisible(false);
            //crmForm.all.tab1Tab.click();
        }

        ///////////////////////////////////////
        ConfigreToolbarDisplay();
        document.body.onresize = function () {
            ConfigreToolbarDisplay();
        }

        function ConfigreToolbarDisplay() {
            HideAssociatedViewButtons('new_new_cashflow_new_cashflowitem', ['Add existing Budget Line to this record']);
        }

        function HideAssociatedViewButtons(loadAreaId, buttonTitles) {
            var navElement = document.getElementById('nav_' + loadAreaId);
            if (navElement != null) {
                navElement.onclick = function LoadAreaOverride() {
                    // Call the original CRM method to launch the navigation link and create area iFrame
                    loadArea(loadAreaId);
                    HideViewButtons(document.getElementById(loadAreaId + 'Frame'), buttonTitles);
                }
            }
        }

        function HideViewButtons(Iframe, buttonTitles) {
            if (Iframe != null) {
                Iframe.onreadystatechange = function HideTitledButtons() {
                    if (Iframe.readyState == 'complete') {
                        var iFrame = frames[window.event.srcElement.id];
                        var liElements = iFrame.document.getElementsByTagName('li');

                        for (var j = 0; j < buttonTitles.length; j++) {
                            for (var i = 0; i < liElements.length; i++) {
                                if (liElements[i].getAttribute('title') == buttonTitles[j]) {
                                    liElements[i].style.display = 'none';
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }

        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

incidentMain.OnSaveForm = function () {
    try {
        var mainWnd = window.parent;
        for (var iCnt = 0; iCnt < mainWnd.frames.length; iCnt++) {
            if (mainWnd.frames[iCnt].save) {
                mainWnd.frames[iCnt].save();
            }
        }
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

function IFRAME_CF_CHART_onload() {

}
function IFRAME_budget_onload() {

}
function IFRAME_editor_onload() {

} 
