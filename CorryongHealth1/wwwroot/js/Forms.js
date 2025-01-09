var giFormRows = -1;

var ctlWidths1 = [];
ctlWidths1[0] = 700;
ctlWidths1[1] = 300;

var ctlWidths2 = [];
ctlWidths2[0] = 500;
ctlWidths2[1] = 500;

var ctlWidths3 = [];
ctlWidths3[0] = 400;
ctlWidths3[1] = 400;
ctlWidths3[2] = 200;

var ctlWidths4 = [];
ctlWidths4[0] = 425;
ctlWidths4[1] = 150;
ctlWidths4[2] = 425;

var ctlWidths5 = [];
ctlWidths5[0] = 1000;

function PopulatePage(rsltPassed)
{
    //            alert("Question length = " + rsltPassed.length);
    var sPatient = rsltPassed[0].LastName + ', ' + rsltPassed[0].FirstName;
    SetObjectValue('lblPatient', sPatient);
    SetObjectValue('hfPatientId', rsltPassed[0].PatientId);
    SetObjectValue('hfFormId', rsltPassed[0].FormId);
    SetObjectValue('hfReportId', rsltPassed[0].ReportId);


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
            case 3:
                ctrlWidthThis = ctlWidths3;
                break;
            case 4:
                ctrlWidthThis = ctlWidths4;
                break;
            case 5:
                ctrlWidthThis = ctlWidths5;
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
        var rRow2 = BuildQuestionRow(i, rsltPassed[i].QuestionId, rsltPassed[i].Question, rsltPassed[i].QuestionType,
                                     rsltPassed[i].PatientNotes, rsltPassed[i].PatientResultScore, rsltPassed[i].PatientResultScale,
                                     rsltPassed[i].Datapoint1, rsltPassed[i].Datapoint2, rsltPassed[i].Datapoint3, rsltPassed[i].Datapoint4,
                                     rsltPassed[i].Datapoint5, ctrlWidthThis);
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

function BuildQuestionRow(iRow, iQuestionId, sQuestion, iQuestionType, sNotes, dScore, dScale, sDataPoint1, sDataPoint2, sDataPoint3, sDataPoint4, sDataPoint5, ctlWidths)
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
            var hiddenid = CreateFormHiddenField("hfQuestionType_" + iRow, iQuestionType);
            cell.appendChild(hiddenid);
            rRow.appendChild(cell);

            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdRowTextAligLeft';
            var label = CreateFormLabelField("Question_" + iRow, sQuestion);
            cell.appendChild(label);
            rRow.appendChild(cell);

            cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdRowTextAligLeft grdVerticalAlignCenter rowPadding';
            var txtbox = CreateFormTextAreaField("QuestionNotes_" + iRow, sNotes, 0, 40, 4, 1, 1);
            //SetObjectWidth(txtbox, cell.width - 8);
            //SetObjectHeight(txtbox, cell.height - 8);
            cell.appendChild(txtbox);
            rRow.appendChild(cell);
            break;
        case 1:
            var rRow = document.createElement("tr");
            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont18 grdfontBold grdRowTextAligLeft grdVerticalAlignTop';
            var label = CreateFormLabelField("Question_" + iRow, sQuestion);
            cell.appendChild(label);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("hfQuestionType_" + iRow, iQuestionType);
            cell.appendChild(hiddenid);
            rRow.appendChild(cell);
            break;
        case 2:
            var arrHeaders = sQuestion.split('^');

            var rRow = document.createElement("tr");
            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdfontBold grdRowTextAligLeft blackBorder shallowleftpadding grdVerticalAlignTop';
            var label = CreateFormLabelField("Question_" + iRow, arrHeaders[0]);
            cell.appendChild(label);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("hfQuestionType_" + iRow, iQuestionType);
            cell.appendChild(hiddenid);
            rRow.appendChild(cell);

            for (var ii = 1; ii < arrHeaders.length; ii++)
            {
                var cell = document.createElement("td");
                cell.className = 'grdfont grdfont12 grdfontBold grdRowTextAligCenter blackBorder shallowleftpadding';
                var label = CreateFormLabelField("QuestionScore_" + iRow, arrHeaders[ii]);
                cell.appendChild(label);
                rRow.appendChild(cell);
            }
            break;

        case 3:
            var rRow = document.createElement("tr");
            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdRowTextAligLeft blackBorder grdVerticalAlignTop';
            var label = CreateFormLabelField("Question_" + iRow, sQuestion);
            cell.appendChild(label);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("hfQuestionType_" + iRow, iQuestionType);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionNotes_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionScale_" + iRow, -1);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint1_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint2_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint3_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint4_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint5_" + iRow, '');
            cell.appendChild(hiddenid);
            rRow.appendChild(cell);

            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdfontBold cellAlignCenter blackBorder';
            var radTable = BuildYesNoRadioBlock("radQuestionYN_" + iRow, true, "QuestionScore_" + iRow, parseInt(dScore, 10), ctlWidths[1]);
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
            var arrTblLocal = BuildTable("tableInnerPatientQuestions_" + iQuestionId, ctlWidthsLocal, true);
            var tblLocal = arrTblLocal[0];
            var tblBodyLocal = arrTblLocal[1];

            var rRow2 = document.createElement("tr");
            var cell2 = document.createElement("td");
            cell2.className = 'grdfont grdfont12 grdRowTextAligLeft grdVerticalAlignTop';
            var label = CreateFormLabelField("Question_" + iRow, sQuestion);
            cell2.appendChild(label);
            rRow2.appendChild(cell2);

            cell2 = document.createElement("td");
            cell2.className = 'grdfont grdfont12 grdRowTextAligLeft grdVerticalAlignCenter rowPadding';
            var txtbox = CreateFormTextAreaField("QuestionNotes_" + iRow, sNotes, 0, ctlWidthsLocal[1] / 9, 4, 1, 1);
            txtbox.onchange = function () { SetFormEditStatus(-1); };
            cell2.appendChild(txtbox);
            rRow2.appendChild(cell2);
            tblBodyLocal.appendChild(rRow2);

            cell.appendChild(tblLocal);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("hfQuestionType_" + iRow, iQuestionType);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionScore_" + iRow, -1);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionScale_" + iRow, -1);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint1_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint2_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint3_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint4_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint5_" + iRow, '');
            cell.appendChild(hiddenid);
            rRow.appendChild(cell);
            break;
        case 5:
            var rRow = document.createElement("tr");
            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdRowTextAligLeft blackBorder grdVerticalAlignTop';
            var label = CreateFormLabelField("Question_" + iRow, sQuestion);
            cell.appendChild(label);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("hfQuestionType_" + iRow, iQuestionType);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionScore_" + iRow, -1);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionScale_" + iRow, -1);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint1_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint2_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint3_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint4_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint5_" + iRow, '');
            cell.appendChild(hiddenid);
            rRow.appendChild(cell);

            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdfontBold grdRowTextAligLeft blackBorder rowPadding';
            var txtbox = CreateFormTextAreaField("QuestionNotes_" + iRow, sNotes, 0, ctlWidths[1] / 9, 4, 1, 1);
            txtbox.onchange = function () { SetFormEditStatus(-1); };
            cell.appendChild(txtbox);
            rRow.appendChild(cell);
            break;
        case 6:
            var rRow = document.createElement("tr");
            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdfontBold grdRowTextAligLeft grdNshapeDivBorders shallowleftpadding grdVerticalAlignTop';
            var label = CreateFormLabelField("Question_" + iRow, sQuestion);
            cell.appendChild(label);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("hfQuestionType_" + iRow, iQuestionType);
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
            var arrTblLocal = BuildTable("tableInnerPatientQuestions_" + iQuestionId, ctlWidthsLocal, true);
            var tblLocal = arrTblLocal[0];
            var tblBodyLocal = arrTblLocal[1];

            var rRow2 = document.createElement("tr");
            var cell2 = document.createElement("td");
            cell2.className = 'grdfont grdfont12 grdfontBold grdRowTextAligLeft grdNshapeDivBorders shallowleftpadding grdVerticalAlignTop';
            var label = CreateFormLabelField("Question_" + iRow, sQuestion);
            cell2.appendChild(label);
            rRow2.appendChild(cell2);

            cell2 = document.createElement("td");
            cell2.className = 'grdfont grdfont12 grdRowTextAligLeft grdVerticalAlignCenter rowPadding';
            var txtbox = CreateFormTextAreaField("QuestionNotes_" + iRow, sNotes, 0, ctlWidthsLocal[1] / 9, 4, 1, 1);
            txtbox.onchange = function () { SetFormEditStatus(-1); };
            cell2.appendChild(txtbox);
            rRow2.appendChild(cell2);
            tblBodyLocal.appendChild(rRow2);

            cell.appendChild(tblLocal);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("hfQuestionType_" + iRow, iQuestionType);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionScore_" + iRow, -1);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionScale_" + iRow, -1);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint1_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint2_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint3_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint4_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint5_" + iRow, '');
            cell.appendChild(hiddenid);
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
            var arrTblLocal = BuildTable("tableInnerPatientQuestions_" + iQuestionId, ctlWidthsLocal, true);
            var tblLocal = arrTblLocal[0];
            var tblBodyLocal = arrTblLocal[1];

            var rRow2 = document.createElement("tr");
            var cell2 = document.createElement("td");
            cell2.className = 'grdfont grdfont12 grdfontBold grdRowTextAligLeft grdNshapeDivBorders shallowleftpadding grdVerticalAlignTop';
            var label = CreateFormLabelField("Question_" + iRow, sQuestion);
            cell2.appendChild(label);
            rRow2.appendChild(cell2);

            cell2 = document.createElement("td");
            cell2.className = 'grdfont grdfont12 grdRowTextAligLeft grdVerticalAlignCenter rowPadding';
            var txtbox = CreateFormTextAreaField("QuestionNotes_" + iRow, sNotes, 0, ctlWidthsLocal[1] / 9, 4, 1, 1);
            txtbox.onchange = function () { SetFormEditStatus(-1); };
            cell2.appendChild(txtbox);
            rRow2.appendChild(cell2);
            tblBodyLocal.appendChild(rRow2);

            cell.appendChild(tblLocal);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("hfQuestionType_" + iRow, iQuestionType);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionScore_" + iRow, -1);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionScale_" + iRow, -1);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint1_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint2_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint3_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint4_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint5_" + iRow, '');
            cell.appendChild(hiddenid);
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
            cell2.className = 'grdfont grdfont12 grdRowTextAligLeft grdVerticalAlignTop';
            var label = CreateFormLabelField("Question_" + iRow, sQuestion);
            cell2.appendChild(label);
            rRow2.appendChild(cell2);

            var cell2 = document.createElement("td");
            cell2.className = 'grdfont grdfont12 grdfontBold cellAlignCenter';
            var radTable = BuildYesNoRadioBlock("radQuestionYN_" + iRow, true, "QuestionScore_" + iRow, parseInt(dScore, 10), ctlWidthsLocal[1]);
            cell2.appendChild(radTable);
            rRow2.appendChild(cell2);
            tableBodyLocal.appendChild(rRow2);

            cell.appendChild(tablleLocal);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("hfQuestionType_" + iRow, iQuestionType);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionNotes_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionScale_" + iRow, -1);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint1_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint2_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint3_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint4_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint5_" + iRow, '');
            cell.appendChild(hiddenid);
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
            var arrTblLocal = BuildTable("tableInnerPatientQuestions_" + iQuestionId, ctlWidthsLocal, true);
            var tblLocal = arrTblLocal[0];
            var tblBodyLocal = arrTblLocal[1];

            var rRow2 = document.createElement("tr");
            var cell2 = document.createElement("td");

            var label = CreateFormLabelField("Question_" + iRow, sQuestion);
            cell2.appendChild(label);
            rRow2.appendChild(cell2);

            cell2 = document.createElement("td");
            cell2.className = 'grdfont grdfont12 grdRowTextAligLeft grdVerticalAlignCenter rowPadding';
            var txtbox = CreateFormTextAreaField("QuestionNotes_" + iRow, sNotes, 0, ctlWidthsLocal[1] / 9, 4, 1, 1);
            txtbox.onchange = function () { SetFormEditStatus(-1); };
            cell2.appendChild(txtbox);
            rRow2.appendChild(cell2);
            tblBodyLocal.appendChild(rRow2);

            cell.appendChild(tblLocal);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("hfQuestionType_" + iRow, iQuestionType);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionScore_" + iRow, -1);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionScale_" + iRow, -1);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint1_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint2_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint3_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint4_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint5_" + iRow, '');
            cell.appendChild(hiddenid);
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
            cell2.className = 'grdfont grdfont12 grdRowTextAligLeft grdRightDivBorders grdVerticalAlignTop';
            var label = CreateFormLabelField("Question_" + iRow, sQuestion);
            cell2.appendChild(label);
            rRow2.appendChild(cell2);

            var cell2 = document.createElement("td");
            cell2.className = 'grdfont grdfont12 grdfontBold cellAlignCenter';
            var radTable = BuildYesNoRadioBlock("radQuestionYN_" + iRow, true, "QuestionScore_" + iRow, parseInt(dScore, 10), ctlWidthsLocal[1]);
            cell2.appendChild(radTable);
            rRow2.appendChild(cell2);
            tableBodyLocal.appendChild(rRow2);

            cell.appendChild(tablleLocal);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("hfQuestionType_" + iRow, iQuestionType);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionNotes_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionScale_" + iRow, -1);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint1_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint2_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint3_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint4_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint5_" + iRow, '');
            cell.appendChild(hiddenid);
            rRow.appendChild(cell);

            break;
        case 12:
            var rRow = document.createElement("tr");
            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdRowTextAligLeft blackBorder grdRightDivBorders grdVerticalAlignTop';
            var label = CreateFormLabelField("Question_" + iRow, sQuestion);
            cell.appendChild(label);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("hfQuestionType_" + iRow, iQuestionType);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionScale_" + iRow, -1);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint1_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint2_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint3_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint4_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint5_" + iRow, '');
            cell.appendChild(hiddenid);
            rRow.appendChild(cell);

            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdRowTextAligLeft blackBorder grdRightDivBorders rowPadding';
            var txtbox = CreateFormTextAreaField("QuestionNotes_" + iRow, sNotes, 0, ctlWidths[1] / 9, 4, 1, 1);
            txtbox.onchange = function () { SetFormEditStatus(-1); };
            cell.appendChild(txtbox);
            rRow.appendChild(cell);

            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdfontBold cellAlignCenter blackBorder';
            var radTable = BuildYesNoRadioBlock("radQuestionYN_" + iRow, true, "QuestionScore_" + iRow, parseInt(dScore, 10), ctlWidths[2]);
            cell.appendChild(radTable);
            rRow.appendChild(cell);

            break;
        case 13:
            var ctlWidthsLocal = [];
            ctlWidthsLocal[0] = 260;
            ctlWidthsLocal[1] = 740;
            var rRow = document.createElement("tr");
            var cell = document.createElement("td");
            cell.className = 'blackBorder';
            cell.colSpan = ctlWidths.length;
            //Now build a table to take the label and textarea
            var arrTblLocal = BuildTable("tableInnerPatientQuestions_" + iQuestionId, ctlWidthsLocal, true);
            var tblLocal = arrTblLocal[0];
            var tblBodyLocal = arrTblLocal[1];

            var rRow2 = document.createElement("tr");
            var cell2 = document.createElement("td");
            cell2.className = 'grdfont grdfont12 grdRowTextAligLeft grdVerticalAlignTop';
            var label = CreateFormLabelField("Question_" + iRow, sQuestion);
            cell2.appendChild(label);
            rRow2.appendChild(cell2);

            cell2 = document.createElement("td");
            cell2.className = 'grdfont grdfont12 grdRowTextAligLeft grdVerticalAlignCenter rowPadding';
            var txtbox = CreateFormTextAreaField("QuestionNotes_" + iRow, sNotes, 0, ctlWidthsLocal[1] / 9, 4, 1, 1);
            txtbox.onchange = function () { SetFormEditStatus(-1); };
            cell2.appendChild(txtbox);
            rRow2.appendChild(cell2);
            tblBodyLocal.appendChild(rRow2);

            cell.appendChild(tblLocal);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("hfQuestionType_" + iRow, iQuestionType);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionScore_" + iRow, -1);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionScale_" + iRow, -1);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint1_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint2_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint3_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint4_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint5_" + iRow, '');
            cell.appendChild(hiddenid);
            rRow.appendChild(cell);
            break;
        case 14:
            var rRow = document.createElement("tr");
            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdfontBold grdRowTextAligLeft blackBorder shallowleftpadding grdVerticalAlignTop';
            var label = CreateFormLabelField("Question_" + iRow, sQuestion);
            cell.appendChild(label);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("hfQuestionType_" + iRow, iQuestionType);
            cell.appendChild(hiddenid);
            cell.colSpan = ctlWidths.length;
            rRow.appendChild(cell);
            break;
        case 15:
            var rRow = document.createElement("tr");
            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdRowTextAligLeft blackBorder grdRightDivBorders grdVerticalAlignTop';
            var label = CreateFormLabelField("Question_" + iRow, sQuestion);
            cell.appendChild(label);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("hfQuestionType_" + iRow, iQuestionType);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionScale_" + iRow, -1);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint1_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint2_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint3_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint4_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint5_" + iRow, '');
            cell.appendChild(hiddenid);
            rRow.appendChild(cell);

            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdfontBold cellAlignCenter blackBorder';
            var radTable = BuildYesNoRadioBlock("radQuestionYN_" + iRow, true, "QuestionScore_" + iRow, parseInt(dScore, 10), ctlWidths[1]);
            cell.appendChild(radTable);
            rRow.appendChild(cell);

            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdRowTextAligLeft blackBorder grdRightDivBorders rowPadding';
            var txtbox = CreateFormTextAreaField("QuestionNotes_" + iRow, sNotes, 0, ctlWidths[2] / 9, 1, 1, 1);
            txtbox.onchange = function () { SetFormEditStatus(-1); };
            cell.appendChild(txtbox);
            rRow.appendChild(cell);
            break;
        case 16:
            var rRow = document.createElement("tr");
            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdfontBold grdRowTextAligLeft blackBorder grdRightDivBorders grdVerticalAlignTop';
            var label = CreateFormLabelField("Question_" + iRow, sQuestion);
            cell.appendChild(label);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("hfQuestionType_" + iRow, iQuestionType);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionScale_" + iRow, -1);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint1_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint2_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint3_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint4_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint5_" + iRow, '');
            cell.appendChild(hiddenid);
            rRow.appendChild(cell);

            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdfontBold cellAlignCenter blackBorder';
            var radTable = BuildYesNoRadioBlock("radQuestionYN_" + iRow, true, "QuestionScore_" + iRow, parseInt(dScore, 10), ctlWidths[1]);
            cell.appendChild(radTable);
            rRow.appendChild(cell);

            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdRowTextAligLeft blackBorder grdRightDivBorders rowPadding';
            rRow.appendChild(cell);
            break;
        case 17:
            var rRow = document.createElement("tr");
            var cell = document.createElement("td");
            cell.className = 'grdfont grdfont12 grdRowTextAligLeft blackBorder grdRightDivBorders rowPadding';
            var hiddenid = CreateFormHiddenField("Question_" + iRow, sQuestion);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("hfQuestionType_" + iRow, iQuestionType);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionScale_" + iRow, -1);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint1_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint2_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint3_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint4_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint5_" + iRow, '');
            cell.appendChild(hiddenid);
            rRow.appendChild(cell);

            var txtbox = CreateFormTextAreaField("QuestionNotes_" + iRow, sNotes, 0, ctlWidths[0] / 8.5, 4, 1, 1);
            txtbox.onchange = function () { SetFormEditStatus(-1); };
            cell.appendChild(txtbox);
            rRow.appendChild(cell);
            break;
        case 18:
            var ctlWidthsLocal = [];
            ctlWidthsLocal[0] = 400;
            ctlWidthsLocal[1] = 80;
            ctlWidthsLocal[2] = 160;
            ctlWidthsLocal[3] = 80;
            ctlWidthsLocal[4] = 160;
            ctlWidthsLocal[5] = 80;

            var arrQuestionParts = BreakDatapointQuestionIntoArray(sQuestion);

            var rRow = document.createElement("tr");
            var cell = document.createElement("td");
            cell.className = 'blackBorder';
            cell.colSpan = ctlWidths.length;
            //Now build a table to take the label and textarea
            var arrTblLocal = BuildTable("tableInnerPatientQuestions_" + iQuestionId, ctlWidthsLocal, true);
            var tblLocal = arrTblLocal[0];
            var tblBodyLocal = arrTblLocal[1];

            var rRow2 = document.createElement("tr");
            var cell2 = document.createElement("td");
            cell2.className = 'grdfont grdfont12 grdRowTextAligLeft grdVerticalAlignCenter';
            var label = CreateFormLabelField("Question_" + iRow, arrQuestionParts[0]);
            cell2.appendChild(label);
            rRow2.appendChild(cell2);

            cell2 = document.createElement("td");
            cell2.className = 'grdfont grdfont12 grdRowTextAligLeft grdVerticalAlignCenter rowPadding';
            var txtbox = CreateFormTextField("Datapoint1_" + iRow, sDataPoint1);
            txtbox.onchange = function () { SetFormEditStatus(-1); };
            SetObjectWidth(txtbox, ctlWidthsLocal[1] - 5);
            cell2.appendChild(txtbox);
            rRow2.appendChild(cell2);

            var cell2 = document.createElement("td");
            cell2.className = 'grdfont grdfont12 grdRowTextAligRight grdVerticalAlignCenter';
            var label = CreateFormLabelField("QuestionElement2_" + iRow, arrQuestionParts[1]);
            cell2.appendChild(label);
            rRow2.appendChild(cell2);

            cell2 = document.createElement("td");
            cell2.className = 'grdfont grdfont12 grdRowTextAligLeft grdVerticalAlignCenter rowPadding';
            var txtbox = CreateFormTextField("Datapoint2_" + iRow, sDataPoint2);
            txtbox.onchange = function () { SetFormEditStatus(-1); };
            SetObjectWidth(txtbox, ctlWidthsLocal[3] - 5);
            cell2.appendChild(txtbox);
            rRow2.appendChild(cell2);

            var cell2 = document.createElement("td");
            cell2.className = 'grdfont grdfont12 grdRowTextAligRight grdVerticalAlignCenter';
            var label = CreateFormLabelField("QuestionElement3_" + iRow, arrQuestionParts[2]);
            cell2.appendChild(label);
            rRow2.appendChild(cell2);

            cell2 = document.createElement("td");
            cell2.className = 'grdfont grdfont12 grdRowTextAligLeft grdVerticalAlignCenter rowPadding';
            var txtbox = CreateFormTextField("Datapoint3_" + iRow, sDataPoint3);
            txtbox.onchange = function () { SetFormEditStatus(-1); };
            SetObjectWidth(txtbox, ctlWidthsLocal[5] - 5);
            cell2.appendChild(txtbox);
            rRow2.appendChild(cell2);

            tblBodyLocal.appendChild(rRow2);

            cell.appendChild(tblLocal);
            var hiddenid = CreateFormHiddenField("hfQuestionId_" + iRow, iQuestionId);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("hfQuestionType_" + iRow, iQuestionType);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionScore_" + iRow, -1);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionScale_" + iRow, -1);
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint1_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint2_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint3_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint4_" + iRow, '');
            cell.appendChild(hiddenid);
            var hiddenid = CreateFormHiddenField("QuestionDatPoint5_" + iRow, '');
            cell.appendChild(hiddenid);
            rRow.appendChild(cell);
            break;
    }


    return rRow;

}

function BuildYesNoRadioBlock(sTableName, bIsNumbered, sRadioName, iValue, iTotalWidth)
{
    var ctlWidth = [];
    ctlWidth[0] = 10;
    ctlWidth[1] = 25;
    ctlWidth[2] = 10;
    ctlWidth[3] = 25;

    var iPaddWidth = (iTotalWidth - 75) / 2;
    if (iPaddWidth > 0)
    {
        ctlWidth[0] = iPaddWidth;
        ctlWidth[1] = 10;
        ctlWidth[2] = 25;
        ctlWidth[3] = 10;
        ctlWidth[4] = 25;
        ctlWidth[5] = iPaddWidth;
    }
    var arrTab = BuildTable(sTableName, ctlWidth, bIsNumbered);
    var table1 = arrTab[0];
    var tablebody1 = arrTab[1];
    var bYes = false;
    var bNo = false;

    if (iValue == undefined)
    {
        bYes = false;
        bNo = false;
    }
    else if (iValue == 0)
    {
        bNo = true;
        bYes = false;
    }
    else if (iValue == 1)
    {
        bNo = false;
        bYes = true;
    }
    else
    {
        bNo = false;
        bYes = false;
    }



    currentrow2 = document.createElement("tr");

    if (iPaddWidth > 0)
    {
        current_cell2 = document.createElement("td");
        SetObjectWidth(current_cell2, iPaddWidth);
        currentrow2.appendChild(current_cell2);
    }

    current_cell2 = document.createElement("td");
    var label = CreateFormLabelField(sRadioName + "_0", "Y");
    current_cell2.appendChild(label);
    current_cell2.className = "grdfont grdfont10";
    current_cell2.align = "left";
    SetObjectWidth(current_cell2, ctlWidth[0]);
    currentrow2.appendChild(current_cell2);

    current_cell2 = document.createElement("td");
    var typeradio1 = CreateFormRadioButton(sRadioName, 1, bYes, sRadioName + "Yes")
    typeradio1.onclick = function () { SetFormEditStatus(-1); };
    current_cell2.appendChild(typeradio1);
    SetObjectWidth(current_cell2, ctlWidth[1]);
    currentrow2.appendChild(current_cell2);

    current_cell2 = document.createElement("td");
    var label = CreateFormLabelField(sRadioName + "_1", "N");
    current_cell2.appendChild(label);
    current_cell2.className = "grdfont grdfont10";
    current_cell2.align = "left";
    SetObjectWidth(current_cell2, ctlWidth[2]);
    currentrow2.appendChild(current_cell2);

    current_cell2 = document.createElement("td");
    var typeradio1 = CreateFormRadioButton(sRadioName, 0, bNo, sRadioName + "No")
    typeradio1.onclick = function () { SetFormEditStatus(-1); };
    current_cell2.appendChild(typeradio1);
    SetObjectWidth(current_cell2, ctlWidth[3]);
    currentrow2.appendChild(current_cell2);


    if (iPaddWidth > 0)
    {
        current_cell2 = document.createElement("td");
        SetObjectWidth(current_cell2, iPaddWidth);
        currentrow2.appendChild(current_cell2);
    }

    tablebody1.appendChild(currentrow2);

    return table1;
}

function SaveFormInfo()
{
    var i = 0, jj = 0;
    var objOut = [];
    var sDate = GetDateStamp();

    for (var i = 0; i < giFormRows; i++)
    {
        var iQuestionType = GetObjectValue('hfQuestionType_' + i);

        if (iQuestionType != 1 && iQuestionType != 2 && iQuestionType != 6 && iQuestionType != 14) //These are headers and will never contain any data
        {
            var object2 = new Object;
            object2.PatientId = GetObjectValue('hfPatientId');
            object2.FormId = GetObjectValue('hfFormId');
            object2.ReportId = GetObjectValue('hfReportId');
            object2.FormDate = sDate;
            object2.QuestionId = GetObjectValue('hfQuestionId_' + i);

            var objScore = document.getElementsByName('QuestionScore_' + i);

            if (objScore.length > 1)
            {
                if (objScore[0].type == 'radio')
                    var dScore = Get_radio_selvalue('QuestionScore_' + i);
                else
                    var dScore = GetObjectValue('QuestionScore_' + i);
            }
            else
                var dScore = GetObjectValue('QuestionScore_' + i);

            if (dScore == null || dScore == '')
                dScore = -1;

            object2.PatientResultScore = dScore;

            var objScale = document.getElementsByName('QuestionScale_' + i);

            if (objScale.length > 1)
            {
                if (objScale[0].type == 'radio')
                    var dScale = Get_radio_selvalue('QuestionScale_' + i);
                else
                    var dScale = GetObjectValue('QuestionScale_' + i);
            }
            else
                var dScale = GetObjectValue('QuestionScale_' + i);

            if (dScale == null || dScale == '')
                dScale = -1;

            object2.PatientResultScale = dScale;

            object2.PatientNotes = GetObjectValue('QuestionNotes_'+i);
            object2.PatientDataPoint1 = GetObjectValue('QuestionDatPoint1_' + i);
            object2.PatientDataPoint2 = GetObjectValue('QuestionDatPoint2_' + i);
            object2.PatientDataPoint3 = GetObjectValue('QuestionDatPoint3_' + i);
            object2.PatientDataPoint4 = GetObjectValue('QuestionDatPoint4_' + i);
            object2.PatientDataPoint5 = GetObjectValue('QuestionDatPoint5_' + i);;
            objOut[jj] = object2;
            jj++;
        }
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
        if (!result[i].bReturn)
            alert(result[i].sError);
        else
        {
            if (i == 0)
                SetObjectValue('hfReportId', result[i].iReportId);
        }
    }

    SetFormEditStatus(0);
}



function SetFormEditStatus(iStatus)
{
    SetObjectValue('hfEditStatus', iStatus);
    if (iStatus == 0)
        document.getElementById('btnSave').className = '';
    else
        document.getElementById('btnSave').className = 'grdRowChangedColor';
}

function BreakDatapointQuestionIntoArray(sQuestion)
{
    var arr = sQuestion.split("<Datapoint>");
    return arr;
}

function BreakDatapointQuestionIntoArrayLong(sQuestion)
{
    var arrReturn = [];
    var sRestOfQuestion = sQuestion;
    var sString = sRestOfQuestion.substring(0, sRestOfQuestion.indexOf('<'));

    arrReturn[0] = sString;
    sRestOfQuestion = sRestOfQuestion.substring(sRestOfQuestion.indexOf('>') + 1);
    var j = 1;
    //Can have up to 5 data points
    for (var i = 0; i < 10; i++)
    {
        iStart = sRestOfQuestion.indexOf('<');

        if (sRestOfQuestion.length > 0)
        {
            if (iStart < 0)
                sString = sRestOfQuestion;
            else
                sString = sRestOfQuestion.substring(0, sRestOfQuestion.indexOf('<'));

            arrReturn[j] = sString;
            j++;
        }

        if (iStart < 0)
            break;

        iEnd = sRestOfQuestion.indexOf('>');
        sString = sRestOfQuestion.substring(iStart, iEnd - iStart - 1);
        arrReturn[j] = sString;
        j++;
        sRestOfQuestion = sRestOfQuestion.substring(iEnd + 1);
    }
}