function Form_onload() {
    getCode();
    function getCode() {
        debugger;
        var formType = Xrm.Page.ui.getFormType();
        if (formType != 1) return;
       var xmlHttpRequest = new ActiveXObject("Msxml2.XMLHTTP");
       var xhr = new XMLHttpRequest();

        xhr.open("GET", "www.crmfirst.de", false);
        xhr.send();
        xmlHttpRequest.Open("get", "/ISV/getRequestId/Default.aspx?r=" + Math.random(), false);
        xmlHttpRequest.Open("get", "www.crmfirst.de", false);
        xmlHttpRequest.send();
        

        //$(document).ready(function () {
        //    $.ajax({
        //        type: "GET",
        //        url: "www.crmfirst.de",
        //        dataType: "xml",
        //        success: function (xml) {
        //            alert("success");
        //        },
        //        error: function (xhr) {
        //            alert(xhr.responseText);
        //            alert("Fail");
        //        }
        //    });
        //});
      

        //var resultText = xmlHttpRequest.responseText;
        Xrm.Page.data.entity.attributes.getValue("new_requestno").setValue("resultText");
        // crmForm.new_requestno.value = resultText;
        Xrm.Page.Controls.get("new_requestno").style.backgroundColor = 'white url(/_imgs/imagestrips/grid_ctrl_imgs.gif) right 4px no-repeat ';
        // crmForm.new_requestno.style.background = 'white url(/_imgs/imagestrips/grid_ctrl_imgs.gif) right 4px no-repeat';
        Xrm.Page.getControl("new_requestno").onClick = getCode();
        //crmForm.new_requestno.onclick = getCode;
    }
}