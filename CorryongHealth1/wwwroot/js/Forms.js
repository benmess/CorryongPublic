var giFormRows = -1;

function PopulatePage(rsltPassed)
{
    //            alert("Question length = " + rsltPassed.length);
    var sPatient = rsltPassed[0].LastName + ', ' + rsltPassed[0].FirstName;
    SetObjectValue('lblPatient', sPatient);
    SetObjectValue('hfPatientId', rsltPassed[0].PatientId);
    SetObjectValue('hfFormId', rsltPassed[0].FormId);
    SetObjectValue('hfReportId', rsltPassed[0].ReportId);

    var ctlWidths1 = [];
    ctlWidths1[0] = 700;
    ctlWidths1[1] = 300;

    var ctlWidths2 = [];
    ctlWidths2[0] = 500;
    ctlWidths2[1] = 500;


    //var ctlHdr = [];
    //ctlHdr[0] = 'Item';
    //ctlHdr[1] = 'Question';
    //ctlHdr[2] = 'Notes';


    // var divHdr = document.getElementById('divMainContainerHdr');
    // var arrTblHdr = BuildTable("tablePatientQuestionsHdr", ctlWidths1);
    // var tblBodyHdr = arrTblHdr[1];
    // var rowHdr = BuildRowHdr(ctlHdr);
    // rowHdr.className = 'fontWhite bgGrey';
    // tblBodyHdr.appendChild(rowHdr);
    // divHdr.appendChild(arrTblHdr[0]);

    var div = document.getElementById('divMainContainerBody');

    var iPrevSectionId = -1;
    giFormRows = rsltPassed.length;

    for (var i = 0; i < rsltPassed.length; i++)
    {
        var iSectionId = rsltPassed[i].SectionId;

        switch (rsltPassed[i].SectionType)
        {
            default:
            case 1:
                ctrlWidthThis = ctlWidths1;
                break;
            case 2:
                ctrlWidthThis = ctlWidths2;
                break;
        }

        if (iSectionId != iPrevSectionId)
        {
            if (iPrevSectionId >= 0)
                div.appendChild(arrTbl[0]);
            var arrTbl = BuildTable("tablePatientQuestionsSection_" + iSectionId, ctrlWidthThis);
            var tblBody = arrTbl[1];
            iPrevSectionId = iSectionId;
        }
        var rRow2 = BuildQuestionRow(i, rsltPassed[i].QuestionId, rsltPassed[i].Question, rsltPassed[i].QuestionType, rsltPassed[i].Notes, ctrlWidthThis);
        tblBody.appendChild(rRow2);
    }

    div.appendChild(arrTbl[0]); //For the very last section

}

function BuildRowHdr(ctlHdr)
{
    var rRow = document.createElement("tr");
    var cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdfontBold grdRowTextAligLeft';
    var label = CreateFormLabelField("QuestionHdrItemLbl", ctlHdr[0]);
    cell.appendChild(label);
    rRow.appendChild(cell);

    var cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdfontBold grdRowTextAligLeft';
    var label = CreateFormLabelField("QuestionHdrLbl", ctlHdr[1]);
    cell.appendChild(label);
    rRow.appendChild(cell);

    var cell = document.createElement("td");
    cell.className = 'grdfont grdfont12 grdfontBold grdRowTextAligLeft';
    var label = CreateFormLabelField("QuestionHdrNotesLbl", ctlHdr[2]);
    cell.appendChild(label);
    rRow.appendChild(cell);

    return rRow;

}

function BuildQuestionRow(iRow, iQuestionId, sQuestion, iQuestionType, sNotes, ctlWidths)
{
    switch (iQuestionType)
    {
        default:
            var rRow = document.createElement("tr");
            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdRowTextAligLeft';
            var label = CreateFormLabelField("QuestionItem_" + iRow, iRow + 1);
            cell.appendChild(label);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell.appendChild(hiddenid);
            rRow.appendChild(cell);

            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdRowTextAligLeft';
            var label = CreateFormLabelField("Question_" + iRow, sQuestion);
            cell.appendChild(label);
            rRow.appendChild(cell);

            cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdRowTextAligLeft grdVerticalAlignCenter rowPadding';
            var txtbox = CreateFormTextAreaField("Notes_" + iRow, '', 0, 40, 4, 1, 1);
            //SetObjectWidth(txtbox, cell.width - 8);
            //SetObjectHeight(txtbox, cell.height - 8);
            cell.appendChild(txtbox);
            rRow.appendChild(cell);
            break;
        case 1:
            var rRow = document.createElement("tr");
            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont18 grdfontBold grdRowTextAligLeft';
            var label = CreateFormLabelField("Question_" + iRow, sQuestion);
            cell.appendChild(label);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell.appendChild(hiddenid);
            rRow.appendChild(cell);
            break;
        case 2:
            var arrHeaders = sQuestion.split('^');

            var rRow = document.createElement("tr");
            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdfontBold grdRowTextAligLeft blackBorder shallowleftpadding';
            var label = CreateFormLabelField("Question_" + iRow, arrHeaders[0]);
            cell.appendChild(label);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell.appendChild(hiddenid);
            rRow.appendChild(cell);

            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdfontBold grdRowTextAligCenter blackBorder shallowleftpadding';
            var label = CreateFormLabelField("QuestionScore_" + iRow, arrHeaders[1]);
            cell.appendChild(label);
            rRow.appendChild(cell);
            break;

        case 3:
            var rRow = document.createElement("tr");
            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdRowTextAligLeft blackBorder';
            var label = CreateFormLabelField("Question_" + iRow, sQuestion);
            cell.appendChild(label);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell.appendChild(hiddenid);
            rRow.appendChild(cell);

            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdfontBold cellAlignCenter blackBorder';
            var radTable = BuildYesNoRadioBlock("QuestionScore_" + iRow, true, "radQuestionYN_" + iRow + '_', undefined, ctlWidths[1]);
            cell.appendChild(radTable);
            rRow.appendChild(cell);
            break;

        case 4:
            var ctlWidthsLocal = [];
            ctlWidthsLocal[0] = 120;
            ctlWidthsLocal[1] = 880;
            var rRow = document.createElement("tr");
            var cell = document.createElement("td");
            cell.className = 'blackBorder';
            cell.colSpan = ctlWidths.length;
            //Now build a table to take the label and textarea
            var arrTblLocal = BuildTable("tableInnerPatientQuestions" + iQuestionId, ctlWidthsLocal);
            var tblLocal = arrTblLocal[0];
            var tblBodyLocal = arrTblLocal[1];

            var rRow2 = document.createElement("tr");
            var cell2 = document.createElement("td");

            var label = CreateFormLabelField("Question_" + iRow, sQuestion);
            cell2.appendChild(label);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell2.appendChild(hiddenid);
            rRow2.appendChild(cell2);

            cell2 = document.createElement("td");
            cell2.className = 'grdfont grdfont12 grdRowTextAligLeft grdVerticalAlignCenter rowPadding';
            var txtbox = CreateFormTextAreaField("Notes_" + iRow, '', 0, ctlWidthsLocal[1] / 9, 4, 1, 1);
            cell2.appendChild(txtbox);
            rRow2.appendChild(cell2);
            tblBodyLocal.appendChild(rRow2);

            cell.appendChild(tblLocal);
            rRow.appendChild(cell);
            break;
        case 5:
            var rRow = document.createElement("tr");
            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdRowTextAligLeft blackBorder';
            var label = CreateFormLabelField("Question_" + iRow, sQuestion);
            cell.appendChild(label);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell.appendChild(hiddenid);
            rRow.appendChild(cell);

            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdfontBold grdRowTextAligLeft blackBorder rowPadding';
            var txtbox = CreateFormTextAreaField("Notes_" + iRow, '', 0, ctlWidths[1] / 9, 4, 1, 1);
            cell.appendChild(txtbox);
            rRow.appendChild(cell);
            break;
        case 6:
            var rRow = document.createElement("tr");
            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdfontBold grdRowTextAligLeft grdNshapeDivBorders shallowleftpadding';
            var label = CreateFormLabelField("Question_" + iRow, sQuestion);
            cell.appendChild(label);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell.appendChild(hiddenid);
            cell.colSpan = ctlWidths.length;
            rRow.appendChild(cell);
            break;
        case 7:
            var ctlWidthsLocal = [];
            ctlWidthsLocal[0] = 120;
            ctlWidthsLocal[1] = 880;
            var rRow = document.createElement("tr");
            var cell = document.createElement("td");
            cell.className = 'grdLeftRightDivBorders';
            cell.colSpan = ctlWidths.length;
            //Now build a table to take the label and textarea
            var arrTblLocal = BuildTable("tableInnerPatientQuestions" + iQuestionId, ctlWidthsLocal);
            var tblLocal = arrTblLocal[0];
            var tblBodyLocal = arrTblLocal[1];

            var rRow2 = document.createElement("tr");
            var cell2 = document.createElement("td");

            var label = CreateFormLabelField("Question_" + iRow, sQuestion);
            cell2.appendChild(label);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell2.appendChild(hiddenid);
            rRow2.appendChild(cell2);

            cell2 = document.createElement("td");
            cell2.className = 'grdfont grdfont12 grdRowTextAligLeft grdVerticalAlignCenter rowPadding';
            var txtbox = CreateFormTextAreaField("Notes_" + iRow, '', 0, ctlWidthsLocal[1] / 9, 4, 1, 1);
            cell2.appendChild(txtbox);
            rRow2.appendChild(cell2);
            tblBodyLocal.appendChild(rRow2);

            cell.appendChild(tblLocal);
            rRow.appendChild(cell);
            break;
        case 8:
            var ctlWidthsLocal = [];
            ctlWidthsLocal[0] = 120;
            ctlWidthsLocal[1] = 880;
            var rRow = document.createElement("tr");
            var cell = document.createElement("td");
            cell.className = 'grdUshapeDivBorders';
            cell.colSpan = ctlWidths.length;
            //Now build a table to take the label and textarea
            var arrTblLocal = BuildTable("tableInnerPatientQuestions" + iQuestionId, ctlWidthsLocal);
            var tblLocal = arrTblLocal[0];
            var tblBodyLocal = arrTblLocal[1];

            var rRow2 = document.createElement("tr");
            var cell2 = document.createElement("td");

            var label = CreateFormLabelField("Question_" + iRow, sQuestion);
            cell2.appendChild(label);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell2.appendChild(hiddenid);
            rRow2.appendChild(cell2);

            cell2 = document.createElement("td");
            cell2.className = 'grdfont grdfont12 grdRowTextAligLeft grdVerticalAlignCenter rowPadding';
            var txtbox = CreateFormTextAreaField("Notes_" + iRow, '', 0, ctlWidthsLocal[1] / 9, 4, 1, 1);
            cell2.appendChild(txtbox);
            rRow2.appendChild(cell2);
            tblBodyLocal.appendChild(rRow2);

            cell.appendChild(tblLocal);
            rRow.appendChild(cell);
            break;
        case 9:
            var ctlWidthsLocal = [];
            ctlWidthsLocal[0] = 700;
            ctlWidthsLocal[1] = 300;

            var rRow = document.createElement("tr");
            var cell = document.createElement("td");
            cell.className = 'grdNshapeDivBorders';
            cell.colSpan = ctlWidths.length;
            var arrTabType9 = BuildTable('tableInnerQuestion_' + iRow, ctlWidthsLocal, true);
            var tablleLocal = arrTabType9[0];
            var tableBodyLocal = arrTabType9[1];

            var rRow2 = document.createElement("tr");
            var cell2 = document.createElement("td");
            cell2.className = 'grdfont grdfont12 grdRowTextAligLeft';
            var label = CreateFormLabelField("Question_" + iRow, sQuestion);
            cell2.appendChild(label);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell2.appendChild(hiddenid);
            rRow2.appendChild(cell2);

            var cell2 = document.createElement("td");
            cell2.className = 'grdfont grdfont12 grdfontBold cellAlignCenter';
            var radTable = BuildYesNoRadioBlock("QuestionScore_" + iRow, true, "radQuestionYN_" + iRow + '_', undefined, ctlWidthsLocal[1]);
            cell2.appendChild(radTable);
            rRow2.appendChild(cell2);
            tableBodyLocal.appendChild(rRow2);

            cell.appendChild(tablleLocal);
            rRow.appendChild(cell);

            break;
        case 10:
            var ctlWidthsLocal = [];
            ctlWidthsLocal[0] = 120;
            ctlWidthsLocal[1] = 880;
            var rRow = document.createElement("tr");
            var cell = document.createElement("td");
            cell.className = 'grdUshapeDivBorders';
            cell.colSpan = ctlWidths.length;
            //Now build a table to take the label and textarea
            var arrTblLocal = BuildTable("tableInnerPatientQuestions" + iQuestionId, ctlWidthsLocal);
            var tblLocal = arrTblLocal[0];
            var tblBodyLocal = arrTblLocal[1];

            var rRow2 = document.createElement("tr");
            var cell2 = document.createElement("td");

            var label = CreateFormLabelField("Question_" + iRow, sQuestion);
            cell2.appendChild(label);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell2.appendChild(hiddenid);
            rRow2.appendChild(cell2);

            cell2 = document.createElement("td");
            cell2.className = 'grdfont grdfont12 grdRowTextAligLeft grdVerticalAlignCenter rowPadding';
            var txtbox = CreateFormTextAreaField("Notes_" + iRow, '', 0, ctlWidthsLocal[1] / 9, 4, 1, 1);
            cell2.appendChild(txtbox);
            rRow2.appendChild(cell2);
            tblBodyLocal.appendChild(rRow2);

            cell.appendChild(tblLocal);
            rRow.appendChild(cell);
            break;
        case 11:
            var ctlWidthsLocal = [];
            ctlWidthsLocal[0] = 700;
            ctlWidthsLocal[1] = 300;

            var rRow = document.createElement("tr");
            var cell = document.createElement("td");
            cell.className = 'blackBorder';
            cell.colSpan = ctlWidths.length;
            var arrTabType9 = BuildTable('tableInnerQuestion_' + iRow, ctlWidthsLocal, true);
            var tablleLocal = arrTabType9[0];
            var tableBodyLocal = arrTabType9[1];

            var rRow2 = document.createElement("tr");
            var cell2 = document.createElement("td");
            cell2.className = 'grdfont grdfont12 grdRowTextAligLeft grdRightDivBorders';
            var label = CreateFormLabelField("Question_" + iRow, sQuestion);
            cell2.appendChild(label);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell2.appendChild(hiddenid);
            rRow2.appendChild(cell2);

            var cell2 = document.createElement("td");
            cell2.className = 'grdfont grdfont12 grdfontBold cellAlignCenter';
            var radTable = BuildYesNoRadioBlock("QuestionScore_" + iRow, true, "radQuestionYN_" + iRow + '_', undefined, ctlWidthsLocal[1]);
            cell2.appendChild(radTable);
            rRow2.appendChild(cell2);
            tableBodyLocal.appendChild(rRow2);

            cell.appendChild(tablleLocal);
            rRow.appendChild(cell);

            break;
    }


    return rRow;

}

function SaveFormInfo()
{
    var i = 0;
    var objOut = [];
    var sDate = GetSCMSDateStamp();

    for (var i = 0; i < giFormRows; i++)
    {
        var object2 = new Object;
        object2.PatientId = GetObjectValue('hfPatientId');
        object2.FormId = GetObjectValue('hfFormId');
        object2.ReportId = GetObjectValue('hfReportId');
        object2.FormDate = sDate;
        object2.QuestionId = GetObjectValue('hfQuestionId_' + i);
        object2.PatientResultScore = 10;
        object2.PatientResultScale = 20;
        object2.PatientNotes = "Get the notes from the form elements";
        object2.PatientDataPoint1 = "Data point 1 usually empty";
        object2.PatientDataPoint2 = "Data point 2 usually empty";
        object2.PatientDataPoint3 = "Data point 3 usually empty";
        object2.PatientDataPoint4 = "Data point 4 usually empty";
        object2.PatientDataPoint5 = "Data point 5 usually empty";
        objOut[i] = object2;
    }

    //objOut[1] = object2;
    //objOut[2] = testinfo;

    fetch('api/saveform', {
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
            SetObjectValue('hfReportId_' + i, result[i].ReportId)
    }
}