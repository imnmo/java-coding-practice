/* helper functions */

function _getAttribute(value) {
    return Xrm.Page.getAttribute(value);
};

function _getAttributeValue(value) {
    return _getAttribute(value) ? _getAttribute(value).getValue() : "";
};

function _forceSubmit(fieldName) {
    var forcedField = _getAttribute(value);
    if (forcedField)
        forcedField.setSubmitMode("always");
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

if (typeof (opportunityMain) == "undefined")
    opportunityMain = new Object();

opportunityMain.IFRAME_JetProjectFoldersV5_onload = function () {
};

opportunityMain.IFRAME_JetProjectFoldersV2_onload = function () {
};

opportunityMain.OnLoadForm = function () {
    debugger;
    try {
        var CRM_FORM_TYPE_CREATE = 1;
        var CRM_FORM_TYPE_UPDATE = 2;

        /* JQuery */
        var script = document.createElement('script');
        script.language = 'javascript';
        script.src = '/ISV/scripts/jquery-1.3.2.min.js';
        jQueryIsReady();
        //script.onreadystatechange = function () {
        //    jQueryIsReady();
        //    // if (event.srcElement.readyState == "complete" || event.srcElement.readyState == "loaded")
        //    //    jQueryIsReady();
        //};

        //document.getElementsByTagName('head')[0].appendChild(script);

        function jQueryIsReady() {

            /* Show ECDIS QTY*/
            //parent.$('#new_solutions option:selected').text() == "Ship Solutions" ? $('#new_ecdiswsqty').parents("tr:first").show() : $('#new_ecdiswsqty').parents("tr:first").hide();
            if (Xrm.Page.getAttribute("new_solutions").getSelectedOption() == "Ship Solutions") {
                Xrm.Page.getAttribute("new_ecdiswsqty").controls.get(0).setVisible(true);
            } else {

                Xrm.Page.getAttribute("new_ecdiswsqty").controls.get(0).setVisible(false);
            }


            /* Finance Tab hide */
            // parent.$('#tab3Tab').hide();
            Xrm.Page.ui.tabs.get("Financial KPI").setVisible(false);

            /* PWS v.1 Tab hide */
            //parent.$('#tab6Tab').hide();
            Xrm.Page.ui.tabs.get("v.1").setVisible(false);

            /* Market Sector */

            // only for solutions which market sectors
            if (Xrm.Page.getAttribute("new_solutions").getSelectedOption() == "Ship Solutions" || "Ship Traffic Control Solutions" || "Fleet Operation Solutions" || "Academy Solutions") {
                var markets = { "Unassigned": 400, "Coast Guard/Police": 10, "Coastal Surveillance System": 20, "Container ship": 30, "Cruise/Passenger Ship": 40, "Dry Cargo other ": 50, "Fishing": 60, "Fishing Vessel": 70, "Inland": 80, "Mega Yacht (SOLAS)": 90, "Naval": 100, "Navy": 110, "Offshore": 120, "Offshore Energy Project": 130, "Offshore Supply (OSV)": 140, "Other None SOLAS": 150, "Other STC project/contract": 160, "Pilots": 170, "R&D": 180, "River Information System": 190, "Ro-Ro/Ro-PAX/Car": 200, "Safety": 210, "SAR": 220, "SAR/GMDSS System": 230, "Ship manager": 240, "Shipowner": 250, "STCW, Others": 260, "Tanker (LNG/LPG)": 270, "Tanker (Oil)": 280, "Tanker (Product)": 290, "Tug/Workboat": 300, "Vessel Traffic System": 310, "WebSim": 320 };
                var ShipSolutions = new Array(10, 30, 40, 50, 70, 90, 100, 140, 150, 200, 220, 270, 280, 290, 300, 400);
                var ShipTrafficControlSolutions = new Array(20, 130, 160, 190, 230, 310, 400);
                var FleetOperationSolutions = new Array(240, 250, 400);
                var AcademySolutions = new Array(60, 80, 110, 120, 170, 180, 210, 220, 250, 260, 320, 400);
                var EmptySolutions = new Array(400);
                var arr = EmptySolutions;
                if (Xrm.Page.getAttribute("new_solutions").getSelectedOption().text == "Ship Solutions") arr = ShipSolutions;
                if (Xrm.Page.getAttribute("new_solutions").getSelectedOption().text == "Ship Traffic Control Solutions") arr = ShipTrafficControlSolutions;
                if (Xrm.Page.getAttribute("new_solutions").getSelectedOption().text == "Fleet Operation Solutions") arr = FleetOperationSolutions;
                if (Xrm.Page.getAttribute("new_solutions").getSelectedOption().text == "Academy Solutions") arr = AcademySolutions;

                var marketSectorOptions = new Array(200);
                marketSectorOptions = Xrm.Page.getAttribute("new_marketsector").getOptions();
                for (var i = 0 ; i < marketSectorOptions.length; i++) {
                    var found = false;
                    for (var j = 0; j < arr.length; j++)
                        if (marketSectorOptions[i].value == arr[j]) { found = true; break; }
                    if (!found) Xrm.Page.getControl("new_marketsector").removeOption(marketSectorOptions[i].value);
                }
                //parent.$("#new_marketsector").parents("tr:first").show();
               // Xrm.Page.getAttribute("new_marketsector").controls.get(0).setVisible(true);
                Xrm.Page.ui.controls.get("new_marketsector").setVisible(true);
            }
            else {
                Xrm.Page.ui.controls.get("new_marketsector").setVisible(false);
                //Xrm.Page.getAttribute("new_marketsector").controls.get(0).setVisible(false);
                //parent.$('#new_marketsector option').remove();
                //parent.$("#new_marketsector").parents("tr:first").hide();
            }
            /* Market Sector */
        }

        var SectionNumberNavigational = 1;
        var SectionNumberOrder = 4;
        /*
        if(crmForm.all.CFSTLProjectID.value == "") {
            crmForm.all.CFSTLProjectID.style.background = 'url("/isv/GetTlId/new_project_id.png") right top no-repeat';
            crmForm.all.CFSTLProjectID.style.cursor = 'pointer';
        }
        else
            crmForm.all.CFSTLProjectID.style.background = 'url("/isv/GetTlId/new_project_id_off.png") right top no-repeat';
        */

        // INVESTMENT TAB
        var InvestmentTextValue = "Investment";

        if (Xrm.Page.getAttribute("new_projecttype").getSelectedOption == InvestmentTextValue) {
            Xrm.Page.ui.tabs.get("InvestmentProjectDetails").setVisible(false);
        }
        if (Xrm.Page.getAttribute("new_projecttype").getText() == InvestmentTextValue) {
            Xrm.Page.ui.tabs.get("InvestmentProjectDetails").setVisible(false);
        }
            //if (Xrm.Page.getAttribute("new_meetingdate").getText == InvestmentTextValue) {
            //    Xrm.Page.getAttribute("tab5Tab").style.display = "inline";
            //}
        else {
            Xrm.Page.ui.tabs.get("InvestmentProjectDetails").setVisible(true);
        }
        // END OF INVESTMENT TAB

        if ((Xrm.Page.ui.getFormType() == CRM_FORM_TYPE_CREATE)) {
            // hide Navigational section
            Xrm.Page.ui.tabs.get("General").sections.get("Navigational Project").setVisible(false);

            // hide Order Information section
            Xrm.Page.ui.tabs.get("General").sections.get("Order Information").setVisible(false);
        }

        if ((Xrm.Page.ui.getFormType() == CRM_FORM_TYPE_UPDATE)) {
            if (Xrm.Page.getAttribute("new_department").getSelectedOption == 'Navigation') {
                // show Navigational section
                Xrm.Page.ui.tabs.get("General").sections.get("Navigational Project").setVisible(true);
            }
            else {
                // hide Navigational section
                Xrm.Page.ui.tabs.get("General").sections.get("Navigational Project").setVisible(false);
            }

            if (Xrm.Page.getAttribute("statuscode").getSelectedOption == 'Ordered' ||
                Xrm.Page.getAttribute("statuscode").getSelectedOption == 'Invoiced' ||
                Xrm.Page.getAttribute("statuscode").getSelectedOption == 'Funds received' ||
                Xrm.Page.getAttribute("statuscode").getSelectedOption == 'Suspended') {
                /* Ordered, Invoiced, Funds received, Suspended */
                // show Order Information section
                Xrm.Page.ui.tabs.get("General").sections.get("Order Information").setVisible(true);
            }
            else {
                // hide Order Information section
                Xrm.Page.ui.tabs.get("General").sections.get("Order Information").setVisible(false);
            }
        }

        var el = Xrm.Page.getAttribute("CFSTLProjectID");

        if (el && el.value != '') {
            var elButton = Xrm.Page.getAttribute("ISV_New_**_CreateTLProjectID");
            if (elButton != null)
                elButton.style.display = "none";
        }

        /////////////////////////////////////////
        // Starts Async Project Code Generator
        // set server path
        //TODO still on migration phase
        //var path = '/ISV/GetOpportunityProjectCode2016/'; // '/isv/gettlid/';
        //if (document.all.CFSTLProjectID.value != '') {
        //    document.all.CFSTLProjectID.style.background = 'url("' + path + 'new_project_id_off.png") right top no-repeat';
        //    document.all.CFSTLProjectID.disabled = true;
        //}
        //else {
        //    // style
        //    document.all.CFSTLProjectID.style.background = 'url("' + path + 'new_project_id.png") right top no-repeat';
        //    document.all.CFSTLProjectID.style.cursor = 'pointer';
        //    document.all.CFSTLProjectID.attachEvent("onclick", function () {
        //        try {
        //            window.status = 'Trying to generate Project Code';

        //            var o = getSelectedText(document.all.new_owningorganization);
        //            var d = getSelectedText(document.all.new_department);
        //            var s = getSelectedText(document.all.new_solutions); // new solution new for 2016
        //            var t = getSelectedText(document.all.new_projecttype);
        //            var v = getSelectedText(document.all.new_vat);

        //            d = getSolutionCode(s); // new for 2016
        //            o = getOfficeCode(o);    // new for 2016
        //            t = getProjctTypeCode(t);

        //            if (o == '' || d == '' || t == '' || v == '') {
        //                alert('Please fill in all mandatory fields and try again');
        //                return false;
        //            }

        //            var url = path + 'async.aspx?o=' + o + '&d=' + d + '&t=' + t + '&v=' + v + '&r=' + Math.random();
        //            setLoadingStyle();

        //            var intervalID = window.setInterval(function () {
        //                window.clearInterval(intervalID);
        //                document.all.CFSTLProjectID.disabled = false;
        //                document.all.CFSTLProjectID.value = getCode(url);
        //                document.all.CFSTLProjectID.disabled = true;
        //                setDefaultStyle();
        //                //if (document.all.crmForm != null) document.all.crmForm.Save(); // simulates a user clicking Save
        //            }, 2000);
        //        }
        //        catch (e) {
        //            window.status = 'Project Code fails';
        //            alert('Error occurs while creating Project Code: ' + e.message);
        //        }
        //    });
        //}

        function getOfficeCode(name) {
            // returns solution A3 code for office name
            var code = name.substring(0, 3);
            return code;
        }

        function getProjctTypeCode(name) {
            // returns A1 code for type name
            /*
                    else if (PrjType.IndexOf("Administrative", StringComparison.OrdinalIgnoreCase) > -1) typeLetter = 'A';
                    else if (PrjType.IndexOf("Investment", StringComparison.OrdinalIgnoreCase) > -1) typeLetter = 'I';
                    else if (PrjType.IndexOf("Exhibition", StringComparison.OrdinalIgnoreCase) > -1) typeLetter = 'E';
            */

            var code = "C";
            switch (name) {
                case "Administrative": code = "A";
                    break;

                case "Investment":
                    code = "I";
                    break;

                case "Exhibition":
                    code = "E";
                    break;

                case "Production (P)":
                    code = "P";
                    break;

                case "General Production (G)":
                    code = "G";
                    break;

                case "Product Support (M)":
                    code = "M";
                    break;

                default:
                    code = "C";
                    break;
            }

            return code;
        }

        function getSolutionCode(name) {
            // returns solution A3 code for soluton name
            var code = "";
            switch (name) {
                case "Ship Solutions": code = "SHS";
                    break;

                case "Ship Traffic Control Solutions":
                    code = "STC";
                    break;

                case "IT &amp; Communication Solutions":
                    code = "ITS";
                    break;

                case "Academy Solutions":
                    code = "ACD";
                    break;

                case "Fleet Operation Solutions":
                    code = "FOS";
                    break;

                case "Russian Solution":
                    code = "RUS";
                    break;

                case "Administrative":
                    code = "ADM";
                    break;

                case "Operations":
                    code = "OPR";
                    break;

                default:
                    code = "";
                    break;
            }

            if (code == "")
                alert('Cant find Solution code for name ' + name);

            return code;
        }

        function getSelectedText(obj) {
            if (obj == null) return '';
            if (obj.selectedIndex == null) return '';
            if (obj.options == null) return '';
            var t = '';
            try {
                t = obj.options[obj.selectedIndex].innerHTML;
            }
            catch (e) {
                ;
            }

            return t;
        }

        function setLoadingStyle() {
            document.all.CFSTLProjectID.style.background = 'url("' + path + 'loading.gif") center center';
        }

        function setDefaultStyle() {
            document.all.CFSTLProjectID.style.background = '';
        }

        function getCode(url) {
            var xmlHttpRequest = new ActiveXObject("Msxml2.XMLHTTP");
            xmlHttpRequest.open("get", url, false);
            xmlHttpRequest.send();
            return xmlHttpRequest.status == 200
                ? xmlHttpRequest.responseText : '';
        }

        /////////////////////////////////////////
        // End    Async Code Generator
        /////////////////////////////////////////
        //Hibe Add Existing Buttins
        HideAssociatedViewButtons('new_opportunity_new_cashflow', ['Add existing Budget to this record']);
        HideAssociatedViewButtons('new_opportunity_new_opportunityproductgroup', ['Add existing Opportunity Product Group to this record']);
        //HideAssociatedViewButtons('new_marketkeyword_opportunity', ['Add existing Market Keyword to this record']);

        function HideAssociatedViewButtons(loadAreaId, buttonTitles) {
            var navElement = Xrm.Page.getAttribute('nav_' + loadAreaId);
            if (navElement != null) {
                navElement.onclick = function LoadAreaOverride() {
                    // Call the original CRM method to launch the navigation link and create area iFrame
                    loadArea(loadAreaId);
                    HideViewButtons(Xrm.Page.getAttribute(loadAreaId + 'Frame'), buttonTitles);
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

        //Tooltips
        var Popup = window.createPopup();
        var PopupBody = Popup.document.body;
        PopupBody.style.backgroundColor = 'rgb(255, 255, 174)';
        PopupBody.style.fontFamily = 'Tahoma, Verdana, Arial';
        PopupBody.style.fontSize = '11px';
        PopupBody.style.fontWeight = 'bold';
        PopupBody.style.border = '1px solid #c5c5c5';
        PopupBody.style.color = 'red';
        PopupBody.style.margin = '4px';

        //PopupBody.innerHTML="<p>А day in the future when selected Status Reason will be over and the Opportunity will be advanced to the next Status Reason.</p>";

        function show(message) {
            var x_coord = 0;
            var y_coord = 20;
            var width = 270;
            var height = 70;
            PopupBody.innerHTML = message;
            Popup.show(x_coord, y_coord, width, height, event.srcElement);
        }

        function hide() {
            Popup.hide();
        }
        crmForm.all.estimatedclosedate.attachEvent('onmouseover', function () { return show("А day in the future when selected Status Reason will be over and the Opportunity will be advanced to the next Status Reason."); });
        crmForm.all.estimatedclosedate.attachEvent('onmouseout', hide);

        crmForm.all.estimatedvalue.parentElement.attachEvent('onmouseover', function () { return show("This field is automatically calculated as Sum of Receivables in active Budget. To update the field value please update Budget lines first and press Recalculate button"); });
        crmForm.all.estimatedvalue.parentElement.attachEvent('onmouseout', hide);

        crmForm.all.CFSTLProjectID.attachEvent('onmouseover', function () { return show("To generate Project ID please fill in mandatory fields, save opportunity and only then press this button"); });
        crmForm.all.CFSTLProjectID.attachEvent('onmouseout', hide);

        crmForm.all.new_actualorderdate.parentElement.attachEvent('onmouseover', function () { return show("The Date when Account Manager expects to sign the contract. Mandatory when Status Reason equals Initial Negotiation"); });
        crmForm.all.new_actualorderdate.parentElement.attachEvent('onmouseout', hide);

        //disable budget if autogenerated
        crmForm.all.estimatedvalue.disabled = crmForm.all.new_autogenerate_estimatedvalue.DataValue;

        //Hide calculate button
        function HideButtonById(targetElement, buttonTitle) {
            var liElements = targetElement.getElementsByTagName('li');
            var removedButtons = [];

            for (var i = 0; i < liElements.length; i++) {
                if (liElements[i].getAttribute('id') == buttonTitle) {
                    removedButtons.push({
                        title: liElements[i].getAttribute('id'),
                        element: liElements[i],
                        parent: liElements[i].parentNode,
                        sibling: liElements[i].nextSibling
                    });
                    liElements[i].parentNode.removeChild(liElements[i]);
                    break;
                }
            }

            return removedButtons;
        }

        HideButtonById(document, '_MBcrmFormSubmitCrmForm1truetruefalse');

        // more custom code
    }
    catch (e) {
        console.log('opportunityMain.OnLoadForm');
        console.log(e.message);
    }
};

opportunityMain.OnSaveForm = function () {
    //debugger;
    try {
        // more custom code
    }
    catch (e) {
        console.log('opportunityMain.OnSaveForm');
        console.log(e.message);
    }
};

function Form_onload() {

    try {
        var CRM_FORM_TYPE_CREATE = 1;
        var CRM_FORM_TYPE_UPDATE = 2;

        /* JQuery */
        var script = document.createElement('script');
        script.language = 'javascript';
        script.src = '/ISV/scripts/jquery-1.3.2.min.js';

        script.onreadystatechange = function () {
            if (event.srcElement.readyState == "complete" || event.srcElement.readyState == "loaded")
                jQueryIsReady();
        };

        document.getElementsByTagName('head')[0].appendChild(script);

        function jQueryIsReady() {

            /* Show ECDIS QTY*/
            $('#new_solutions option:selected').text() == "Ship Solutions" ? $('#new_ecdiswsqty').parents("tr:first").show() : $('#new_ecdiswsqty').parents("tr:first").hide();

            /* Finance Tab hide */
            $('#tab3Tab').hide();

            /* PWS v.1 Tab hide */
            $('#tab6Tab').hide();

            /* Market Sector */

            // only for solutions which market sectors
            if (jQuery.inArray($('#new_solutions option:selected').text(), ["Ship Solutions", "Ship Traffic Control Solutions", "Fleet Operation Solutions", "Academy Solutions"]) > -1) {

                var markets = { "Unassigned": 400, "Coast Guard/Police": 10, "Coastal Surveillance System": 20, "Container ship": 30, "Cruise/Passenger Ship": 40, "Dry Cargo other ": 50, "Fishing": 60, "Fishing Vessel": 70, "Inland": 80, "Mega Yacht (SOLAS)": 90, "Naval": 100, "Navy": 110, "Offshore": 120, "Offshore Energy Project": 130, "Offshore Supply (OSV)": 140, "Other None SOLAS": 150, "Other STC project/contract": 160, "Pilots": 170, "R&D": 180, "River Information System": 190, "Ro-Ro/Ro-PAX/Car": 200, "Safety": 210, "SAR": 220, "SAR/GMDSS System": 230, "Ship manager": 240, "Shipowner": 250, "STCW, Others": 260, "Tanker (LNG/LPG)": 270, "Tanker (Oil)": 280, "Tanker (Product)": 290, "Tug/Workboat": 300, "Vessel Traffic System": 310, "WebSim": 320 };
                var ShipSolutions = new Array(10, 30, 40, 50, 70, 90, 100, 140, 150, 200, 220, 270, 280, 290, 300, 400);
                var ShipTrafficControlSolutions = new Array(20, 130, 160, 190, 230, 310, 400);
                var FleetOperationSolutions = new Array(240, 250, 400);
                var AcademySolutions = new Array(60, 80, 110, 120, 170, 180, 210, 220, 250, 260, 320, 400);
                var EmptySolutions = new Array(400);
                var arr = EmptySolutions;
                if ($('#new_solutions option:selected').text() == 'Ship Solutions') arr = ShipSolutions;
                if ($('#new_solutions option:selected').text() == 'Ship Traffic Control Solutions') arr = ShipTrafficControlSolutions;
                if ($('#new_solutions option:selected').text() == 'Fleet Operation Solutions') arr = FleetOperationSolutions;
                if ($('#new_solutions option:selected').text() == 'Academy Solutions') arr = AcademySolutions;

                $('#new_marketsector option').each(function () {
                    var found = false;
                    for (var i = 0; i < arr.length; i++)
                        if ($(this).val() == arr[i]) { found = true; break; }
                    if (!found) $(this).remove();
                });
                Xrm.Page.getAttribute("new_marketsector").setVisible(true);
                //$("#new_marketsector").parents("tr:first").show();
            }
            else {
                Xrm.Page.getAttribute("new_marketsector").setVisible(false);
                //$('#new_marketsector option').remove();
                //$("#new_marketsector").parents("tr:first").hide();
            }
            /* Market Sector */
        }

        var SectionNumberNavigational = 1;
        var SectionNumberOrder = 4;
        /*
        if(crmForm.all.CFSTLProjectID.value == "") {
            crmForm.all.CFSTLProjectID.style.background = 'url("/isv/GetTlId/new_project_id.png") right top no-repeat';
            crmForm.all.CFSTLProjectID.style.cursor = 'pointer';
        }
        else
            crmForm.all.CFSTLProjectID.style.background = 'url("/isv/GetTlId/new_project_id_off.png") right top no-repeat';
        */

        // INVESTMENT TAB
        var InvestmentTextValue = "Investment";

        if (crmForm.all.new_projecttype.SelectedText == InvestmentTextValue) {
            Xrm.Page.ui.tabs.get("tab5Tab").style.display = "inline";
        }
        else {
            Xrm.Page.ui.tabs.get("tab5Tab").style.display = "none";
        }
        // END OF INVESTMENT TAB

        if ((Xrm.Page.ui.getFormType() == CRM_FORM_TYPE_CREATE)) {
            // hide Navigational section
            Xrm.Page.ui.tabs.get("General").childNodes[0].rows[SectionNumberNavigational].style.display = "none";

            // hide Order Information section
            Xrm.Page.ui.tabs.get("General").sections.get("Order Information").setVisible(false);
        }

        if ((Xrm.Page.ui.getFormType() == CRM_FORM_TYPE_UPDATE)) {
            if (crmForm.all.new_department.SelectedText == 'Navigation') {
                // show Navigational section
                Xrm.Page.ui.tabs.get("General").childNodes[0].rows[SectionNumberNavigational].style.display = "inline";
            }
            else {
                // hide Navigational section
                Xrm.Page.ui.tabs.get("General").childNodes[0].rows[SectionNumberNavigational].style.display = "none";
            }

            if (crmForm.all.statuscode.SelectedText == 'Ordered' ||
                crmForm.all.statuscode.SelectedText == 'Invoiced' ||
                crmForm.all.statuscode.SelectedText == 'Funds received' ||
                crmForm.all.statuscode.SelectedText == 'Suspended') {
                /* Ordered, Invoiced, Funds received, Suspended */
                // show Order Information section
                Xrm.Page.ui.tabs.get("General").childNodes[0].rows[SectionNumberOrder].style.display = "inline";
            }
            else {
                // hide Order Information section
                Xrm.Page.ui.tabs.get("General").childNodes[0].rows[SectionNumberOrder].style.display = "none";
            }
        }

        var el = document.getElementById('CFSTLProjectID');

        if (el && el.value != '') {
            var elButton = document.getElementById('ISV_New_**_CreateTLProjectID');
            if (elButton)
                elButton.style.display = "none";
        }

        /////////////////////////////////////////
        // Starts Async Project Code Generator
        // set server path
        var path = '/ISV/GetOpportunityProjectCode2016/'; // '/isv/gettlid/';
        if (document.all.CFSTLProjectID.value != '') {
            document.all.CFSTLProjectID.style.background = 'url("' + path + 'new_project_id_off.png") right top no-repeat';
            document.all.CFSTLProjectID.disabled = true;
        }
        else {
            // style
            document.all.CFSTLProjectID.style.background = 'url("' + path + 'new_project_id.png") right top no-repeat';
            document.all.CFSTLProjectID.style.cursor = 'pointer';
            document.all.CFSTLProjectID.attachEvent("onclick", function () {
                try {
                    window.status = 'Trying to generate Project Code';

                    var o = getSelectedText(document.all.new_owningorganization);
                    var d = getSelectedText(document.all.new_department);
                    var s = getSelectedText(document.all.new_solutions); // new solution new for 2016
                    var t = getSelectedText(document.all.new_projecttype);
                    var v = getSelectedText(document.all.new_vat);

                    d = getSolutionCode(s); // new for 2016
                    o = getOfficeCode(o);    // new for 2016
                    t = getProjctTypeCode(t);

                    if (o == '' || d == '' || t == '' || v == '') {
                        alert('Please fill in all mandatory fields and try again');
                        return false;
                    }

                    var url = path + 'async.aspx?o=' + o + '&d=' + d + '&t=' + t + '&v=' + v + '&r=' + Math.random();
                    setLoadingStyle();

                    var intervalID = window.setInterval(function () {
                        window.clearInterval(intervalID);
                        document.all.CFSTLProjectID.disabled = false;
                        document.all.CFSTLProjectID.value = getCode(url);
                        document.all.CFSTLProjectID.disabled = true;
                        setDefaultStyle();
                        //if (document.all.crmForm != null) document.all.crmForm.Save(); // simulates a user clicking Save
                    }, 2000);
                }
                catch (e) {
                    window.status = 'Project Code fails';
                    alert('Error occurs while creating Project Code: ' + e.message);
                }
            });
        }

        function getOfficeCode(name) {
            // returns solution A3 code for office name
            var code = name.substring(0, 3);
            return code;
        }

        function getProjctTypeCode(name) {
            // returns A1 code for type name
            /*
                    else if (PrjType.IndexOf("Administrative", StringComparison.OrdinalIgnoreCase) > -1) typeLetter = 'A';
                    else if (PrjType.IndexOf("Investment", StringComparison.OrdinalIgnoreCase) > -1) typeLetter = 'I';
                    else if (PrjType.IndexOf("Exhibition", StringComparison.OrdinalIgnoreCase) > -1) typeLetter = 'E';
            */

            var code = "C";
            switch (name) {
                case "Administrative": code = "A";
                    break;

                case "Investment":
                    code = "I";
                    break;

                case "Exhibition":
                    code = "E";
                    break;

                case "Production (P)":
                    code = "P";
                    break;

                case "General Production (G)":
                    code = "G";
                    break;

                case "Product Support (M)":
                    code = "M";
                    break;

                default:
                    code = "C";
                    break;
            }

            return code;
        }

        function getSolutionCode(name) {
            // returns solution A3 code for soluton name
            var code = "";
            switch (name) {
                case "Ship Solutions": code = "SHS";
                    break;

                case "Ship Traffic Control Solutions":
                    code = "STC";
                    break;

                case "IT &amp; Communication Solutions":
                    code = "ITS";
                    break;

                case "Academy Solutions":
                    code = "ACD";
                    break;

                case "Fleet Operation Solutions":
                    code = "FOS";
                    break;

                case "Russian Solution":
                    code = "RUS";
                    break;

                case "Administrative":
                    code = "ADM";
                    break;

                case "Operations":
                    code = "OPR";
                    break;

                default:
                    code = "";
                    break;
            }

            if (code == "")
                alert('Cant find Solution code for name ' + name);

            return code;
        }

        function getSelectedText(obj) {
            if (obj == null) return '';
            if (obj.selectedIndex == null) return '';
            if (obj.options == null) return '';
            var t = '';
            try {
                t = obj.options[obj.selectedIndex].innerHTML;
            }
            catch (e) {
                ;
            }

            return t;
        }

        function setLoadingStyle() {
            document.all.CFSTLProjectID.style.background = 'url("' + path + 'loading.gif") center center';
        }

        function setDefaultStyle() {
            document.all.CFSTLProjectID.style.background = '';
        }

        function getCode(url) {
            var xmlHttpRequest = new ActiveXObject("Msxml2.XMLHTTP");
            xmlHttpRequest.open("get", url, false);
            xmlHttpRequest.send();
            return xmlHttpRequest.status == 200
                ? xmlHttpRequest.responseText : '';
        }

        /////////////////////////////////////////
        // End    Async Code Generator
        /////////////////////////////////////////
        //Hibe Add Existing Buttins
        HideAssociatedViewButtons('new_opportunity_new_cashflow', ['Add existing Budget to this record']);
        HideAssociatedViewButtons('new_opportunity_new_opportunityproductgroup', ['Add existing Opportunity Product Group to this record']);
        //HideAssociatedViewButtons('new_marketkeyword_opportunity', ['Add existing Market Keyword to this record']);

        function HideAssociatedViewButtons(loadAreaId, buttonTitles) {
            var navElement = Xrm.Page.getAttribute('nav_' + loadAreaId);
            if (navElement != null) {
                navElement.onclick = function LoadAreaOverride() {
                    // Call the original CRM method to launch the navigation link and create area iFrame
                    loadArea(loadAreaId);
                    HideViewButtons(Xrm.Page.getAttribute(loadAreaId + 'Frame'), buttonTitles);
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

        //Tooltips
        var Popup = window.createPopup();
        var PopupBody = Popup.document.body;
        PopupBody.style.backgroundColor = 'rgb(255, 255, 174)';
        PopupBody.style.fontFamily = 'Tahoma, Verdana, Arial';
        PopupBody.style.fontSize = '11px';
        PopupBody.style.fontWeight = 'bold';
        PopupBody.style.border = '1px solid #c5c5c5';
        PopupBody.style.color = 'red';
        PopupBody.style.margin = '4px';

        //PopupBody.innerHTML="<p>А day in the future when selected Status Reason will be over and the Opportunity will be advanced to the next Status Reason.</p>";

        function show(message) {
            var x_coord = 0;
            var y_coord = 20;
            var width = 270;
            var height = 70;
            PopupBody.innerHTML = message;
            Popup.show(x_coord, y_coord, width, height, event.srcElement);
        }

        function hide() {
            Popup.hide();
        }
        crmForm.all.estimatedclosedate.attachEvent('onmouseover', function () { return show("А day in the future when selected Status Reason will be over and the Opportunity will be advanced to the next Status Reason."); });
        crmForm.all.estimatedclosedate.attachEvent('onmouseout', hide);

        crmForm.all.estimatedvalue.parentElement.attachEvent('onmouseover', function () { return show("This field is automatically calculated as Sum of Receivables in active Budget. To update the field value please update Budget lines first and press Recalculate button"); });
        crmForm.all.estimatedvalue.parentElement.attachEvent('onmouseout', hide);

        crmForm.all.CFSTLProjectID.attachEvent('onmouseover', function () { return show("To generate Project ID please fill in mandatory fields, save opportunity and only then press this button"); });
        crmForm.all.CFSTLProjectID.attachEvent('onmouseout', hide);

        crmForm.all.new_actualorderdate.parentElement.attachEvent('onmouseover', function () { return show("The Date when Account Manager expects to sign the contract. Mandatory when Status Reason equals Initial Negotiation"); });
        crmForm.all.new_actualorderdate.parentElement.attachEvent('onmouseout', hide);

        //disable budget if autogenerated
        crmForm.all.estimatedvalue.disabled = crmForm.all.new_autogenerate_estimatedvalue.DataValue;

        //Hide calculate button
        function HideButtonById(targetElement, buttonTitle) {
            var liElements = targetElement.getElementsByTagName('li');
            var removedButtons = [];

            for (var i = 0; i < liElements.length; i++) {
                if (liElements[i].getAttribute('id') == buttonTitle) {
                    removedButtons.push({
                        title: liElements[i].getAttribute('id'),
                        element: liElements[i],
                        parent: liElements[i].parentNode,
                        sibling: liElements[i].nextSibling
                    });
                    liElements[i].parentNode.removeChild(liElements[i]);
                    break;
                }
            }

            return removedButtons;
        }

        HideButtonById(document, '_MBcrmFormSubmitCrmForm1truetruefalse');
    }
    catch (e) {
        console.log(e.message);
    }
}
function Form_onsave() {
    try {
        //update contract manager
        var CRM_FORM_TYPE_UPDATE = 2;
        var CRM_FORM_SAVE_MODE_ASSIGN = 47;

        var link = "";

        /* Set Project Code properties */
        $('#CFSTLProjectID').attr("disabled", false);
        $('#CFSTLProjectID').attr("contentEditable", true);

        if ((Xrm.Page.ui.getFormType() == CRM_FORM_TYPE_UPDATE)) {
            /* Product Groups */
            $.get('/ISV/CrmFetchRequests/GetProdGroupByOppID/Default.aspx?id=' + crmForm.ObjectId + '&r=' + Math.random(), function (data) {
                if (data == '0') {
                    alert('You must specify at least one Product group');
                }
                else {
                    if (data != '100') alert('Product groups must have 100% in total, you have ' + data);
                }

                $('#new_message').val('Product: ' + data + '%');
                $('#new_product_group_percent').val(data);
            });

            var baseURL = "/ISV/OpportunityOnChangeContractManager/default.aspx?id=" + crmForm.ObjectId;
            var params = "";

            if (event.Mode == CRM_FORM_SAVE_MODE_ASSIGN) {
                params = "&contractManagerID=" + crmForm.ownerid.DataValue[0].id;
            }

            if (crmForm.all.new_projectmanagerid.IsDirty) {
                params += "&projectManagerID=";
                if (crmForm.all.new_projectmanagerid.DataValue != null) {
                    params += crmForm.all.new_projectmanagerid.DataValue[0].id;
                }
                else {
                    params += "CLEARED";
                }
            }

            if (params != "") {
                link = baseURL + params;
            }
        }

        /*   Market Sector */
        if (jQuery.inArray($('#new_solutions option:selected').text(), ["Ship Solutions", "Ship Traffic Control Solutions", "Fleet Operation Solutions", "Academy Solutions"]) > -1) {
            // reset marketsector to initial state
            if ($('#new_marketsector option:selected').text() == 'Unassigned' || $('#new_marketsector option:selected').text() == '') {
                alert('You must provide a value for Market Sector');
                event.returnValue = false;
                return false;
            }
        }

        /* Project Code for Status */
        if (jQuery.inArray($('#statuscode option:selected').text(), ["Offer submitted", "Ordered", "Invoiced", "Funds received"]) > -1) {
            if (!$('#CFSTLProjectID').val()) {
                alert('You must provide a Project Code');
            }
        }

        if (link != "") {
            //alert("Requesting:" + link );
            AJAX = new ActiveXObject("Microsoft.XMLHTTP");
            if (AJAX) {
                AJAX.open("GET", link, false);
                AJAX.send(null);
                // alert(AJAX.responseText);
            }
        }
    }
    catch (e) {
        console.log(e.message);
    }
}

function new_solutions_onchange() {
    try {
        debugger;
        // only for solutions which market sectors
        /* Show ECDIS QTY*/
        if (Xrm.Page.getAttribute("new_solutions").getSelectedOption() == "Ship Solutions") {
            Xrm.Page.getAttribute("new_ecdiswsqty").controls.get(0).setVisible(true);
        } else {

            Xrm.Page.getAttribute("new_ecdiswsqty").controls.get(0).setVisible(false);
        }
        /* Market Sector */
        // only for solutions which market sectors
        if (Xrm.Page.getAttribute("new_solutions").getSelectedOption() == "Ship Solutions" || "Ship Traffic Control Solutions" || "Fleet Operation Solutions" || "Academy Solutions") {
            var markets = { "Unassigned": 400, "Coast Guard/Police": 10, "Coastal Surveillance System": 20, "Container ship": 30, "Cruise/Passenger Ship": 40, "Dry Cargo other ": 50, "Fishing": 60, "Fishing Vessel": 70, "Inland": 80, "Mega Yacht (SOLAS)": 90, "Naval": 100, "Navy": 110, "Offshore": 120, "Offshore Energy Project": 130, "Offshore Supply (OSV)": 140, "Other None SOLAS": 150, "Other STC project/contract": 160, "Pilots": 170, "R&D": 180, "River Information System": 190, "Ro-Ro/Ro-PAX/Car": 200, "Safety": 210, "SAR": 220, "SAR/GMDSS System": 230, "Ship manager": 240, "Shipowner": 250, "STCW, Others": 260, "Tanker (LNG/LPG)": 270, "Tanker (Oil)": 280, "Tanker (Product)": 290, "Tug/Workboat": 300, "Vessel Traffic System": 310, "WebSim": 320 };
            var ShipSolutions = new Array(10, 30, 40, 50, 70, 90, 100, 140, 150, 200, 220, 270, 280, 290, 300, 400);
            var ShipTrafficControlSolutions = new Array(20, 130, 160, 190, 230, 310, 400);
            var FleetOperationSolutions = new Array(240, 250, 400);
            var AcademySolutions = new Array(60, 80, 110, 120, 170, 180, 210, 220, 250, 260, 320, 400);
            var EmptySolutions = new Array(400);
            var arr = EmptySolutions;
            if (Xrm.Page.getAttribute("new_solutions").getSelectedOption().text == "Ship Solutions") arr = ShipSolutions;
            if (Xrm.Page.getAttribute("new_solutions").getSelectedOption().text == "Ship Traffic Control Solutions") arr = ShipTrafficControlSolutions;
            if (Xrm.Page.getAttribute("new_solutions").getSelectedOption().text == "Fleet Operation Solutions") arr = FleetOperationSolutions;
            if (Xrm.Page.getAttribute("new_solutions").getSelectedOption().text == "Academy Solutions") arr = AcademySolutions;

            var marketSectorOptions = new Array(200);
            marketSectorOptions = Xrm.Page.getAttribute("new_marketsector").getOptions();
            for (var i = 0 ; i < marketSectorOptions.length; i++) {
                var found = false;
                for (var j = 0; j < arr.length; j++)
                    if (marketSectorOptions[i].value == arr[j]) { found = true; break; }
                if (!found) Xrm.Page.getControl("new_marketsector").removeOption(marketSectorOptions[i].value);
            }
            //parent.$("#new_marketsector").parents("tr:first").show();
            //Xrm.Page.getAttribute("new_marketsector").controls.get(0).setVisible(true);
            Xrm.Page.ui.controls.get("new_marketsector").setVisible(false);
        }
        else {
            Xrm.Page.ui.controls.get("new_marketsector").setVisible(true);
            //Xrm.Page.getAttribute("new_marketsector").controls.get(0).setVisible(false);
            //parent.$('#new_marketsector option').remove();
            //parent.$("#new_marketsector").parents("tr:first").hide();
        }
        /* Show ECDIS QTY*/
       
    }
    catch (e) {
        console.log(e.message);
    }
}

function new_salestype_onchange() {
    try {
        debugger;
        // HIDES | Display Sections if Transerv is selected
        var salesType = _getAttribute('new_salestype');
        if (salesType) {
            if (salesType.getSelectedOptions.text!= "TransServ") {
                //TODO: check how it works on CRM2016
                //TODO TranServ Information Section doesnt exist!
                Xrm.Page.ui.tabs.get("General").sections.get("Forecast Information").setVisible(true);
            } else {
                Xrm.Page.ui.tabs.get("General").sections.get("Forecast Information").setVisible(false);
            }
        }
        //var el = Xrm.Page.getAttribute('new_salestype');
        //if (el) {
        //    if (el.options[el.selectedIndex].text != 'TranServ') {
        //        var coll = document.getElementsByTagName('td');
        //        for (var i = 0 ; i < coll.length; i++) {
        //            var parent = coll[i];
        //            if (coll[i].innerText == 'TranServ Information') {
        //                while (parent.tagName != 'TABLE') {
        //                    parent = parent.parentElement;
        //                }
        //                parent.style.display = 'none';
        //            }
        //        }
        //    }
        //    else {
        //        var coll = document.getElementsByTagName('td');
        //        for (var i = 0 ; i < coll.length; i++) {
        //            var parent = coll[i];
        //            if (coll[i].innerText == 'TranServ Information') {
        //                while (parent.tagName != 'TABLE') {
        //                    parent = parent.parentElement;
        //                }
        //                parent.style.display = 'block';
        //            }
        //        }
        //    }
        //}
    }
    catch (e) {
        console.log(e.message);
    }
}

function CFSTLProjectID_onchange() {
    try {
        debugger;
        alert('Check Please');
        if (Xrm.Page.getAttribute("CFSTLProjectID") == null) {
            CFSTLProjectID = ' xx-yyy-9999';
        }
        else {
            alert('TL ProjectID is not emty')
        }
    }
    catch (e) {
        console.log(e.message);
    }
}

function new_tender_onchange() {
    try {
        debugger;
        if (Xrm.Page.getAttribute("new_tender").getSelectedOption == true) {
            Xrm.Page.ui.tabs.get("General").sections.get("Social Pane").setVisible("true");
        } else {
            Xrm.Page.ui.tabs.get("General").sections.get("Social Pane").setVisible("False");
        }
    }
    catch (e) {
        console.log(e.message);
    }
}

function new_projecttype_onchange() {
    try {
        // INVESTMENT TAB
        debugger;
        var InvestmentTextValue = "Investment";

        if (Xrm.Page.getAttribute("new_projecttype").getSelectedOption == InvestmentTextValue) {
            Xrm.Page.ui.tabs.get("InvestmentProjectDetails").setVisible("true");
        }
        else {
            Xrm.Page.ui.tabs.get("InvestmentProjectDetails").setVisible("false");
        }
        // END OF INVESTMENT TAB
    }
    catch (e) {
        console.log(e.message);
    }
}

function statuscode_onchange() {
    try {
        debugger;
        var SectionNumberOrder = 4;
        if (Xrm.Page.getAttribute("statuscode").getSelectedOption().text == 'Ordered' ||
            Xrm.Page.getAttribute("statuscode").getSelectedOption().text == 'Invoiced' ||
            Xrm.Page.getAttribute("statuscode").getSelectedOption().text == 'Funds received') {
            /* Ordered, Invoiced, Funds received, Suspended */
            // show Order Information section
            Xrm.Page.ui.tabs.get("General").sections.get("Order Information").setVisible(false);
        }
        else {
            // hide Order Information section
            Xrm.Page.ui.tabs.get("General").sections.get("Order Information").setVisible(true);
        }
    }
    catch (e) {
        console.log(e.message);
    }
}

function estimatedvalue_onchange() {
}

function new_marketsector_onchange() {
    debugger;
    var arr = new Array(1, 2, 3, 4, 5);
    arr.forEach(function (item, i, arr) {
        alert(item);
    });
}

function new_autogenerate_estimatedvalue_onchange() {

}

function new_department_onchange() {
    try {
        debugger;
        var CRM_FORM_TYPE_CREATE = 1;
        var CRM_FORM_TYPE_UPDATE = 2;

        if ((Xrm.Page.ui.getFormType() == CRM_FORM_TYPE_CREATE)) {
            if (Xrm.Page.getAttribute("new_department").getSelectedOption == 'Navigation') {
                // set probability to 100
                crmForm.all.closeprobability.DataValue = 100;
                // show Navigational section
                Xrm.Page.ui.tabs.get("General").sections.get("Navigational Project").setVisible(true);
            }
            else {
                // hide Navigational section
                Xrm.Page.ui.tabs.get("General").sections.get("Navigational Project").setVisible(false);
            }
        }
    }
    catch (e) {
        console.log(e.message);
    }
}