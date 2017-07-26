/**
 * Description: Get the ParentAccount Lookup value from Contact 
 * set that value to Customer lookup field in Case Entity
 */


/**
 * Get the corresponding Entity Id and set Customer lookup field
 */
function ContactLookup()
{   
var contactLookup= Xrm.Page.getAttribute("primarycontactid");
var contactLookupId =Xrm.Page.getAttribute("primarycontactid").getValue()[0].id;
setAccountToCustomer(contactLookupId);
}

/**
 * Set Customer Lookup value in Case Entity based on the Contact lookup Id
 * Using OData/REST protocol 
 * @param {String} contactId 
 */
function setAccountToCustomer(contactId)
{
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
var EntityId = Xrm.Page.getAttribute("customerid").setValue([{ id:customerId , name: customerIdFormatted, entityType: "account" }]);
}
else {
alert(this.statusText);
}
}
};
req.send();
}