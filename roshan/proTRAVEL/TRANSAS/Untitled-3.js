/**
 * Get the corresponding Entity Id ,type and Label
 */
function ContactLookup1()
{   
debugger;
var lookup= Xrm.Page.getAttribute("primarycontactid");
var LookupId =Xrm.Page.getAttribute("primarycontactid").getValue()[0].id;
var EntityType =Xrm.Page.getAttribute("primarycontactid").getValue()[0].entityType;
var entityName =Xrm.Page.getAttribute("primarycontactid").getValue()[0].name;
var AccountName=getAccountFromContact(LookupId);
var EntityId=Xrm.Page.getAttribute("parentcustomerid").setValue(AccountName);
}

/**
 * Get CustomerId from Contact Entity
 * @param {String} contactId 
 */
function getAccountFromContact(contactId)
{
//var taxCodeObj = null;
var serverUrl = null;
serverUrl = Xrm.Page.context.getClientUrl();
if (contactId != null || contactId != undefined)
 {
contactId = contactId.replace('{', '');
contactId = contactId.replace('}', '');
serverUrl += "/api/data/v8.0/contacts(" + contactId + ")?$select=*";
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
var result = JSON.parse(this.response);
var customerId = result["_parentcustomerid_value"];
var customerIdFormatted = result["_parentcustomerid_value@OData.Community.Display.V1.FormattedValue"];
}
else {
alert(this.statusText);
alert(this.responseText);
}
}
};

req.send();
}



/**
 * Get the corresponding Account Entity Id,type and lable
 */
function AccountLookup1()
{
var AccountLookup1=Xrm.Page.getAttribute("parentcustomerid");
var EntityId=Xrm.Page.getAttribute("parentcustomerid").getValue()[0].id;
var EntityName=Xrm.Page.getAttribute("parentcustomerid").getValue()[0].entityType;
var LookupName=Xrm.Page.getAttribute("parentcustomerid").getValue()[0].name;
}