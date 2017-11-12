function AccountOnLoad()
{
updateContactAddress();
}
function updateContactAddress() {
    debugger;
    try {
        var contactId;
        var seperateOffice;
        var Id = Xrm.Page.data.entity.getId().substring(1, 37);
        var serverURL = Xrm.Page.context.getClientUrl();
        serverURL += "/api/data/v8.2/contacts?$select=contactid,crm1st_seperateoffice&$filter=_accountid_value eq " + Id + "&$count=true";
        var req = new XMLHttpRequest();
        req.open("GET", serverURL, true);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Prefer", "odata.include-annotations=\"OData.Community.Display.V1.FormattedValue\"");
        if(Id != "" ){
        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                if (this.status == 200) {
                    var data = JSON.parse(this.response);
                    var results = data.value;
                    for (var i = 0; i < results.length; i++) {
                        contactId = results[i].contactid;
                        seperateOffice = results[i].crm1st_seperateoffice;
                        if(seperateOffice == false){
                        updateAccount(contactId);
                        }
                    }
                }
                else {
                    var error = JSON.parse(this.response).error;
                    alert(error.message);
                }
            }
        };
        req.send();
    }
}
    catch (err) { alert(err.message); }
}
function updateAccount(contactId) {

   var address1_country = Xrm.Page.getAttribute("address1_country").getValue();
   var address1_city =Xrm.Page.getAttribute("address1_city").getValue();
    var address1_line1=Xrm.Page.getAttribute("address1_line1").getValue();
     var address1_line2=Xrm.Page.getAttribute("address1_line2").getValue();
     var address1_line3=Xrm.Page.getAttribute("address1_line3").getValue();
     var address1_stateorprovince=Xrm.Page.getAttribute("address1_stateorprovince").getValue();
     var address1_postalcode=Xrm.Page.getAttribute("address1_postalcode").getValue();
    var entity = {};
    entity.address1_city = address1_city ;
    entity.address1_country=address1_country ;
    entity.address1_line1=address1_line1;
    entity.address1_line2=address1_line2;
    entity.address1_line3=address1_line3;
    entity.address1_stateorprovince=address1_stateorprovince;
   entity.address1_postalcode=address1_postalcode;
   

var req = new XMLHttpRequest();
req.open("PATCH", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/contacts(" + contactId + ")", true);
req.setRequestHeader("OData-MaxVersion", "4.0");
req.setRequestHeader("OData-Version", "4.0");
req.setRequestHeader("Accept", "application/json");
req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
req.onreadystatechange = function() {
    if (this.readyState === 4) {
        req.onreadystatechange = null;
        if (this.status === 204) {
            //Success - No Return Data - Do Something
        } else {
            Xrm.Utility.alertDialog(this.statusText);
        }
    }
};
req.send(JSON.stringify(entity));
}

function refreshRibbonOnChange()
{
    Xrm.Page.ui.refreshRibbon();
}
function seperateOfficeCustomRule()
{
if(Xrm.Page.getAttribute("crm1st_seperateoffice")!= null)
{
      var seperateOffice =Xrm.Page.getAttribute("crm1st_seperateoffice").getValue();
     if(seperateOffice  == 1)
return true;
     else
return false;
}
}