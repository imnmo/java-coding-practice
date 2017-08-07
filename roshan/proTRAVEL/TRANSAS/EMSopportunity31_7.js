/* Javascript***Opportunity Entity***
Created On: 07.05.2017
*/
//Function onLoad
function onLoad()
{
   
    OpportunityHideGrid();
    HideOpportunitySubGrid();
    setLookupView();
	priceList();
   
}

//Hide the Subgrid SocialPane in Summary Tab

function OpportunityHideGrid() {
    debugger;
    //toggleSection(tabName, sectionName, flag);

    toggleSection("Summary", "Social_pane", false)
}
function toggleSection(Summary, Social_pane, False) {

    var r = Xrm.Page.ui.tabs.get(Summary);
    var p = r.sections.get(Social_pane);
    p.setVisible(False);
}
//Hide the Subgrid Opportunity_details in Summary Tab
function HideOpportunitySubGrid() {
    togglefunction("Summary","Opportunity_details", false);



}
function togglefunction(Summary, Opportunity_details, False) {
    var r = Xrm.Page.ui.tabs.get(Summary);
    var p = r.sections.get(Opportunity_details);
    p.setVisible(False);
   
}
/*Set Depot(Account) as the default view for the Depot field in the Business process flow*/
function setLookupView()
{
if((Xrm.Page.getControl("header_process_crm1st_depot")) != null)
   {Xrm.Page.getControl("header_process_crm1st_depot").setDefaultView("{2C95AA95-4331-E711-80FB-5065F38B15B1}");}
}
/*Set Default lookup value to pricelist field */
function priceList()
{
    var Standard = "Standard";
    var req = new XMLHttpRequest();
    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/pricelevels?$select=name&$filter=name eq  'Standard'", false);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"OData.Community.Display.V1.FormattedValue\"");

    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                var result = JSON.parse(this.response);
                if (result.value.length > 0) {
                    var cos = result.value[0];
                   Xrm.Page.getAttribute("pricelevelid").setValue([{ id: cos["pricelevelid"], name: "Standard", entityType: "pricelevel" }])
                }
            }
        }
    };
    try {
        req.send();
    }
    catch (e) {
        alert(e);
    }

}
