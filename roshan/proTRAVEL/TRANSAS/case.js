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

if (typeof (incidentMain) == "undefined")
    incidentMain = new Object();

incidentMain.OnLoadForm = function () {
    debugger;
    try {
        Xrm.Page.getAttribute("customerid").setLookupTypes(["account"]);
        var isCreateForm = Xrm.Page.ui.getFormType() == 1;
        var s = "Customer:\nPO number:\nSpares used, Item.nr/serial.nr/price:\n\n\nQuotation:\n\n\nAdditional info:";
       
        // Only enable the dynamic picklist on a Create or Update form.  Disabled and 
        // read-only forms are not editable and so do not require dynamic picklists.
        if (isCreateForm)
            _getAttribute('new_casehistory').setValue(s);

        incidentMain.onChange_new_firsttimefix();

        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

incidentMain.OnSaveForm = function () {
    try {
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

incidentMain.onChange_subjectid = function () {
    try {
        // field "isalldayevent" onchange

        // Get the Industry Element, since this code is re-used by the form's onload event
        // we can not rely on the event.srcElement to have the approriate element.
        var oIndustry = _getAttributeValue('subjectid');

        // Initialize the Sub-Industry indexes
        var iStartIndex = -1;
        var iEndIndex = -1;

        // Depending on what the user selects in the Industry picklist, we will select
        // a range of options in the Sub-Industry picklist to display.
        //
        // For the purposes of this sample, it is assumed that the display text of each
        // Industry will be known and will not be localized.  We have also ordered the
        // options in the Sub-Industry picklist so that they are group sequentially per
        // Industry.  This allows the code to simply define start and stop Sub-Industry
        // indexes for each Industry.
        switch (oIndustry[0].name) {
            case "Navi-Trainer":
                iStartIndex = 1;
                iEndIndex = 3;
                break;
        }

        // Get a reference to the Sub-Industry picklist element for later use        
        var oSubIndustry = _getAttribute('new_additionalsubject');
        // If the indexes where set, update the Sub-Industry picklist
        if (iStartIndex > -1 && iEndIndex > -1) {
            // Create a new array, which will hold the new picklist options
            var oTempArray = new Array();

            // Initialize the index for the temp array
            var iIndex = 0;

            // Now loop through the original Sub-Industry options, pull out the
            // requested options a copy them into the temporary array.
            for (var i = iStartIndex; i <= iEndIndex; i++) {
                //oTempArray[iIndex] = oSubIndustry.originalPicklistOptions[i];
                oTempArray[iIndex] = oSubIndustry.getOptions()[i];
                iIndex++;
            }

            // Reset the Sub-Industry picklist with the new options
            oSubIndustry.clearOptions();
            for (var i = iStartIndex; i <= iEndIndex; i++)
                oSubIndustry.addOption(oTempArray[i], i);

            // Enable the Sub-Industry picklist for the user
            //oSubIndustry.Disabled = false;
            _setDisabled('new_additionalsubject', false);
        }
        else {
            // The user has selected an unsupported Industry or no Industry
            //oSubIndustry.DataValue = null;
            //oSubIndustry.Disabled = true;
            oSubIndustry.setValue('');
            _setDisabled('new_additionalsubject', true);
        }

        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

incidentMain.onChange_new_firsttimefix = function () {
    try {
        // field "new_firsttimefix" onchange

        var newCause = _getAttribute('new_cause');
        var newFirstTimeFixValue = _getAttributeValue('new_firsttimefix');

        if (newFirstTimeFixValue) {
            //hide the lookup
            _setVisible('new_cause_c', false);
            _setVisible('new_cause_d', false);
            newCause.setRequiredLevel(false); //not Required
        }
        else {
            //show the lookup
            _setVisible('new_cause_c', true);
            _setVisible('new_cause_d', true);
            newCause.setRequiredLevel(true); //Required
        }

        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

incidentMain.onChange_new_servicelevel = function () {
    try {
        // field "new_servicelevel" onchange
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};