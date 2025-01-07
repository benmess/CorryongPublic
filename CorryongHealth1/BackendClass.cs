namespace CorryongHealth1
{
    using System.Collections;
    using System.Data;
    using System.Data.SqlClient;
    using Microsoft.Extensions.Configuration;
    using static CorryongHealth1.BackendClass;
    using QuestPDF.Fluent;
    using QuestPDF.Helpers;
    using QuestPDF.Infrastructure;
    using QuestPDF.Elements.Table;
    using System.Globalization;

    public class BackendClass
    {
        public class BaseJsonObject
        {
            public string name { get; set; } = "";
            public string value { get; set; } = "";
        }

        public class StateTrackObject
        {
            public string Fullname { get; set; } = "";
            public string TABMeetingAbbreviationCode { get; set; } = "";
        }

        public class BedObject
        {
            public string sLoggedInUser { get; set; } = "";
            public int iHandoverId { get; set; } = 0;
            public int iResidentId { get; set; } = 0;
            public int iBedNo { get; set; } = 0;
            public string sFirstNames { get; set; } = "";
            public string sLastName { get; set; } = "";
            public string sDiagnosis { get; set; } = "";
        }

        public class BedSaveObject
        {
            public bool bReturn { get; set; } = false;
            public int iBedNo { get; set; } = 0;
            public int iResidentId { get; set; } = 0;
            public int iHandoverId { get; set; } = 0;

            public string sError { get; set; } = "";
        }

        public class QuestionObject
        {
            public int PatientId { get; set; } = -1;
            public string FirstName { get; set; } = "";
            public string MiddleName { get; set; } = "";
            public string LastName { get; set; } = "";
            public int CorryongId { get; set; } = -1;
            public string MedicareNo { get; set; } = "";
            public int FormId { get; set; } = -1;
            public int ReportId { get; set; } = -1;
            public string FormName { get; set; } = "";
            public int SectionId { get; set; } = -1;
            public int SectionType { get; set; } = -1;
            public int QuestionId { get; set; } = -1;
            public int QuestionType { get; set; } = -1;
            public string Question { get; set; } = "";
            public int FormSortOrder { get; set; } = -1;
            public double PatientResultScore { get; set; } = -1.0;
            public double PatientResultScale { get; set; } = -1.0;
            public string PatientNotes { get; set; } = "";
            public string Datapoint1 { get; set; } = "";
            public string Datapoint2 { get; set; } = "";
            public string Datapoint3 { get; set; } = "";
            public string Datapoint4 { get; set; } = "";
            public string Datapoint5 { get; set; } = "";
        }

        public class QuestionSaveObject
        {
            public int PatientId { get; set; } = -1;
            public int FormId { get; set; } = -1;
            public int ReportId { get; set; } = -1;
            public int QuestionId { get; set; } = -1;
            public string FormDate { get; set; } = "";
            public double PatientResultScore { get; set; } = -1.0;
            public double PatientResultScale { get; set; } = -1.0;
            public string PatientNotes { get; set; } = "";
            public string PatientDataPoint1 { get; set; } = "";
            public string PatientDataPoint2 { get; set; } = "";
            public string PatientDataPoint3 { get; set; } = "";
            public string PatientDataPoint4 { get; set; } = "";
            public string PatientDataPoint5 { get; set; } = "";
        }

        public class QuestionSaveResultObject
        {
            public int iReportId { get; set; } = -1;
            public int iQuestionId { get; set; } = -1;
            public bool bReturn { get; set; } = false;
            public string sError { get; set; } = "";
        }

        /*        private readonly IConfiguration _configuration;

                public BackendClass(IConfiguration configuration)
                {
                    _configuration = configuration;
                }
        */
        public class DB
        {
            SqlConnection consql = new SqlConnection();
            DataSet m_ds = new DataSet();
            string m_StoredProcName = "";
            ArrayList m_ParamArray = new ArrayList();
            ArrayList m_ParamName = new ArrayList();
            int m_ParamCount = 0;
            string m_ErrorMsg = "";
            string m_connstring = "";
            /*            private readonly IConfiguration _configuration;

                        public DB(IConfiguration configuration)
                        {
                            _configuration = configuration;
                        }
            */
            public void SetConnectionString(string sConString)
            {
                m_connstring = sConString;
            }

            public SqlConnection GetSQLConnection(string sDBFile)
            {
                SqlConnection sqlcon = new SqlConnection();

                /*                var sConString = "Data Source=messracing.com;Initial Catalog=" + sDBFile + ";UID=benmessne;PWD=Mo9anaApr!";
                                sqlcon.ConnectionString = m_connstring;
                *///                sqlcon.ConnectionString = sConString;
                if ((sqlcon.State != ConnectionState.Open))
                {
                    try
                    {
                        sqlcon.Open();
                    }
                    catch
                    {
                        sqlcon.ConnectionString = m_connstring;
                        sqlcon.Open();
                    }
                }

                return sqlcon;

            }

            public void OpenSQLConnection()
            {
                //                var sConString = "Data Source=messracing.com;Initial Catalog=" + sDBFile + ";UID=benmessne;PWD=Mo9anaApr!";
                //                consql.ConnectionString = m_connstring;
                //                consql.ConnectionString = sConString;
                if ((consql.State != ConnectionState.Open))
                {
                    try
                    {
                        consql.Open();
                    }
                    catch
                    {
                        consql.ConnectionString = m_connstring;
                        consql.Open();
                    }
                }
            }

            public void CloseSQLConnection()
            {
                consql.Close();
            }

            public bool GetSQLDataSet(string sSQL, ref string sReturnError)
            {
                SqlCommand Cmd = new SqlCommand();
                var adaptor = new SqlDataAdapter();
                SqlCommand SqlCmd = new SqlCommand();
                try
                {
                    // set the sql adaptor
                    Cmd.CommandType = CommandType.Text;
                    Cmd.Connection = consql;
                    Cmd.CommandTimeout = 0;
                    Cmd.CommandText = sSQL;

                    m_ds.Clear();
                    adaptor.SelectCommand = Cmd;
                    adaptor.Fill(m_ds);
                    adaptor.Dispose();
                    sReturnError = "";
                    return true;
                }
                catch (Exception ex)
                {
                    sReturnError = ex.Message.ToString();
                    return false;
                }
            }

            public DataSet GetDataSet()
            {
                return m_ds;
            }

            public string GetDataSetValueString(DataSet ds, string sColumnName, int iRow)
            {
                int iColNo;

                iColNo = 0;

                if ((ds.Tables.Count > 0))
                {
                    iColNo = ds.Tables[0].Columns.IndexOf(sColumnName);
                    if ((ds.Tables[0].Rows.Count > 0))
                    {
                        if ((Convert.IsDBNull(ds.Tables[0].Rows[iRow].ItemArray.GetValue(iColNo))))
                            return "";
                        else
                        {
                            object? obj = ds.Tables[0].Rows[iRow].ItemArray.GetValue(iColNo);
                            if (obj == null)
                                return "";
                            else
                                return obj.ToString()!;
                        }
                    }
                    else
                        return "";
                }
                else
                    return "";
            }

            public int GetDataSetValueInt(DataSet ds, string sColumnName, int iRow)
            {
                int iColNo;

                iColNo = 0;

                if ((ds.Tables.Count > 0))
                {
                    iColNo = ds.Tables[0].Columns.IndexOf(sColumnName);
                    if ((ds.Tables[0].Rows.Count > 0))
                    {
                        if ((Convert.IsDBNull(ds.Tables[0].Rows[iRow].ItemArray.GetValue(iColNo))))
                            return -1;
                        else
                        {
                            object? obj = ds.Tables[0].Rows[iRow].ItemArray.GetValue(iColNo);
                            if (obj == null)
                                return -1;
                            else
                                return Convert.ToInt32(obj);
                        }
                    }
                    else
                        return -1;
                }
                else
                    return -1;
            }

            public bool GetDataSetValueBit(DataSet ds, string sColumnName, int iRow)
            {
                int iColNo;

                iColNo = 0;

                if ((ds.Tables.Count > 0))
                {
                    iColNo = ds.Tables[0].Columns.IndexOf(sColumnName);
                    if ((ds.Tables[0].Rows.Count > 0))
                    {
                        if ((Convert.IsDBNull(ds.Tables[0].Rows[iRow].ItemArray.GetValue(iColNo))))
                            return false;
                        else
                        {
                            object? obj = ds.Tables[0].Rows[iRow].ItemArray.GetValue(iColNo);
                            if (obj == null)
                                return false;
                            else
                                return Convert.ToBoolean(obj);
                        }
                    }
                    else
                        return false;
                }
                else
                    return false;
            }

            public DateTime GetDataSetValueDate(DataSet ds, string sColumnName, int iRow)
            {
                int iColNo;
                DateTime dtDefault = new DateTime(1900, 1, 1);
                iColNo = 0;

                if ((ds.Tables.Count > 0))
                {
                    iColNo = ds.Tables[0].Columns.IndexOf(sColumnName);
                    if ((ds.Tables[0].Rows.Count > 0))
                    {
                        if ((Convert.IsDBNull(ds.Tables[0].Rows[iRow].ItemArray.GetValue(iColNo))))
                            return dtDefault;
                        else
                        {
                            object? obj = ds.Tables[0].Rows[iRow].ItemArray.GetValue(iColNo);
                            if (obj == null)
                                return dtDefault;
                            else
                                return Convert.ToDateTime(obj);
                        }
                    }
                    else
                        return dtDefault;
                }
                else
                    return dtDefault;
            }

            public double GetDataSetValueFloat(DataSet ds, string sColumnName, int iRow)
            {
                int iColNo;
                iColNo = 0;

                if ((ds.Tables.Count > 0))
                {
                    iColNo = ds.Tables[0].Columns.IndexOf(sColumnName);
                    if ((ds.Tables[0].Rows.Count > 0))
                    {
                        if ((Convert.IsDBNull(ds.Tables[0].Rows[iRow].ItemArray.GetValue(iColNo))))
                            return -1.0;
                        else
                        {
                            object? obj = ds.Tables[0].Rows[iRow].ItemArray.GetValue(iColNo);
                            if (obj == null)
                                return -1.0;
                            else
                                return Convert.ToDouble(obj);
                        }
                    }
                    else
                        return -1.0;
                }
                else
                    return -1.0;
            }

            public bool ExecuteSQL(string sSQL, ref string sReturnError)
            {
                SqlCommand Cmd = new SqlCommand();
                try
                {
                    // set the sql adaptor
                    Cmd.CommandType = CommandType.Text;
                    Cmd.Connection = consql;
                    Cmd.CommandTimeout = 0;
                    Cmd.CommandText = sSQL;
                    Cmd.ExecuteNonQuery();
                    sReturnError = "";
                    return true;
                }
                catch (Exception ex)
                {
                    sReturnError = ex.Message.ToString();
                    return false;
                }
            }

            public int RunStoredProcDataSet()
            {
                SqlCommand Cmd = new SqlCommand();
                var adaptor = new SqlDataAdapter();
                SqlCommand SqlCmd = new SqlCommand();
                SqlParameter param = new SqlParameter();
                int i;
                System.Type sysType;
                string sName;
                int iRowCount = -1;

                try
                {
                    OpenSQLConnection();
                    Cmd.Connection = consql;
                    Cmd.CommandTimeout = 0;
                    for (i = 0; i <= m_ParamCount - 1; i++)
                    {
                        if (m_ParamArray[i] != null)
                        {
                            object obj = m_ParamArray[i]!;
                            object obj2 = m_ParamName[i]!;
                            sysType = obj.GetType();
                            sName = obj2.ToString();
                            param = Cmd.Parameters.AddWithValue(sName, m_ParamArray[i]);
                            param.Value = m_ParamArray[i];
                        }
                    }
                    Cmd.CommandText = m_StoredProcName;
                    Cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    Cmd.Prepare();

                    m_ds.Clear();
                    // set the sql adaptor
                    adaptor.SelectCommand = Cmd;
                    adaptor.Fill(m_ds);
                    adaptor.Dispose();
                    if ((m_ds.Tables.Count > 0))
                        iRowCount = m_ds.Tables[0].Rows.Count;
                    else
                        iRowCount = -1;
                }
                catch (Exception ex)
                {
                    m_ParamCount = 0;
                    iRowCount = -1;
                    m_ErrorMsg = ex.Message.ToString();
                }
                finally
                {
                    m_ParamCount = 0;
                    CloseSQLConnection();
                }

                m_ParamName.Clear();
                m_ParamArray.Clear();

                return iRowCount;
            }
            public bool SetParam(string sParamName, object oValue)
            {
                m_ParamArray.Add(oValue);
                m_ParamName.Add(sParamName);
                m_ParamCount += 1;
                return true;
            }
            public void SetStoredProcName(string sSPName)
            {
                m_StoredProcName = sSPName;
            }
        }

        public class clsTest
        {
            private string gsConnectionString;

            public clsTest(string sConnection)
            {
                gsConnectionString = sConnection;
            }

            public bool IsHorseExempt(string sHorseName)
            {
                DB DB = new DB();
                DataSet ds = new DataSet();
                string sSQL;
                string sReturnMsg = "";

                try
                {
                    DB.SetConnectionString(gsConnectionString);
                    DB.OpenSQLConnection();
                    sHorseName = sHorseName.Replace("'", "''");
                    sSQL = "SELECT HorseName FROM tblHorseExempt WHERE HorseName = '" + sHorseName + "'";
                    if ((DB.GetSQLDataSet(sSQL, ref sReturnMsg)))
                    {
                        ds = DB.GetDataSet();
                        if ((ds.Tables.Count > 0))
                        {
                            if ((ds.Tables[0].Rows.Count > 0))
                                return true;
                            else
                                return false;
                        }
                        else
                            return false;
                    }
                    else
                        return false;
                }
                catch
                {
                    return false;
                }
                finally
                {
                    DB.CloseSQLConnection();
                }
            }

            public StateTrackObject[]? GetTracks(string sState)
            {
                DB DB = new DB();
                DataSet ds = new DataSet();
                int iRecords;

                try
                {
                    DB.SetConnectionString(gsConnectionString);
                    DB.OpenSQLConnection();
                    DB.SetStoredProcName("SP_temp2");
                    DB.SetParam("@vchState", sState);
                    iRecords = DB.RunStoredProcDataSet();
                    StateTrackObject[] objStateTrack = new StateTrackObject[iRecords];
                    if ((iRecords > 0))
                    {
                        ds = DB.GetDataSet();
                        if ((ds.Tables.Count > 0))
                        {
                            for (int i = 0; i < iRecords; i++)
                            {
                                objStateTrack[i] = new StateTrackObject();
                                objStateTrack[i].Fullname = DB.GetDataSetValueString(ds, "Fullname", i);
                                objStateTrack[i].TABMeetingAbbreviationCode = DB.GetDataSetValueString(ds, "TABMeetingAbbreviation", i);
                            }
                        }
                        return objStateTrack;
                    }
                    else
                        return null;
                }
                catch
                {
                    return null;
                }
                finally
                {
                    DB.CloseSQLConnection();
                }
            }

            public BedObject[]? GetBeds()
            {
                DB DB = new DB();
                DataSet ds = new DataSet();
                int iRecords;

                try
                {
                    DB.SetConnectionString(gsConnectionString);
                    DB.OpenSQLConnection();
                    DB.SetStoredProcName("SP_GetBeds");
                    //                    DB.SetParam("@vchState", sState);
                    iRecords = DB.RunStoredProcDataSet();
                    BedObject[] objBedInfo = new BedObject[iRecords];
                    if ((iRecords > 0))
                    {
                        ds = DB.GetDataSet();
                        if ((ds.Tables.Count > 0))
                        {
                            for (int i = 0; i < iRecords; i++)
                            {
                                objBedInfo[i] = new BedObject();
                                objBedInfo[i].iResidentId = DB.GetDataSetValueInt(ds, "ResidentId", i);
                                objBedInfo[i].iBedNo = DB.GetDataSetValueInt(ds, "BedNo", i);
                                objBedInfo[i].sFirstNames = DB.GetDataSetValueString(ds, "FirstNames", i);
                                objBedInfo[i].sLastName = DB.GetDataSetValueString(ds, "LastName", i);
                                objBedInfo[i].iHandoverId = DB.GetDataSetValueInt(ds, "HandoverId", i);
                                objBedInfo[i].sDiagnosis = DB.GetDataSetValueString(ds, "Diagnosis", i); ;
                            }
                        }
                        return objBedInfo;
                    }
                    else
                        return null;
                }
                catch
                {
                    return null;
                }
                finally
                {
                    DB.CloseSQLConnection();
                }
            }

            public BedSaveObject SetHandover(BedObject bed)
            {
                DB DB = new DB();
                DataSet ds = new DataSet();
                int iRecords;
                BedSaveObject rtnBed = new BedSaveObject();

                try
                {
                    DB.SetConnectionString(gsConnectionString);
                    DB.OpenSQLConnection();
                    DB.SetStoredProcName("SP_SetHandover");
                    DB.SetParam("@piHandoverId", bed.iHandoverId);
                    DB.SetParam("@piResidentId", bed.iResidentId);
                    DB.SetParam("@piBedNo", bed.iBedNo);
                    DB.SetParam("@pvchDiagnosis", bed.sDiagnosis);
                    iRecords = DB.RunStoredProcDataSet();
                    if ((iRecords > 0))
                    {
                        ds = DB.GetDataSet();
                        if ((ds.Tables.Count > 0))
                        {
                            rtnBed.iHandoverId = DB.GetDataSetValueInt(ds, "HandoverId", 0);
                        }
                        else
                        {
                            rtnBed.iHandoverId = bed.iHandoverId;
                        }
                        rtnBed.iBedNo = bed.iBedNo;
                        rtnBed.iResidentId = bed.iResidentId;
                        rtnBed.sError = "";
                        rtnBed.bReturn = true;
                    }
                    else
                    {
                        rtnBed.iHandoverId = bed.iHandoverId;
                        rtnBed.iBedNo = bed.iBedNo;
                        rtnBed.iResidentId = bed.iResidentId;
                        rtnBed.sError = "Could not save details for Bed " + bed.iBedNo;
                        rtnBed.bReturn = false;
                    }
                    return rtnBed;
                }
                catch (Exception ex)
                {
                    rtnBed.iHandoverId = bed.iHandoverId;
                    rtnBed.iBedNo = bed.iBedNo;
                    rtnBed.iResidentId = bed.iResidentId;
                    rtnBed.sError = ex.Message;
                    rtnBed.bReturn = false;
                    return rtnBed;
                }
                finally
                {
                    DB.CloseSQLConnection();
                }
            }

            public QuestionObject[]? GetPatientForm(int iPatientId, int iFormId)
            {
                DB DB = new DB();
                DataSet ds = new DataSet();
                int iRecords;

                try
                {
                    DB.SetConnectionString(gsConnectionString);
                    DB.OpenSQLConnection();
                    DB.SetStoredProcName("SP_GetPatientFormResults");
                    DB.SetParam("@piFormId", iFormId);
                    DB.SetParam("@piPatientId", iPatientId);
                    iRecords = DB.RunStoredProcDataSet();
                    QuestionObject[] objQuestion = new QuestionObject[iRecords];
                    if ((iRecords > 0))
                    {
                        ds = DB.GetDataSet();
                        if ((ds.Tables.Count > 0))
                        {
                            for (int i = 0; i < iRecords; i++)
                            {
                                objQuestion[i] = new QuestionObject();
                                objQuestion[i].ReportId = DB.GetDataSetValueInt(ds, "ReportId", i);
                                objQuestion[i].FormId = DB.GetDataSetValueInt(ds, "FormId", i);
                                objQuestion[i].PatientId = DB.GetDataSetValueInt(ds, "PatientId", i);
                                objQuestion[i].FirstName = DB.GetDataSetValueString(ds, "FirstName", i);
                                objQuestion[i].MiddleName = DB.GetDataSetValueString(ds, "MiddleName", i);
                                objQuestion[i].LastName = DB.GetDataSetValueString(ds, "LastName", i);
                                objQuestion[i].CorryongId = DB.GetDataSetValueInt(ds, "CorryongId", i);
                                objQuestion[i].QuestionId = DB.GetDataSetValueInt(ds, "QuestionId", i);
                                objQuestion[i].Question = DB.GetDataSetValueString(ds, "Question", i);
                                objQuestion[i].QuestionType = DB.GetDataSetValueInt(ds, "QuestionType", i);
                                objQuestion[i].SectionId = DB.GetDataSetValueInt(ds, "SectionId", i);
                                objQuestion[i].SectionType = DB.GetDataSetValueInt(ds, "SectionTypeId", i);
                                objQuestion[i].PatientNotes = DB.GetDataSetValueString(ds, "PatientNotes", i);
                                objQuestion[i].PatientResultScore = DB.GetDataSetValueFloat(ds, "PatientResultScore", i);
                                objQuestion[i].PatientResultScale = DB.GetDataSetValueFloat(ds, "PatientResultScale", i);
                                objQuestion[i].Datapoint1 = DB.GetDataSetValueString(ds, "Datapoint1", i);
                                objQuestion[i].Datapoint2 = DB.GetDataSetValueString(ds, "Datapoint2", i);
                                objQuestion[i].Datapoint3 = DB.GetDataSetValueString(ds, "Datapoint3", i);
                                objQuestion[i].Datapoint4 = DB.GetDataSetValueString(ds, "Datapoint4", i);
                                objQuestion[i].Datapoint5 = DB.GetDataSetValueString(ds, "Datapoint5", i);
                            }
                        }
                        return objQuestion;
                    }
                    else
                        return null;
                }
                catch
                {
                    return null;
                }
                finally
                {
                    DB.CloseSQLConnection();
                }
            }

            public int SetFormReport(int iFormId, int iPateintId, String sFormDate)
            {
                DB DB = new DB();
                DataSet ds = new DataSet();
                int iRecords, iReportId;
                DateClass dte = new DateClass();

                try
                {
                    string sDate = dte.ConvertDateTimeToSQLFormat(sFormDate, "dd/MM/yyyy");

                    DB.SetConnectionString(gsConnectionString);
                    DB.OpenSQLConnection();
                    DB.SetStoredProcName("SP_SetPatientFormReport");
                    DB.SetParam("@piFormId", iFormId);
                    DB.SetParam("@piPatientId", iPateintId);
                    DB.SetParam("@pdtFormDate", sDate); //Change this to SQL format yyyymmdd

                    iRecords = DB.RunStoredProcDataSet();
                    if (iRecords > 0)
                    {
                        ds = DB.GetDataSet();
                        if ((ds.Tables.Count > 0))
                        {
                            iReportId = DB.GetDataSetValueInt(ds, "ReportId", 0);
                        }
                        else
                        {
                            iReportId = -1;
                        }
                    }
                    else
                    {
                        iReportId = -1;
                    }
                    return iReportId;
                }
                catch (Exception ex)
                {
                    return -1;
                }
                finally
                {
                    DB.CloseSQLConnection();
                }
            }

            public QuestionSaveResultObject SetFormQuestion(String sUerId, bool bNewReport, QuestionSaveObject question)
            {
                DB DB = new DB();
                DataSet ds = new DataSet();
                int iRecords, iNewReport;
                QuestionSaveResultObject rtnQuestion = new QuestionSaveResultObject();
                DateClass dte = new DateClass();

                try
                {
                    iNewReport = 0;
                    if (bNewReport)
                        iNewReport = 1;

                    string sDate = dte.ConvertDateTimeToSQLFormat(question.FormDate, "dd/MM/yyyy");

                    DB.SetConnectionString(gsConnectionString);
                    DB.OpenSQLConnection();
                    DB.SetStoredProcName("SP_SetPatientFormResults");
                    DB.SetParam("@piFormId", question.FormId);
                    DB.SetParam("@piPatientId", question.PatientId);
                    DB.SetParam("@piQuestionId", question.QuestionId);
                    DB.SetParam("@pdtFormDate", sDate);
                    DB.SetParam("@pfScore", question.PatientResultScore);
                    DB.SetParam("@pfScale", question.PatientResultScale);
                    DB.SetParam("@pvchNotes", question.PatientNotes);
                    DB.SetParam("@pvchDataPoint1", question.PatientDataPoint1);
                    DB.SetParam("@pvchDataPoint2", question.PatientDataPoint2);
                    DB.SetParam("@pvchDataPoint3", question.PatientDataPoint3);
                    DB.SetParam("@pvchDataPoint4", question.PatientDataPoint4);
                    DB.SetParam("@pvchDataPoint5", question.PatientDataPoint5);
                    DB.SetParam("@pvchUser", question.PatientDataPoint1);
                    DB.SetParam("@piReportId", question.ReportId);
                    DB.SetParam("@piNewReport", iNewReport);

                    iRecords = DB.RunStoredProcDataSet();
                    if (iRecords > 0)
                    {
                        ds = DB.GetDataSet();
                        if ((ds.Tables.Count > 0))
                        {
                            rtnQuestion.iReportId = DB.GetDataSetValueInt(ds, "ReportId", 0);
                            rtnQuestion.bReturn = true;
                        }
                        else
                        {
                            rtnQuestion.iReportId = -1;
                            rtnQuestion.bReturn = true;
                        }
                    }
                    else
                    {
                        rtnQuestion.iReportId = -1;
                        rtnQuestion.bReturn = true;
                        rtnQuestion.sError = "Could not save details for patient id " + question.PatientId + " and question id " + question.QuestionId;
                    }
                    return rtnQuestion;
                }
                catch (Exception ex)
                {
                    rtnQuestion.iReportId = -1;
                    rtnQuestion.bReturn = true;
                    rtnQuestion.sError = "Could not save details for patient id " + question.PatientId + " and question id " + question.QuestionId + " due to " + ex.Message;
                    return rtnQuestion;
                }
                finally
                {
                    DB.CloseSQLConnection();
                }
            }
        }

        public class clsPDF
        {
            public void CreatePDFPage()
            {
                QuestPDF.Settings.License = LicenseType.Community;
                uint i;
                BackendClass.clsPDF bepdf = new BackendClass.clsPDF();

                Document.Create(container =>
                {
                    container.Page(page =>
                    {
                        page.Size(PageSizes.A4);
                        page.Margin(2, Unit.Centimetre);
                        page.PageColor(Colors.White);
                        page.DefaultTextStyle(x => x.FontSize(20));

                        page.Header()
                            .Text("Hello PDF!")
                            .SemiBold().FontSize(36).FontColor(Colors.Blue.Medium);

                        page.Content()
                            .PaddingVertical(1, Unit.Centimetre)
                            .Table(table =>
                            {
                                table.ColumnsDefinition(col =>
                                {
                                    col.RelativeColumn();
                                    col.RelativeColumn();
                                    col.RelativeColumn();
                                });


                                // by using custom 'Element' method, we can reuse visual configuration
                                for (i = 0; i < 5; i++)
                                {
                                    table.Cell().Row((i * 4) + 1).Column(3).Element(Block).Text("A" + i);
                                    table.Cell().Row((i * 4) + 2).Column(2).Element(Block).Text("B" + i);
                                    table.Cell().Row((i * 4) + 3).Column(3).Element(Block).Text("C" + i);
                                    table.Cell().Row((i * 4) + 4).Column(1).ColumnSpan(2).Element(Block).Text("D" + i);
                                }

                                // for simplicity, you can also use extension method described in the "Extending DSL" section
                                static IContainer Block(IContainer container)
                                {
                                    return container
                                        .Border(1)
                                        .Background(Colors.Grey.Lighten3)
                                        .ShowOnce()
                                        .MinWidth(50)
                                        .MinHeight(50)
                                        .AlignCenter()
                                        .AlignMiddle();
                                }
                            });
                        /*                .Column(x =>
                                        {
                                            x.Spacing(20);

                                            x.Item().Text("This is the patient info");
                                            x.Item().Image(Placeholders.Image(200, 100));
                                        }
                        );*/

                        page.Footer()
                            .AlignCenter()
                            .Text(x =>
                            {
                                x.Span("Page ");
                                x.CurrentPageNumber();
                            });
                    });
                })
            .GeneratePdf("hello.pdf");
            }

            public QuestPDF.Elements.Table.ITableCellContainer GetCell(String sContents, uint iRow, ITableCellContainer cell)
            {
                cell.Row(iRow).Column(3).Element(Block).Text(sContents);

                return cell;

            }

            static IContainer Block(IContainer container)
            {
                return container
                    .Border(1)
                    .Background(Colors.Grey.Lighten3)
                    .ShowOnce()
                    .MinWidth(50)
                    .MinHeight(50)
                    .AlignCenter()
                    .AlignMiddle();
            }
        }

        public class DateClass
        {
            public DateTime GetDateFromString(string sDateString, string sFormat)
            {
                DateTime dtDate;
                CultureInfo provider = CultureInfo.InvariantCulture;

                dtDate = DateTime.ParseExact(sDateString, sFormat, provider);

                return dtDate;
            }

            public string ConvertDateTimeToSQLFormat(string sDateString, string sFormat)
            {
                string sReturnDate = "";
                DateTime dtDate = GetDateFromString(sDateString, sFormat);
                sReturnDate = dtDate.ToString("yyyyMMdd HH:mm:ss.s");

                return sReturnDate;

            }
        }
    }
}
