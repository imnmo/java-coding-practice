/// <reference path="c:\users\hajira.razak\documents\visual studio 2015\Projects\CRMFIRST.Internes.MainProject.WebResources\_IntellisenseEntityFiles/Xrm.js" />
/// <reference path="c:\users\hajira.razak\documents\visual studio 2015\Projects\CRMFIRST.Internes.MainProject.WebResources\CommonLibraries/dynamics-web-api-callbacks.js" />



//For the CRUD Operation to CRM use DynamicsWebApi for Microsoft Dynamics CRM Web API - Documentation here: https://github.com/AleksandrRogov/DynamicsWebApi
//Please use the version with the Callback

var CrmFirst = CrmFirst || {};
CrmFirst.Internes = CrmFirst.Internes || {};
CrmFirst.Internes.MainProject = CrmFirst.Internes.MainProject || {};

CrmFirst.Internes.MainProject.Contact = {
    Form: {
        Load: function () {
            debugger;
           // CrmFirst.Internes.MainProject.Contact.Form.seperateofficeOnChange();
              CrmFirst.Internes.MainProject.Contact.Form.attachEvents();
        },
        attachEvents: function () {
            debugger;
            var me = CrmFirst.Internes.MainProject.Contact.Form;

            Xrm.Page.getAttribute('crm1st_seperateoffice').addOnChange(me.seperateofficeOnChange);
        },
        seperateofficeOnChange: function () {
            
            if (Xrm.Page.getAttribute('crm1st_seperateoffice').getValue() != null && Xrm.Page.getAttribute('crm1st_seperateoffice').getValue() == true) {
                Xrm.Page.getAttribute('address1_composite').setValue(null);                 
                Xrm.Page.getAttribute('address1_line1').setValue(null);
                Xrm.Page.getAttribute('address1_line2').setValue(null);
                Xrm.Page.getAttribute('address1_line3').setValue(null);
                Xrm.Page.getAttribute('address1_city').setValue(null);
                Xrm.Page.getAttribute('address1_stateorprovince').setValue(null);
                Xrm.Page.getAttribute('address1_postalcode').setValue(null);
                Xrm.Page.getAttribute('address1_country').setValue(null);

            }
            else if (Xrm.Page.getAttribute('crm1st_seperateoffice').getValue() != null && Xrm.Page.getAttribute('crm1st_seperateoffice').getValue() == false)
            {
                if (Xrm.Page.getAttribute('parentcustomerid').getValue() == null || Xrm.Page.getAttribute('parentcustomerid').getValue()[0].entityType != 'account') {
                    return;
                }

                var contactId;
                var accountId=Xrm.Page.getAttribute("parentcustomerid").getValue()[0].id;
                var Id = accountId.substring(1, 37);
                var serverURL = Xrm.Page.context.getClientUrl();
                serverURL += "/api/data/v8.2/accounts("+Id+")?$select=*";
                var req = new XMLHttpRequest();
                req.open("GET", serverURL, true);
                req.setRequestHeader("Accept", "application/json");
                req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                req.setRequestHeader("OData-MaxVersion", "4.0");
                req.setRequestHeader("OData-Version", "4.0");
                req.setRequestHeader("Prefer", "odata.include-annotations=\"OData.Community.Display.V1.FormattedValue\"");
                if (Id != "") {
                    req.onreadystatechange = function () {
                        if (this.readyState == 4 /* complete */) {
                            if (this.status == 200) {
                                var data = JSON.parse(this.response);
                                Xrm.Page.getAttribute("address1_line1").setValue(data.address1_line1);
                                Xrm.Page.getAttribute("address1_line2").setValue(data.address1_line2);
                                Xrm.Page.getAttribute("address1_line3").setValue(data.address1_line3);
                                Xrm.Page.getAttribute("address1_city").setValue(data.address1_city);
                                Xrm.Page.getAttribute("address1_country").setValue(data.address1_country);
                                Xrm.Page.getAttribute("address1_stateorprovince").setValue(data.address1_stateorprovince);
                                Xrm.Page.getAttribute("address1_postalcode").setValue(data.address1_postalcode);
                                Xrm.Page.getAttribute("address1_composite").setValue(data.address1_composite);
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
                //var dynamicsWebApi = new DynamicsWebApi({ webApiVersion: '9.0' });
                //dynamicsWebApi.retrieve(Xrm.Page.getAttribute('parentcustomerid').getValue()[0].id, 'accounts',
                //     function (rec) {
                //         debugger;
                //         Xrm.Page.getAttribute('address1_line1').setValue(rec.address1_line1);
                //         //if (rec.crm1st_accountid != null) {
                //         //    var object = new Array();
                //         //    object[0] = new Object();
                //         //    object[0].id = rec.crm1st_accountid.accountid;
                //         //    object[0].name = rec.crm1st_accountid.name;
                //         //    object[0].entityType = 'account';

                //         //    Xrm.Page.getAttribute('parentcustomerid').setValue(object);
                //         //}
                //     },
                //     function (err) {
                //         debugger;
                //         Xrm.Utility.alertDialog(err.message);
                //     }//,['address1_line1', 'address1_line2', 'address1_line3', 'address1_city', 'address1_stateorprovince', 'address1_postalcode', 'address1_country']
                // );
            //}
        }
    }
}