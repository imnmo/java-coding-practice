function Form_onLoad(context)
{ 
}
/**
    * Get the corresponding AccountId and set Address field
    */
function accountLookup()
{
    if(Xrm.Page.getAttribute("parentcustomerid")!= null)
    {
        var accountLookupId =Xrm.Page.getAttribute("parentcustomerid").getValue()[0].id;
        setAccountAddress(accountLookupId);
    }
}
/**
 * Set Address1_composite value in Contact Entity based on the Account lookup Id
 * Using OData/REST protocol 
 * @param {String} contactId 
 */
function setAccountAddress(accountId)
{
    var serverUrl = null;
    serverUrl = Xrm.Page.context.getClientUrl();
    if (accountId != null || accountId != undefined)
    {
        accountId = accountId.replace('{', '');
        accountId = accountId.replace('}', '');
        serverUrl += "/api/data/v8.0/accounts(" + accountId + ")?$select=*";
    }

    var req = new XMLHttpRequest();
    req.open("GET", serverUrl, false);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"OData.Community.Display.V1.FormattedValue\"");

    req.onreadystatechange = function ()
    {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                var result = JSON.parse(this.response);     //Set corresponding Account Address Composite field on Contact Form
                if(result["address1_city"]!=null)
                {
                var accountAddressCity= result["address1_city"];
                 Xrm.Page.getAttribute("address1_city").setValue(accountAddressCity);
                }
                if(result["address1_country"]!=null)
                {
                 var accountAddressCountry= result["address1_country"];
                 Xrm.Page.getAttribute("address1_country").setValue(accountAddressCountry);   
                }
                if(result["address1_line1"]!=null)
                {
                var accountAddressline1= result["address1_line1"];
                 Xrm.Page.getAttribute("address1_line1").setValue(accountAddressline1);   
                }
                 if(result["address1_line2"]!=null)
                {
                var accountAddressline2= result["address1_line2"];
                 Xrm.Page.getAttribute("address1_line2").setValue(accountAddressline2);   
                }
                if(result["address1_line3"]!=null)
                {
                var accountAddressline3= result["address1_line3"];
                 Xrm.Page.getAttribute("address1_line3").setValue(accountAddressline3);   
                }
                if(result["address1_line3"]!=null)
                {
                var accountStateorProvience= result["address1_stateorprovince"];
                 Xrm.Page.getAttribute("address1_stateorprovince").setValue(accountStateorProvience);   
                }
                if(result["address1_postalcode"]!=null)
                {
                var accountpostalCode= result["address1_postalcode"];
                 Xrm.Page.getAttribute("address1_postalcode").setValue(accountpostalCode);   
                }
            }
            else {
                alert(this.statusText);
            }
        }
    };
    req.send();
}
function refreshRibbonOnChange()
{
    Xrm.Page.ui.refreshRibbon();
}