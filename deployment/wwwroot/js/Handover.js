var ctrlWidth = [];
ctrlWidth[0] = 50;
ctrlWidth[1] = 120;
ctrlWidth[2] = 150;
ctrlWidth[3] = 350;

var giBedRows = 0;

function PopulateBedInfo(rslt)
{

    var div = document.getElementById('divBedContainer');
    var rRowHdr = BuildBedInfoHeaderRow();

    if (rslt != null)
    {
        SetObjectValue('lblUser', rslt[0].sLoggedInUser);
        var arrTable = BuildTable('tblBedInfo', ctrlWidth);
        div.appendChild(arrTable[0]);
        arrTable[1].appendChild(rRowHdr);
        giBedRows = rslt.length;
        for (var i = 0; i < rslt.length; i++)
        {
            var rRow = BuildBedInfoRow(i, rslt[i]);
            arrTable[1].appendChild(rRow);
        }
    }
}

function BuildBedInfoRow(iRow, objBed)
{
    var iReadOnly = 0;

    var rRow = document.createElement("tr");

    var cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdRowTextAligLeft grdRowTextAligTop';
    var label = CreateFormLabelField('lblBedNo_' + iRow, objBed.iBedNo);
    cell.appendChild(label);
    var hdnResident = CreateFormHiddenField("hfResidentId_" + iRow, objBed.iResidentId);
    cell.appendChild(hdnResident);
    var hdnHandover = CreateFormHiddenField("hfHandoverId_" + iRow, objBed.iHandoverId);
    cell.appendChild(hdnHandover);
    //            SetObjectWidth(cell, ctlwidthlocal[0]);
    rRow.appendChild(cell);

    var cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdRowTextAligLeft grdRowTextAligTop';
    var label = CreateFormLabelField('lblSurname_' + iRow, objBed.sLastName);
    cell.appendChild(label);
    rRow.appendChild(cell);

    var cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdRowTextAligLeft grdRowTextAligTop';
    var label = CreateFormLabelField('lblFirstNames_' + iRow, objBed.sFirstNames);
    cell.appendChild(label);
    rRow.appendChild(cell);

    cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdRowTextAligLeft';
    var txtboxComm = CreateFormTextAreaField("txtDiagnosis_" + iRow, objBed.sDiagnosis, 1, 500, 2, iReadOnly, 1, 500);
    SetObjectWidth(txtboxComm, ctrlWidth[3] - 20);
    if (iReadOnly == -1)
    {
        txtboxComm.className = 'txtReadonly grdfont grdfont12';
        txtboxComm.disabled = true;
    }
    else
    {
        txtboxComm.className = 'grdfont grdfont12';
        txtboxComm.disabled = false;
    }
    //            txtboxComm.onchange = function () { ShippingDetailsChange(); }
    cell.appendChild(txtboxComm);
    SetObjectHeight(txtboxComm, 90);
    SetObjectHeight(cell, 100);
    rRow.appendChild(cell);

    return rRow;

}

function BuildBedInfoHeaderRow()
{
    var rRow = document.createElement("tr");
    rRow.className = 'bgBlack';

    var cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdfontBold fontWhite grdRowTextAligLeft';
    var label = CreateFormLabelField('lblBedNoHdr', 'Bed');
    cell.appendChild(label);
    //            SetObjectWidth(cell, ctlwidthlocal[0]);
    rRow.appendChild(cell);

    var cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdfontBold fontWhite grdRowTextAligLeft';
    var label = CreateFormLabelField('lblSurnameHdr', 'Surname');
    cell.appendChild(label);
    rRow.appendChild(cell);

    var cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdfontBold fontWhite grdRowTextAligLeft';
    var label = CreateFormLabelField('lblFirstNamesHdr', 'First Name(s)');
    cell.appendChild(label);
    rRow.appendChild(cell);

    var cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdfontBold fontWhite grdRowTextAligLeft';
    var label = CreateFormLabelField('lbDiagnosisHdr', 'Diagnosis');
    cell.appendChild(label);
    rRow.appendChild(cell);

    return rRow;

}

function SaveBedInfo()
{
    var i = 0;
    var objOut = [];

    for (var i = 0; i < giBedRows; i++)
    {
        var object2 = new Object;
        object2.sLoggedInUser = GetObjectValue('lblUser');
        object2.iResidentId = GetObjectValue('hfResidentId_' + i);
        object2.iHandoverId = GetObjectValue('hfHandoverId_' + i);
        object2.iBedNo = GetObjectValue('lblBedNo_' + i);
        object2.sFirstNames = GetObjectValue('lblFirstNames_' + i);
        object2.sLastName = GetObjectValue('lblSurname_' + i);
        object2.sDiagnosis = GetObjectValue('txtDiagnosis_' + i);
        objOut[i] = object2;
    }

    //objOut[1] = object2;
    //objOut[2] = testinfo;

    fetch('api/savehandover', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            "Content-type": "application/json",
        },
        body: JSON.stringify(objOut)
    })
        .then(response => response.json())
        .then(result => { ProcessSave(result); });

//        .then(res => res.json())
//        .then(res => console.log(res));
    //.then(function (data) { alert(JSON.stringify(data)) });

//    alert('Saving the info');

}


function ProcessSave(result)
{
    for (var i = 0; i < result.length; i++)
    {
        if(!result[i].bReturn)
            alert(result[i].sError);
        else
            SetObjectValue('hfHandoverId_' + i, result[i].iHandoverId)
    }
}