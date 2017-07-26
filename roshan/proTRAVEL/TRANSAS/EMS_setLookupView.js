/*
Javascript ***Lead Entity***
Created on: 07/05/2017
*/

//Function onLoad
function onLoad()
{
    hideLeadSubgrid();
    autopopulateOnLoad();
    hideFields();
    setLookupView();
}

//Function Onchange
function onChange()
{
    autopopulate();
}
//Hide RELATED_TAB subgrid from Summary tab
function hideLeadSubgrid() {
    toggleSection("Summary", "RELATED_TAB", false);
}


function toggleSection(Summary, TAB, False) {

    var r = Xrm.Page.ui.tabs.get(Summary);
    var p = r.sections.get(TAB);
    p.setVisible(False);
}

//Autopopulate lastname and companyname based on parentaccountid und parentcontactid 
function autopopulate() {
    debugger;
    autopopulatename("header_process_parentaccountid");
    autopopulatecompany("header_process_parentcontactid");


}

function autopopulatename(header_process_parentaccountid) {

    var activecontact = Xrm.Page.getAttribute("parentcontactid").getValue()[0].name;
    if (activecontact != null && activecontact != "") {
        Xrm.Page.getAttribute("lastname").setValue(activecontact);
    }

}
function autopopulatecompany(header_process_parentcontactid) {
    var activeaccount = Xrm.Page.getAttribute("parentaccountid").getValue()[0].name;
    if (activeaccount != null && activeaccount != "") {
        Xrm.Page.getAttribute("companyname").setValue(activeaccount);
    }
}
function hideFields()
{
    Xrm.Page.ui.controls.get("parentaccountid").setVisible(false);
    Xrm.Page.ui.controls.get("parentcontactid").setVisible(false);
}

//Autopopulate lastname and companyname based on parentaccountid und parentcontactid 
function autopopulateOnLoad() {
    autopopulatename();
    autopopulatecompany();
}


function autopopulatename() {
    var x = Xrm.Page.data.entity.attributes.get("parentcontactid").getValue();
    if (x != null && x != "") {
        var activecontact = Xrm.Page.getAttribute("parentcontactid").getValue()[0].name;
        if (activecontact != null && activecontact != "") {
            Xrm.Page.getAttribute("lastname").setValue(activecontact);
        }
    }
}
function autopopulatecompany() {
    var y = Xrm.Page.data.entity.attributes.get("parentaccountid").getValue();

    if (y != null && y != "") {
        var activeaccount = Xrm.Page.getAttribute("parentaccountid").getValue()[0].name;
        if (activeaccount != null && activeaccount != "") {
            Xrm.Page.getAttribute("companyname").setValue(activeaccount);
        }
    }
}

function setLookupView()
{
    Xrm.Page.getControl("header_process_crm1st_depot").setDefaultView("{2C95AA95-4331-E711-80FB-5065F38B15B1}");
}