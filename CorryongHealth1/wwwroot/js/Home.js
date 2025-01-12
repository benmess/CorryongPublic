var ctlWidths1 = [];
ctlWidths1[0] = 200;
ctlWidths1[1] = 300;
ctlWidths1[2] = 100;

var ctlWidths2 = [];
ctlWidths2[0] = 100;
ctlWidths2[1] = 200;
ctlWidths2[2] = 200;
ctlWidths2[3] = 300;
ctlWidths2[4] = 150;
ctlWidths2[5] = 100;
ctlWidths2[6] = 120;
ctlWidths2[7] = 120;
ctlWidths2[8] = 120;

function BuildSearchBlock()
{
    var div = document.getElementById('divMainContainerSearch');
    var arrTbl = BuildTable("tablePatientSearch", ctlWidths1);
    var tbl = arrTbl[0];
    var tblBody = arrTbl[1];
    tbl.className = 'divCenter';

    var rRow = document.createElement("tr");
    var cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdRowTextAligLeft';
    var label = CreateFormLabelField("lblPatientId", "Patient Id");
    cell.appendChild(label);
    rRow.appendChild(cell);

    cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdRowTextAligLeft grdVerticalAlignCenter rowPadding';
    var txtbox = CreateFormTextField("txtPatientId", '');
    txtbox.onkeydown = function (event) { SearchEnter(event); };
    cell.appendChild(txtbox);
    rRow.appendChild(cell);

    cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdRowTextAligCenter';
    var btn = CreateFormButtonField("btnPatientSearch", 'Search');
    btn.className = 'grdfont grdfont12 grdRowTextAligCenter';
    btn.onclick = function () { PerformSearch(); };
    cell.appendChild(btn);
    rRow.appendChild(cell);
    tblBody.appendChild(rRow)

    var rRow = document.createElement("tr");
    var cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdRowTextAligLeft';
    var label = CreateFormLabelField("lblPatientSurname", "Patient Surname");
    cell.appendChild(label);
    rRow.appendChild(cell);

    cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdRowTextAligLeft grdVerticalAlignCenter rowPadding';
    var txtbox = CreateFormTextField("txtPatientSurname", '');
    txtbox.onkeydown = function (event) { SearchEnter(event); };
    cell.appendChild(txtbox);
    rRow.appendChild(cell);
    tblBody.appendChild(rRow)

    var rRow = document.createElement("tr");
    var cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdRowTextAligLeft';
    var label = CreateFormLabelField("lblPatientFirstName", "Patient First Name");
    cell.appendChild(label);
    rRow.appendChild(cell);

    cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdRowTextAligLeft grdVerticalAlignCenter rowPadding';
    var txtbox = CreateFormTextField("txtPatientFirstName", '');
    txtbox.onkeydown = function (event) { SearchEnter(event); };
    cell.appendChild(txtbox);
    rRow.appendChild(cell);
    tblBody.appendChild(rRow)

    var rRow = document.createElement("tr");
    var cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdRowTextAligLeft';
    var label = CreateFormLabelField("lblPatientAddress", "Patient Street Address");
    cell.appendChild(label);
    rRow.appendChild(cell);

    cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdRowTextAligLeft grdVerticalAlignCenter rowPadding';
    var txtbox = CreateFormTextField("txtPatientAddress", '');
    txtbox.onkeydown = function (event) { SearchEnter(event); };
    cell.appendChild(txtbox);
    rRow.appendChild(cell);
    tblBody.appendChild(rRow)

    var rRow = document.createElement("tr");
    var cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdRowTextAligLeft';
    var label = CreateFormLabelField("lblPatientCity", "Patient City");
    cell.appendChild(label);
    rRow.appendChild(cell);

    cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdRowTextAligLeft grdVerticalAlignCenter rowPadding';
    var txtbox = CreateFormTextField("txtPatientCity", '');
    txtbox.onkeydown = function (event) { SearchEnter(event); };
    cell.appendChild(txtbox);
    rRow.appendChild(cell);
    tblBody.appendChild(rRow)

    var rRow = document.createElement("tr");
    var cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdRowTextAligLeft';
    var label = CreateFormLabelField("lblPatientPostcode", "Patient Postcode");
    cell.appendChild(label);
    rRow.appendChild(cell);

    cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdRowTextAligLeft grdVerticalAlignCenter rowPadding';
    var txtbox = CreateFormTextField("txtPatientPostcode", '');
    txtbox.onkeydown = function (event) { SearchEnter(event); };
    cell.appendChild(txtbox);
    rRow.appendChild(cell);
    tblBody.appendChild(rRow)

    var rRow = document.createElement("tr");
    var cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdRowTextAligLeft';
    var label = CreateFormLabelField("lblPatientMedicare", "Patient Medicare");
    cell.appendChild(label);
    rRow.appendChild(cell);

    cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdRowTextAligLeft grdVerticalAlignCenter rowPadding';
    var txtbox = CreateFormTextField("txtPatientMedicare", '');
    txtbox.onkeydown = function (event) { SearchEnter(event); };
    cell.appendChild(txtbox);
    rRow.appendChild(cell);
    tblBody.appendChild(rRow)

    var rRow = document.createElement("tr");
    var cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdRowTextAligLeft';
    var label = CreateFormLabelField("lblPatientPhone", "Patient Phone (any type)");
    cell.appendChild(label);
    rRow.appendChild(cell);

    cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdRowTextAligLeft grdVerticalAlignCenter rowPadding';
    var txtbox = CreateFormTextField("txtPatientPhone", '');
    txtbox.onkeydown = function (event) { SearchEnter(event); };
    cell.appendChild(txtbox);
    rRow.appendChild(cell);
    tblBody.appendChild(rRow)

    div.appendChild(tbl);


}

function PerformSearch()
{
    var sPatientId = GetObjectValue('txtPatientId');
    if (sPatientId == '')
        sPatientId = '^';
    
    var sSurname = GetObjectValue('txtPatientSurname');
    if (sSurname == '')
        sSurname = '^';

    var sFirsName = GetObjectValue('txtPatientFirstName');
    if (sFirsName == '')
        sFirsName = '^';

    var sAddress = GetObjectValue('txtPatientAddress');
    if (sAddress == '')
        sAddress = '^';

    var sCity = GetObjectValue('txtPatientCity');
    if (sCity == '')
        sCity = '^';

    var sPostcode = GetObjectValue('txtPatientPostcode');
    if (sPostcode == '')
        sPostcode = '^';

    var sMedicare = GetObjectValue('txtPatientMedicare');
    if (sMedicare == '')
        sMedicare = '^';

    var sPhone = GetObjectValue('txtPatientPhone');
    if (sPhone == '')
        sPhone = '^';

    fetch("api/getpatientsearch/" + sPatientId + "/" + sSurname + "/" + sFirsName + "/" + sAddress + "/" + sCity + "/" + sPostcode + "/" + sMedicare + "/" + sPhone)
        .then(response => response.json())
        .then(result => { PopulatePatientSearchResults(result); });

}

function PopulatePatientSearchResults(searchResults)
{
    ClearResultsDiv();
    var div = document.getElementById('divMainContainerResults');
    var arrTbl = BuildTable("tablePatientSearchResults", ctlWidths2);
    var tbl = arrTbl[0];
    var tblBody = arrTbl[1];
    tbl.className = 'divCenter';

    var rRow = document.createElement("tr");
    var cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdfontBold grdRowTextAligLeft';
    var label = CreateFormLabelField("lblPatientIdHdr", "Patient Id");
    cell.appendChild(label);
    rRow.appendChild(cell);

    var cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdfontBold grdRowTextAligLeft';
    var label = CreateFormLabelField("lblSurnameHdr", "Surname");
    cell.appendChild(label);
    rRow.appendChild(cell);
    tblBody.appendChild(rRow)

    var cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdfontBold grdRowTextAligLeft';
    var label = CreateFormLabelField("lblFirstNameHdr", "First Name");
    cell.appendChild(label);
    rRow.appendChild(cell);

    var cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdfontBold grdRowTextAligLeft';
    var label = CreateFormLabelField("lblAddressHdr", "Address");
    cell.appendChild(label);
    rRow.appendChild(cell);

    var cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdfontBold grdRowTextAligLeft';
    var label = CreateFormLabelField("lblCityHdr", "City");
    cell.appendChild(label);
    rRow.appendChild(cell);

    var cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdfontBold grdRowTextAligLeft';
    var label = CreateFormLabelField("lblPostcodeHdr", "Postcode");
    cell.appendChild(label);
    rRow.appendChild(cell);

    var cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdfontBold grdRowTextAligLeft';
    var label = CreateFormLabelField("lblMedicareHdr", "Medicare");
    cell.appendChild(label);
    rRow.appendChild(cell);

    var cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdfontBold grdRowTextAligLeft';
    var label = CreateFormLabelField("lblHomePhoneHdr", "Home Phone");
    cell.appendChild(label);
    rRow.appendChild(cell);

    var cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdfontBold grdRowTextAligLeft';
    var label = CreateFormLabelField("lblMobileHdr", "Mobile");
    cell.appendChild(label);
    rRow.appendChild(cell);

    tblBody.appendChild(rRow)

    var iResultLength = searchResults.length;

    if (iResultLength == 0)
    {
        alert('No patients match the search criteria');
        return;
    }

    for (var i = 0; i < searchResults.length; i++)
    {
        var rRow = document.createElement("tr");
        rRow.id = "resultRow_" + i;
        rRow.onclick = function () { OpenForm(this); };
        if(i%2 == 0)
            rRow.className = 'gridRowHover6';
        else
            rRow.className = 'gridRowHover5';
        var cell = document.createElement("td");
        cell.className = 'grdfont grdfont12 grdRowTextAligLeft';
        var label = CreateFormLabelField("lblPatientIdResult_" + i, searchResults[i].iPatientId);
        cell.appendChild(label);
        rRow.appendChild(cell);

        var cell = document.createElement("td");
        cell.className = 'grdfont grdfont12 grdRowTextAligLeft';
        var label = CreateFormLabelField("lblSurnameResult_" + i, searchResults[i].sSurname);
        cell.appendChild(label);
        rRow.appendChild(cell);
        tblBody.appendChild(rRow)

        var cell = document.createElement("td");
        cell.className = 'grdfont grdfont12 grdRowTextAligLeft';
        var label = CreateFormLabelField("lblFirtNameResult_" + i, searchResults[i].sFirstName);
        cell.appendChild(label);
        rRow.appendChild(cell);

        var cell = document.createElement("td");
        cell.className = 'grdfont grdfont12 grdRowTextAligLeft';
        var label = CreateFormLabelField("lblAddressResult_" + i, searchResults[i].sAddress);
        cell.appendChild(label);
        rRow.appendChild(cell);

        var cell = document.createElement("td");
        cell.className = 'grdfont grdfont12 grdRowTextAligLeft';
        var label = CreateFormLabelField("lblCityResult_" + i, searchResults[i].sCity);
        cell.appendChild(label);
        rRow.appendChild(cell);

        var cell = document.createElement("td");
        cell.className = 'grdfont grdfont12 grdRowTextAligLeft';
        var label = CreateFormLabelField("lblPostcodeResult_" + i, searchResults[i].iPostcode);
        cell.appendChild(label);
        rRow.appendChild(cell);

        var cell = document.createElement("td");
        cell.className = 'grdfont grdfont12 grdRowTextAligLeft';
        var label = CreateFormLabelField("lblMedicareResult_" + i, searchResults[i].lMedicare);
        cell.appendChild(label);
        rRow.appendChild(cell);

        var cell = document.createElement("td");
        cell.className = 'grdfont grdfont12 grdRowTextAligLeft';
        var label = CreateFormLabelField("lblHomePhoneResult_" + i, searchResults[i].sHomePhone);
        cell.appendChild(label);
        rRow.appendChild(cell);

        var cell = document.createElement("td");
        cell.className = 'grdfont grdfont12 grdRowTextAligLeft';
        var label = CreateFormLabelField("lblMobileResult_" + i, searchResults[i].sMobile);
        cell.appendChild(label);
        rRow.appendChild(cell);

        tblBody.appendChild(rRow)
    }

    div.appendChild(tbl);

}

function ClearResultsDiv()
{
    var div = document.getElementById('divMainContainerResults');
    var tab = document.getElementById('tablePatientSearchResults');

    if (div != null)
    {
        if (tab != null)
        {
            div.removeChild(tab);
        }
    }

}
function OpenForm(sender)
{
    var iRow = Get_RowNo_From_ControlName(sender.id);
    var iPatientId = GetObjectValue('lblPatientIdResult_' + iRow);
    setCookie('PatientId', iPatientId);

    //Redirect to the selected page
    var sURL = window.location.href;
    sURL += 'FourM';
    window.location = sURL;
}


function GetSelectedPatient()
{
    OpenForm("FourM");
}

function SearchEnter(e)
{
    if (e.keyCode == 13)
    {
/*		e.preventDefault();
		e.stopPropagation();
*/		PerformSearch();
    }
}
