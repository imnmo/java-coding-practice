function OpportunityHideGrid(context) {
    debugger;
    //toggleSection(tabName, sectionName, flag);

    toggleSection("Summary", "Social_pane", false)
}
function toggleSection(Summary, Social_pane, False) {

    var r = Xrm.Page.ui.tabs.get(Summary);
    var p = r.sections.get(Social_pane);
    p.setVisible(False);
}




function genericLock(new_instructiondate, lock) {

    var fieldObj = Xrm.Page.data.entity.attributes.get(new_instructiondate).getValue();
    if (fieldObj != "" && fieldObj != null) {
        Xrm.Page.getControl(new_instructiondate).setDisabled(lock);
    }
}
function onStatusInstructionDateLock(context) {
    debugger;
    genericLock("new_instructiondate", true);
}



function genericLock(new_technicalinstallationdepot, lock) {
    var fieldObj = Xrm.Page.data.entity.attributes.get(new_technicalinstallationdepot).getValue();
    if (fieldObj != "" && fieldObj != null) {
        Xrm.Page.getControl(new_technicalinstallationdepot).setDisabled(lock);
    }
}
function onStatusLock(context) {
    debugger;
    genericLock("new_technicalinstallationdepot", true);
}


function HideOpportunitySubGrid(context) {
    togglefunction("Opportunity_details", false);



}
function togglefunction(Opportunity_details, False) {
    Xrm.Page.getControl(Opportunity_details).setVisible(False);
}


function HideLeadSubgrid(context) {
    toggleSection("Summary", "RELATED_TAB", false);

}


function toggleSection(Summary, TAB, False) {

    var r = Xrm.Page.ui.tabs.get(Summary);
    var p = r.sections.get(TAB);
    p.setVisible(False);
}


function HideIndustry(context) {

    Xrm.Page.ui.controls.get("industrycode").setVisible(false);
}



function HideLeadHeaderField(context) {
    debugger;

    HideHeader("header_leadsourcecode", false);
}




function HideHeader(ldsc, False) {
    if (Xrm.Page.getControl(ldsc) != null)
    { Xrm.Page.getControl(ldsc).setVisible(False); }


}


var priorityControl = Xrm.Page.getControl("header_process_prioritycode");
if (priorityControl != null) {
    priorityControl.setDisabled(true);
}

function autopopulate(context)
{

    autopopulatename("header_process_parentaccountid");
    autopopulatecompany("header_process_parentcontactid");


}

function autopopulatename(header_process_parentaccountid)
{

    var activeaccount = Xrm.Page.getAttribute("header_process_parentaccountid");
    if (activeaccount != null && activeaccount != "")
    {
        Xrm.Page.getAttribute("fullname").SetValue(activeaccount);
    }

    }
    function autopopulatecompany(header_process_parentcontactid)
{
        var activecontact = Xrm.Page.getAttribute("header_process_parentcontactid");
        if (activecontact != null && activecontact != "")
        {
            Xrm.Page.getAttribute("companyname").SetValue(activecontact);

        }
    }

    function autopopulate(context) {
        debugger;
        autopopulatename("header_process_parentaccountid");
        autopopulatecompany("header_process_parentcontactid");


    }

    function autopopulatename(header_process_parentaccountid) {

        var activeaccount = Xrm.Page.getAttribute("parentaccountid").getValue()[0].name;
        if (activeaccount != null && activeaccount != "") {
            Xrm.Page.getAttribute("fullname").SetValue(activeaccount);
        }

    }
    function autopopulatecompany(header_process_parentcontactid) {
        var activecontact = Xrm.Page.getAttribute("parentcontactid").getValue()[0].name;
        if (activecontact != null && activecontact != "") {
            Xrm.Page.getAttribute("companyname").SetValue(activecontact);

        }
    }

    function autopopulate(context) {
        debugger;
        autopopulatename("header_process_parentaccountid");
        autopopulatecompany("header_process_parentcontactid");


    }

    function autopopulatename(header_process_parentaccountid) {

        var activeaccount = Xrm.Page.getAttribute("parentaccountid").getValue()[0].name;
        if (activeaccount != null && activeaccount != "") {
            Xrm.Page.getAttribute("fullname").setValue(activeaccount);
        }

    }
    function autopopulatecompany(header_process_parentcontactid) {
        var activecontact = Xrm.Page.getAttribute("parentcontactid").getValue()[0].name;
        if (activecontact != null && activecontact != "") {
            Xrm.Page.getAttribute("companyname").setValue(activecontact);

        }
    }

    function autopopulatename(context) {

        autopopulatename("header_process_parentaccountid");
        autopopulatecompany("header_process_parentcontactid");


    }

    function autopopulatename(header_process_parentaccountid) {

        var activeaccount = Xrm.Page.getAttribute("parentaccountid").getValue()[0].name;
        if (activeaccount != null && activeaccount != "") {
            Xrm.Page.getAttribute("fullname").setValue(activeaccount);
        }

    }
    function autopopulatecompany(header_process_parentcontactid) {
        var activecontact = Xrm.Page.getAttribute("parentcontactid").getValue()[0].name;
        if (activecontact != null && activecontact != "") {
            Xrm.Page.getAttribute("companyname").setValue(activecontact);

        }
    }


    function autopopulate(context) {
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