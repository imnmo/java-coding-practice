function fillBusinessPhone()
{   debugger;
var accountname = Xrm.Page.getAttribute("header_process_parentaccountid")
if(accountname!= null){
    var Standard = "Standard";
    var req = new XMLHttpRequest();
    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/accounts?$select=telephone1&$filter=new_accountlongname eq  'accountname'", false);
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
                   Xrm.Page.getAttribute("telephone1").setValue([{ id: cos["telephone1"], entityType: "account" }])
                }
            }
        }
    };}
    try {
        req.send();
    }
    catch (e) {
        alert(e);
    } 
 
