 
function OnLoad()
{
    preFilterLookup()
}

function preFilterLookup() {
    Xrm.Page.getControl("crm1st_vertriebpartner").addPreSearch(function () {
        addLookupFilter();

    })
    function addLookupFilter() {
        var fetchXml = '<filter type="and"><condition attribute="customertypecode" value="5" operator="eq"/></filter>';
        Xrm.Page.getControl("crm1st_vertriebpartner").addCustomFilter(fetchXml, "account");
    }
}  
 
function OpportunityHideGrid(context)
{
    debugger;
    toggleSection(tabName, sectionName, flag);
    }
    function toggleSection("Summary", "Opportunity_details", false) {       
        Xrm.Page.ui.tabs.get("Summary").sections.get("Opportunity_details").setVisible(false);
    }
    function toggleSection(context) {       
        Xrm.Page.ui.tabs.get("Summary").sections.get("Opportunity_details").setVisible(false);
    }

    function OpportunityHideGrid(context)
    {
        debugger;
        //toggleSection(tabName, sectionName, flag);

        toggleSection("Summary","Opportunity_details",false) 
    }
    function toggleSection(Summary,  Opportunity_details,False) 
    {       

        var r = Xrm.Page.ui.tabs.get(Summary);
        var p = r.sections.get(Opportunity_details);
        p.setVisible(False);
    }





    function OpportunityShowFooterField(context)
    {
        ShowFooter1("createdby",true);
        ShowFooter2("createdon",true);
        ShowFooter3("modifiedby",true);
        ShowFooter4("modifiedon",true);
    }


    function ShowFooter1(crby,TRUE)
    {  if (Xrm.Page.getControl(crby)!= null) {
        Xrm.Page.getControl(crby).setVisible(True);}}

    function ShowFooter2(crn,TRUE)
    {if (Xrm.Page.getControl(crn) != null) {Xrm.Page.getControl(crn).setVisible(True);}}
    function ShowFooter3(mby,TRUE){if (Xrm.Page.getControl(mby)!= null) {Xrm.Page.getControl(mby).setVisible(True);}}
    function ShowFooter4(mbn,TRUE){if (Xrm.Page.getControl(mbn)!= null) {Xrm.Page.getControl(mbn).setVisible(True);}}



    function HideOpportunitySubGrid(context)
    {
        togglefunction("Competitors",false);



        }
        function togglefunction(Competitors,False)
        {
            Xrm.Page.getControl(Competitors).setVisible(False);
        }

        function HideHeaderAndFooterFields(context)
        {

            ShowFooter1("createdby",true);
            ShowFooter2("createdon",true);
            ShowFooter3("modifiedby",true);
            ShowFooter4("modifiedon",true);
            HideHeader("leadsourcecode",false);
        }


        function ShowFooter1(crby,TRUE)
        {  if (Xrm.Page.getControl(crby)!= null) {
            Xrm.Page.getControl(crby).setVisible(True);}}

        function ShowFooter2(crn,TRUE)
        {if (Xrm.Page.getControl(crn) != null) {Xrm.Page.getControl(crn).setVisible(True);}}
        function ShowFooter3(mby,TRUE){if (Xrm.Page.getControl(mby)!= null) {Xrm.Page.getControl(mby).setVisible(True);}}
        function ShowFooter4(mbn,TRUE){if (Xrm.Page.getControl(mbn)!= null) {Xrm.Page.getControl(mbn).setVisible(True);}}
        function HideHeader(ldsc,False){if (Xrm.Page.getControl(ldsc)!= null) {Xrm.Page.getControl(ldsc).setVisible(False);}}


        function genericLock(new_technicalinstallationdepot, lock)
        {
            var fieldObj = Xrm.Page.getAttribute(new_technicalinstallationdepot);
            if(fieldObj != null){
                fieldObj.setDisabled(lock);
            }
        }
        function onStatusReasonLock(context){
            genericLock("new_technicalinstallationdepot", true);
        }

        function genericLock(new_dateoftechnicalinstallation, lock)
        {

            var fieldObj = Xrm.Page.data.entity.attributes.get("new_dateoftechnicalinstallation").getValue()[];
            if(fieldObj != "" || value !=null)
    
            {
                Xrm.Page.getControl(new_dateoftechnicalinstallation).setDisabled(lock);
            }
        }
        function onStatusReasonLock(context){


            genericLock("new_dateoftechnicalinstallation", true);
        }
        function genericLock(new_technicalinstallationdepot, lock)
        {   
            var fieldObj = Xrm.Page.data.entity.attributes.get(new_technicalinstallationdepot).getValue();
            if(fieldObj != "" || value !=null)
            {
                Xrm.Page.getControl(new_technicalinstallationdepot).setDisabled(lock);
            }
        }
        function onStatusLock(context){

            genericLock("new_technicalinstallationdepot", true);
        }

        function genericLock(new_dateoftechnicalinstallation, lock)
        {

            var fieldObj = Xrm.Page.getAttribute("new_dateoftechnicalinstallation").getValue();
            if(fieldObj != "" || value !=null)
    
            {
                Xrm.Page.getControl(new_dateoftechnicalinstallation).setDisabled(lock);
            }
        }
        function onStatusReasonLock(context){

            debugger;
            genericLock("new_dateoftechnicalinstallation", true);
        }

        function genericLock(new_technicalinstallationdepot, lock)
        {   
            var fieldObj = Xrm.Page.data.entity.attributes.get(new_technicalinstallationdepot).getValue();
            if(fieldObj != "" && value !=null)
            {
                Xrm.Page.getControl(new_technicalinstallationdepot).setDisabled(lock);
            }
        }
        function onStatusLock(context){
            debugger;
            genericLock("new_technicalinstallationdepot", true);
        }

        function genericLock(new_dateoftechnicalinstallation, lock)
        {

            var fieldObj = Xrm.Page.getAttribute(new_dateoftechnicalinstallation).getValue();
            if(fieldObj != "" && fieldObj !=null)
    
            {
                Xrm.Page.getControl(new_dateoftechnicalinstallation).setDisabled(lock);
            }
        }
        function onStatusReasonLock(context){

            debugger;
            genericLock("new_dateoftechnicalinstallation", true);
        }
