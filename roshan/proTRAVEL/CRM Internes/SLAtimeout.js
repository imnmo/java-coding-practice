//function OnLoad()
//{
//    debugger;
//    setRequestStatus();

//}
//function setRequestStatus()
//{
//    var caseType = Xrm.Page.getAttribute("casetypecode").getText();
//    if (caseType == "Request")
//    {
//        Xrm.Page.getAttribute("statuscode").setValue(2);
//    }
//}

//function changeStatus()
//{

//    var preStatus = Xrm.Page.getAttribute("statuscode").getValue();
//    var caseType = Xrm.Page.getAttribute("casetypecode").getText();
//    if (caseType == "Request")
//    {
//        Xrm.Page.getAttribute("statuscode").setValue(2);
//    }
//    if (preStatus == "On Hold")
//    {
//        if (caseType == "Problem" || caseType == "Question")
//        {
//            Xrm.Page.getAttribute("statuscode").setValue(preStatus);
//        }
//    }
//}