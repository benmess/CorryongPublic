var grdAltColor;
var iCurrentRow=0;
var iPrevRow=0;
var giMenuClicked=0;
var gsMenuText = '';
var sPopUpParams;
var MLRef;
var senderobj;//used to maintain a sender object.
var gsProjectId = '';
var gsSessionProjectId = '';

//************************************************//
//				MENU STUFF						  //
//************************************************//
function OpenMenuItem(sItemDesc, sExtra)
{
    //if (GetEditStatus() == -1) {
    //    gsItemDesc = sItemDesc;
    //    gsExtra = sExtra;
    //    PIMS_confirm(2, 'You have unsaved changes. Do you wish to save these changes?', 'DesignMenuSaveYes', 'DesignMenuSaveNo', '', '');
    //}
    //else {
        var sRedirect = GetMenuRedirect(sItemDesc, sExtra);
        if (sRedirect != '') 
        {
            window.location = sRedirect;
        }
    //}
}

function GetMenuRedirect(sItemDesc, sExtra)
{
    var sRedirect = "";
    switch (sItemDesc)
    {
        case "Home":
            sRedirect = "/Default.aspx";
            break;
        case "Solar":
        case "Batteries":
        case "Rectifiers":
        case "DC Voltage Drop":
        case "Custom Software":
        case "IT Solutions":
        case "Android":
        case "iOS":
        case "Web Solutions":
            if (window.location.host == 'messracing.com')
                sRedirect = "http://messengerengineering.com/Underconstruction.aspx";
            else
                sRedirect = "/Underconstruction.aspx";
            break;
        case "IoT":
            if (window.location.host == 'messracing.com')
                sRedirect = "http://messengerengineering.com/IoT.aspx";
            else
                sRedirect = "/IoT.aspx";
            break;

        case "Edge Devices":
            if (window.location.host == 'messracing.com')
                sRedirect = "http://messengerengineering.com/EdgeDevices.aspx";
            else
                sRedirect = "/EdgeDevices.aspx";
            break;

        case "Racing":
            if (window.location.host == 'messengerengineering.com')
                sRedirect = "http://messracing.com/Account/Login.aspx";
            else
                sRedirect = "/Account/Login.aspx";

            break;
    }

    return sRedirect;
}

function DesignMenuSaveNo()
{
    SetEditStatus(0);
    OpenMenuItem(gsItemDesc, gsExtra);
}

function DesignMenuSaveYes()
{
    switch (gsCurrentPage)
    {
        case "Battery":
            SaveBatteryGrid(true);
            break;
        case "Solar":
            SaveSolarGrid(true)
            break;
        case "ARMCompany":
            SaveAllGrids(true); //This true means we are saving all company grids. It is the same function call for employees.
            break;
        case "ARMEmployee":
            SaveAllGrids(false); //This false means we are saving all employee grids. It is the same function call for companies.
            break;
        case "Reliability Event":
            SaveEvent(true);
            break;
        case "Work Request":
            SaveWorkRequest(true);
            break;
        case "Action Request":
            SaveActionRequest(true);
            break;
        case "Production Order Entry":
            SavePO(true);
            break;
        case "Dispatch Docket Entry":
            SaveDD(true);
            break;
        case "Batch Analysis":
            SaveBatch(true);
            break;
        case "Create or Update":
            SaveDocCreateOrModify(true);
            break;
        case "Documentation Access":
            SaveJobAccessLevels(true);
            break;
        case "Production Loss":
            SaveProdLoss(true);
            break;
        case "Issue Report":
            SaveIssueRpt(true);
            break;
    }
}

function disableItem($parentLI)
{
    $parentLI.on('mouseenter.smartmenus mouseleave.smartmenus mousedown.smartmenus focus.smartmenus blur.smartmenus click.smartmenus touchend.smartmenus', 'a', function (e) {
        e.stopPropagation();
        e.preventDefault();
    });
}

function enableItem($parentLI)
{
    $parentLI.off('mouseenter.smartmenus mouseleave.smartmenus mousedown.smartmenus focus.smartmenus blur.smartmenus click.smartmenus touchend.smartmenus');
}

function DisableHomeMenus()
{
    /*	if(!IsUserInRole('SuperUser') && !IsUserInRole('Admins'))
        {
            disableItem($('#pims-menu-admin'));
            $("#pims-menu-adminhref").addClass("disabled");
        }
    */
    if (!IsUserInRole('SuperUser'))
    {
        if (IsUserInRole('Operations'))
        {
            $menu1 = $('#pims-menu-admin');
            $menu1.hide();

            $menu2 = $('#pims-menu-engineeringdocuments');
            $menu2.hide();

            $menu3 = $('#pims-menu-drawings');
            $menu3.hide();

            $menu6 = $('#pims-menu-matcontroladmin');
            $menu6.hide();

            /*			$menu5 = $('#pims-menu-managementsystem');
                        $menu5.show();
            */
            SetObjectWidth(document.getElementById('hdruserspacer'), 500);
        }
        else if (IsUserInRole('Regain Managers'))
        {
            $menu1 = $('#pims-menu-admin');
            $menu1.hide();

            $menu2 = $('#pims-menu-engineeringdocuments');
            $menu2.hide();

            $menu3 = $('#pims-menu-drawings');
            $menu3.hide();

            SetObjectWidth(document.getElementById('hdruserspacer'), 500);
        }
        else if (IsUserInRole('Ops Admin'))
        {

            $menu2 = $('#pims-menu-maintenance');
            $menu2.hide();

            $menu4 = $('#pims-menu-managementsystem');
            $menu4.hide();

            $menu5 = $('#pims-menu-admin');
            $menu5.hide();

            $menu6 = $('#pims-menu-matcontroladmin');
            $menu6.hide();

            SetObjectWidth(document.getElementById('hdruserspacer'), 600);
        }
        else
        {
            $menu1 = $('#pims-menu-production');
            $menu1.hide();

            $menu2 = $('#pims-menu-maintenance');
            $menu2.hide();

            //			$menu3 = $('#pims-menu-plant');
            //			$menu3.hide();

            $menu4 = $('#pims-menu-managementsystem');
            $menu4.hide();

            $menu5 = $('#pims-menu-admin');
            $menu5.hide();

            $menu6 = $('#pims-menu-matcontroladmin');
            $menu6.hide();

            SetObjectWidth(document.getElementById('hdruserspacer'), 350);
        }
    }
    else
    {
        //Hide the duplicate of Engineering Drawings which is the Management System
        $menu4 = $('#pims-menu-managementsystem');
        $menu4.hide();

        SetObjectWidth(document.getElementById('hdruserspacer'), 600);
    }
}

function DisableHomeMenusPIMS()
{
}

function DisableDesignMenus()
{
    DisableHomeMenus();

    var btn = document.getElementById("btnLogoutSecondary");
    if (btn != null)
        SetObjectVisibility(btn, 'hidden');

    /*	var designmenu = document.getElementById("designmenu");
        if(designmenu != null)
            SetObjectVisibility(designmenu, 'visible');		
    */
    /*	if(IsUserInRole('FieldUser') && gsUserRoles.length == 1)
        {
            //Turn on the stand alone logout button
            if(btn != null)
            {
                SetObjectVisibility(btn, 'visible');
                
            }
            else
            {
                SetObjectVisibility(btn, 'hidden');
            }
    */
    /*		//Turn off the main menu
            if(designmenu != null)
                SetObjectVisibility(designmenu, 'none');
            else
                SetObjectVisibility(designmenu, 'visible');		
        }
    */}

function DisableDesignMenusPIMS()
{
    //	DisableHomeMenus();

    var btn = document.getElementById("btnLogoutSecondary");
    if (btn != null)
        SetObjectVisibility(btn, 'hidden');

}

function DisableAdminMenus()
{
    DisableHomeMenus();
}

//************************************************//
//   STUFF FOR MOUSE POSITION AND CLICK DETECTION //
//************************************************//

document.onmousemove = getMouse;
document.onclick = getClick;

var ie = document.all;
var m_x = 0;
var m_y = 0;
var clickX = 0;
var clickY = 0;

function getMouse(e)
{
	m_x = ie? window.event.clientX: e.pageX;
	m_y = ie? window.event.clientY: e.pageY;
}

function getClick()
{
    var arrmouse = [];
	clickX = m_x;
	clickY = m_y;
	arrmouse[0] = m_x;
	arrmouse[1] = m_y;
	return arrmouse;
}

//Stops the backspace button doing a back button
function NoBackspace(e) {
    if (e.which === 8 && !$(e.target).is("input:not([readonly]):not([type=radio]):not([type=checkbox]), textarea, [contentEditable], [contentEditable=true]")) {
        e.preventDefault();
    }

    var tag = e.target.tagName.toLowerCase();
    if (tag == 'input' || tag == 'select') {
        if (e.which == 13) {
            var item = $(":input:not([type=radio]):not([type=checkbox]):not([type=button]):not([type=hidden])")[$(":input:not([type=radio]):not([type=checkbox]):not([type=button]):not([type=hidden])").index(document.activeElement) + 1];
            if (item != null)
                item.focus();
        }
    }

}

function DateAddSub(bAdd, sType, dDate, iValue)
{
    
    if (bAdd)
    {
        if (sType=="d") //Add Days.
        {
          var DateAddSub = new Date().setDate(dDate.getDate()+iValue);          
        }
        else if (sType=="m") //Add Months.
        {
          var DateAddSub = new Date().setDate(dDate.getMonth()+iValue);          
        }
        else if (sType=="y")  //Add Year.
        {
          var DateAddSub = new Date().setDate(dDate.getYear()+iValue);          
        }
    }
    else
    {
        if (sType=="d") //Add Days.
        {
          var DateAddSub = new Date().setDate(dDate.getDate()-iValue);          
        }
        else if (sType=="m") //Add Months.
        {
          var DateAddSub = new Date().setDate(dDate.getMonth()-iValue);          
        }
        else if (sType=="y")  //Add Year.
        {
          var DateAddSub = new Date().setDate(dDate.getYear()-iValue);          
        }    
    }
        var NewDate = new Date(DateAddSub);
        return NewDate;
}

function GetGivenSCMSDateStamp(dDate)
{    
    var Year = dDate.getFullYear();
    var Mnth = parseInt(dDate.getMonth(),10) + 1;
    var Day = parseInt(dDate.getDate(),10);
    return Day + '/' + Mnth + '/' + Year;
}

function GetSCMSDateStamp()
{
    var date = new Date();
    var Year = date.getFullYear();
    var Mnth = parseInt(date.getMonth(),10) + 1;
    var Day = parseInt(date.getDate(),10);
    return Day + '/' + Mnth + '/' + Year;
}

function GetSCMSTimeStamp()
{
    var date = new Date();
    var Hrs = parseInt(date.getHours(),10) + 1;
    var Min = parseInt(date.getMinutes(),10) + 1;
    var Sec = parseInt(date.getSeconds(),10) + 1;
    return Hrs + ':' + Min + ':' + Sec;
}

function GetSCMSDateTimeStamp()
{
    return GetDateStamp() + " " + GetTimeStamp();
}

function stopRKey(e) 
{
      if(GetBrowserType() == 1)
      {
            if(!e)
            {
                var evt = window.event;
            }
            else
            {
                var evt = e;
            }
            
            var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null); 
            if ((evt.keyCode == 13) && (node.type!="textarea"))  {return false;} //This the enter key
      }
      else
      {      
        EnterToTab.init(document.getElementById(theForm.id), true);
      }  
} 

//Stops the backspace button doing a back button
function NoBackspace(e)
{
      if(GetBrowserType() == 1)
      { 
            if(!e)
            {
                var evt = window.event;
            }
            else
            {
                var evt = e;
            }
            
            var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null); 
            if(GetBrowserType() == 1) 
            {
                if(evt.keyCode == 13 && (node.type!="textarea")) {evt.keyCode = 9;}
                if (evt.keyCode==8 && (node.type!="textarea")) {evt.keyCode = 0;}
                return evt.keyCode;
            }
            else
            {
                if(evt.keyCode == 13 && (node.type!="textarea")) {return 9;}
                if (evt.keyCode==8 && (node.type!="textarea")) { return 0; }
            }
      }
      else
      {      
        //EnterToTab.init(document.getElementById(theForm.id), true);
      }
}

function mask(str,textbox,loc,delim)
{
   var locs = loc.split(',');
   for (var i = 0; i <= locs.length; i++)
   {
     for (var k = 0; k <= str.length; k++)
     {
       if (k == locs[i])
       {
         if (str.substring(k, k+1) != delim)
         {
          str = str.substring(0,k) + delim + str.substring(k,str.length)
         }

       }

     }

   }
   textbox.value = str
}

function getQuerystring(sQueryString, key, default_)
{
  if (default_==null) default_=""; 
  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec(sQueryString);
  if(qs == null)
    return default_;
  else
    return qs[1];
}

function getQuerystring2(sQueryString, sKey)
{
    var sValue = "";
    var iStart = sQueryString.indexOf(sKey)+sKey.length+1;
    var iQuerySub = sQueryString.substring(iStart,sQueryString.length);
    var iEnd = iQuerySub.indexOf("&");
    if(iEnd < 0)
    {
        iEnd = iQuerySub.length;
    }
    if(iEnd > 0)
    {
        var sValue = iQuerySub.substring(0, iEnd);
    }
    
    return sValue;
}

function IsValidNumber(sText)
{
    if (typeof sText == 'undefined')
    {
        sText = '';
    }
    else
    {
        sText = sText + '';
    }

    return IsNumeric(sText, true);
}

function IsNumeric(sText,bAllownegative)
{
   if(typeof sText == 'undefined')
   {
        sText = '';
   }
   if(bAllownegative)
   { 
    var ValidChars = "-0123456789.";
   }
   else
   {
    var ValidChars = "0123456789.";
   }


   var IsNumber=true;
   var Char;

   if(typeof sText == 'number')
   {
        return true;
   }
   else
   {
        if( sText.length > 0) 
        {
           for (i = 0; i < sText.length && IsNumber == true; i++) 
              { 
              Char = sText.charAt(i); 
              if (ValidChars.indexOf(Char) == -1) 
                 {
                 IsNumber = false;
                 }
              }
           return IsNumber;
         }
         else
         {     
            return false;
         }  
    }
}

function GetNumberPartOfString(sText,bAllownegative)
{
   if(typeof sText == 'undefined')
   {
        sText = '';
   }
   if(bAllownegative)
   { 
    var ValidChars = "-0123456789.";
   }
   else
   {
    var ValidChars = "0123456789.";
   }


   var IsNumber=true;
   var NumberPart = '';
   var Char;

   if(typeof sText == 'number')
   {
        return parseFloat(sText);
   }
   else
   {
        if( sText.length > 0) 
        {
            for (i = 0; i < sText.length && IsNumber == true; i++) 
            { 
                Char = sText.charAt(i); 
                if (ValidChars.indexOf(Char) == -1) 
                {
                    IsNumber = false;
                }
                else
                {
                    NumberPart = NumberPart + Char;
                }
            }
            return parseFloat(NumberPart);
         }
         else
         {     
            return 0.0;
         }  
    }
}

function Get_RowNo_From_ControlName(sName)
{
  var Char;
  var sRow = "";
  
  for (ii = sName.length-1; ii >= 0; ii--) 
  { 
    Char = sName.charAt(ii); 

    //First get the row we are on
    if(IsNumeric(Char))
    {
        sRow = Char + sRow;
    }
    else
    {
        break;
    }
  }
  
  if(sRow == "") 
  {
    sRow = -1;
  }
  
  return parseInt(sRow,10);
}

function Get_GridName_From_ControlName(sNameLocal)
{
    return sNameLocal.substring(0, sNameLocal.indexOf('_'));
}


function ExtractNamedPairs(sList)
{
    var PairArray = [];
    var sNameLocal = [];
    var sValueLocal = [];
    var j=0;
    var iNextIndex = sList.length;
    
    while (sList.length > 0 && iNextIndex > 0)
    {
            sNameLocal[j] = sList.substring(0, sList.indexOf('='));
            sValueLocal[j] = sList.substring(sList.indexOf('=')+1, sList.indexOf('^'));
            j++;
            iNextIndex = sList.indexOf('^');
            sList = sList.substring(iNextIndex+1, sList.length);
    }

        PairArray[0] = sNameLocal;
        PairArray[1] = sValueLocal;
    
    return PairArray;
}

function ExtractList(sList)
{
    var ListArray = [];
    if(sList.length > 0)
    {
        sSmallList = sList.substring(0,sList.length-1);
        ListArray = sSmallList.split('^');
    }
    return ListArray;
    
}

function GetRowStatus(iRow)
{
    return document.getElementById('hfStatus'+iRow).value;
}

function SetDeletionStatus(sender,bSetRowStatusColour)
{
    var sChkName = sender;
    if(typeof bSetRowStatusColour == 'undefined')
    {
        bSetRowStatusColour = true; //Always set the row colour if we don't say otherwise
    }
    
    iRow = Get_RowNo_From_ControlName(sChkName);
    var iCurrentStatus = GetRowStatus(iRow);

    //Get the delete checkbox control
    chkBox = document.getElementById(sChkName);
    if(chkBox.checked)
    {
        if(iCurrentStatus == -1)
        {
            SetRowStatus(iRow, -3, bSetRowStatusColour);
        }
        else
        {
            SetRowStatus(iRow, -2, bSetRowStatusColour);
        }
    }
    else
    {
        if(iCurrentStatus == -3)
        {
            SetRowStatus(iRow, -1, bSetRowStatusColour);
        }

        if(iCurrentStatus == -2)
        {
            SetRowStatus(iRow, 0, bSetRowStatusColour);
        }
    }

}

function SetRowStatus(iRow, iStatus, bSetRowColour, crlPrelim)
{
    document.getElementById('hfStatus'+iRow).value = iStatus;
    SetEditStatus(-1); //Set it to update regardless of the change
    //Now also set the row colour
    
    if(typeof bSetRowColour == 'undefined')
    {
      bSetRowColour = true;
    }  
    
    if(typeof crlPrelim == 'undefined')
    {
      var rowInstall = document.getElementById('OrigRowNo'+iRow);
    }  
    else
    {
    
            var sName = crlPrelim.substring(0,crlPrelim.indexOf('RowNo')+5);
    
            switch(sName) //this is for 
            {
                case "Prelim_MotOrigRowNo":
                    var rowInstall = document.getElementById('Prelim_MotOrigRowNo'+iRow);
                    break;
                    
                case "Prelim_TrpOrigRowNo":
                    var rowInstall = document.getElementById('Prelim_TrpOrigRowNo'+iRow);
                    break;                    
                    
                case "Prelim_PzsOrigRowNo":
                    var rowInstall = document.getElementById('Prelim_PzsOrigRowNo'+iRow);
                    break;
                    
                case "Prelim_HpsOrigRowNo":
                    var rowInstall = document.getElementById('Prelim_HpsOrigRowNo'+iRow);
                    break;                   
                    
                case "Prelim_PssOrigRowNo":
                    var rowInstall = document.getElementById('Prelim_PssOrigRowNo'+iRow);
                    break;
                    
                case "Prelim_TotOrigRowNo":
                    var rowInstall = document.getElementById('Prelim_TotOrigRowNo'+iRow);
                    break;                    
            }    

    }
    
    
    //var rowInstall = document.getElementById('OrigRowNo'+iRow);

    if(bSetRowColour)
    {
        rowInstall.className = "GridTableRowUnsaved";
        if (iRow==iCurrentRow)
        {
            grdAltColor = rowInstall.className;
        }
    }
}

function GetFreightCodeFromCustomer(sCustomer)
{
    switch(sCustomer.toUpperCase())
    {
        case "TELSTRA":
            return "W4432";
            break;
        default:
            return "W4432";
            break;
    }
}

function SetComboBoxSmall(sender,width)
{
//    sender.className = 'ctrDropDown';
    
    if(typeof width != 'undefined')
    {
        SetComboBoxWidth(sender,width);
    }
    
}

function SetComboBoxBig(sender,width)
{
//    sender.className = 'ctrDropDownClick';
    
    if(typeof width != 'undefined')
    {
        SetComboBoxWidth(sender,width);
    }
    
}


function SetNPSAComboBoxBig(sender,width)
{
    sender.className = 'ctrNPSADropDownClick';
    
    if(typeof width != 'undefined')
    {
        SetComboBoxWidth(sender,width);
    }
    
}

function PadStringWithZeros(sInputString, iTotalNumberOfChars, bInFront)
{
    sInputString = sInputString + '';
    if(sInputString.length > iTotalNumberOfChars)
    {
        return sInputString;
    }
    else
    {
        var sExtraSpaces="";
        for(var i=0; i< iTotalNumberOfChars - sInputString.length;i++)
        {
            sExtraSpaces = sExtraSpaces + "0";
        }
        if(bInFront)
        {
            sOutputString = sExtraSpaces + sInputString;
        }
        else
        {
            sOutputString = sInputString + sExtraSpaces;
        }
        
        return sOutputString;
    }
}

function PadStringWithSpaces(sInputString, iTotalNumberOfChars)
{
    if(sInputString.length > iTotalNumberOfChars)
    {
        return sInputString;
    }
    else
    {
        var sExtraSpaces="";
        for(var i=0; i< iTotalNumberOfChars - sInputString.length;i++)
        {
            sExtraSpaces = sExtraSpaces + " ";
        }
        sOutputString = sInputString + sExtraSpaces;
        return sOutputString;
    }
}

function trim(inputString) {
if (typeof inputString != "string") return inputString;

return inputString
//clear leading spaces and empty lines
.replace(/^(\s|\n|\r)*((.|\n|\r)*?)(\s|\n|\r)*$/g,"$2")

//take consecutive spaces down to one
.replace(/(\s(?!(\n|\r))(?=\s))+/g,"")

//take consecutive lines breaks down to one
.replace(/(\n|\r)+/g,"\n\r")

//remove spacing at the beginning of a line
.replace(/(\n|\r)\s/g,"$1")

//remove spacing at the end of a line
.replace(/\s(\n|\r)/g,"$1");

}

function replaceAll(str, replacement, swith)
{
    //In case str is not a string
    str = str + '';
    if(replacement == swith)
    {
        return str;
    }
    else
    {
        var idx = str.indexOf(replacement);
        
        //The with might contain the replacement
        idxwith = swith.indexOf(replacement);

        while ( idx > -1 && idx != idxwith)
        {
            str = str.replace(replacement, swith); 
            idx = str.indexOf(replacement);
        }

        return str;
    }
}


function countOccurencesInString(sBase, sSearchFor)
{
    var len   = sSearchFor.length;
    var result = 0;
  
    if (len > 0) {  // search only if there is something
        var start = sBase.indexOf(sSearchFor);
        while (start != -1) {
            result++;
            start = sBase.indexOf(sSearchFor, start+len);
        }
    }
    return result;
}

function startsWith(str, startwithstring) 
{   var localstring = trim(str);
var smatch = localstring.match("^"+startwithstring);
    return (localstring.match("^"+startwithstring)==startwithstring)}

String.prototype.endsWith = function(str) 
{return (trim(this).match(str+"$")==str)}

function endsWith(str, suffix)
{
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

 //function ReplaceAll(inputString, replaceString, withString)
//{
//    re = '/[' + replaceString + ']/g';
//    return inputString.replace(/replaceString/g, withString);
//}

function OpenASPXWindow(sFileName)
{
    window.open(sFileName);
}

function roundNumber(rnum, rlength)  // Arguments: number to round, number of decimal places
{
  var newnumber = Math.round(rnum*Math.pow(10,rlength))/Math.pow(10,rlength);
  return newnumber ;
}
function InStr(start, strSearch, charSearchFor)
{            
            for (i=start; i < strSearch.length; i++)
            {                  
                  if (charSearchFor == Mid(strSearch, i, 1))
                  {
                        return i;
                  }
            }
            return -1;
}

function Mid(str, start, len)
{
// Make sure start and len are within proper bounds
    if (start < 0 || len < 0) return "";
    var iEnd, iLen = String(str).length;
    if (start + len > iLen)
          iEnd = iLen;
    else
          iEnd = start + len;
    return String(str).substring(start,iEnd);
}

function SetTxtChangeStatus(sName,crlPrelim)
{
     iRow = Get_RowNo_From_ControlName(sName);
     SetRowStatus(iRow,-1, true, crlPrelim);
}

function SetComboBoxWidth(sender, iWidth)
{
    //sender.style.width = iWidth + "px";
    SetObjectWidth(sender, iWidth, 'px');        
}

//For some reason the JS always puts in the last figure in the loop if you use a variable.
//This way set attributes on the object and recall them when they are sent across.
function SetComboBoxWidth2(sender, iExpanded)
{
    if (GetBrowserType() == 1)//Ensure that differences of IE <= 8 and 9 are addressed - AE
    {
        if (iExpanded == 1) //Unexpanded IE <= 8 - AE
        {
            iWidth = sender['unexpandedwidth'];
            SetObjectWidth(sender, iWidth, 'px');
            //sender.style.width = iWidth;
        }
        else //Expanded IE <= 8 - AE
        {
            iWidth = sender['expandedwidth'];
            SetObjectWidth(sender, iWidth, 'px');
            //sender.style.width = iWidth;
        }
    }
    else
    {
        if (iExpanded == 1) //Unexpanded IE 9 and other browser - AE
        {
            iWidth = sender.attributes.unexpandedwidth.value;
            SetObjectWidth(sender, iWidth, 'px');
            //sender.style.width = iWidth;
        }
        else //Expanded IE 9 and other browser - AE
        {
            iWidth = sender.attributes.expandedwidth.value;
            SetObjectWidth(sender, iWidth, 'px');
            //sender.style.width = iWidth;
        }
    }
}

//***********************************************//
//        DIMENSIONING AND POSITIONING           //
//***********************************************//
function GetObjectTop(obj, sUnit)
{
    return GetObjectDimension(obj, 1, sUnit);
}

function SetObjectTop(obj, iTop, sUnit)
{
    SetObjectDimension(obj, 1, iTop, sUnit);
}


function GetObjectLeft(obj, sUnit)
{
    return GetObjectDimension(obj, 2, sUnit);
}

function SetObjectLeft(obj, iLeft, sUnit)
{
    SetObjectDimension(obj, 2, iLeft, sUnit);
}

function GetObjectWidth(obj, sUnit)
{
    return GetObjectDimension(obj, 3, sUnit);
}

function SetObjectWidth(obj, iWidth, sUnit)
{
    SetObjectDimension(obj, 3, iWidth, sUnit);
}


function GetObjectHeight(obj, sUnit)
{
    return GetObjectDimension(obj, 4, sUnit);
}

function SetObjectHeight(obj, iHeight, sUnit)
{
    SetObjectDimension(obj, 4, iHeight, sUnit);
}

function SetObjectborderWidth(obj, iborderWidth, sUnit)
{
    SetObjectDimension(obj, 5, iborderWidth, sUnit);
}

function GetObjectborderWidth(obj, sUnit)
{
    return GetObjectDimension(obj, 5, sUnit);
}

//Dim Types are
// 1 - Top
// 2 - Left
// 3 - Width
// 4 - Height
//But use the wrapper functions
function GetObjectDimension(obj, iDimType, sUnit)
{
    switch(iDimType)
    {
        case 1:
            var iDim = obj.style.top;
            break;
        case 2:
            var iDim = obj.style.left;
            break;
        case 3:
            var iDim = obj.style.width;
            break;
        case 4:
            var iDim = obj.style.height;
            break;
        case 5:
            var iDim = obj.style.borderWidth;
            break;            
        
    }
    if(iDim == '')
    {
        iDim = '0px';
    }
    if(typeof sUnit == 'undefined')
    {
        sUnit = 'px';
    }
    iDim = parseInt(iDim.replace(sUnit,''));
    return iDim;
}

function SetObjectDimension(obj, iDimType, iDim, sUnit)
{
    if(typeof sUnit == 'undefined')
    {
        sUnit = 'px';
    }
    
    if(!IsNumeric(iDim, true))
    {
        iDim = GetNumberPartOfString(iDim, true);
    }
    
    switch(iDimType)
    {
        case 1:
            obj.style.top = iDim + sUnit;
            break;
        case 2:
            obj.style.left = iDim + sUnit;
            break;
        case 3:
            obj.style.width = iDim + sUnit;
            break;
        case 4:
            obj.style.height = iDim + sUnit;
            break;
        case 5:
            obj.style.borderWidth = iDim + sUnit;   
            break;         
    }
}

function GetArrayRow(inputArray, iRow)
{
    var newArray = [];
    
    for(var i=0; i<inputArray.length; i++)
    {
        newArray[i] = inputArray[i][iRow]
    }
    return newArray;
}

function Round(dNumber, iPlaces)
{
    var newnumber = Math.round(dNumber*Math.pow(10,iPlaces))/Math.pow(10,iPlaces);
    return newnumber ;
}

function CreateFormLabelField (name, defValue, iVisibility) 
{
      var formFld = document.createElement('label');
      formFld.setAttribute('id', name);
      defValue += '';
      if(defValue.indexOf('\n') >= 0)
      {
	    var a = defValue.split('\n')
        for(var i=0;i<a.length;i++)
        {
            var labeltext = document.createTextNode(a[i]);
            formFld.appendChild(labeltext);
            var brlab = document.createElement('br');
            formFld.appendChild(brlab);
        }
      }
      else
      {
          var labeltext = document.createTextNode(defValue);
          formFld.appendChild(labeltext);
      }
      formFld.name = name;

      if(iVisibility == 0)
      {
          formFld.style.visibility = 'hidden';
      }
      
      return formFld;
}

function CreateFormImage(name, imgsource, iVisibility) 
{
      var formFld = document.createElement('img');
      formFld.setAttribute('id', name);
      formFld.src = imgsource;
      if(iVisibility == 0)
      {
          formFld.style.visibility = 'hidden';
      }
      
      return formFld;
}

function CreateFormHiddenField (name, defValue) 
{
      var formFld = document.createElement('input');
      formFld.setAttribute('type', 'hidden');
      formFld.setAttribute('id', name);
      formFld.value = defValue;
      formFld.name = name;
      return formFld;      
}

function CreateFormButtonField (name, defValue, iReadOnly, iVisibility)
{
    if (typeof iReadOnly == 'undefined')
    {
        iReadOnly = 0;
    }

    if (typeof iVisibility == 'undefined')
    {
        iVisibility = 1;
    }

    if (GetBrowserType() == 1)
    {
        var btnHTML = '<input type="button" name="' + name + '" value="' + defValue + '" ';        
        var formFld = document.createElement('button');
        formFld.setAttribute('id', name);
        formFld.value = defValue;
        formFld.name = name;
        if(iVisibility == -1 || iReadOnly == -1)
        {
            btnHTML = btnHTML +  ' disabled="disabled" '
        }
        if(iVisibility == 0)
        {
            btnHTML = btnHTML +  ' style="visibility:hidden;" '
        }

        btnHTML = btnHTML + '/>'
        btnField = document.createElement(btnHTML);    
        btnField.setAttribute('id', name);
        btnField.name = name;
        return btnField;
    }
    
    if(GetBrowserType() == 2 || GetBrowserType() == 3 || GetBrowserType() == 4)
    {
        var formFld = document.createElement('button');
        formFld.setAttribute('type', 'button');
        formFld.setAttribute('id', name);
        formFld.textContent = defValue;
        formFld.name = name;
        if(iVisibility == -1 || iReadOnly == -1)
        {
            formFld.disabled = true;
        }
        if(iVisibility == 0)
        {
          formFld.style.visibility = 'hidden';
        }
        if(iReadOnly == -1)
        {
            formFld.disabled = true;
        }

        return formFld;
    }
}

function CreateFormCheckboxField (name, defValue, iReadOnly, iVisibility,defaultedvalue) 
{
      var formFld = document.createElement('input');
      formFld.setAttribute('type', 'checkbox');
      formFld.setAttribute('id', name);
      if(defValue == 1 || defValue == -1 || defValue == "1" || defValue == "-1")
      {
            formFld.value = true;
            formFld.checked = true;
      }
      else
      {
            formFld.value = defValue;
            formFld.checked = false;
      }
      
      if (typeof defaultedvalue != 'undefined')
      {
            formFld.defaultChecked = defaultedvalue;
      }
      
      
      
      formFld.name = name;
      if(iVisibility == -1)
      {
        formFld.disabled = true;
      }
      if(iVisibility == 0)
      {
          formFld.style.visibility = 'hidden';
      }
      if(iReadOnly == -1)
      {
        formFld.disabled = true;
      }
      return formFld;
}

function CreateFormTextField (name, defValue, iReadOnly, iVisibility,sTitleToolTip, iMaxLength) 
{
      var formFld = document.createElement('input');
      formFld.setAttribute('type', 'text');
      formFld.setAttribute('id', name);
      formFld.value = defValue;
      formFld.name = name;
      formFld.title = defValue;
      formFld.onmouseover = function(){formFld.title = this.value;};
      
      if (typeof sTitleToolTip != 'undefined')
      {
        formFld.title = sTitleToolTip;
      }
      
      if (typeof iMaxLength != 'undefined')
      {
        formFld.maxLength = iMaxLength;
      }
      
      if(iVisibility == -1)
      {
    //    formFld.disabled = true;
        formFld.readOnly = true;
        formFld.className = "txtReadonly";
    
      }
      if(iVisibility == 0)
      {
          formFld.style.visibility = 'hidden';
      }
      if(iReadOnly == -1)
      {
   //     formFld.disabled = true;
        formFld.readOnly = true;
        formFld.className = "txtReadonly";
   
      }
      
      return formFld;
}

function CreateFormPasswordField(name, defValue, iReadOnly, iVisibility, sTitleToolTip, iMaxLength)
{
    var formFld = document.createElement('input');
    formFld.setAttribute('type', 'password');
    formFld.setAttribute('id', name);
    formFld.value = defValue;
    formFld.name = name;
//    formFld.title = defValue;
//    formFld.onmouseover = function () { formFld.title = this.value; }; //You don't want to show the value on mouse over for a password field

    if (typeof sTitleToolTip != 'undefined')
    {
        formFld.title = sTitleToolTip;
    }

    if (typeof iMaxLength != 'undefined')
    {
        formFld.maxLength = iMaxLength;
    }

    if (iVisibility == -1)
    {
        //    formFld.disabled = true;
        formFld.readOnly = true;
        formFld.className = "txtReadonly";

    }
    if (iVisibility == 0)
    {
        formFld.style.visibility = 'hidden';
    }
    if (iReadOnly == -1)
    {
        //     formFld.disabled = true;
        formFld.readOnly = true;
        formFld.className = "txtReadonly";

    }

    return formFld;
}

function CreateFormHyperlinkField(name, defValue, iReadOnly, iVisibility, sTitleToolTip, hRef)
{
      var formFld = document.createElement('a');
      formFld.setAttribute('type', 'hyperlink');
      formFld.setAttribute('id', name);
      formFld.innerHTML = defValue;
      formFld.name = name;
      formFld.title = defValue;
      
      if (typeof sTitleToolTip != 'undefined')
      {
        formFld.title = sTitleToolTip;
      }
      
      if(iVisibility == -1)
      {
        formFld.readOnly = true;
//        formFld.className = "txtReadonly";
    
      }
      if(iVisibility == 0)
      {
          formFld.style.visibility = 'hidden';
      }
      if(iReadOnly == -1)
      {
        formFld.readOnly = true;   
      }
      
      if (typeof hRef == 'undefined')
      {
        formFld.setAttribute('href', 'javascript:void(0)');
      }
      else
      {
        formFld.setAttribute('href', hRef);
      }


      return formFld;
      
}

//The wrap type can take 1 of 3 values
// 0 = virtual which means you can wrap in the box but it sends one long string with the line feeds removed to the server
// 1 = hard which means you can wrap oin the box and the line feeds are sent to the server intact
// 2 = off whcih means the text in the box is not wrapped and it is sent as one string to the server
function CreateFormTextAreaField (name, defValue, iWrapType, iCols, iRows, iReadOnly, iVisibility) 
{
    var formFld = document.createElement('textarea');
    formFld.setAttribute('id', name);
    formFld.value = defValue;
    formFld.onmouseover = function(){formFld.title = this.value;};

    if (GetBrowserType() == 1)//Ensure that differences of IE <= 8 and 9 are addressed for correct line feed - AE
    {
        switch (iWrapType)
        {
            case 0:
                formFld.Wrap = "virtual";
                break;
            case 1:
                formFld.Wrap = "hard";
                break;
            case 2:
                formFld.Wrap = "off";
                break;
        }
    }
    else //wrap IE 9 and other - AE
    {
        switch (iWrapType)
        {
            case 0:
                formFld.wrap = "virtual";
                break;
            case 1:
                formFld.wrap = "hard";
                break;
            case 2:
                formFld.wrap = "off";
                break;
        }
    }
      
      formFld.rows = iRows;
      formFld.cols = iCols;
      formFld.name = name;
      if(iVisibility == -1)
      {
        //formFld.disabled = true;
        formFld.readOnly = true;
        formFld.className = "txtReadonly";
        
      }
      if(iVisibility == 0)
      {
          formFld.style.visibility = 'hidden';
      }
      if(iReadOnly == -1)
      {
        //formFld.disabled = true;
        formFld.readOnly = true;
        formFld.className = "txtReadonly";
        
      }
      return formFld;
}

function CreateFormDiv(name, iVisibility)
{
    var formFld = document.createElement('div');
    formFld.setAttribute('id', name);

    if (iVisibility == -1)
    {
        //formFld.disabled = true;
        formFld.readOnly = true;
        formFld.className = "txtReadonly";

    }

    if (iVisibility == 0)
    {
        formFld.style.visibility = 'hidden';
    }
    return formFld;
}

function CreateFormDropDownBox(name, iReadOnly, iVisibility) 
{
      var formFld = document.createElement('select');
      formFld.setAttribute('id', name);
      formFld.name = name;
      if(iVisibility == -1)
      {
          formFld.disabled = true;
      }
      if(iVisibility == 0)
      {
          formFld.style.visibility = 'hidden';
      }
      if(iReadOnly == -1)
      {
          formFld.disabled = true;
      }
      return formFld;
}

function CreateFormListBox (name, iDisplayRows, bMultipleSelect, iReadOnly, iVisibility) 
{
      var formFld = document.createElement('select');
      formFld.setAttribute('id', name);
      formFld.name = name;
      if(iVisibility == -1)
      {
        formFld.disabled = true;
      }
      if(iVisibility == 0)
      {
          formFld.style.visibility = 'hidden';
      }
      if(iReadOnly == -1)
      {
          formFld.disabled = true;
      }
      
      formFld.size = iDisplayRows;
      formFld.multiple = bMultipleSelect;
      return formFld;
}

function CreateFormDropDownBoxNoId() 
{
      var formFld = document.createElement('select');
      return formFld;
}

function CreateDropDownBoxOption(drpBox,index, sText, sTitle, val)
{
      var optn = document.createElement('option');
      optn.text = sText;
      
      if(val == null)
      {
        optn.value = sText;
      }
      else
      {
        optn.value = val;
      }

      if(sTitle == null)
      {
        optn.title = sText;
      }
      else
      {
        optn.title = sTitle;
      }

      drpBox.options[index] = optn;
      return optn;
}

function CreateDropDownBoxOptionGroup(val, sTitle)
{
      var optn = document.createElement('optgroup');
      optn.label = val;
      
      if(sTitle == null)
      {
        optn.title = val;
      }
      else
      {
        optn.title = sTitle;
      }
      return optn;
}

// iSortOrder = 0 means ascending
// iSortOrder = 1 means descending
function ComboBoxSort(cmbBox, iSortOrder)
{
    var iLength = cmbBox.options.length;
    var Array = [];
    
    for (var i=0; i<iLength; i++)
    {
        Array[i] = cmbBox.options[i].text;
    }
    
    for (var i = iLength; i >=0 ; i--)
    {
        if (GetBrowserType() == 1)
        {
            cmbBox.options[i] = null;
        }
        else
        {
            var childNode = cmbBox.children(i);
            cmbBox.removeChild(childNode);
        }
    }
    
    //Sort the array
    Array.sort();
    var bHaveSelect = false;
    for (var i=0; i<iLength; i++)
    {
        if(Array[i].toUpperCase() == '[SELECT]')
        {
            bHaveSelect = true;
        }
        else
        {
            CreateDropDownBoxOption(cmbBox,i,Array[i]);
        }
    }   
    
    if(bHaveSelect)
    {
        ComboBoxAddOptionInPosition(cmbBox, 0, '[Select]');
    }
}

function ComboboxClear(cmbboxlocal)
{
    if (GetBrowserType() == 1)
    {
        for (var xx = cmbboxlocal.length - 1; xx >= 0; xx--)
        {
            cmbboxlocal.options[xx] = null;
        }
    }
    else
    {
        while (cmbboxlocal.hasChildNodes())
        {
            cmbboxlocal.removeChild(cmbboxlocal.firstChild);
        }
    }

    
}

function ComboboxRemoveOption(cmbboxlocal, iOptionIndex)
{
    if (GetBrowserType() == 1)
    {
            cmbboxlocal.options[xx] = null;
    }
    else
    {
            cmbboxlocal.removeChild(cmbboxlocal.options[iOptionIndex]);
    }


}

function ComboBoxAddOptionInPosition(cmbBox, iPosn, sOptionToAddText, sOptionToAddValue, bselectedindex)
{
    var iLength = cmbBox.options.length-1;
    var iSelected = cmbBox.selectedIndex;
    if (iPosn == -1)
    {
        CreateDropDownBoxOption(cmbBox, iLength + 1, sOptionToAddText, sOptionToAddText, sOptionToAddValue);
    }
    else
    {
        for (var i = iLength; i >= -1; i--)
        {
            if (i == iLength)
            {
                CreateDropDownBoxOption(cmbBox, i + 1, cmbBox.options[i].text, cmbBox.options[i].title, cmbBox.options[i].value);
            }

            if (i == iPosn - 1)
            {
                cmbBox.options[i + 1].text = sOptionToAddText;
                if (sOptionToAddValue != null)
                {
                    cmbBox.options[i + 1].value = sOptionToAddValue;
                }
                else
                {
                    cmbBox.options[i + 1].value = sOptionToAddText;
                }
                cmbBox.options[i + 1].title = sOptionToAddText;
            }

            if (i > iPosn - 1 && i != iLength)
            {
                cmbBox.options[i + 1].text = cmbBox.options[i].text;
                cmbBox.options[i + 1].value = cmbBox.options[i].value;
                cmbBox.options[i + 1].title = cmbBox.options[i].title;
                cmbBox.options[i + 1].style.color = cmbBox.options[i].style.color;
            }
        }
    }

    if (typeof bselectedindex != 'undefined')
    {
    
       if (bselectedindex) 
       {
           if (iPosn == -1)
           {
               cmbBox.selectedIndex = cmbBox.options.length -1;
           }
           else
           {
               if (iSelected >= iPosn)
               {
                   cmbBox.selectedIndex = iSelected + 1;
               }
           }
            
       } 
        
    }
    
}

function ComboBoxReset(cmbbox)
{
    for (var y = 0; y < cmbbox.length; y++)
    {
        cmbbox.options[y].selected = false;
    }
    cmbbox.options[0].selected = true; 

}

function CreateFormRadioButton( name, value, checked, idname)
{

  if(GetBrowserType() == 1)
  {

    var radioInput;
    var radioHtml = '<input type="radio" name="' + name + '" value="' + value + '"';
    if ( checked ) 
    {            
        radioHtml += ' checked="checked"';        
    }        
    radioHtml += '/>';        
    radioInput = document.createElement(radioHtml);
    
  }
  else
  {    
   
    var radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.name = name;
    radioInput.id = idname;
    radioInput.value = value;
    
    if (checked) 
    {            
        radioInput.checked="checked";        
    }   
    
  }  
        
    return radioInput;
}

function Get_radio_selvalue(sElementName)
{
    var el = document.getElementsByName(sElementName);
    var sReturn = "";

    for(var i=0;i<el.length;i++)
    {
        if(el[i].checked)
        {
            sReturn = el[i].value;
        }
    }
    return sReturn;
}

function Set_radio_selvalue(sElementName, iValue)
{
    var el = document.getElementsByName(sElementName);
    var sReturn = "";

    for (var i = 0; i < el.length; i++)
    {
        if (el[i].value == iValue)
        {
            el[i].checked = true;
            break;
        }
    }
}

function Get_radio_seltext(sElementName)
{
    var el = document.getElementsByName(sElementName);
    var sReturn = "";

    for(var i=0;i<el.length;i++)
    {
        if(el[i].checked)
        {
            sReturn = el[i].text;
        }
    }
    return sReturn;
}

function Get_radio_selvalueById(sObjId)
{
    var el = document.getElementById(sObjId);
    var sReturn = "";

    for(var i=0;i<el.length;i++)
    {
        if(el[i].checked)
        {
            sReturn = el[i].value;
        }
    }
    return sReturn;
}

function SetObjectValue(objId, objValue, objText)
{
    var obj = document.getElementById(objId);
    if(typeof obj.type == 'undefined')
    {
        var sType = obj.tagName.toLowerCase();
    }
    else
    {
        var sType = obj.type;
    }
    
    if(objText == null)
    {
        objText = objValue;
    }
    var iBrowserType = GetBrowserType();
    
    switch(iBrowserType)
    {
        case 1: //IE
            switch(sType)
            {
                case 'button':
                    obj.value = objValue;
                    break;
                case 'label':
                    obj.innerText = objValue;
                    break;
                case 'text':
                    obj.value = objValue;
                    break;
                case 'textarea':
                    obj.value = objValue;
                    break;
                case 'hyperlink':
                    obj.innerHTML = objValue;
                    break;
                case 'checkbox':
                    obj.checked = objValue;
                    break;
                case 'hidden':
                    obj.value = objValue;
                    break;
                case 'password':
                    obj.value = objValue;
                    break;
                case 'select-one':
                    for(var i=0; i< obj.length;i++)
                    {
                        if(obj.options[i].value == objValue || obj.options[i].text == objText)
                        {
                            obj.selectedIndex = i;
                            break;
                        }
                    }
                    break;
                case 'option':
                    obj.text = objValue;
                    break;
                case 'optgroup':
                    obj.label = objValue;
                    break;
                case 'radio':
                    obj.value = objValue;
                    break;
                case 'table':
                    break;
                default: //Default is a label
                    obj.innerText = objValue;
                    break;
                break;
            }
            break;
        case 2: //Chrome
            switch(sType)
            {
                case 'button':
                    obj.textContent = objValue;
                    break;
                case 'label':
                    obj.textContent = objValue;
                    break;
                case 'text':
                    obj.value = objValue;
                    break;
                case 'textarea':
                    obj.value = objValue;
                    break;
                case 'hyperlink':
                    obj.innerHTML = objValue;
                    break;
                case 'checkbox':
                    obj.checked = objValue;
                    break;
                case 'hidden':
                    obj.value = objValue;
                    break;
                case 'password':
                    obj.value = objValue;
                    break;
                case 'select-one':
                    for(var i=0; i< obj.length;i++)
                    {
                        if(obj.options[i].value == objValue || obj.options[i].text == objText)
                        {
                            obj.selectedIndex = i;
                            break;
                        }
                    }
                    break;
                case 'option':
                    obj.text = objValue;
                    break;
                case 'optgroup':
                    obj.label = objValue;
                    break;
                case 'radio':
                    obj.value = objValue;
                    break;
                case 'table':
                    break;
                default: //Default is a label
                    obj.innerText = objValue;
                    break;
            }
            break;
        case 3: //Firefox
            switch(sType)
            {
                case 'button':
                    obj.textContent = objValue;
                    break;
                case 'label':
                    obj.textContent = objValue;
                    break;
                case 'text':
                    obj.value = objValue;
                    break;
                case 'textarea':
                    obj.value = objValue;
                    break;
                case 'hyperlink':
                    obj.innerHTML = objValue;
                    break;
                case 'checkbox':
                    obj.checked = objValue;
                    break;
                case 'hidden':
                    obj.value = objValue;
                    break;
                case 'password':
                    obj.value = objValue;
                    break;
                case 'select-one':
                    for(var i=0; i< obj.length;i++)
                    {
                        if(obj.options[i].value == objValue || obj.options[i].text == objText)
                        {
                            obj.selectedIndex = i;
                            break;
                        }
                    }
                    break;
                case 'option':
                    obj.text = objValue;
                    break;
                case 'optgroup':
                    obj.label = objValue;
                    break;
                case 'radio':
                    obj.value = objValue;
                    break;
                case 'table':
                    break;
                default: //Default is a label
                    obj.textContent = objValue;
                    break;
            }
            break;
        case 4: //Safari
            switch(sType)
            {
                case 'button':
                    obj.textContent = objValue;
                    break;
                case 'label':
                    obj.textContent = objValue;
                    break;
                case 'text':
                    obj.value = objValue;
                    break;
                case 'textarea':
                    obj.value = objValue;
                    break;
                case 'hyperlink':
                    obj.innerHTML = objValue;
                    break;
                case 'checkbox':
                    obj.checked = objValue;
                    break;
                case 'hidden':
                    obj.value = objValue;
                    break;
                case 'password':
                    obj.value = objValue;
                    break;
                case 'select-one':
                    for(var i=0; i< obj.length;i++)
                    {
                        if(obj.options[i].value == objValue || obj.options[i].text == objText)
                        {
                            obj.selectedIndex = i;
                            break;
                        }
                    }
                    break;
                case 'option':
                    obj.text = objValue;
                    break;
                case 'optgroup':
                    obj.label = objValue;
                    break;
                case 'radio':
                    obj.value = objValue;
                    break;
                case 'table':
                    break;
                default: //Default is a label
                    obj.textContent = objValue;
                    break;
            }
            break;
        default: //IE
            switch(sType)
            {
                case 'button':
                    obj.value = objValue;
                    break;
                case 'label':
                    obj.innerText = objValue;
                    break;
                case 'text':
                    obj.value = objValue;
                    break;
                case 'textarea':
                    obj.value = objValue;
                    break;
                case 'hyperlink':
                    obj.innerHTML = objValue;
                    break;
                case 'checkbox':
                    obj.checked = objValue;
                    break;
                case 'hidden':
                    obj.value = objValue;
                    break;
                case 'password':
                    obj.value = objValue;
                    break;
                case 'select-one':
                    for(var i=0; i< obj.length;i++)
                    {
                        if(obj.options[i].value == objValue || obj.options[i].text == objText)
                        {
                            obj.selectedIndex = i;
                            break;
                        }
                    }
                    break;
                case 'option':
                    obj.text = objValue;
                    break;
                case 'optgroup':
                    obj.label = objValue;
                    break;
                case 'radio':
                    obj.value = objValue;
                    break;
                case 'table':
                    break;
                default: //Default is a label
                    obj.innerText = objValue;
                    break;
            }
            break;
    }    
}

function GetObjectValue(objId, ioptspostion)
{

    if (typeof objId == 'object')
    {
        var obj = objId;
    }
    else
    {
        var obj = document.getElementById(objId);
    }
    
    if (obj == null || obj == 'undefined')
    {
        if (obj == null)
        {
            return null
        }
        else
        {
            return 'undefined'
        }
    }
    else
    {
    
        if(typeof obj.type == 'undefined')
        {
            var sType = obj.tagName.toLowerCase();
        }
        else
        {
            var sType = obj.type;
        }
        var iBrowserType = GetBrowserType();
        
        switch(iBrowserType)
        {
            case 1: //IE
                switch (sType)
                {
                    case 'button':
                        return obj.value;
                        break;
                    case 'label':
                        return obj.innerText;
                        break;
                    case 'text':
                        return obj.value;
                        break;
                    case 'password':
                        return obj.value;
                        break;
                    case 'textarea':
                        return obj.value;
                        break;
                    case 'hyperlink':
                        return obj.innerHTML;
                        break;
                    case 'checkbox':
                        if(obj.checked)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                        break;
                    case 'hidden':
                        return obj.value;
                        break;
                    case 'select-one':
                        if(obj.options.length > 0)
                        {
                            var sReturn = obj.options[obj.selectedIndex].value;
                            if(sReturn == '')
                            {
                                sReturn = obj.options[obj.selectedIndex].text;
                            }

                            if (ioptspostion != null && ioptspostion != 'undefined')
                            {
                                sReturn = obj.options[parseInt(ioptspostion, 10)].value;

                                if (sReturn == '')
                                {
                                    sReturn = obj.options[parseInt(ioptspostion, 10)].text;
                                }

                            }
                        }
                        else
                        {
                            sReturn = "";
                        }
                        return sReturn;
                        break;
                    case 'select-multiple':
                        if(obj.options.length > 0)
                        {
                            var sReturn = obj.options[obj.selectedIndex].value;
                            if(sReturn == '')
                            {
                                var sReturn = obj.options[obj.selectedIndex].text;
                            }
                        }
                        else
                        {
                            sReturn = "";
                        }
                        return sReturn;
                        break;
                    case 'option':
                        return obj.text;
                        break;
                    case 'optgroup':
                        return obj.label;
                        break;
                    case 'radio':
                        return Get_radio_selvalue(objId);
                        break;
                    case 'img':
                        return obj.alt;
                        break;

                    default: //Default is a label
                        return obj.innerText;
                        break;
                }
                break;
            case 2: //Chrome
                switch (sType)
                {
                    case 'button':
                        return obj.textContent;
                        break;
                    case 'label':
                        return obj.innerText;
                        break;
                    case 'text':
                        return obj.value;
                        break;
                    case 'password':
                        return obj.value;
                        break;
                    case 'textarea':
                        return obj.value;
                        break;
                    case 'hyperlink':
                        return obj.innerHTML;
                        break;
                    case 'checkbox':
                        if(obj.checked)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                        break;
                    case 'hidden':
                        return obj.value;
                        break;
                    case 'select-one':
                    
                        if(obj.options.length > 0)
                        {                    
                            var sReturn = obj.options[obj.selectedIndex].value;
                            if(sReturn == '')
                            {
                                var sReturn = obj.options[obj.selectedIndex].text;
                            }

                            if (ioptspostion != null && ioptspostion != 'undefined')
                            {
                                sReturn = obj.options[parseInt(ioptspostion, 10)].value;

                                if (sReturn == '')
                                {
                                    sReturn = obj.options[parseInt(ioptspostion, 10)].text;
                                }

                            }

                        }
                        else
                        {
                            sReturn = "";
                        }                        
                        
                        return sReturn;
                        
                        
                        break;

                    case 'select-multiple':

                        if (obj.options.length > 0) {
                            var sReturn = obj.options[obj.selectedIndex].value;
                            if (sReturn == '') {
                                var sReturn = obj.options[obj.selectedIndex].text;
                            }
                        }
                        else {
                            sReturn = "";
                        }

                        return sReturn;


                        break;

                    case 'option':
                        return obj.text;
                        break;
                    case 'optgroup':
                        return obj.label;
                        break;
                    case 'radio':
                        return Get_radio_selvalue(objId);
                        break;
                    case 'img':
                        return obj.alt;
                        break;

                    default: //Default is a label
                        return obj.innerText;
                        break;
                }
                break;
            case 3: //Firefox
                switch (sType)
                {
                    case 'button':
                        return obj.textContent;
                        break;
                    case 'label':
                        return obj.textContent;
                        break;
                    case 'text':
                        return obj.value;
                        break;
                    case 'password':
                        return obj.value;
                        break;
                    case 'textarea':
                        return obj.value;
                        break;
                    case 'hyperlink':
                        return obj.innerHTML;
                        break;
                    case 'checkbox':
                        if(obj.checked)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                        break;
                    case 'hidden':
                        return obj.value;
                        break;
                    case 'select-one':
                    
                        if(obj.options.length > 0)
                        {                    
                            var sReturn = obj.options[obj.selectedIndex].value;
                            if(sReturn == '')
                            {
                                var sReturn = obj.options[obj.selectedIndex].text;
                            }

                            if (ioptspostion != null && ioptspostion != 'undefined')
                            {
                                sReturn = obj.options[parseInt(ioptspostion, 10)].value;

                                if (sReturn == '')
                                {
                                    sReturn = obj.options[parseInt(ioptspostion, 10)].text;
                                }

                            }

                        }
                        else
                        {
                            sReturn = "";
                        }                        
                        
                        return sReturn;
                        break;
                    case 'option':
                        return obj.text;
                        break;
                    case 'optgroup':
                        return obj.label;
                        break;
                    case 'radio':
                        return Get_radio_selvalue(objId);
                        break;
                    case 'img':
                        return obj.alt;
                        break;

                    default: //Default is a label
                        return obj.textContent;
                        break;
                }
                break;
            case 4: //Safari
                switch (sType)
                {
                    case 'button':
                        return obj.textContent;
                        break;
                    case 'label':
                        return obj.textContent;
                        break;
                    case 'text':
                        return obj.value;
                        break;
                    case 'password':
                        return obj.value;
                        break;
                    case 'textarea':
                        return obj.value;
                        break;
                    case 'hyperlink':
                        return obj.innerHTML;
                        break;
                    case 'checkbox':
                        if (obj.checked)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                        break;
                    case 'hidden':
                        return obj.value;
                        break;
                    case 'select-one':

                        if (obj.options.length > 0)
                        {
                            var sReturn = obj.options[obj.selectedIndex].value;
                            if (sReturn == '')
                            {

                                var sReturn = obj.options[obj.selectedIndex].text;
                            }

                            if (ioptspostion != null && ioptspostion != 'undefined')
                            {
                                sReturn = obj.options[parseInt(ioptspostion, 10)].value;

                                if (sReturn == '')
                                {
                                    sReturn = obj.options[parseInt(ioptspostion, 10)].text;
                                }

                            }

                        }
                        else
                        {
                            sReturn = "";
                        }

                        return sReturn;

                        break;
                    case 'select-multiple':

                        if (obj.options.length > 0)
                        {
                            var sReturn = obj.options[obj.selectedIndex].value;
                            if (sReturn == '')
                            {
                                var sReturn = obj.options[obj.selectedIndex].text;
                            }
                        }
                        else
                        {
                            sReturn = "";
                        }

                        return sReturn;

                        break;
                    case 'option':
                        return obj.text;
                        break;
                    case 'optgroup':
                        return obj.label;
                        break;
                    case 'radio':
                        return Get_radio_selvalue(objId);
                        break;
                    case 'img':
                        return obj.alt;
                        break;

                    default: //Default is a label
                        return obj.textContent;
                        break;
                }
                break;
            default: //IE
                switch (sType)
                {
                    case 'button':
                        return obj.value;
                        break;
                    case 'label':
                        return obj.innerText;
                        break;
                    case 'text':
                        return obj.value;
                        break;
                    case 'password':
                        return obj.value;
                        break;
                    case 'textarea':
                        return obj.value;
                        break;
                    case 'hyperlink':
                        return obj.innerHTML;
                        break;
                    case 'checkbox':
                        if(obj.checked)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                        break;
                    case 'hidden':
                        return obj.value;
                        break;
                    case 'select-one':
                    
                        if(obj.options.length > 0)
                        {                    
                            var sReturn = obj.options[obj.selectedIndex].value;
                            if(sReturn == '')
                            {
                                var sReturn = obj.options[obj.selectedIndex].text;
                            }

                            if (ioptspostion != null && ioptspostion != 'undefined')
                            {
                                sReturn = obj.options[parseInt(ioptspostion, 10)].value;

                                if (sReturn == '')
                                {
                                    sReturn = obj.options[parseInt(ioptspostion, 10)].text;
                                }

                            }

                         }
                        else
                        {
                            sReturn = "";
                        }                       
                        
                        return sReturn;
                        break;
                    case 'option':
                        return obj.text;
                        break;
                    case 'optgroup':
                        return obj.label;
                        break;
                    case 'radio':
                        return Get_radio_selvalue(objId);
                        break;
                    case 'img':
                        return obj.alt;
                        break;
                    default: //Default is a HTML
                        return obj.innerHTML;
                        break;
                }
                break;
        }
    
    }    
}

//In combo boxes for example the text is what you read but each option can have a value (like 0 for Governing Phase etc)
//This also applies to radio buttons
function GetObjectText(objId)
{
    var obj = document.getElementById(objId);

    if (typeof objId == 'object')
    {
        var obj = objId;
    }
    else
    {
        var obj = document.getElementById(objId);
    }


    if (typeof obj.type == 'undefined')
    {
        var sType = obj.tagName.toLowerCase();
    }
    else
    {
        var sType = obj.type;
    }
    var iBrowserType = GetBrowserType();
    
    switch(iBrowserType)
    {
        case 1: //IE
            switch (sType)
            {
                case 'button':
                    return obj.value;
                    break;
                case 'label':
                    return obj.innerText;
                    break;
                case 'text':
                    return obj.value;
                    break;
                case 'textarea':
                    return obj.value;
                    break;
                case 'hyperlink':
                    return obj.innerHTML;
                    break;
                case 'checkbox':
                    if(obj.checked)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                    break;
                case 'hidden':
                    return obj.value;
                    break;
                case 'select-one':
                    return obj.options[obj.selectedIndex].text;
                    break;
                case 'option':
                    return obj.text;
                    break;
                case 'optgroup':
                    return obj.label;
                    break;
                case 'radio':
                    return Get_radio_seltext(objId);
                    break;
                case 'img':
                    return obj.alt;
                    break;

                default: //Default is a label
                    return obj.innerText;
                    break;
            }
            break;
        case 2: //Chrome
            switch (sType)
            {
                case 'button':
                    return obj.textContent;
                    break;
                case 'label':
                    return obj.innerText;
                    break;
                case 'text':
                    return obj.value;
                    break;
                case 'textarea':
                    return obj.value;
                    break;
                case 'hyperlink':
                    return obj.innerHTML;
                    break;
                case 'checkbox':
                    if(obj.checked)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                    break;
                case 'hidden':
                    return obj.value;
                    break;
                case 'select-one':
                    return obj.options[obj.selectedIndex].text;
                    break;
                case 'option':
                    return obj.text;
                    break;
                case 'optgroup':
                    return obj.label;
                    break;
                case 'radio':
                    return Get_radio_seltext(objId);
                    break;
                case 'img':
                    return obj.alt;
                    break;

                default: //Default is a label
                    return obj.innerText;
                    break;
            }
            break;
        case 3: //Firefox
            switch (sType)
            {
                case 'button':
                    return obj.textContent;
                    break;
                case 'label':
                    return obj.textContent;
                    break;
                case 'text':
                    return obj.value;
                    break;
                case 'textarea':
                    return obj.value;
                    break;
                case 'hyperlink':
                    return obj.innerHTML;
                    break;
                case 'checkbox':
                    if(obj.checked)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                    break;
                case 'hidden':
                    return obj.value;
                    break;
                case 'select-one':
                    return obj.options[obj.selectedIndex].text;
                    break;
                case 'option':
                    return obj.text;
                    break;
                case 'optgroup':
                    return obj.label;
                    break;
                case 'radio':
                    return Get_radio_seltext(objId);
                    break;
                case 'img':
                    return obj.alt;
                    break;

                default: //Default is a label
                    return obj.textContent;
                    break;
            }
            break;
        case 4: //Safari
            switch (sType)
            {
                case 'button':
                    return obj.textContent;
                    break;
                case 'label':
                    return obj.textContent;
                    break;
                case 'text':
                    return obj.value;
                    break;
                case 'textarea':
                    return obj.value;
                    break;
                case 'hyperlink':
                    return obj.innerHTML;
                    break;
                case 'checkbox':
                    if(obj.checked)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                    break;
                case 'hidden':
                    return obj.value;
                    break;
                case 'select-one':
                    return obj.options[obj.selectedIndex].text;
                    break;
                case 'option':
                    return obj.text;
                    break;
                case 'optgroup':
                    return obj.label;
                    break;
                case 'radio':
                    return Get_radio_seltext(objId);
                    break;
                case 'img':
                    return obj.alt;
                    break;

                default: //Default is a label
                    return obj.textContent;
                    break;
            }
            break;
        default: //IE
            switch (sType)
            {
                case 'button':
                    return obj.value;
                    break;
                case 'label':
                    return obj.innerText;
                    break;
                case 'text':
                    return obj.value;
                    break;
                case 'textarea':
                    return obj.value;
                    break;
                case 'hyperlink':
                    return obj.innerHTML;
                    break;
                case 'checkbox':
                    if(obj.checked)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                    break;
                case 'hidden':
                    return obj.value;
                    break;
                case 'select':
                    return obj.options[obj.selectedIndex].text;
                    break;
                case 'option':
                    return obj.text;
                    break;
                case 'optgroup':
                    return obj.label;
                    break;
                case 'radio':
                    return Get_radio_seltext(objId);
                    break;
                case 'img':
                    return obj.alt;
                    break;
                default: //Default is a HTML
                    return obj.innerHTML;
                    break;
            }
            break;
    }    
}

function GetListMultiValue(objId, bAll)
{
    if (bAll == null || typeof bAll == 'undefined')
    {
        bAll = false;
    }

    var obj = document.getElementById(objId);
    var iBrowserType = GetBrowserType();
    var j = 0;
    var arrReturn = [];
    switch(iBrowserType)
    {
        case 1: //IE
            for (var P = 0; P < obj.length; P++)
            {
                if (bAll)
                {
                    arrReturn[j] = obj.options[P].value;
                    if (arrReturn[j] == '')
                    {
                        arrReturn[j] = obj.options[P].text;
                    }
                    j++;

                }
                else
                {
                    if (obj.options[P].selected)
                    {
                        arrReturn[j] = obj.options[P].value;
                        if (arrReturn[j] == '')
                        {
                            arrReturn[j] = obj.options[P].text;
                        }
                        j++;

                    }
                }
            }
            break;
        case 2: //Chrome
            for(var P = 0; P< obj.length; P++)
            {
                if (bAll)
                {
                    arrReturn[j] = obj.options[P].value;
                    if (arrReturn[j] == '')
                    {
                        arrReturn[j] = obj.options[P].text;
                    }
                    j++;

                }
                else
                {
                    if (obj.options[P].selected)
                    {
                        arrReturn[j] = obj.options[P].value;
                        if (arrReturn[j] == '')
                        {
                            arrReturn[j] = obj.options[P].text;
                        }
                        j++;

                    }
                }
            }
            break;
        case 3: //Firefox
            for(var P = 0; P< obj.length; P++)
            {
                if (bAll)
                {
                    arrReturn[j] = obj.options[P].value;
                    if (arrReturn[j] == '')
                    {
                        arrReturn[j] = obj.options[P].text;
                    }
                    j++;

                }
                else
                {
                    if (obj.options[P].selected)
                    {
                        arrReturn[j] = obj.options[P].value;
                        if (arrReturn[j] == '')
                        {
                            arrReturn[j] = obj.options[P].text;
                        }
                        j++;

                    }
                }
            }
            break;
        case 4: //Safari
            for(var P = 0; P< obj.length; P++)
            {
                if (bAll)
                {
                    arrReturn[j] = obj.options[P].value;
                    if (arrReturn[j] == '')
                    {
                        arrReturn[j] = obj.options[P].text;
                    }
                    j++;

                }
                else
                {
                    if (obj.options[P].selected)
                    {
                        arrReturn[j] = obj.options[P].value;
                        if (arrReturn[j] == '')
                        {
                            arrReturn[j] = obj.options[P].text;
                        }
                        j++;

                    }
                }
            }
            break;
        default: //IE
            for(var P = 0; P< obj.length; P++)
            {
                if (bAll)
                {
                    arrReturn[j] = obj.options[P].value;
                    if (arrReturn[j] == '')
                    {
                        arrReturn[j] = obj.options[P].text;
                    }
                    j++;

                }
                else
                {
                    if (obj.options[P].selected)
                    {
                        arrReturn[j] = obj.options[P].value;
                        if (arrReturn[j] == '')
                        {
                            arrReturn[j] = obj.options[P].text;
                        }
                        j++;

                    }
                }
            }
            break;
    }
    
    return arrReturn;    
}

function GetObjectFromRowObject(row, sObjectid)
{
    //Get the children which will be <td>'s
    var iChildren = row.children.length;

    if (iChildren > 0)
    {
        for (var i = 0; i < iChildren; i++)
        {
            var childtd = row.children[i];
            //Get the grand children which will be objects in the <td>'s
            var iGrandChildren = childtd.children.length;
            for (var j = 0; j < iGrandChildren; j++)
            {
                var obj = childtd.children[j];
                if (obj.id == sObjectid)
                {
                    return obj;
                }
            }
        }

        //If we get to here then we have not found the object
        var obj = null;
        return obj;

    }
    else
    {
        var obj = null;
        return obj;
    }
}

function ResetCheckbox(sender)
{
    if(sender.checked)
    {
       sender.checked = false; 
    }
    else
    {
       sender.checked = true; 
    }
}

//////turn on off java script controls////////////////
function VisHTMLCrtls(PreNames,iRowCount,iColCount)
{

    for (var x = 0; x < iRowCount; x++)
    {            
        if(PreNames[1][x] == -1)
        {
        
            
            var el = document.getElementById(PreNames[0][x]);
//            if(typeof e1 != 'undefined')
//            {
                el.disabled = true;
            //}
        }
        else
        {

            var el = document.getElementById(PreNames[0][x]);
//            if(typeof e1 != 'undefined')
//            {
       //         el.disabled = false;
//            }     
        }
    }
}

///////currency format functions///////////////////
//////call each function separately///////////////
function CurrencyFormatted(amount)
{
	var i = parseFloat(amount);
	if(isNaN(i)) { i = 0.00; }
	var minus = '';
	if(i < 0) { minus = '-'; }
	i = Math.abs(i);
	i = parseInt((i + .005) * 100,10);
	i = i / 100;
	s = new String(i);
	if(s.indexOf('.') < 0) { s += '.00'; }
	if(s.indexOf('.') == (s.length - 2)) { s += '0'; }
	s = minus + s;
	return s;
}
// end of function CurrencyFormatted()

//To Unformat Currency to Number
function SCMSGetValue(num)
{
    var noJunk = ""
    var withDollar = ""
    var foundDecimal = 0
    var foundAlphaChar = 0
    num += "";

    if (num == "") { return(0); }
    for (i=0; i <= num.length; i++)
    {
        var thisChar = num.substring(i, i+1);
        if (thisChar == "." || thisChar == "-")
        {
          foundDecimal = 1;
          noJunk = noJunk + thisChar;
        }
        if ((thisChar < "0") || (thisChar > "9"))
        {
          if ((thisChar != "$") && (thisChar !=".") && (thisChar != ",") && (thisChar != " ") && (thisChar !="-") && (thisChar !="")) foundAlphaChar = 1;
        }
        else 
 {
    withDollar = withDollar + thisChar
    noJunk = noJunk + thisChar
 }

 if ((thisChar == "$") || (thisChar == ".") || (thisChar == ","))
 {
   withDollar = withDollar + thisChar
 }
  }
     if (foundDecimal) { return parseFloat(noJunk); }
     else if (noJunk.length > 0) { return parseFloat(noJunk); }
     else return 0;
}


function CommaFormatted(amount)
{
	var delimiter = ","; // replace comma if desired
	var a = amount.split('.',2)
	var d = a[1];
	if (typeof d == 'undefined')
	{
	    d = '00';
	}
	var i = parseInt(a[0],10);
	if(isNaN(i)) { return ''; }
	var minus = '';
	if(i < 0) { minus = '-'; }
	i = Math.abs(i);
	var n = new String(i);
	var a = [];
	while(n.length > 3)
	{
		var nn = n.substr(n.length-3);
		a.unshift(nn);
		n = n.substr(0,n.length-3);
	}
	if(n.length > 0) { a.unshift(n); }
	n = a.join(delimiter);
	if(d.length < 1) { amount = n; }
	else { amount = n + '.' + d; }
	amount = minus + amount;
	amount = "$" + amount;
	return amount;
}
// end of function CommaFormatted()
//////end of currency format functions///////

////create browse button. Browse butn opens file dialogbox////
function CreateFormBrowseButton( name, value, idname)
{
    var BrowseInput;    
    var BrowseHtml = '<input id="' + idname + '" type="file" name="' + name + '" value="' + value + '" runat="server" ';
       
    BrowseHtml += '/>';        
    BrowseInput = document.createElement(BrowseHtml);    
    return BrowseInput;
}
///////////////////////////////////////////////////////////////////////
/////checking dates dd/mm/yyyy format
////call the function ValidateDate and pass through the date to be checked

var dtCh= "/";
var minYear=1900;
var maxYear=2100;

function isInteger(s)
{
	var i;
    for (i = 0; i < s.length; i++){   
        // Check that current character is number.
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) return false;
    }
    // All characters are numbers.
    return true;
}

function SCMSparseFloat(dNumber)
{
    if(IsNumeric(dNumber))
    {
        return parseFloat(dNumber);
    }
    else
    {
        return 0.0;
    }
}

function stripCharsInBag(s, bag)
{
	var i;
    var returnString = "";
    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.
    for (i = 0; i < s.length; i++){   
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }
    return returnString;
}

function daysInFebruary (year)
{
	// February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
}
function DaysArray(n)
 {
	for (var iDays = 1; iDays <= n; iDays++) {
		this[iDays] = 31
		if (iDays==4 || iDays==6 || iDays==9 || iDays==11) {this[iDays] = 30}
		if (iDays==2) {this[iDays] = 29}
   } 
   return this
}

function isDate(dtStr)
{
	var daysInMonth = DaysArray(12);
	var pos1=dtStr.indexOf(dtCh);
	var pos2=dtStr.indexOf(dtCh,pos1+1);
	var strDay=dtStr.substring(0,pos1);
	var strMonth=dtStr.substring(pos1+1,pos2);
	var strYear=dtStr.substring(pos2+1);

	if(IsNumeric(strYear))
	{
	    if(parseInt(strYear,10) < 100)
	    {
	        if(parseInt(strYear,10) >= 80)
	        {
    	        strYear = parseInt(strYear,10) + 1900; 
	        }
	        else
	        {
    	        strYear = parseInt(strYear,10) + 2000; 
	        }
	    }
	}
	
	//Make sure the variable is a string
	strYear = strYear + '';

	var RtnArray = [];
	strYr=strYear;
	if (strDay.charAt(0)=="0" && strDay.length>1) strDay=strDay.substring(1);
	if (strMonth.charAt(0)=="0" && strMonth.length>1) strMonth=strMonth.substring(1);
	for (var iYearLgth = 1; iYearLgth <= 3; iYearLgth++)
	{
		if (strYr.charAt(0)=="0" && strYr.length>1) strYr=strYr.substring(1);
	}
	month=parseInt(strMonth,10);
	day=parseInt(strDay,10);
	year=parseInt(strYr,10);
	if (pos1==-1 || pos2==-1)
	{
		alert("The date format should be : dd/mm/yyyy");
		RtnArray[0] = false;
		return RtnArray;
	}
	if (strMonth.length<1 || month<1 || month>12)
	{
		alert("Please enter a valid month");
		RtnArray[0] = false;
		return RtnArray;
	}
	if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month])
	{
		alert("Please enter a valid day");
		RtnArray[0] = false;
		return RtnArray;
	}
		
	if (strYear.length != 4 || year==0 || year<minYear || year>maxYear)
	{
		alert("Please enter a valid 4 digit year between "+minYear+" and "+maxYear);
		RtnArray[0] = false;
		return RtnArray;
	}
	if (dtStr.indexOf(dtCh,pos2+1)!=-1 || isInteger(stripCharsInBag(dtStr, dtCh))==false)
	{
		alert("Please enter a valid date");
		RtnArray[0] = false;
		return RtnArray;
	}
	
	RtnArray[0] = true;
	RtnArray[1] = PadStringWithZeros(day,2, true) + "/" + PadStringWithZeros(month,2, true) + "/" + year;
    return RtnArray;
}

function ValidateDate(sender)
{
    if(sender.value == '' || sender.disabled == true || sender.readonly == true)
    {
        return true
    }
    else
    {
        var sDate = sender.value;
	    var sdtDate=trim(sDate.substring(0,10));
	    var rtnarray = isDate(sdtDate);
    	
	    if (rtnarray[0]==false)
	    {
	        sender.focus();
		    return false
	    }
    	
	    sender.value = rtnarray[1];
        return true
    }
 }

function ValidateDateAndTime(sender)
{
    var sDateParts = [];
    var sValue = GetObjectValue(sender.id);
    sDateParts = sValue.split(' ');
    
    var rtnarray = isDate(sDateParts[0]);

    if (rtnarray[0]==false)
    {
        sender.focus();
	    return false
    }
	
    var sDateOnly = rtnarray[1];
    
    if(sDateParts.length > 1)
    {
        var sTimePart = '';
        for(iii = 1; iii < sDateParts.length; iii++) 
        {
            sTimePart = sTimePart + trim(sDateParts[iii]); 
        }
    }
    else
    {
        sTimePart = '12:00:00 AM';
    }
    
    sTimePart = trim(sTimePart);

    //Now do the same for the time part
    if(countOccurencesInString(sTimePart,':') < 1)
    {
        alert('There does not seem to be a time component. You must use the : to separate time components.');
        sender.focus();
	    return false
    }

    var sTimeBits = [];
    var sTime = '';
    if(sTimePart.substring(sTimePart.length - 2,sTimePart.length).toUpperCase() == 'AM')
    {
        sTimeBit = sTimePart.substring(0,sTimePart.length - 2);
        sTimeBits = sTimeBit.split(':');
        if(sTimeBits[0] == 12)
        {
            sTimeBits[0] = '00';
        }     
    }
    else if(sTimePart.substring(sTimePart.length - 2,sTimePart.length).toUpperCase() == 'PM')
    {
        sTimeBit = sTimePart.substring(0,sTimePart.length - 2);
        sTimeBits = sTimeBit.split(':'); 
        sTimeBits[0] = parseInt(sTimeBits[0],10) + 12;  
        if(sTimeBits[0] == 24)
        {
            sTimeBits[0] = '00';
        }     
    }
    else
    {
        sTimeBit = sTimePart;
        sTimeBits = sTimeBit.split(':');
    }
    
    for(iii = 0; iii < 3; iii++) 
    {
        if(sTimeBits.length < iii + 1)
        {
            sTime = sTime + '00:'; 
        }
        else
        {
            sTime = sTime + PadStringWithZeros(sTimeBits[iii],2,true) + ':'; 
        }
    }
    
    var sFullDateAndTime = sDateOnly + ' ' + sTime.substring(0,sTime.length - 1);
    SetObjectValue(sender.id,sFullDateAndTime);
    return true
    

    
    
}

function String2Date(sDate)
{
    sDate = sDate + '';
    if(sDate.length < 8)
    {
        return false;
    }
    else
    {
        if(sDate.length < 10)
        {
        	var sdtDate=trim(sDate.substring(0,8))
        }
        else
        {
        	var sdtDate=trim(sDate.substring(0,10))
        }
    }
    
	var sdtDate=trim(sDate.substring(0,10))
	var rtnarray = isDate(sdtDate);
	
	if (rtnarray[0]==false)
	{
	    sender.focus();
		return false
	}
	
	return rtnarray[1];    
 }

function ValidateCommaSeparatedDateList(sender)
{
    var sDates = sender.value;
    var sDateArray = sDates.split(',');
    var sReturn = "";
    
    for(iii = 0; iii < sDateArray.length; iii++) 
    {
        if(sDateArray[iii] != '')
        {
	        var sdtDate=trim(sDateArray[iii].substring(0,10))
	        var rtnarray = isDate(sdtDate);
        	
	        if (rtnarray[0]==false)
	        {
	            sender.focus();
	            alert('This is for the date ' + sdtDate);
		        return false
	        }
	        else
	        {
	            sReturn += rtnarray[1]+',';
	        }
	    }
    }	
    
    if(sReturn.length >0)
    {
        if(sReturn.substring(sReturn.length-1, sReturn.length) == ',')
        {
            sReturn = sReturn.substring(0,sReturn.length-1);
        }
    }
    
	sender.value = sReturn;
    return true
}
 
///////////////end of validate date functions//////////////

// This adds days to a date object //
function AddDaysToDate(dtDate, iDays)
{
    var iOffsetBefore = dtDate.getTimezoneOffset();
    var newDate = new Date(dtDate.getTime() + iDays * 24 * 60 * 60 * 1000);
    var iOffsetAfter = newDate.getTimezoneOffset();
    var iMillisecondsToSubtract = (iOffsetBefore - iOffsetAfter) * 60 * 1000; //Take into account daylight savings.
    var newDate2 = new Date(newDate.getTime() - iMillisecondsToSubtract);
    return newDate2;
}

// This adds days to a string that looks like a date in the format dd/mm/yyyy //
function DateAddDays(sSendDate, iDays)
{
    if(sSendDate == "" || sSendDate == null)
    {
        return sSendDate;
    }
    
   //Now change the date to US format
    sDay = sSendDate.substring(0, sSendDate.indexOf('/'));
    sSendDate = sSendDate.substring(sSendDate.indexOf('/') + 1, sSendDate.length);
    sMonth = sSendDate.substring(0, sSendDate.indexOf('/')); 
    iMonth = parseInt(sMonth * 1.0,10) - 1;//Because January is month zero
    sSendDate = sSendDate.substring(sSendDate.indexOf('/') + 1, sSendDate.length);
    sYear = sSendDate;
    if(IsNumeric(sYear, false))
    {
        if(parseInt(sYear,10) < 100)
        {
            sYear = parseInt(sYear,10) + 2000;
        }
    }    
    
    var dtReturnDate = new Date(sYear, iMonth, sDay);    
    dtReturnDate.setDate(dtReturnDate.getDate()+iDays);
    sDay = PadStringWithZeros(dtReturnDate.getDate(), 2, true);
    sMonth = PadStringWithZeros(parseInt(dtReturnDate.getMonth(),10) + 1, 2, true);
    sYear = dtReturnDate.getFullYear();
    sReturnDate = sDay + "/" + sMonth + "/" + sYear;
    return sReturnDate;
}

function ConvertToUSDate(sSendDate)
{
    sDay = sSendDate.substring(0, sSendDate.indexOf('/'));
    sSendDate = sSendDate.substring(sSendDate.indexOf('/') + 1, sSendDate.length);
    sMonth = sSendDate.substring(0, sSendDate.indexOf('/')); 
    iMonth = parseInt(sMonth * 1.0,10) - 1;//Because January is month zero
    sSendDate = sSendDate.substring(sSendDate.indexOf('/') + 1, sSendDate.length);
    sYear = sSendDate;
    
    return sMonth + "/" + sDay + "/" + sYear;
}

function FormatDate(sSendDate, sSendSeparator, sOutputFormat)
{
    sDay = sSendDate.substring(0, sSendDate.indexOf(sSendSeparator));
    sSendDate = sSendDate.substring(sSendDate.indexOf(sSendSeparator) + 1, sSendDate.length);
    sMonth = sSendDate.substring(0, sSendDate.indexOf(sSendSeparator)); 
    iMonth = parseInt(sMonth * 1.0,10) - 1;//Because January is month zero
    sSendDate = sSendDate.substring(sSendDate.indexOf(sSendSeparator) + 1, sSendDate.length);
    sYear = sSendDate;
    
    switch(sOutputFormat)
    {
        case 'dd/mm/yyyy':
            return PadStringWithZeros(sDay,2,true) + "/" + PadStringWithZeros(sMonth,2,true) + "/" + PadStringWithZeros(sYear,2,true);
            break;
        case 'dd/mm/yy':
            return PadStringWithZeros(sDay,2,true) + "/" + PadStringWithZeros(sMonth,2,true) + (parseInt(sYear,10) - 2000);
            break;
        case 'mm/dd/yyyy':
            return PadStringWithZeros(sDay,2,true) + "/" + PadStringWithZeros(sMonth,2,true) + PadStringWithZeros(sYear,2,true);
            break;
        case 'mm/dd/yyyy':
            return PadStringWithZeros(sDay,2,true) + "/" + PadStringWithZeros(sMonth,2,true) + (parseInt(sYear,10) - 2000);
            break;
        default:
            return PadStringWithZeros(sDay,2,true) + "/" + PadStringWithZeros(sMonth,2,true) + PadStringWithZeros(sYear,2,true);
            break;
    }
}

function ConvertDateToString(dtDate)
{
    var sDay = dtDate.getDate();
    var sMonth = dtDate.getMonth() + 1; //Because January is mnth zero (what the effing hell. Only occurs on the month. Go figure!!!!!!)
    var sYear = dtDate.getFullYear();
    
    sDay = PadStringWithZeros(sDay, 2, true);
    sMonth = PadStringWithZeros(sMonth, 2, true);
    
    return sDay + "/" + sMonth + "/" + sYear;
    
}

//change state of cursor functions....
function cursor_wait()
{
  document.body.style.cursor = 'wait';
}

function cursor_clear() 
{
  document.body.style.cursor = 'default';
}
//end change state of cursor functions....

function UrlFullEncode(str) 
{
     str = escape(str);
     str = str.replace('%','%*');
     return str;
}
 
function UrlFullDecode(str) 
{
     str = str.replace('%*','%');
     str = unescape(str);
     return str;
}

function GetSynchronousJSONResponse(url, postData) // Used by Shane
{
        var xmlhttp = null;
        if (window.XMLHttpRequest)
            xmlhttp = new XMLHttpRequest();
        else if (window.ActiveXObject) {
            if (new ActiveXObject("Microsoft.XMLHTTP"))
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            else
                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        }

        url = url + "?rnd=" + Math.random(); // to be ensure non-cached version
        
        xmlhttp.open("POST", url, false);
        xmlhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xmlhttp.send(postData);
        var responseText = xmlhttp.responseText;
        
        return responseText;
}

//Our 3 button confirm stuff
// iButtonsType = 1 means 'OK', 'Cancel'
// iButtonsType = 2 means 'Yes', 'No'
// iButtonsType = 3 means 'Yes', 'No', 'Cancel'
// iButtonsType = 4 means 'OK'
function SCMS_confirm(iButtonsType, sMessage, sYesFunction, sNoFunction, sCancelFunction, sDefaultFunction)
{
    var sURLParams = "ButtonsType=" + iButtonsType + "^Message=" + sMessage + "^YesFunction=" + sYesFunction + "^NoFunction=" + sNoFunction + "^CancelFunction=" + sCancelFunction + "^";
    if(iButtonsType == 3)
    {
        var iDialogWidth = 300;
    }
    else
    {
        var iDialogWidth =240;
    }

    var iDialogHeight = 150;
    var iDivHeight = iDialogHeight - 100;

    iDialogHeight = parseInt(sMessage.length/30,10)*20 + 60;

        if (GetBrowserType() == 2)
        {
            iDialogWidth = iDialogWidth - 140;
            iDialogHeight = iDialogHeight - 140;
        }
        

    if (GetBrowserType() == 1) //navigator.appName.indexOf("Microsoft")!= -1 && parseInt(navigator.appVersion,10)>=4)
    {
        var iHeight = window.screenTop + document.body.offsetHeight/2 - 75;
        var iWidth = window.screenLeft + document.body.offsetWidth/2 - 120;
    }    
    else
    {
        var iHeight = window.screenY + window.innerHeight/2 - 75;
        var iWidth = window.screenX + window.innerWidth/2 - 120;
    }

    sURLParams += "DivHeight=" + iDivHeight + "^";

    //Note that most of these options DO NOT WORK IN FIREFOX. At the moment there is no way you can make FF display this modal ideally.
    var modalwin = window.showModalDialog('SCMSConfirm.aspx', sURLParams , 'dialogTop='+ iHeight + 'px;dialogLeft=' + iWidth + 'px;dialogWidth='+iDialogWidth+'px;dialogHeight='+iDialogHeight+'px;resizable=no;help=no;unadorned=yes;status=no;center=yes');
    
    if(modalwin == null)
    {   
        //Treat this as a cancel
        if (sDefaultFunction.indexOf('(') > 0)
        {
            eval(sDefaultFunction);
        }
        else
        {
            window[sDefaultFunction]();
        }
    }
    else
    {
        if(modalwin.indexOf('(') > 0)
        {
            eval(modalwin);
        }
        else
        {
            window[modalwin]();
        }
    }
    
}

function ObjectPosition(obj,bAbsolute) 
{
      if(bAbsolute == null)
      {
        bAbsolute = false;
      }
      var curleft = 0;
      var curtop = 0;
      if (obj.offsetParent) 
      {
            do 
            {
                  curleft += obj.offsetLeft;
                  if(!bAbsolute)
                  {
                    curleft -= obj.scrollLeft;
                  }
                  curtop += obj.offsetTop;
                  if(!bAbsolute)
                  {
                    curtop -= obj.scrollTop;
                  }
            } while (obj = obj.offsetParent);
      }
      
      return [curleft,curtop];
}

function GetMiddleOfScreenTop(iDialogHeight)
{
    if (navigator.appName.indexOf("Microsoft")!= -1 && parseInt(navigator.appVersion,10)>=4)
    {
        var iHeight = window.screenTop + document.body.offsetHeight/2 - iDialogHeight/2;
    }    
    else
    {
        var iHeight = window.screenY + window.innerHeight/2 - iDialogHeight/2;
    }
    
    return iHeight;
}

function GetMiddleOfScreenLeft(iDialogWidth)
{
    if (navigator.appName.indexOf("Microsoft")!= -1 && parseInt(navigator.appVersion,10)>=4)
    {
        var iWidth = window.screenLeft + document.body.offsetWidth/2 - iDialogWidth/2;
    }    
    else
    {
        var iWidth = window.screenX + window.innerWidth/2 - iDialogWidth/2;
    }
    
    return iWidth;
}

/////sort an array by number
function sortNumber(PassArray)
{
    var Arraysort = [];
    Arraysort = PassArray.slice();
    var len = Arraysort.length;

    Arraysort[0].sortNum()
    return Arraysort;

}

Array.prototype.sortNum = function()
{   return this.sort( function (a,b) { return a-b; } );}


//Do our own sort on a 2D array
// iSortType = 0 for string sort
//           = 1 for number sort
function SCMS_2D_Sort(PassArray, iColumnIndex, sDir, iSortType)
{
    var Arraysort = [];
    
    var Arraysort = [];
    for( var i=0 ; i< PassArray[iColumnIndex].length ; i++ ) 
    {
        Arraysort[i] = PassArray[iColumnIndex][i];
    }
    
    if(typeof iColumnIndex == 'undefined' || iColumnIndex == null)
    {
        iColumnIndex = 0;
    }
    
    if(sDir == 'asc' || typeof sDir == 'undefined')
    {
        if(iSortType == 1)
        {
            Arraysort.sortNumAsc();
        }
        else
        {
            Arraysort.sort();
        }
    }
    
    if(sDir == 'desc')
    {
        if(iSortType == 1)
        {
            Arraysort.sortNumDesc();
        }
        else
        {
            Arraysort.sort();
            Arraysort.reverse();
        }
    }
    
    var rtnArray = [];
    var arrPosnUsed = [];
    for( var i=0 ; i< Arraysort.length ; i++ ) 
    {
        arrPosnUsed[i] = false;
    }    
    //Create a new array to put it all into one new 2D array
    for( var i=0 ; i< Arraysort.length ; i++ ) 
    {
        var rtnArray1D = [];
        for( var j=0 ; j< PassArray[iColumnIndex].length ; j++ ) 
        {
        
            if(Arraysort[i] == PassArray[iColumnIndex][j] && !arrPosnUsed[j])
            {
                for( var k=0 ; k< PassArray.length ; k++ ) 
                {
                    rtnArray1D[k] = PassArray[k][j];
                }
                rtnArray[i] = rtnArray1D;
                arrPosnUsed[j] = true;
                break;
            }
        }
    }    
    
    //Now reverse the array (swap x and y)
    var rtnArray2 = [];

    for( var i=0 ; i< rtnArray[0].length ; i++ ) 
    {
        var rtnArray1D = [];
        for( var j=0 ; j< rtnArray.length ; j++ ) 
        {
            rtnArray1D[j] = rtnArray[j][i];
        }
        rtnArray2[i] = rtnArray1D;
    }    
        
    return rtnArray2;
}


//These are used above. The variables a and b are special variables and represent
//the 1st and 2nd element, 2nd and 3rd, 3rd and 4th etc as the function iterates
//through the array.
Array.prototype.sortNumAsc = function()
{   
    return this.sort( function (a,b) { return a-b; } );
}

Array.prototype.sortNumDesc = function()
{   
    return this.sort( function (a,b) { return b-a; } );
}



function sortfunctionasc(iColumn)
{
        return (a[iColumn] - b[iColumn]) //causes an array to be sorted numerically and ascending
}

function sortfunctiondesc(iColumn)
{    
        return (b[iColumn] - a[iColumn]) //causes an array to be sorted numerically and descending
}
////end sort

function TestBloodySort()
{
    var Array1 = [];
    var Array2 = [];
    var Array3 = [];
    
    Array1[0] = 'Z'
    Array1[1] = 'W'
    Array1[2] = 'Y'
    
    Array2 = Array1;
    
//    Array2.sort();
    Array3 = sort(Array2);
}

function clone(s) {
for(p in s)
this[p] = (typeof(s[p]) == 'object')? new clone(s[p]) : s[p];
}

function sortAlpha(PassArray)
{

    var Arraysort = [];
    Arraysort = PassArray.slice();
    var len = Arraysort.length;
    Arraysort.sort()
    return Arraysort;

}


function CheckKeyPress(sName,ballowneg)
{
     iRow = Get_RowNo_From_ControlName(sName);
     var dnumeric = document.getElementById(sName).value;
     
     if (IsNumeric(dnumeric,ballowneg))
     {
     }
     else
     {
     
        if(typeof dnumeric != null && dnumeric!='')
        {
            alert("Incorrect Quantity value has been entered! Re-enter value and try again.");
            document.getElementById(sName).value = 0;
            document.getElementById(sName).focus();
        }
        
     }
}

function opacity(id, opacStart, opacEnd, millisec) 
{ 
    //speed for each frame 
    var speed = Math.round(millisec / 100); 
    var timer = 0; 

    //determine the direction for the blending, if start and end are the same nothing happens 
    if(opacStart > opacEnd) { 
        for(i = opacStart; i >= opacEnd; i--) { 
            setTimeout("changeOpac(" + i + ",'" + id + "')",(timer * speed)); 
            timer++; 
        } 
    } else if(opacStart < opacEnd) { 
        for(i = opacStart; i <= opacEnd; i++) 
            { 
            setTimeout("changeOpac(" + i + ",'" + id + "')",(timer * speed)); 
            timer++; 
        } 
    } 
} 

//change the opacity for different browsers 
function changeOpac(opacity, id) 
{ 
    var object = document.getElementById(id).style; 
    object.opacity = (opacity / 100); 
    object.MozOpacity = (opacity / 100); 
    object.KhtmlOpacity = (opacity / 100); 
    object.filter = "alpha(opacity=" + opacity + ")"; 
} 

function SetDispaly2DivSize(ni2)
{
 switch (true)
        {
            case (screen.height > 1000):
                ni2.style.height = "550px";
                break;
            case (screen.height > 800):
                ni2.style.height = "450px";
                break;
            case (screen.height > 600):
                ni2.style.height = "350px";
                break;
            default:
                ni2.style.height = "200px";
                break;
            
        }
}

function UpdateProjectStatus(iStatus)
{
    document.getElementById("SCMSMasterPage_ProjectHeader1_lblStatusVal").innerText = iStatus;
}

function DisplayTelerikLoadingPanel(iLeft, iTop, mMasterPage)
{

    if(typeof mMasterPage == 'undefined')
    {
    var LoadPnl = document.getElementById("SCMSMasterPage_ContentPlaceHolder1_RadAjaxLoadingPanelDefault");
    }
    else
    {
    var LoadPnl = document.getElementById(mMasterPage + "_ContentPlaceHolder1_RadAjaxLoadingPanelDefault");
    }
    if(typeof iLeft == 'undefined' || iLeft == 0 || iLeft == null)
    {
          if(GetBrowserType() == 1)
          {
            if(window.event == null)
            {
                iLeft = GetMiddleOfScreenLeft(window.screenLeft);
            }
            else
            {
                iLeft = window.event.clientX;
            }
          }
          else
          {
            iLeft = m_x;
          }
    }

    if(typeof iTop == 'undefined' || iTop == 0 || iTop == null)
    {
        if(GetBrowserType() == 1)
        {
            if(window.event == null)
            {
                iTop = GetMiddleOfScreenTop(window.screenTop);
            }
            else
            {
                iTop = window.event.clientY;
            }
        }
        else
        {
            iTop = m_y;
        }

    }

    SetObjectLeft(LoadPnl, iLeft);
    SetObjectTop(LoadPnl, iTop);
    LoadPnl.style.zIndex = 1000;
    LoadPnl.style.visibility = 'visible';
    LoadPnl.style.display = 'block';
    LoadPnl.style.position = 'fixed';
}

function HideTelerikLoadingPanel(mMasterPage)
{

    if(typeof mMasterPage == 'undefined')
    {
    var LoadPnl = document.getElementById("SCMSMasterPage_ContentPlaceHolder1_RadAjaxLoadingPanelDefault");
    }
    else
    {
    var LoadPnl = document.getElementById(mMasterPage + "_ContentPlaceHolder1_RadAjaxLoadingPanelDefault");
    }

   // var LoadPnl = document.getElementById("SCMSMasterPage_ContentPlaceHolder1_RadAjaxLoadingPanelDefault");
    LoadPnl.style.visibility = 'hidden';
    LoadPnl.style.display = 'none';
    LoadPnl.style.position = 'fixed';
}

function DisplayTelerikMLLoadingPanel(iLeft, iTop, mMasterPage)
{
    var arrPosn = [];

    if(typeof mMasterPage == 'undefined')
    {
        var LoadPnl = document.getElementById("RadAjaxLoadingPanelDefault");
    }
    else
    {
        var LoadPnl = document.getElementById(mMasterPage + "_ContentPlaceHolder1_RadAjaxLoadingPanelDefault");
    }

    if(typeof iLeft == 'undefined' || iLeft == 0 || iLeft == null)
    {
        if(GetBrowserType() == 1)
        {
            if(window.event == null)
            {
                iLeft = GetMiddleOfScreenLeft(window.screenLeft);
            }
            else
            {
                iLeft = window.event.clientX;
            }
        }
        else
        {
            arrPosn = getClick();
            iLeft = arrPosn[0];
        }
    }

    if(typeof iTop == 'undefined' || iTop == 0 || iTop == null)
    {
        if(GetBrowserType() == 1)
        {
            if(window.event == null)
            {
                iTop = GetMiddleOfScreenTop(window.screenTop);
            }
            else
            {
                iTop = window.event.clientY;
            }
        }
        else
        {
            arrPosn = getClick();
            iTop = arrPosn[1];
        }
    }

    SetObjectLeft(LoadPnl, iLeft);
    SetObjectTop(LoadPnl, iTop);
    LoadPnl.style.zIndex = 99999;
    LoadPnl.style.visibility = 'visible';
    LoadPnl.style.display = 'block';
    LoadPnl.style.position = 'fixed';
}

function HideTelerikMLLoadingPanel()
{
    var LoadPnl = document.getElementById("RadAjaxLoadingPanelDefault");
    LoadPnl.style.visibility = 'hidden';
    LoadPnl.style.display = 'none';
    LoadPnl.style.position = 'fixed';
}

function GetMousePosition()
{
    var posn = [];
    if(GetBrowserType() == 1)
    {
        posn[0] = window.event.clientX;
        posn[1] = window.event.clientY;
    }
    else
    {
        posn[0] = m_x;
        posn[1] = m_y;
    }
    
    return posn;
}

function DisplayTelerikLoadingPanel_NoMasterPage(iLeft, iTop)
{
    var LoadPnl = document.getElementById("RadAjaxLoadingPanelDefault");
    if(typeof iLeft == 'undefined' || iLeft == 0 || iLeft == null)
    {
        if(GetBrowserType() == 1)
        {
            if(window.event == null)
            {
                iLeft = GetMiddleOfScreenLeft(window.screenLeft);
            }
            else
            {
                iLeft = window.event.clientX;
            }
        }
        else
        {
            arrPosn = getClick();
            iLeft = arrPosn[0];
        }
    }

    if(typeof iTop == 'undefined' || iTop == 0 || iTop == null)
    {
        if(GetBrowserType() == 1)
        {
            if(window.event == null)
            {
                iTop = GetMiddleOfScreenTop(window.screenTop);
            }
            else
            {
                iTop = window.event.clientY;
            }
        }
        else
        {
            arrPosn = getClick();
            iTop = arrPosn[1];
        }
    }

    SetObjectLeft(LoadPnl, iLeft);
    SetObjectTop(LoadPnl, iTop);
    LoadPnl.style.zIndex = 1000;
    LoadPnl.style.visibility = 'visible';
    LoadPnl.style.display = 'block';
    LoadPnl.style.position = 'fixed';
}
  
function HideTelerikLoadingPanel_NoMasterPage()
{
    var LoadPnl = document.getElementById("RadAjaxLoadingPanelDefault");
    LoadPnl.style.visibility = 'hidden';
    LoadPnl.style.display = 'none';
    LoadPnl.style.position = 'fixed';
}
  
  
function ScrollToPageBottom()
{
    var dh=document.body.scrollHeight;
    var ch=window.screen.Height;
    if(ch>dh)
    {
        moveme=ch-dh;
        window.scrollTo(0,moveme);
    }
}

function ScrollDivToBottom(sDivName)
{
    var objDiv = document.getElementById(sDivName);
    objDiv.scrollTop = objDiv.scrollHeight;
}

function OpenMLScreen()
{
        MLRef = window.open('ML_Build.aspx');
}

function OpenTrackerScreen()
{
        MLRef = window.open('wfrmTracker.aspx');
}

//CHECK LOGIN STATUS
function CheckLogout()
{
    iLoginStatus = getCookie('loginstatus');
    if(iLoginStatus != 1)
    {
        setCookie('loginstatus',0);
        deleteCookie('loginstatus');
        window.location = 'Logout.aspx';
        return false;
    }
    else
    {
        return true;
    }
}

function CheckHomeLogin()
{
    var sCallPage = GetURLParam('CallingPage');
    if(sCallPage == 'Login' || sCallPage == 'Home' )
    {
        var iHomeCookie = getCookie('loginstatushome');
        if(iHomeCookie == 0)
        {
            window.location = 'Logout.aspx';
        }
        else
        {
            setCookie('loginstatus','1');
        }
    }
    else
    {
        if(CheckLogout())
        {
            setCookie('loginstatus','1');
        }
    }
}

function ToExcel()
{ 
    if (window.ActiveXObject)
    { 

        var  xlApp = new ActiveXObject("Excel.Application");  
        var xlBook = xlApp.Workbooks.Add(); 


        xlBook.worksheets("Sheet1").activate; 
        var XlSheet = xlBook.activeSheet; 
        xlApp.visible = true;  

        for(var P = 1; P<= obj.getRowProperty("count"); P++)
        { 

              for(var Q = 1; Q <= obj.getColumnProperty("count"); Q++)
              { 
                  if (P==1)
                  { 
                    XlSheet.cells(P ,Q).value = obj.getColumnProperty("text",Q-1) 
                  } 
               
                  XlSheet.cells(P +1,Q).value = obj.getDataText(P-1,Q-1); 
             } 
        } 
        XlSheet.columns.autofit;  
    } 
}//end function 

function SetAnyDateChanged(sender)
{
    ValidateDate(sender);
    SetAnyValueChanged();
}

function SetDateChangedDisallowPast(sender)
{
    if(ValidateDate(sender))
    {
        var t = new Date();
        t.setHours(0,0,0,0)
        var datearr = sender.value.split('/');
        sUSDate = datearr[1] + '/' + datearr[0] + '/' + datearr[2];
        var ourdate = new Date(sUSDate);
        ourdate.setHours(23,59,59,999)
        if(isNaN(ourdate))
        {
            if(ourdate < t)
            {
                alert("You cannot set this date in the past");
	            sender.focus();
	            return false;            
            }
            else
            {
                SetAnyValueChanged();
	            return true;            
            }
        }
        else
        {
            SetAnyValueChanged();
            return true;            
        }
    }
    else
    {
        return false;            
    }
}

function stringToBoolean(string)
{ 
    if(typeof string == 'boolean')
    {
        return string;
    }
    
    if(typeof string == 'string')
    {
        switch(string.toLowerCase())
        { 
                case "true": case "yes": case "1": case "-1": return true; 
                case "false": case "no": case "0": case null: return false; 
                default: return Boolean(string); 
        } 
    }
} 

function SetHeaderPage(ctrlName,iTabIndex,sTitle)
{

  document.getElementById('SCMSMasterPage_ContentPlaceHolder1_' + ctrlName).innerText = sTitle;

}

function deepObjCopy (dupeObj) {
	var retObj = new Object();
	if (typeof(dupeObj) == 'object') {
		if (typeof(dupeObj.length) != 'undefined')
			var retObj = new Array();
		for (var objInd in dupeObj) {	
			if (typeof(dupeObj[objInd]) == 'object') {
				retObj[objInd] = deepObjCopy(dupeObj[objInd]);
			} else if (typeof(dupeObj[objInd]) == 'string') {
				retObj[objInd] = dupeObj[objInd];
			} else if (typeof(dupeObj[objInd]) == 'number') {
				retObj[objInd] = dupeObj[objInd];
			} else if (typeof(dupeObj[objInd]) == 'boolean') {
				((dupeObj[objInd] == true) ? retObj[objInd] = true : retObj[objInd] = false);
			}
		}
	}
	return retObj;
}


var ObjectHandler = {
    //public method
    getCloneOfObject: function(oldObject) {
        var tempClone = {};

        if (typeof(oldObject) == "object")
            for (prop in oldObject)
                // for array use private method getCloneOfArray
                if ((typeof(oldObject[prop]) == "object") &&
                                (oldObject[prop]).__isArray)
                    tempClone[prop] = this.getCloneOfArray(oldObject[prop]);
                // for object make recursive call to getCloneOfObject
                else if (typeof(oldObject[prop]) == "object")
                    tempClone[prop] = this.getCloneOfObject(oldObject[prop]);
                // normal (non-object type) members
                else
                    tempClone[prop] = oldObject[prop];

        return tempClone;
    },

    //private method (to copy array of objects) - getCloneOfObject will use this internally
    getCloneOfArray: function(oldArray) {
        var tempClone = [];

        for (var arrIndex = 0; arrIndex <= oldArray.length; arrIndex++)
            if (typeof(oldArray[arrIndex]) == "object")
                tempClone.push(this.getCloneOfObject(oldArray[arrIndex]));
            else
                tempClone.push(oldArray[arrIndex]);

        return tempClone;
    }
};

 function getBrowserHeight()
 {
    var intH = 0;
    var intW = 0;
   
    if(typeof window.innerWidth  == 'number' ) {
       intH = window.innerHeight;
       intW = window.innerWidth;
    } 
    else if(document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        intH = document.documentElement.clientHeight;
        intW = document.documentElement.clientWidth;
    }
    else if(document.body && (document.body.clientWidth || document.body.clientHeight)) {
        intH = document.body.clientHeight;
        intW = document.body.clientWidth;
    }

    return { width: parseInt(intW,10), height: parseInt(intH,10) };
 }  

    function setLayerPosition(shadow)
    {
        //var question = document.getElementById("question");
        var bws = getBrowserHeight();
        shadow.style.width = bws.width + "px";
        shadow.style.height = bws.height + "px";

        //question.style.left = parseInt((bws.width - 350) / 2);
        //question.style.top = parseInt((bws.height - 200) / 2);

        shadow = null;
        //question = null;
    }   
    
//////////////////////////////////////////////////////////////////////////////////
////use when having multiple tables on a page////
function SetRowStatusMulti(iRow, iStatus,crlOrigRow,crlStatus,bSetRowColour)
{
    document.getElementById(crlStatus+iRow).value = iStatus;
    SetEditStatus(-1); //Set it to update regardless of the change
    //Now also set the row colour
    
    if(typeof bSetRowColour == 'undefined')
    {
      bSetRowColour = true;
    }  
    
    var rowInstall = document.getElementById(crlOrigRow+iRow);
    
    if(bSetRowColour)
    {
        rowInstall.className = "GridTableRowUnsaved";
        if (iRow==iCurrentRow)
        {
            grdAltColor = rowInstall.className;
        }
    }
}



function ProjectMenuSelecting(iMenuClicked, sMenuText, sPassedProjectId)
{  
    iPageId = parseInt(GetLocalCurrentTab(),10);
    var bHeaderMenu = false;
    if(typeof sPassedProjectId != 'undefined')
    {
        gsProjectId = sPassedProjectId;
    }
    
    if(typeof iMenuClicked == 'undefined')
    {
        bHeaderMenu = false;
        iMenuClicked = 0;
        gsMenuText = '';
    }
    else
    {
        giMenuClicked = iMenuClicked;
        gsMenuText = sMenuText;
        bHeaderMenu = true;
    }
    //Some special code
    SetLocalPreviousTab(iPageId);
    if(iPageId == 100003)
    {
        setCookie('loginstatus','0');
    }
   //The edit status = 0 for no change, -1 for any change, 1 for save chnages and 2 for cancel changes or go back to where you were.

   var iEditStatus = GetEditStatus();

   
   if(iEditStatus == -1)
   {
        SCMS_confirm(2,'You have unsaved changes. Do you wish to save these changes?','MenuSaveYes','MenuSaveNo','','MenuSaveNo');
   }
   else
   {
        if(bHeaderMenu)
        {
            SetCurrentTab(iMenuClicked);
            RedirectPageFromMenu();
        }
   }
}
    
//When someone selects "YES" from the saved chnages on Menu select
function MenuSaveYes()
{
    iPageId = parseInt(GetLocalCurrentTab(),10);       
    SetEditStatus(1);
    switch(iPageId)
    {
        case 0:
            SaveProjectDetails();
            SetCurrentTab(giMenuClicked);
            RedirectPageFromMenu();
            break;

        case 1:
            SaveScopeHTML();
            SetCurrentTab(giMenuClicked);
            RedirectPageFromMenu();
            break;

        case 5:
            SaveDrwDetails();
            SetCurrentTab(giMenuClicked);
            RedirectPageFromMenu();
            break;
            
        case 7: //Maximo Compare
            alert("You must save and refresh from within the Structue Builder/Compare screen. Alternatively say 'No' but you will lose your changes.");
            break;
        case 8: //PSA Material
            SaveMatGrid();
            SetCurrentTab(giMenuClicked);
            RedirectPageFromMenu(giMenuClicked);
            break;
    
        case 9: //INstallation
            SaveInstallGrid();
            SetCurrentTab(giMenuClicked);
            RedirectPageFromMenu();
            break;
            
        case 10: //Non PSA
            SaveNpsaGrid();
            SetCurrentTab(giMenuClicked);
            RedirectPageFromMenu();
            break;    
            
        case 11: //Zone allowances
            SavePrelimGrid();
            SetCurrentTab(giMenuClicked);
            RedirectPageFromMenu();
            break;    
        
        case 12://Battery Calculator
            //Note for shane: This is where you write a function that transfers the data to a hidden field, the code on the vb side DTMenu_Click,
            // call the save function to save to database. The reason you don't have one here is because you have used the mousemove event to load the hidden field.
            BatCalc_onclick_Save();
            SetCurrentTab(giMenuClicked);
            RedirectPageFromMenu();
            break;    
            
        case 14: //Solar calcs
            SaveSolarGrid();
            SetCurrentTab(giMenuClicked);
            RedirectPageFromMenu();
            break;    

        case 15: //Cable schedule
            BtnSave_Grid();
            SetCurrentTab(giMenuClicked);
            RedirectPageFromMenu();
            break;
        
        case 16: //Diesel Calculator
            BtnDiesel_Save_onclick(this);            
            SetCurrentTab(giMenuClicked);
            RedirectPageFromMenu();
            break;
            
        case 32:
            SaveAllSignOff();
            SetCurrentTab(giMenuClicked);
            RedirectPageFromMenu();
            break;
            //These are only used if the signoff is over several pages
//        case 33: //Signoff PSA
//            SaveSignoffpsaGrid();
//            break;

//        case 34: //Signoff Non PSA
//            SaveNpsasignoffGrid();
//            break;
//                    
//        case 35:
//        
//            SaveinstallsignoffGrid()
//            break;
//            
//        case 36:
//        
//            SaveinstallmatsignoffGrid()
//            break;
//            
//        case 37:
//        
//            SaverecoverysignoffGrid()
//            break;
//            
//        case 38:
//            SavetransfersignoffGrid()
//            break;
//        case 39:
//            SaveconfigsignoffGrid()
//            break;       
        
        case 40://Battery Manual     
            BtnBattRem_Save_onclick();       
            SetCurrentTab(giMenuClicked);
            RedirectPageFromMenu();
            break;       
    
        case 54: //Power Id screen
            SavePwrIdGrid(0);
            SetCurrentTab(giMenuClicked);
            RedirectPageFromMenu();
            break;       
        case 57:
            alert("You cannot save the SOW review screen. You must choose either 'Save' or 'Design Not Required' from the buttons so that the system knows what option you have decided");
            SetEditStatus(3);
            break;
        case 58:
            SaveQuoteScopeHTML();
            SetCurrentTab(giMenuClicked);
            RedirectPageFromMenu();
            break;
        case 60: //Alarm Request
            Save_AlarmTemplateProcess();
            SetCurrentTab(giMenuClicked);
            RedirectPageFromMenu();
            break;
        case 61: //Exclusions
            BtnExclusionsSave_onclick();
            SetCurrentTab(giMenuClicked);
            RedirectPageFromMenu();
            break;
        case 62:
            SaveCustomerPO();
            SetCurrentTab(giMenuClicked);
            RedirectPageFromMenu();
            break;
        case 63:
            SaveRevGrid();
            SetCurrentTab(giMenuClicked);
            RedirectPageFromMenu();
            break;
         case 64:
            SaveMatTransGrid();
            SetCurrentTab(giMenuClicked);
            RedirectPageFromMenu();
            break;
        case 200: //Equipment Label Menu
            BtnSave_onclick();            
            SetCurrentTab(giMenuClicked);
            RedirectPageFromMenu();
            break;           
         case 302: //save administration deligates screen
            SaveDatabaseData();
            SetCurrentTab(giMenuClicked);
            RedirectPageFromMenu();
            break;           
         case 305: //save SP administration screen
            SaveSPAdminScreen();
            SetCurrentTab(giMenuClicked);
            RedirectPageFromMenu();
            break;           
         case 306: //save CP administration screen
            SaveCPAdminScreen();
            SetCurrentTab(giMenuClicked);
            RedirectPageFromMenu();
            break;           
         case 2007: //SCCD This app does not need to save used only by the menu            
            SetCurrentTab(giMenuClicked);            
            break;           
         case 3001: //Qmonitor This app does not need to save used only by the menu            
            SetCurrentTab(giMenuClicked);            
            break;                       

         case 307: //save Porject Exmept/Ignore screen
            ProcessIgnoreId();
            SetCurrentTab(giMenuClicked);
            RedirectPageFromMenu();
            break;           
         case 2027: //save new PSA material
            savematerial();
            SetCurrentTab(giMenuClicked);
            RedirectPageFromMenu();
            break;

         case 2029: //save new NonPSA material
            saveNpsaMaterial();
            SetCurrentTab(giMenuClicked);
            RedirectPageFromMenu();
            break;

    }                    
}

//When someone selects "NO" from the saved chnages on Menu select
function MenuSaveNo()
{
    SetCurrentTab(giMenuClicked);
//    iPageId = parseInt(GetLocalCurrentTab(),10);       
    SetEditStatus(2);
    RedirectPageFromMenu();
}

function RedirectPageFromMenu()
{
    var sName = 'ProjectMainPage_New.aspx';
    var iPrevPage = GetLocalPreviousTab();
    var iMenuClicked = GetLocalCurrentTab();
    var iEditStatus = GetEditStatus();
    if(gsProjectId != '')
    {
        var sID = gsProjectId;
        var iRetrieveType = GetRetrieveTypeSession();
        if(iRetrieveType == 0 || iRetrieveType == 1)
        {
           iMenuClicked = 0; 
        }
    }
    else
    {
        if(gsSessionProjectId != '')
        {
            var sID = gsSessionProjectId;
        }
        else
        {
            var sID = GetProjectId();
        }
    }
    var sExtra = '';
    
    switch(parseInt(iMenuClicked,10))
    {
        case 0:
            sName = 'ProjectMainPage_New.aspx'; 
            if(gsProjectId != '')
            {
                var sID = gsProjectId;
            }
            else
            {
                sID = GetHeaderProjectId();      
            }
            break;
        case 1:
            sName = 'Scope.aspx';       
            break;
        case 3:
            sName = 'ProjectStatus.aspx';       
            break;
        case 4:
            sName = 'wfrmDesignStatus.aspx';
            break;
        case 5:
            sName = 'wfrmDrawingStatus.aspx';       
            break;
        case 7:
            sName = 'wfrmMaximoCompare.aspx';       
            break;
        case 8:
            //sName = 'BOQMat.aspx';
            sName = 'BOQMat_matnew.aspx';                   
            break;
        case 9:
            sName = 'BOQInstall.aspx';       
            break;
        case 10:
            sName = 'Npsa.aspx';       
            break;
        case 11:
            sName = 'ZoneAllow.aspx';       
            break;
        case 12:
            sName = 'wfrmBatteryCalc.aspx';       
            break;
        case 14:
            sName = 'SolarCalc.aspx';       
            break;
        case 15:
            sName = 'wfrmCableSchedule.aspx';       
            break;
        case 16:
            sName = 'wfrmDiesel.aspx';       
            break;
        case 32:
            sName = 'Signoff_Page.aspx';
            break;
        case 40:
            sName = 'wfrmBatteryManualCalc.aspx';       
            break;
        case 50:
            sName = 'wfrmProjectManagement.aspx';                   
            break;
        case 51:
            sName = 'wfrmProjectManagement.aspx';                   
            break;
        case 52:
            sName = 'wfrmProjectManagement.aspx';                   
            break;
        case 53:
            sName = 'wfrmProjectManagement.aspx';                   
            break;
        case 54:
            sName = 'wfrmPwrId.aspx';       
            break;
        case 55:
            sName = 'wfrmPONumbers.aspx';       
            break;
        case 56:
            sName = 'ProjectRFQ.aspx';       
            break;
        case 57:
            sName = 'SOWReview.aspx';       
            break;
        case 58:
            sName = 'QuotationScope.aspx';       
            break;
        case 59:
            sName = 'wfrmSignoffStatus.aspx';       
            break;
        case 60:
            //sName = 'wfrmAlarmRequest.aspx';
              sName = 'wfrmAlarmAIRemote.aspx';      
            break;
        case 61:
            sName = 'wfrmExclusions.aspx';       
            break;
        case 62:
            sName = 'wfrmCustomerPO.aspx';       
            break;
        case 63:
            sName = 'wfrmRevision.aspx';       
            break;                        
        case 64:
            sName = 'wfrmMatTransfer.aspx';       
            break;                        
        case 65:
            sName = 'wfrmMITs.aspx';       
            break;                        
            
        case 200:
            sName = 'wfrmEquipmentLabel.aspx';       
            break;                        

        case 224:
            sName = 'wfrmEmail.aspx';
            break;
            
        case 225:
            sName = 'wfrmITPDesignerPage.aspx';
            break;

        case 301: //open administration user screen
            sName = 'wfrmAdministration.aspx';       
            break;
        case 302: //open administration deligates user screen
            sName = 'wfrmAdminDeligates.aspx';       
            break;          
        case 303: //open administration tcssupload user screen
            sName = 'wfrmTCSSUpload.aspx';       
            break;            
         case 304: //open administration tcssupload user screen
            sName = 'wfrmInvoicing.aspx';       
            break;
        case 305: //open SP administration screen
            sName = 'wfrmAdminSP.aspx';       
            break;            
        case 306: //open CP administration screen
            sName = 'wfrmAdminCP.aspx';       
            break;            
        case 307: //open the project ignore administration screen
            sName = 'wfrmProjectIgnore.aspx';       
            break;            
        case 308:
            sName = 'wfrmAdminStateOffice.aspx';       
            break;

        case 1042:
            window.open('Reports.aspx?ReportIndex=1&ProjectId=' + sID);
            break;
        case 1043:
            window.open('PifReportXSL.aspx');
            break;
        case 1044:
            window.open('Reports.aspx?ReportIndex=3&ProjectId=' + sID);
            break;
        case 1045:
            window.open('Reports.aspx?ReportIndex=4&ProjectId=' + sID);
            break;
        case 1046:
            window.open('Reports.aspx?ReportIndex=9&ProjectId=' + sID);
            break;
        case 1047:
            window.open('Reports.aspx?ReportIndex=10&ProjectId=' + sID);
            break;
        case 1048:
            window.open('Reports.aspx?ReportIndex=15&ProjectId=' + sID);                        
            break;
        case 1049:            
            window.open('Reports.aspx?ReportIndex=16&ProjectId=' + sID);            
            break;
        case 1061:
            OpenMLReportsScreen(1);
            break;
            
            
        case 2003:
            window.open('ML_Build.aspx');
            DisableMenu(2003);
            DTMenuSetActiveHiddenFld(2003);
            break;
        case 2007:            
            window.open('SCCD/Forms/wfrmSCCD.aspx?iNavFrom=0');        
            DisableMenu(2007);        
            DTMenuSetActiveHiddenFld(2007);
            break;
        case 2010:
            window.open('wfrmTracker.aspx?ProjectId='+sID);
            DisableMenu(2010);
            DTMenuSetActiveHiddenFld(2010);
            break;           
        case 2012:
            window.open('wfrmTrackerReports.aspx');
            break;           
        case 2023:
            window.open('wfrmWAMProcess.aspx');
            break;
        case 2024:
            window.open('wfrmAdminCSA.aspx');
            break;            
        case 2027:
            window.open('wfrmNewMaterial.aspx');
            break;
        case 2028:
            window.open('wfrmHoldingstock.aspx');
            DisableMenu(2028);
            DTMenuSetActiveHiddenFld(2028);            
            break;            
        case 2029:
            window.open('wfrmNewNpsaMaterial.aspx');
            break;

        case 3001:
            window.open('wfrmQueueMonitor.aspx');
            DisableMenu(3001);
            DTMenuSetActiveHiddenFld(3001);
            break;

        case 3002:
            window.open('wfrmDMR.aspx');
            DisableMenu(3002);
            DTMenuSetActiveHiddenFld(3002);
            break;

        case 100001:
            sName = 'SCMSHome.aspx';
            break;
         case 100002:
            sName = 'frmCreateNewDesign.aspx';
            break;
         case 100003:
            sName = 'Logout.aspx';       
            break;
         case 100004:
            sName = 'DesignSelection.aspx';       
            break;
                        
        case 200001:
            sName = 'wfrmSubContractorsHome.aspx';
            break;

        case 200200:
            sName = 'wfrmEquipmentLbsubcont.aspx';       
            break;                        
        
        case 200204:            
            sName = 'wfrmITP.aspx';       
            break;

        case 200205:
            sName = 'ITPInstallerPage.aspx?ReportIndex=1';            
            break;                        

        case 201:
            sName = 'wfrmMops.aspx';       
            break;
            
        case 2029:
            window.open('wfrmNewNpsaMaterial.aspx');
            break;
            
        case 1050:            
            window.open('Reports.aspx?ReportIndex=12&ProjectId=' + sID);            
            break;

        case 2030:
            window.open('wfrmBatManEntry.aspx');
            DisableMenu(2030);
            DTMenuSetActiveHiddenFld(2030);
            break;

        case 66:
            sName = 'wfrmQuoteman.aspx';
            break; 


        default:
            sName = window.location; 
            break;
    }
    
    switch(iPrevPage)
    {
        case 100001:                
        sExtra = '&CallingPage=Home';      
        break;
        
        case 100003:                
        sExtra = '&StandardLogout=1';
        break;

        case 100004:                
        sExtra = '&CallingPage=DesignSelection';      
        break;

        default:
        sExtra = '&CallingPage=ProjectDetails&ProjectId=' + sID;      
        break;
    }
    
    switch(parseInt(iMenuClicked,10))
    {
        case 50:        
            sExtra += '&PageNo=50';      
            break;
        case 51:
            sExtra += '&PageNo=51';      
            break;
        case 52:
            sExtra += '&PageNo=52';      
            break;
        case 53:            
            sExtra += '&PageNo=53';      
            break;
    }
    
    if(parseInt(iMenuClicked,10) <1000 || parseInt(iMenuClicked,10) >= 4000)
    {
        giMenuClicked = 0;
        gsProjectId = '';
        var sString = 'PreviousPage='+iPrevPage+'&CurrentPage='+iMenuClicked + '&EditStatus='+iEditStatus + '&TitleText='+ gsMenuText + sExtra;
        sName = sName + "?" + sString;
        window.location = sName;
    }
}


function SetRowColourDefault(rowItem)
{
    rowItem.className = 'grdRowAlterColor1';
}

function SetRowColourDefault2(rowItem)
{
    rowItem.className = 'grdDataDivBckGrdColor';
}

function SetRowColourChanged(rowItem)
{
    rowItem.className = 'grdRowChangedColor';
}

///////disables a control : send thru control,readonly flag, visibility option/////// 
function DisableControl (Crlname, iReadOnly, iVisibility) 
{

      if(iVisibility == -1)
      {
        Crlname.disabled = true;
      }
      if(iVisibility == 0)
      {
          Crlname.style.visibility = 'hidden';
      }
      if(iReadOnly == -1)
      {
        Crlname.disabled = true;
      }
      return 0;
}

// Disables a control and everything within the control. (Say a div and then all the elements within the div will also be disabled)
//Set bOnOff = true to disable, false to re-enable
function DisableControlRecursive(obj, bOnOff)
{
    if(obj.nodeName != '#text')
    {
        obj.disabled = bOnOff;
    }
    
    if(obj.hasChildNodes())
    {
        for(var i = 0;i<obj.childNodes.length;i++)
        {
            DisableControlRecursive(obj.childNodes[i], bOnOff);
        }
    }
}

///////displays the poreportxsl.aspx page for PO number info\\\\\\\\\\\\\\\\\\\\\\\\\    
function DisplayPORpt(sName, sId)
{
    var iRow =0;
    iRow = Get_RowNo_From_ControlName(sName);    
    var iPonumber = document.getElementById('POModified'+iRow).innerText;
    window.open("Reports.aspx?ReportIndex=13&ProjectId=" + sId + "&PONumber=" + iPonumber);
    
}


//get the URL parameter (called QueryString in VB.NET)
function GetURLParam(name)
{  
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
    var regexS = "[\\?&]"+name+"=([^&#]*)";  
    var regex = new RegExp( regexS );  
    var results = regex.exec( window.location.href );  
    if( results == null )
        return "";
    else    
        return results[1];
}


function OpenHelp(iHelpIndex)
{
    if(typeof iHelpIndex != 'undefined')
    {
        window.open('Help_Index.aspx?Help_Index_Window='+ iHelpIndex);
    }
    else
    {
        window.open('Help_Index.aspx?Help_Index_Window=');
    }
}

function SCCDOpenHelp(iHelpIndex)
{
    if(typeof iHelpIndex != 'undefined')
    {
        window.open('../../Help_Index.aspx?Help_Index_Window='+ iHelpIndex);
    }
    else
    {
        window.open('../../Help_Index.aspx?Help_Index_Window=');
    }
}

function SetPopUpParams(sSendValue)
{
    sPopUpParams = sSendValue;
}

function GetPwrIdPopupArgs()
{
    return sPopUpParams;
}

//Synchronise scrolling
//Place this function in the onScroll event of the bottom div and make sure the 
//top div has overflow:hidden and the bottom div has overflow:auto is the style
function synchronizeHorizScroll(bottomdivname, topdivname)
{
    var bottomdiv = document.getElementById(bottomdivname);
    var topdiv = document.getElementById(topdivname);
    if (bottomdiv.scrollLeft >= 0) 
    {
        topdiv.scrollLeft = bottomdiv.scrollLeft;
    }
}


function GetPwrIdPopupArgs()
{
    return sPopUpParams;
}

//Check Roles
//pass through Session("sUserRoles") and the role to check for i.e. Admins
//at this stage ensure spelling is correct of Rolerequired
function checkuserrole(sRoles, Rolerequired)
{

//    Rolerequired = "," + Rolerequired + ",";
//    sRoles = "," + sRoles;
//    
//    if (sRoles.indexOf(Rolerequired) == 0)
//    {
//        return true
//    }
//    else
//    {
//        return false
//    }    

      var strRoles = sRoles.split(',');
      for(var x = 0; x < strRoles.length ; x++)
      { 
        if (strRoles[x].toUpperCase() == Rolerequired.toUpperCase())
        {
            return true;
        }
      }     
        
      return false;
}

//*******************************************************//
//      ENCRYPTION STUFF
//*******************************************************//

function GetEncrypytionKey()
{
    return "%:<M@*8JD;8:9-I(X^H20D(8GTBW%VDFP>[)<MAK+TK^*7RL'E*RD(]:NRPV1VWTF48^8C'H)4]W0OCN+U[NU%TK;0QJ0MV3_K;2.[2&YKX'FH$OACJ)]MVL(\14[LJA99N$U+-CWK(K(4=3B>]`U6-^.MWU0(=#*/\5-A`D<)2JL#ZYH9@=9/`'(322%/98K[N++1XI#R$%/'G'/'\<@I?C0>'J45H$;5ODIK]7#<'[IRL;M8[`&WOX]#``WK5HP,HED$;-VW%3U:38@^*/%/[HOQL9KFHG'2$/TK:MZVF+N,EA^O.&5[04\=PQH5LCU8KC4T%<G,8F.<N8F:RGQ5S=^WX0G,L\:2*D\PEX7H#G-=W>NODW6JQF2ROSD:Q8-Q)5JR%GC^00E?,7QD+XY.62/`]A85&6GG1T5-M*F_IA2TRB+I1J92G`/4/8[,R8%G/*V0K_Y@Y=-QWC2P?1L)Q8K=+;,2$_]BI2*/&MW0L(0EE[CKBLN$^U`/=L_W_Q"
}

function EnCrypt(strCryptThis)
{
    var g_Key = GetEncrypytionKey();
    var strEncrypted = '';
    for(var q = 0; q < strCryptThis.length ; q++)
    { 
      var sKeyChar = g_Key.substring(q,q+1);
      var iKeyChar = sKeyChar.charCodeAt(0);
      var sStringChar = strCryptThis.substring(q,q+1);
      var iStringChar = sStringChar.charCodeAt(0);
      var iCryptChar = iKeyChar ^ iStringChar;
      strEncrypted =  strEncrypted + String.fromCharCode(iCryptChar);
    }
   return strEncrypted
}

function DecryptQS(sString)
{
    sString = sString.substring(sString.indexOf('?')+1, sString.length);
    var sUncrypt = EnCrypt(sString);
    return sUncrypt;
}




function EnableMenu2(iValue)
{
 var menu = GetMenu();
 for (var i = 0; i < menu.get_allItems().length; i++)
 {
    if(menu.get_allItems()[i].get_value() == iValue)
    {
        menu.get_allItems()[i].enable();
        var menuitem = menu.get_allItems()[i];
//        menuitem.set_cssClass('rmItem');
        alert('Enabling menu 2 ' + iValue);
    }
 }
} 

function DisableMenu2(iValue)
{
 var menu = GetMenu();
 for (var i = 0; i < menu.get_allItems().length; i++)
 {
    if(menu.get_allItems()[i].get_value() == iValue)
    {
        menu.get_allItems()[i].disable();
        var menuitem = menu.get_allItems()[i];
        alert('Disabling menu 2 ' + iValue);
    }
 }
}


//*******************************************************//
//      Standard Text Area STUFF - AE                    //
//*******************************************************//
function SCMS_StandardTextArea(sID, sTitleText, sText, sControlName, iDatabaseSave, sender)
{
    //Built the URL to pass parameters to the modal window and set size and position - AE
    var sURLParams = "ProjectId=" + sID + "&TitleText=" + sTitleText + "&Text=" + sText + "&DatabaseSave=" + iDatabaseSave;
    var sURLParamsLine = sURLParams.replace(/\n\r?/g, '%0A');
    var iDialogWidth = 600;
    var iDialogHeight = 600;

    if (sender != null)
    {
        arrPosn = ObjectPosition(sender, true);

        if (navigator.appName.indexOf("Microsoft") != -1 && parseInt(navigator.appVersion, 10) >= 4)
        {
            var iTop = window.screenTop + arrPosn[1];
            var iLeft = window.screenLeft + arrPosn[0];
        }
        else
        {
            var iTop = window.screenY + arrPosn[1];
            var iLeft = window.screenX + arrPosn[0];
        }
    }
    else
    {
        if (navigator.appName.indexOf("Microsoft") != -1 && parseInt(navigator.appVersion, 10) >= 4)
        {
            var iTop = window.screenTop + document.body.offsetHeight / 2 - 75;
            var iLeft = window.screenLeft + document.body.offsetWidth / 2 - 120;
        }
        else
        {
            var iTop = window.screenY + window.innerHeight / 2 - 75;
            var iLeft = window.screenX + window.innerWidth / 2 - 120;
        }
    }

    var modalwin = window.showModalDialog('wfrmSCMSTextArea.aspx?' + sURLParamsLine, sURLParamsLine, 'dialogTop=' + iTop + 'px;dialogLeft=' + iLeft + 'px;dialogWidth=' + iDialogWidth + 'px;dialogHeight=' + iDialogHeight + 'px;resizable=no;help=no;unadorned=yes;status=no;center=yes');

    //Return value to set the control value - AE
    if (modalwin == null)
    {
        alert('Changes were not saved. Please enter changes and press button "Save".')
    }
    else
    {
        if (modalwin != -1)
        {
            var temp = modalwin;
            SetObjectValue(sControlName, temp);
        }
    }
}

//*******************************************************//
//      ATTACHMENT STUFF
//*******************************************************//
//Leave sSharepointSiteFolder = '' if you want ot put in the root share documents folder of the site.
function SCMS_Attachment(sID, iAttachmentType, sTitleText, sAttachmentsExistCheckboxName, bUploadToSharepoint, sSharepointSite, sSharepointSiteFolder, sender)
{    
    var sURLParams = "ProjectId=" + sID + "&AttachmentType=" + iAttachmentType + "&TitleText=" + sTitleText;
    var iDialogWidth = 600;
    var iDialogHeight = 600;
    
    if(typeof bUploadToSharepoint == 'undefined')
    {
        bUploadToSharepoint = false;
    }
    
    if(!bUploadToSharepoint)
    {
        sSharepointSite = '';
        sSharepointSiteFolder = ''
    }
    
    sURLParams = sURLParams + "&SharepointSite=" + sSharepointSite + "&SharepointSiteFolder=" + sSharepointSiteFolder;
    if(sender != null)
    {
        arrPosn = ObjectPosition(sender, true);

        if (navigator.appName.indexOf("Microsoft")!= -1 && parseInt(navigator.appVersion,10)>=4)
        {
            var iTop = window.screenTop  + arrPosn[1];
            var iLeft = window.screenLeft + arrPosn[0];
        }    
        else
        {
            var iTop = window.screenY  + arrPosn[1];
            var iLeft = window.screenX + arrPosn[0];
        }
    }
    else
    {
        if (navigator.appName.indexOf("Microsoft")!= -1 && parseInt(navigator.appVersion,10)>=4)
        {
            var iTop = window.screenTop + document.body.offsetHeight/2 - 75;
            var iLeft = window.screenLeft + document.body.offsetWidth/2 - 120;
        }    
        else
        {
            var iTop = window.screenY + window.innerHeight/2 - 75;
            var iLeft = window.screenX + window.innerWidth/2 - 120;
        }
    }

    if (iAttachmentType == 21 || iAttachmentType == 22)
    {        
        var modalwin = window.showModalDialog('../../wfrmSCMSAttachments.aspx?' + sURLParams, sURLParams, 'dialogTop=' + iTop + 'px;dialogLeft=' + iLeft + 'px;dialogWidth=' + iDialogWidth + 'px;dialogHeight=' + iDialogHeight + 'px;resizable=no;help=no;unadorned=yes;status=no;center=yes');
    }
    else
    {
        var modalwin = window.showModalDialog('wfrmSCMSAttachments.aspx?' + sURLParams, sURLParams, 'dialogTop=' + iTop + 'px;dialogLeft=' + iLeft + 'px;dialogWidth=' + iDialogWidth + 'px;dialogHeight=' + iDialogHeight + 'px;resizable=no;help=no;unadorned=yes;status=no;center=yes');
    }
        
    if (sAttachmentsExistCheckboxName !='')
    {
        if(modalwin == 1)
        {   
            document.getElementById(sAttachmentsExistCheckboxName).checked = true;
        }
        else
        {
            document.getElementById(sAttachmentsExistCheckboxName).checked = false;
        }
    }
}

//*******************************************************//
//      STANDARD IMPORT POPUP STUFF                      //
//*******************************************************//
function SCMS_Import(sID, iAttachmentType, sTitleText)
{    
    var sURLParams = "ProjectId=" + sID + "&AttachmentType=" + iAttachmentType + "&TitleText=" + sTitleText;
    var iDialogWidth = 600;
    var iDialogHeight = 80;
        
    if (GetBrowserType() == 1)
    {
        var iHeight = window.screenTop + document.body.offsetHeight/2 - 75;
        var iWidth = window.screenLeft + document.body.offsetWidth/2 - 120;
    }    
    else
    {
        var iHeight = window.screenY + window.innerHeight/2 - 75;
        var iWidth = window.screenX + window.innerWidth/2 - 120;
    }
    
    var modalwin = window.showModalDialog('wfrmSCMSImport.aspx?'+sURLParams, sURLParams , 'dialogTop='+ iHeight + 'px;dialogLeft=' + iWidth + 'px;dialogWidth='+iDialogWidth+'px;dialogHeight='+iDialogHeight+'px;resizable=no;help=no;unadorned=yes;status=no;center=yes');
        
}

function ImportEstimates()
{
    SCMS_Import("Estimates",16, "Estimate File Import");
}

//*******************************************************//
//      DISABLE/ENABLE MENU ACROSS WINDOWS
//*******************************************************//
function SetStatusMenuFields(iCurrent,sender)
{

    var sID = GetProjectId();
    var sUser = GetUserId();
    senderobj = sender;
                
    switch (parseInt(iCurrent,10))
    {
        case 6://59:
                //Signoff Status Menu Select
               // ProjectMenuSelecting(59,"Signoff Screen");
                wbsSignOff.Get_SignOffStatus_Data(sID,sUser,wbsPopupSucc,wbsPopupFail);               
                break;  
    
        case 4:
                //Design Status Menu Select
                //ProjectMenuSelecting(4,"Design Status");
                wbsDesignstat.DesignHistoryData(sID,sUser,wbsPopupSucc,wbsPopupFail);                
                
                break;    
    
        case 5: //Drawing Status Menu Select  

               // ProjectMenuSelecting(5,"Drawing Status");                
                wbsDrawstat.DrawStatusHistory(sID,sUser,wbsPopupSucc,wbsPopupFail);
                                
                break;
        case 7: //Project Status Menu Select  

               // ProjectMenuSelecting(5,"Drawing Status");                
                wbsProjectDetails.ProjStatusHistory(sID,sUser,wbsPopupSucc,wbsPopupFail);
                                
                break;
                
         case 8: //Project Status Menu Select  

               // ProjectMenuSelecting(5,"Drawing Status");                
                wbsAlarmRequest.ProjSsipHistory(sID,sUser,wbsPopupSucc,wbsPopupFail);
                                
                break;               
               
    }
}

function OpenWamsWindow()
{
        MLRef = window.open('wfrmWAMProcess.aspx');
}  

function XMLSpecialCharsFilter(xmlString)
{
    var var1 = replaceAll(xmlString,'<','&lt;');
    var var2 = replaceAll(var1,'&','^amp;');
    var var3 = replaceAll(var2,'^','&');
    var var4 = replaceAll(var3,'>','&gt;');
    var var5 = replaceAll(var4,'"','&quot;');
    var var6 = replaceAll(var5,"'",'&apos;');


    return var6;
}

function OpencSAWindow()
{
        MLRef = window.open('wfrmAdminCSA.aspx');
}

//////////////////////////////////////////////////////////////////////////////
////////////The following function is the successful return of data to displayed a popup window.///////
//////////////////////////////////////////////////////////////////////////////

function wbsPopupSucc(Result)
{

        var colheader = [];
        var colheaderWdth = [];

        if(Result.indexOf('||') > -1)
        {          
            
            var srowcol = Result.substring(Result.indexOf('||')+2, Result.length);
            var sArray = srowcol.split('^');
            var iRow = sArray[0];
            var iCol = sArray[1];
            var iCase = sArray[2];
            var aData = Result.substring(0, Result.indexOf('||')); 

            var sColNames = [];
            
              switch (parseInt(iCase,10))
              {
              
                 case 4:

                        colheader[0]="Design Status"; 
                        colheader[1]="Description";
                        colheader[2]="Status Date";
                        colheader[3]="User";    
                        colheader[4]="Date Processed";      
                        colheader[5]="Comments";        
                        
                        colheaderWdth[0]="100px"; 
                        colheaderWdth[1]="100px";
                        colheaderWdth[2]="100px";
                        colheaderWdth[3]="100px";    
                        colheaderWdth[4]="200px";      
                        colheaderWdth[5]="200px";

                        drawpopup(senderobj,aData,iRow,iCol,colheader,colheaderWdth,"Design Status");
                 
                        break;

                 case 5:

                        colheader[0]="Drawing Status"; 
                        colheader[1]="Profile";
                        colheader[2]="Description";
                        colheader[3]="Status Date";    
                        colheader[4]="User";            
                        colheader[5]="Date Processed";    
                        colheader[6]="Comments";            
                        
                        colheaderWdth[0]="100px"; 
                        colheaderWdth[1]="100px";
                        colheaderWdth[2]="100px";
                        colheaderWdth[3]="100px";    
                        colheaderWdth[4]="100px";
                        colheaderWdth[5]="200px";    
                        colheaderWdth[6]="200px";            

                        drawpopup(senderobj,aData,iRow,iCol,colheader,colheaderWdth,"Drawing Status");
                 
                        break;
                        
                  case 6:
                  
                        colheader[0]="Status";
                        colheader[1]="Sign Off Date";        
                        colheader[2]="User";
                                
                        colheaderWdth[0]="100px"; 
                        colheaderWdth[1]="200px";
                        colheaderWdth[2]="200px";                                                        
                        
                        drawpopup(senderobj,aData,iRow,iCol,colheader,colheaderWdth,"SignOff Status");                        
                        
                        break;
                        
                  case 7:
                  
                        colheader[0]="Project Status"; 
                        colheader[1]="Status Description";
                        colheader[2]="Status Date";
                        colheader[3]="User";    
                        colheader[4]="Date Processed";      
                        
                        colheaderWdth[0]="100px"; 
                        colheaderWdth[1]="200px";
                        colheaderWdth[2]="200px";
                        colheaderWdth[3]="100px";    
                        colheaderWdth[4]="200px";      
                                      
                        var itopvalue = 140;                                      
                                                      
                        drawpopup(senderobj,aData,iRow,iCol,colheader,colheaderWdth,"Project Status",itopvalue);                        
                        
                        break;                        
                    
                    
                  case 8:
                  
                        colheader[0]="SSIP"; 
                        colheader[1]="Profile";
                        colheader[2]="Issue Number";
                        colheader[3]="User";    
                        colheader[4]="Date";                       
                        
                        colheaderWdth[0]="100px"; 
                        colheaderWdth[1]="100px";
                        colheaderWdth[2]="100px";
                        colheaderWdth[3]="100px";    
                        colheaderWdth[4]="150px";
                                                               
                        var itopvalue = 140;                                      
                                                      
                        drawpopup(senderobj,aData,iRow,iCol,colheader,colheaderWdth,"SSIP History",itopvalue);                        
                        
                        break;                    
                    
                        
                 default:
                        
                        break;
              }           
        }
        else
        {
            var sArray = Result.split('=');
            alert('Data can not be displayed due to the following error : ' + sArray[1]);
        }
}

function wbsPopupFail(Result)
{
    alert('Failed to obtain data due to : ' + Result[0]);
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

function OpenPSAWindow()
{
    MLRef = window.open('wfrmNewMaterial.aspx');
}



//*****************************************************//
// BROWSER DETECTION                                   //
//*****************************************************//
//-1 = Unknown Browser (or unsupported really)
// 1 = IE
// 2 = Chrome
// 3 = Firefox
// 4 = Safari
function GetBrowserType()
{
    if(navigator.userAgent.indexOf('MSIE') > 0)
    {
	    var iVersion = getInternetExplorerVersion();
	    if(iVersion <= 8)
	    {
	            return 1;
	    }
	    else
	    {
		    return 2; //For the moment IE8 and IE9 we will treat the same as Chrome
	    }
    }

    if(navigator.userAgent.indexOf('Chrome') > 0)
    {
        return 2;
    }

    if(navigator.userAgent.indexOf('Firefox') > 0)
    {
        return 3;
    }

    if(navigator.userAgent.indexOf('Safari') > 0)
    {
        return 4;
    }
}

function getInternetExplorerVersion()
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
{
  var rv = -1; // Return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}



function IsProjectPage(sCallingURLRef, sReturnPageDesc)
{
    if(sCallingURLRef.indexOf('SCMSHome.aspx') > 0 
    || sCallingURLRef.indexOf('DesignSelection.aspx') > 0 
    || sCallingURLRef.indexOf('ProjectMainPage_New.aspx') > 0
    || sCallingURLRef.indexOf('SOWReview.aspx') > 0
    || sCallingURLRef.indexOf('Scope.aspx') > 0
    || sCallingURLRef.indexOf('QuotationScope.aspx') > 0
    || sCallingURLRef.indexOf('Signoff_Page.aspx') > 0
    || sCallingURLRef.indexOf('wfrmMaximoCompare.aspx') > 0
    || sCallingURLRef.indexOf('wfrmPwrId.aspx') > 0
    || sCallingURLRef.indexOf('wfrmExclusions.aspx') > 0
    || sCallingURLRef.indexOf('BOQMat.aspx') > 0
    || sCallingURLRef.indexOf('BOQInstall.aspx') > 0
    || sCallingURLRef.indexOf('Npsa.aspx') > 0
    || sCallingURLRef.indexOf('ZoneAllow.aspx') > 0
    || sCallingURLRef.indexOf('wfrmPONumbers.aspx') > 0
    || sCallingURLRef.indexOf('wfrmCustomerPO.aspx') > 0
    || sCallingURLRef.indexOf('wfrmBatteryCalc.aspx') > 0
    || sCallingURLRef.indexOf('wfrmBatteryManualCalc.aspx') > 0
    || sCallingURLRef.indexOf('SolarCalc.aspx') > 0
    || sCallingURLRef.indexOf('wfrmCableSchedule.aspx') > 0
    || sCallingURLRef.indexOf('wfrmAlarmAIRemote.aspx') > 0
    || sCallingURLRef.indexOf('wfrmSignoffStatus.aspx') > 0
    || sCallingURLRef.indexOf('ProjectStatus.aspx') > 0
    || sCallingURLRef.indexOf('wfrmDesignStatus.aspx') > 0
    || sCallingURLRef.indexOf('wfrmDrawingStatus.aspx') > 0
    || sCallingURLRef.indexOf('ProjectRFQ.aspx') > 0
    || sCallingURLRef.indexOf('Reports.aspx') > 0
    || sCallingURLRef.indexOf('wfrmProjectManagement.aspx') > 0
    || sCallingURLRef.indexOf('wfrmEquipmentLabel.aspx') > 0
    || sCallingURLRef.indexOf('wfrmMITs.aspx') > 0
    || sCallingURLRef.indexOf('wfrmQuoteman.aspx') > 0
    )
    {
        if(sCallingURLRef.indexOf('SCMSHome.aspx') > 0)
        {
            sReturnPageDesc.value = "SCMS Home";
        }

        if(sCallingURLRef.indexOf('DesignSelection.aspx') > 0)
        {
            sReturnPageDesc = "Project Search";
        }

        if(sCallingURLRef.indexOf('ProjectMainPage_New.aspx') > 0){sReturnPageDesc.value = 'Details';}
        if(sCallingURLRef.indexOf('SOWReview.aspx') > 0){sReturnPageDesc.value = 'SOW';}
        if(sCallingURLRef.indexOf('Scope.aspx') > 0){sReturnPageDesc.value = 'Scope';}
        if(sCallingURLRef.indexOf('QuotationScope.aspx') > 0){sReturnPageDesc.value = 'Quotation Scope';}
        if(sCallingURLRef.indexOf('Signoff_Page.aspx') > 0){sReturnPageDesc.value = 'Signoff';}
        if(sCallingURLRef.indexOf('wfrmMaximoCompare.aspx') > 0){sReturnPageDesc.value = 'Structure Builder';}
        if(sCallingURLRef.indexOf('wfrmPwrId.aspx') > 0){sReturnPageDesc.value = 'PwrId';}
        if(sCallingURLRef.indexOf('wfrmExclusions.aspx') > 0){sReturnPageDesc.value = 'Exclusions';}
        if(sCallingURLRef.indexOf('BOQMat.aspx') > 0){sReturnPageDesc.value = 'PSA';}
        if(sCallingURLRef.indexOf('BOQInstall.aspx') > 0){sReturnPageDesc.value = 'Install';}
        if(sCallingURLRef.indexOf('Npsa.aspx') > 0){sReturnPageDesc.value = 'Non PSA';}
        if(sCallingURLRef.indexOf('ZoneAllow.aspx') > 0){sReturnPageDesc.value = 'ZA';}
        if(sCallingURLRef.indexOf('wfrmPONumbers.aspx') > 0){sReturnPageDesc.value = 'POs';}
        if(sCallingURLRef.indexOf('wfrmCustomerPO.aspx') > 0){sReturnPageDesc.value = 'Customer PO';}
        if(sCallingURLRef.indexOf('wfrmBatteryCalc.aspx') > 0){sReturnPageDesc.value = 'Battery';}
        if(sCallingURLRef.indexOf('wfrmBatteryManualCalc.aspx') > 0){sReturnPageDesc.value = 'Batt Manual';}
        if(sCallingURLRef.indexOf('SolarCalc.aspx') > 0){sReturnPageDesc.value = 'Solar';}
        if(sCallingURLRef.indexOf('wfrmCableSchedule.aspx') > 0){sReturnPageDesc.value = 'Cable Sched';}
        if(sCallingURLRef.indexOf('wfrmAlarmAIRemote.aspx') > 0){sReturnPageDesc.value = 'Alarms';}
        if(sCallingURLRef.indexOf('wfrmSignoffStatus.aspx') > 0){sReturnPageDesc.value = 'Sign Off Status';}
        if(sCallingURLRef.indexOf('ProjectStatus.aspx') > 0){sReturnPageDesc.value = 'Project Status';}
        if(sCallingURLRef.indexOf('wfrmDesignStatus.aspx') > 0){sReturnPageDesc.value = 'Design Status';}
        if(sCallingURLRef.indexOf('wfrmDrawingStatus.aspx') > 0){sReturnPageDesc.value = 'Drawing Status';}
        if(sCallingURLRef.indexOf('ProjectRFQ.aspx') > 0){sReturnPageDesc.value = 'RFQ';}
        if(sCallingURLRef.indexOf('Reports.aspx') > 0){sReturnPageDesc.value = 'Reports';}
        if(sCallingURLRef.indexOf('wfrmProjectManagement.aspx') > 0){sReturnPageDesc.value = 'Copy';}
        if(sCallingURLRef.indexOf('wfrmEquipmentLabel.aspx') > 0){sReturnPageDesc.value = 'Equipment Labels';}
        if(sCallingURLRef.indexOf('wfrmMITs.aspx') > 0){sReturnPageDesc.value = 'MITs';}
        if (sCallingURLRef.indexOf('wfrmQuoteman.aspx') > 0) { sReturnPageDesc.value = 'Quote Management'; }

        return true;
    }    
    else
    {
        sReturnPageDesc = "";
        return false;
    }
}

function DTMenuSetHiddenFld(DTChildMenuID)
{
    var hfActiveMenuItems = document.getElementById('SCMSMasterPage_ProjectHeader1_hfActiveMenuItems');
    var mData;
    if (hfActiveMenuItems != null)
    {
        if (hfActiveMenuItems.value=='')
        {
            mData=GetActiveMenuSessionVar();
        }
        else
        {
           mData=hfActiveMenuItems.value;
        }
    }
    else
    {
            mData=GetActiveMenuSessionVar();
    }    
    
    var mMenuItems = mData.split('^');
    var set_mData =''

    for (var x = 0; x < mMenuItems.length; x++)
    {
        var mFields = mMenuItems[x].split(',');
        if (mFields[1]==DTChildMenuID)
        {
            mFields[2]=0;
        }
        
        if (set_mData=='')
        {
            set_mData = mFields[0] + ',' + mFields[1] + ',' + mFields[2];
        }
        else
        {
            set_mData = set_mData + '^' + mFields[0] + ',' + mFields[1] + ',' + mFields[2];
        }      
    }
    
    if (hfActiveMenuItems != null)
    {
        hfActiveMenuItems.value =set_mData;
    }
    wbsProjectDetails.SetSessVarActiveMenu(set_mData,OnSuccess,OnFail);    
}

function DTMenuSetActiveHiddenFld(DTChildMenuID)
{    
    var hfActiveMenuItems = document.getElementById('SCMSMasterPage_ProjectHeader1_hfActiveMenuItems');
    var mData;
    
    if (hfActiveMenuItems.value=='')
    {
        mData=GetActiveMenuSessionVar();
    }
    else
    {
       mData=hfActiveMenuItems.value;
    }    
    
    var mMenuItems = mData.split('^');
    var set_mData =''

    for (var x = 0; x < mMenuItems.length; x++)
    {
        var mFields = mMenuItems[x].split(',');
        if (mFields[1]==DTChildMenuID)
        {
            mFields[2]=1;
        }
        
        if (set_mData=='')
        {
            set_mData = mFields[0] + ',' + mFields[1] + ',' + mFields[2];
        }
        else
        {
            set_mData = set_mData + '^' + mFields[0] + ',' + mFields[1] + ',' + mFields[2];
        }      
    }
    
    hfActiveMenuItems.value =set_mData;
    wbsProjectDetails.SetSessVarActiveMenu(set_mData,OnSuccess,OnFail);    
}

function OnSuccess()
{
    
}

function OnFail()
{
    
}

function GridColumnWidth(sArray)
{
    var iColWidthTotal=0;    
    for (var z = 0; z < sArray.length; z++)
    {        
        iColWidthTotal = parseInt(iColWidthTotal,10) + parseInt(sArray[z],10);
    }
    return iColWidthTotal;
}

function CheckSafariLayout()
{
    var ni = document.getElementById('divHdrSpacer');
    if(GetBrowserType() == 4) //Safari
    {
        SetObjectHeight(ni,20);
    }  
    else
    {
        ni.style.visibility = 'hidden';
    }  

}
function OpenHoldStockScreen()
{
        MLRef = window.open('wfrmHoldingstock.aspx');
}



//*****************************************************//
//             MOVE BETWEEN LISTS STUFF                //
//*****************************************************//
function ListItemMove(SourceList, TargetList, bRemoveFromSource)
{
    var bAlready = false;
    var lstFrom = SourceList;
    var lstTo = TargetList;

    //Check for special case in the Master List "Current Filter with Material" - AE
    if (lstFrom.name == "EnterSPN" && (!bRemoveFromSource))
    {
        if (lstFrom.value != '')
        {
            for (var x = 0; x < lstTo.length; x++)
            {
                if (lstFrom.value == lstTo[x].value)
                {
                    alert('You have already selected item ' + lstFrom.value + '.You cannot select an item more than once');
                    bAlready = true;
                }
            }
            if (!bAlready)
            {
                var listoptn = CreateDropDownBoxOption(lstTo, lstTo.length, lstFrom.value);
            }
        }
    }
    else
    {
        for (var y = 0; y < lstFrom.length; y++)
        {
            if (lstFrom.options[y].selected)
            {
                bAlready = false;
                for (var x = 0; x < lstTo.length; x++)
                {
                    //This should never really happen because we remove from the available list
                    //when it is selected (see below)
                    if (lstFrom.options[y].text == lstTo.options[x].text)
                    {
                        alert('You have already selected item ' + lstFrom.options[y].value + '.You cannot select an item more than once');
                        bAlready = true;
                    }

                }

                //Add it to the list if it isn't alredy there
                if (!bAlready)
                {
                    listoptn = CreateDropDownBoxOption(lstTo, lstTo.length, lstFrom.options[y].text);
                }
            }
        }
    }

    //You have to run this backwards because the length variable drops when you remove an item    
    if(bRemoveFromSource)
    {
        //Check for special case in the Master List "Current Filter with Material" - AE
        if (lstFrom.name == "EnterSPN")
        {
                for (var y = lstTo.length - 1; y >= 0; y--)
                {
                    if (lstTo.options[y].selected)
                    {
                        lstTo.options[y] = null;
                    }
                }
        }
        else
        {
            if (GetBrowserType() == 1)
            {
                for (var y = lstFrom.length - 1; y >= 0; y--)
                {
                    if (lstFrom.options[y].selected)
                    {
                        lstFrom.options[y] = null;
                    }
                }
            }
            else
            {
                while (lstFrom.hasChildNodes())
                {
                    lstFrom.removeChild(lstFrom.firstChild);
                }
            }
        }
    }
}


/////////////////////////////////
////change objects backcolor/////
function objectbackgroundcolor(objectname,sColour)
{
    var chkobject = document.getElementById(objectname);
    
    if(GetBrowserType() == 1)
    {
        chkobject.style.backgroundColor = sColour;
    }
    else
    {
        chkobject.style.color = sColour;
    }
}

function AppendObjectClassname(objectname,sClassName)
{
    var obj = document.getElementById(objectname);
    var sExistingClass = obj.className;
    obj.className = sExistingClass + ' ' + sClassName;
}


////////////////////////////////////////////////////
////change position with scroll included////////////
////needs the pass through the object, object div & whether if it is absolute reference or not////
////////////////////////////////////////////////////
function ObjectPositionScroll(obj,objDiv,bAbsolute) 
{

    var Posn = [];

    Posn = ObjectPosition(obj,bAbsolute);  
    
    var curleft = Posn[0] - objDiv.scrollLeft;
    var curtop = Posn[1] - objDiv.scrollTop; 
      
    return [curleft,curtop];
}

///////////////////////////////////////

function DisplayTelerikLoadingPanel_ctrl_master(iLeft, iTop, mMasterPage,ctrlname)
{


    var LoadPnl = document.getElementById(mMasterPage + "_ContentPlaceHolder1_" + ctrlname + "_RadAjaxLoadingPanelDefault");

    if(typeof iLeft == 'undefined' || iLeft == 0 || iLeft == null)
    {
          if(GetBrowserType() == 1)
          {
            if(window.event == null)
            {
                iLeft = GetMiddleOfScreenLeft(window.screenLeft);
            }
            else
            {
                iLeft = window.event.clientX;
            }
          }
          else
          {
            iLeft = m_x;
          }
    }

    if(typeof iTop == 'undefined' || iTop == 0 || iTop == null)
    {
        if(GetBrowserType() == 1)
        {
            if(window.event == null)
            {
                iTop = GetMiddleOfScreenTop(window.screenTop);
            }
            else
            {
                iTop = window.event.clientY;
            }
        }
        else
        {
            iTop = m_y;
        }

    }

    SetObjectLeft(LoadPnl, iLeft);
    SetObjectTop(LoadPnl, iTop);
    LoadPnl.style.zIndex = 1000;
    LoadPnl.style.visibility = 'visible';
    LoadPnl.style.display = 'block';
    LoadPnl.style.position = 'fixed';
}

function HideTelerikLoadingPanel_ctrl_master(mMasterPage,ctrlname)
{

    var LoadPnl = document.getElementById(mMasterPage + "_ContentPlaceHolder1_" + ctrlname + "_RadAjaxLoadingPanelDefault");

   // var LoadPnl = document.getElementById("SCMSMasterPage_ContentPlaceHolder1_RadAjaxLoadingPanelDefault");
    LoadPnl.style.visibility = 'hidden';
    LoadPnl.style.display = 'none';
    LoadPnl.style.position = 'fixed';
}

function OpenNonPSAWindow()
{
    MLRef = window.open('wfrmNewNpsaMaterial.aspx');
}

function SplitReverseGrid(sGridDetails)
{
    var MainArray = [];
    var RtnArray = [];
    var RowArray = [];
    if(sGridDetails.length > 0)
    {
        if(endsWith(sGridDetails, '||'))
        {
            sGridDetails = sGridDetails.substring(0, sGridDetails.length - 2 );
        }        
        RowArray = sGridDetails.split('||');
    }
    
    for(var i=0; i< RowArray.length;i++)
    {
        MainArray[i] = new Array();
        var SingleRow = [];
        SingleRow = RowArray[i].split('^');
        MainArray[i] = SingleRow;        
    }
    
    
    if(sGridDetails.length > 0)
    {
        for(var j=0; j< MainArray[0].length;j++)
        {
            RtnArray[j] = new Array();
        }    
    }
    
    for(var i=0; i< RowArray.length;i++)
    {
        for(var j=0; j< MainArray[i].length;j++)
        {
            RtnArray[j][i] = MainArray[i][j];
        }
    
    }    

    return RtnArray;
    
}

function OpenBatMainWindow()
{
    MLRef = window.open('wfrmBatManEntry.aspx');
}

function DisableDiv(el, bDisabled)
{
    if (GetBrowserType() == 4)
    {
        DisabledControlsInDiv(el, bDisabled)
    }
    else
    {
        if (bDisabled)
        {
            el.disabled = true;
        }
        else
        {
            el.disabled = false;
        }
    }
}

function DisabledControlsInDiv(el,bDisabled)
{
    if (bDisabled)
    {
        if (!el.disabled)
        {
            if (el.tagName != 'DIV')
            {
                el.disabled = true;
            }
        }
    }
    else
    {
        if (!el.disabled)
        {
            if (el.tagName != 'DIV')
            {
                el.disabled = false;
            }
        }
    }

    if (el.childNodes && el.childNodes.length > 0)
    {
        for (var x = 0; x < el.childNodes.length; x++)
        {
            DisabledControlsInDiv(el.childNodes[x], bDisabled);
        }
    }
}


function GetCurrentTime()
{
    var dt = new Date();

    var sYear = dt.getFullYear();
    var sMonth = dt.getMonth() + 1;
    sMonth = PadStringWithZeros(sMonth, 2, true);
    var sDay = dt.getDate();
    sDay = PadStringWithZeros(sDay, 2, true);
    var sHour = dt.getHours();
    sHour = PadStringWithZeros(sHour, 2, true);
    var sMinute = dt.getMinutes();
    sMinute = PadStringWithZeros(sMinute, 2, true);
    var sSecond = dt.getSeconds();
    sSecond = PadStringWithZeros(sSecond, 2, true);

    return sYear + sMonth + sDay + ' ' + sHour + ':' + sMinute + ':' + sSecond;



}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function FixNumber(dNumber, iPlaces)
{

    return Round(dNumber, iPlaces).toFixed(iPlaces);
}


function getCookie(cname)
{
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++)
    {
        var c = ca[i];
        while (c.charAt(0) == ' ')
        {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0)
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(szName, szValue, szExpires, szPath, szDomain, bSecure)
{
    var szCookieText = escape(szName) + '=' + escape(szValue);
    szCookieText += (szExpires ? '; EXPIRES=' + szExpires.toGMTString() : '');
    szCookieText += (szPath ? '; PATH=' + szPath : '');
    szCookieText += (szDomain ? '; DOMAIN=' + szDomain : '');
    szCookieText += (bSecure ? '; SECURE' : '');

    document.cookie = szCookieText;
}


function BuildTable(sTableName, ctrlWidths)
{
    var table1 = document.createElement("table");
    table1.setAttribute('cellspacing', '0');
    table1.setAttribute('cellpadding', '1');
    table1.setAttribute('id', sTableName);
    var tablebody1 = document.createElement("tbody");
    tablebody1.setAttribute('id', sTableName + "Body");


    var iTotalWidth = 0; //Take off one lot of padding because between cells is one less than total number of cells
    for (var i = 0; i < ctrlWidths.length; i++)
    {
        coltag = document.createElement("col");
        SetObjectWidth(coltag, ctrlWidths[i]);
        iTotalWidth += ctrlWidths[i] + 1;
        table1.appendChild(coltag);
    }

    SetObjectWidth(table1, iTotalWidth); 

    table1.appendChild(tablebody1);

    var arrRtn = [];
    arrRtn[0] = table1;
    arrRtn[1] = tablebody1;

    return arrRtn;

}