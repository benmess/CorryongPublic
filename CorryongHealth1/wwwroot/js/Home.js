var ctlWidths1 = [];
ctlWidths1[0] = 200;
ctlWidths1[1] = 300;
ctlWidths1[2] = 100;


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

    fetch("api/getpatientsearch/" + sPatientId + "/" + sSurname)
        .then(response => response.json())
        .then(result => { PopulatePage(result); });

}

function OpenForm(sPage)
{
    setCookie('PatientId', '1');

    //Redirect to the selected page
    var sURL = window.location.href;
    sURL += 'FourM';
    window.location = sURL;
}


function GetSelectedPatient()
{
    OpenForm("FourM");
}