// JScript File 24.11.2016

var AgentTextValue = "Dealer/Service agent"; // Agent
var HubTextValue = "HUB";
var VesselTextValue = "Customer - Vessel";

var crmForm = window.document.getElementById("crmForm");
if(crmForm == null) return;
if(crmForm.elements( "customertypecode" ) == null) return;

// HIDE EI tab if Account is not industrycode=Maritime educational institutions 
if( crmForm.elements( "industrycode" ).SelectedText != "Maritime educational institutions" )
{
    if(crmForm.all.tab6Tab)  crmForm.all.tab6Tab.style.display="none";      
}
else
{
    if(crmForm.all.tab6Tab)  crmForm.all.tab6Tab.style.display="block";     
}


// HIDE Ships count control if Account is not industrycode= Shipping company
if( crmForm.elements( "industrycode" ).SelectedText != "Shipping / Shipmanagement Company" )
{
    if(crmForm.all.new_ships_count) 
    {
        crmForm.all.new_ships_count.style.display="none";      
        crmForm.all.new_ships_count_c.style.display="none";      
    }
}
else
{
    if(crmForm.all.new_ships_count) {
        crmForm.all.new_ships_count.style.display="block";      
        crmForm.all.new_ships_count_c.style.display="block";       
    }
}


if( crmForm.elements( "customertypecode" ).SelectedText !== "Customer - Vessel" )

{           

    if(crmForm.all.tab1Tab)  crmForm.all.tab1Tab.style.display="none";      
    // Show fields
    if(crmForm.all.new_paperlessvessel_c) {
        crmForm.all.new_paperlessvessel_c.style.visibility="hidden";
        crmForm.all.new_paperlessvessel_c.style.display = "none"; 
    }
    if(crmForm.all.new_paperlessvessel_d) crmForm.all.new_paperlessvessel_d.style.display = "none";

}

if( (crmForm.elements( "customertypecode" ).SelectedText != AgentTextValue ) && (crmForm.elements( "customertypecode" ).SelectedText != HubTextValue ) )

{           
    if(crmForm.all.tab1Tab)  crmForm.all.tab5Tab.style.display="none";      
}
else
{
    if( crmForm.elements( "customertypecode" ).Disabled) 
        if(crmForm.all.tab5Tab)
            crmForm.all.tab5Tab.style.display="none";   
    PaintWebSiteFld();
}


// Function for adding suggestion functionality
// for text input fields in Microsoft CRM
// textfield: document.getElementById('address1_country')
// method: a function, that returns an array of strings 
// preload: true or false
function SuggestionTextBox(textfield, method, preload)
{   // max items in the suggestion box
    var maxItems = 6;
    
    this.suggestionList = new Array();
    this.suggestionListDisplayed = new Array();
    
  
    var actual_textfield = textfield;
    var actual_value = '';
    
    var selectedNumber = 0;
    var countMatches = 0;
    
    if (preload)
    {
        // load the data via external method
        this.suggestionList = method();
    }
    
    // attach this function to the textfield
    textfield.attachEvent("onfocus", initTextfield);
 
    // init textfield and attach necessary events
    function initTextfield()
    {
        // when leaving the field we have to clear our site    
        textfield.attachEvent("onblur", resetTextfield);
        document.attachEvent("onkeydown", keyDown);
    }

    function resetTextfield(e)
    {
        //when leaving the field, we have to remove all attached events
        document.detachEvent("onkeydown", keyDown);
        textfield.detachEvent("onblur",resetTextfield);
    }

    function keyDown(e)
    {
        keyCode = e.keyCode;
        

        switch (keyCode)
        {
            case 9: case 13:
                // enter & tab key
                if (countMatches > 0)
                {
                   
                    
                    actual_textfield.value = suggestionListDisplayed[selectedNumber];
                    
                    if (document.getElementById('suggestion_table') != null)
                    { 
                        document.body.removeChild(document.getElementById('suggestion_table'));
                    } 
                    
                }
                
                
                break;
            case 38:
                //pressing up key
                if(selectedNumber > 0 && countMatches > 0)
                {
                    selectedNumber--;
                    createSuggestionTable();
                }
                
                return false;
                break;
            case 40:
                // pressing down key
                if(selectedNumber < countMatches-1 && countMatches > 0 && selectedNumber < maxItems)
                {
                    selectedNumber++;
                    createSuggestionTable();
                }
                
                return false;
                break;                
            default:
                // do not call the function to often
                setTimeout(
                            function()
                            {
                                executeSuggestion(keyCode)
                            },  200 /* in ms */
                           );
                break;
        }
    }

    function executeSuggestion(keyCode)
    {
        selectedNumber = 0;
        countMatches = 0;
        
        actual_value = textfield.value;
        //todo add keyCode
        
    
        // get all possible values from the suggestionList
        
        if (!preload)
        {
            // load the data via external method
            // todo add some caching function
            this.suggestionList = method();
        }
        
        // using regular expressions to match it against the suggestion list
        var re = new RegExp(actual_value, "i");
        
        //if you want to search only from the beginning
        //var re = new RegExp("^" + actual_value, "i");
                
        countMatches = 0;
        this.suggestionListDisplayed = new Array();
        
        // test each item against the RE pattern
        for (i = 0; i < this.suggestionList.length; i++)
        {
            // if it matche add it to suggestionListDisplayed array
            if (re.test(this.suggestionList[i]) && actual_value != '')
            {
                this.suggestionListDisplayed[countMatches] = this.suggestionList[i];
                countMatches++;
                
                // if there are more values than in maxItems, just break
                if (maxItems == countMatches)
                    break;
            }
        }
        
        if (countMatches > 0)
        {
            createSuggestionTable();
        }
        else
        {
            if (document.getElementById('suggestion_table'))
            { 
                document.body.removeChild(document.getElementById('suggestion_table'));
            } 
        }
    }
    
   
    function createSuggestionTable()
    {
        
        if (document.getElementById('suggestion_table'))
        { 
            document.body.removeChild(document.getElementById('suggestion_table'));
        } 
        
        // creating a table object which holds the suggesions
        table = document.createElement('table');
        table.id = 'suggestion_table';
        
        table.width = actual_textfield.style.width;
        table.style.position= 'absolute';
        table.style.zIndex = '100000';

        table.cellSpacing = '1px';
        table.cellPadding = '2px';


        topValue = 0;
        objTop = actual_textfield;
        while(objTop)
        {
            topValue += objTop.offsetTop;
            objTop = objTop.offsetParent;
        }
        
        table.style.top = eval(topValue + actual_textfield.offsetHeight) + "px";

        leftValue = 0;
        objLeft = actual_textfield
        while(objLeft)
        {
            leftValue += objLeft.offsetLeft;
            objLeft = objLeft.offsetParent;
        }

        table.style.left = leftValue + "px";
        
        table.style.backgroundColor = '#FFFFFF';
        table.style.border = "solid 1px #7F9DB9";
        table.style.borderTop = "none";
        
        document.body.appendChild(table);
        
        // iterate list to create the table rows        
        for ( i = 0; i < this.suggestionListDisplayed.length; i++)
        {
            row = table.insertRow(-1);
                
            row.id = 'suggestion_row' + (i);
            row.onclick = function() { onSuggestClick(this.id); };

            column = row.insertCell(-1);
            column.id = 'suggestion_column' + (i);
                
                
            if (selectedNumber == i)
            {
                column.style.color = '#ffffff';
                column.style.backgroundColor = '#316AC5';
            }
            else
            {
                column.style.color = '#000000';
                column.style.backgroundColor = '#ffffff';
            }
                
            column.style.fontFamily = 'Tahoma';
            column.style.fontSize = '11px';
            column.innerHTML = this.suggestionListDisplayed[i];
                
        }
    }

    function  onSuggestClick(ttt)
    {
        var tmpID = ttt.replace('suggestion_row','');
        selectedNumber = tmpID;
        actual_textfield.value = suggestionListDisplayed[selectedNumber];
        
        if (document.getElementById('suggestion_table') != null)
        { 
            document.body.removeChild(document.getElementById('suggestion_table'));
        }    
    } 


    
    // return object
    return this;
}

var f = function ListOfCountries()
{
    return new Array('Andorra','United Arab Emirates','Afghanistan','Antigua And Barbuda','Anguilla','Albania','Armenia','Netherlands Antilles','Angola','Antarctica','Argentina','American Samoa','Austria','Australia','Aruba','Åland Islands','Azerbaijan','Bosnia And Herzegovina','Barbados','Bangladesh','Belgium','Burkina Faso','Bulgaria','Bahrain','Burundi','Benin','Saint Barthélemy','Bermuda','Brunei Darussalam','Bolivia','Brazil','Bahamas','Bhutan','Bouvet Island','Botswana','Belarus','Belize','Canada','Cocos (Keeling) Islands','Congo','Central African Republic','Congo','Switzerland','Côte D\'ivoire','Cook Islands','Chile','Cameroon','China','Colombia','Costa Rica','Cuba','Cape Verde','Christmas Island','Cyprus','Czech Republic','Germany','Djibouti','Denmark','Dominica','Dominican Republic','Algeria','Ecuador','Estonia','Egypt','Western Sahara','Eritrea','Spain','Ethiopia','Finland','Fiji','Falkland Islands (Malvinas)','Micronesia','Faroe Islands','France','Gabon','United Kingdom','Grenada','Georgia','French Guiana','Guernsey','Ghana','Gibraltar','Greenland','Gambia','Guinea','Guadeloupe','Equatorial Guinea','Greece','South Georgia And The South Sandwich Islands','Guatemala','Guam','Guinea-Bissau','Guyana','Hong Kong','Heard And Mc Donald Islands','Honduras','Croatia','Haiti','Hungary','Indonesia','Ireland','Israel','Isle Of Man','India','British Indian Ocean Territory','Iraq','Iran','Iceland','Italy','Jersey','Jamaica','Jordan','Japan','Kenya','Kyrgyzstan','Cambodia','Kiribati','Comoros','Saint Kitts And Nevis','Korea, North','Korea, South','Kuwait','Cayman Islands','Kazakhstan','Lao People\'s Democratic Republic','Lebanon','Saint Lucia','Liechtenstein','Sri Lanka','Liberia','Lesotho','Lithuania','Luxembourg','Latvia','Libyan Arab Jamahiriya','Morocco','Monaco','Moldova','Montenegro','Saint Martin','Madagascar','Marshall Islands','Macedonia','Mali','Myanmar','Mongolia','Macao','Northern Mariana Islands','Martinique','Mauritania','Montserrat','Malta','Mauritius','Maldives','Malawi','Mexico','Malaysia','Mozambique','Namibia','New Caledonia','Niger','Norfolk Island','Nigeria','Nicaragua','Netherlands','Norway','Nepal','Nauru','Niue','New Zealand','Oman','Panama','Peru','French Polynesia','Papua New Guinea','Philippines','Pakistan','Poland','St. Pierre And Miquelon','Pitcairn','Puerto Rico','Palestinian Territory, Occupied','Portugal','Palau','Paraguay','Qatar','Reunion','Romania','Serbia','Russia','Rwanda','Saudi Arabia','Solomon Islands','Seychelles','Sudan','Sweden','Singapore','St. Helena','Slovenia','Svalbard And Jan Mayen Islands','Slovakia','Sierra Leone','San Marino','Senegal','Somalia','Suriname','Sao Tome And Principe','El Salvador','Syrian Arab Republic','Swaziland','Turks And Caicos Islands','Chad','French Southern Territories','Togo','Thailand','Tajikistan','Tokelau','Timor-Leste','Turkmenistan','Tunisia','Tonga','Turkey','Trinidad And Tobago','Tuvalu','Taiwan','Tanzania','Ukraine','Uganda','United States Minor Outlying Islands','USA','Uruguay','Uzbekistan','Holy See (Vatican City State)','Saint Vincent And The Grenadines','Venezuela','Virgin Islands, British','Virgin Islands, U.S.','Viet Nam','Vanuatu','Wallis And Futuna Islands','Samoa','Yemen','Mayotte','South Africa','Zambia','Zimbabwe');
}
    
var obj = SuggestionTextBox(document.getElementById('address1_country'), f, true);

// HIDES Sections if Agents is selected
var el = document.getElementById('customertypecode');
if(el){
    if(el.options[el.selectedIndex].text != 'Agent'){
        var coll = document.getElementsByTagName('td');
        for(var i = 0 ; i < coll.length; i ++){
			
            var parent = coll[i];
            if(coll[i].innerText == 'Agent Information'){
                while(parent.tagName != 'TABLE'){
                    parent = parent.parentElement;
                }
                if(parent)
                    parent.style.display = 'none';
		
            }
				
            if(coll[i].innerText == 'Areas of Responsibilities'){
                while(parent.tagName != 'TR'){
                    parent = parent.parentElement;
                }
                if(parent)
                    parent.style.display = 'none';
		
            }
        }
		
    }
    else{
        PaintWebSiteFld();
        if(crmForm.address1_country.value  != '' &&  crmFormSubmit.crmFormSubmitId.value  != '' ){
            var el = document.getElementById("new_transaswebsitelink");
            if(el != null ){
                var link = 'http://www.transas.com/dealers/ShowDistrib.aspx?Country=' + crmForm.address1_country.value + '#' + crmFormSubmit.crmFormSubmitId.value ;
                el.DataValue= link;

            }
        }

    }

}




function PaintWebSiteFld()
{
    var coll = document.getElementsByTagName('td');
    for(var i = 0 ; i < coll.length; i ++){
			
        var parent = coll[i]; // Country/Region , 
        if(IsOnWebSiteFld(coll[i].innerText)){
            /*
              while(parent.tagName != 'TABLE'){
                parent = parent.parentElement;
            }*/

            if(parent){
                parent.title = 'website field';
                parent.style.color = 'red';
            }
		
        }
				
				
    }
}

function IsOnWebSiteFld(caption)
{
    if(caption == 'Agent Information'|| 
       caption == 'Street 1' || 
       caption == 'Country/Region' || 
       caption == 'City' || 
       caption == 'Main Phone' || 
       caption == 'Fax' || 
       caption == 'Web Site' || 
       caption == 'E-mail' ||
       caption == 'Publish on website'||
       caption == 'transaswebsitelink' ||
       caption == 'Service Station' ||
       caption == 'Service Center' ||
       caption == 'Regional Service Center'
       )
    {
        return true;
    }
    else
        return false;
}

// HIDES | Display Sections if Nav Producs is selected
var elc = document.getElementById('new_agentnavproducts');
if(elc){
    if(elc.checked){
        var coll = document.getElementsByTagName('td');
        for(var i = 0 ; i < coll.length; i ++){
			
            var parent = coll[i];
            if(coll[i].innerText == 'Nav Product Support'){
                while(parent.tagName != 'TABLE'){
                    parent = parent.parentElement;
                }
                if(parent)
                    parent.style.display = 'block';
		
            }
				
        }
		
    }
    else{
        var coll = document.getElementsByTagName('td');
        for(var i = 0 ; i < coll.length; i ++){
			
            var parent = coll[i];
            if(coll[i].innerText == 'Nav Product Support'){
                while(parent.tagName != 'TABLE'){
                    parent = parent.parentElement;
                }
                if(parent)
                    parent.style.display = 'none';
		
            }
				
				
        }

	 
    }
}

var AgentTextValue = "Dealer/Service agent"; // Agent
var HubTextValue = "HUB";
var VesselTextValue = "Customer - Vessel";

if (crmForm.all.customertypecode.SelectedText == VesselTextValue )
{
    
    if(crmForm.all.tab1Tab)
        crmForm.all.tab1Tab.style.display="inline";}
else
{ 
    if(crmForm.all.tab1Tab)
        crmForm.all.tab1Tab.style.display="none";}




//if (((crmForm.all.customertypecode.SelectedText == AgentTextValue ) || (crmForm.all.customertypecode.SelectedText == HubTextValue )) && !crmForm.all.customertypecode.Disabled  )
//{crmForm.all.tab5Tab.style.display="inline";}
//else
//{ crmForm.all.tab5Tab.style.display="none";}
if(crmForm.all.tab5Tab)
crmForm.all.tab5Tab.style.display="none";

// HIDES | Display Sections if Agents is selected
var el = document.getElementById('customertypecode');
var displayState = 
    (el && el.options[el.selectedIndex].text != AgentTextValue) ?
    "none": "block";

var elem1 = document.getElementById("{cf50b553-7041-e311-b91a-005056b707d3}");
if(elem1) elem1.style.display = displayState;

elem1 = document.getElementById("{5f836671-ba7b-dc11-a772-001560571f55}");
if(elem1)   elem1.style.display = displayState;


function PaintWebSiteFld()
{
    var coll = document.getElementsByTagName('td');
    for(var i = 0 ; i < coll.length; i ++){
			
        var parent = coll[i]; // Country/Region , 
        if(IsOnWebSiteFld(coll[i].innerText)){
            /*
              while(parent.tagName != 'TABLE'){
                parent = parent.parentElement;
            }*/
            if(parent){
                parent.title = 'website field';
                parent.style.color = 'red';
            }
		
        }
				
				
    }
}

function IsOnWebSiteFld(caption)
{
    if(caption == 'Agent Information'|| 
       caption == 'Street 1' || 
       caption == 'Country/Region' || 
       caption == 'City' || 
       caption == 'Main Phone' || 
       caption == 'Fax' || 
       caption == 'Web Site' || 
       caption == 'E-mail' ||
       caption == 'Publish on website'||
       caption == 'transaswebsitelink' ||
       caption == 'Service Station' ||
       caption == 'Service Center' ||
       caption == 'Regional Service Center'
       )
    {
        return true;
    }
    else
        return false;
}






/* 
Support for multiselect for Areas of Activities
author: Jim Wang @ January 2009 
http://jianwang.blogspot.com 
   
*/

// PL – the picklist attribute; PLV – used to save selected picklist values  
var PL = crmForm.all.new_areas_of_activity;
var PLV = crmForm.all.new_areas_of_activity_value;

if (PL != null && PLV != null) {
    PL.style.display = 'none';
    PLV.style.display = 'none';

    // Create a DIV container  
    var addDiv = document.createElement('<div style="overflow-y:auto; height:280px; border:1px #6699cc solid; background-color:#ffffff;" />');
    PL.parentNode.appendChild(addDiv);

    // Initialise checkbox controls  
    for (var i = 1; i < PL.options.length; i++) {
        var pOption = PL.options[i];
        if (!IsChecked(pOption.text))
            var addInput = document.createElement("<input type='checkbox' style='border:none; width:25px; align:left;' />");
        else
            var addInput = document.createElement("<input type='checkbox' checked='checked' style='border:none; width:25px; align:left;' />");

        var addLabel = document.createElement("<label />");
        addLabel.innerText = pOption.text;

        var addBr = document.createElement('<br />'); //it’s a ‘br’ flag  

        PL.nextSibling.appendChild(addInput);
        PL.nextSibling.appendChild(addLabel);
        PL.nextSibling.appendChild(addBr);
    }

    // Check if it is selected  
    function IsChecked(pText) {
        if (PLV.value != '') {
            var PLVT = PLV.value.split('||');
            for (var i = 0; i < PLVT.length; i++) {
                if (PLVT[i] == pText)
                    return true;
            }
        }
        return false;
    }

    // Save the selected text, this filed can also be used in Advanced Find  
    crmForm.attachEvent('onsave', OnSave);
    function OnSave() {
        PLV.value = '';
        var getInput = PL.nextSibling.getElementsByTagName('input');

        for (var i = 0; i < getInput.length; i++) {
            if (getInput[i].checked) {
                PLV.value += getInput[i].nextSibling.innerText + '||';
            }
        }
    }
}
