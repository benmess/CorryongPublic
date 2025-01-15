using Microsoft.AspNetCore.Authentication.Negotiate;
using CorryongHealth1;
using CorryongHealth1.Pages;
using System.Security.Principal;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.SqlServer.Server;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

/*builder.Services.AddAuthentication(NegotiateDefaults.AuthenticationScheme)
   .AddNegotiate();

builder.Services.AddAuthorization(options =>
{
    options.FallbackPolicy = options.DefaultPolicy;
});
*/
// Add services to the container.
builder.Services.AddRazorPages();
//builder.Services.AddRazorPages().AddRazorPagesOptions(options =>
//{
//    options.Conventions.AddPageRoute("/Bed", "");
//});

string gsConnectionString = builder.Configuration.GetConnectionString("myDb1");
IHttpContextAccessor httpContextAccessor = new HttpContextAccessor();

builder.Services.AddHttpContextAccessor();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();


/*builder.Services.AddAuthentication(NegotiateDefaults.AuthenticationScheme)
   .AddNegotiate();

builder.Services.AddAuthorization(options =>
{
    // By default, all incoming requests will be authorized according to the default policy.
    options.FallbackPolicy = options.DefaultPolicy;
});
*/
app.UseAuthentication();
//app.UseAuthorization();

app.MapRazorPages();


app.MapGet("api/getpersondetails/{id:int}", (int id) =>
{

    //string sUser = WindowsIdentity.GetCurrent().Name;
    string? sUser = GetWindowsUser();
    string sUser2 = (sUser == null) ? string.Empty : sUser;

    var jsonObj1 = new BackendClass.BaseJsonObject();
    jsonObj1.name = "ouput";
    jsonObj1.value = sUser2;

    string jsonString = JsonSerializer.Serialize(jsonObj1);

    BackendClass.DB db = new BackendClass.DB();
    BackendClass.clsForm dbTest = new BackendClass.clsForm(gsConnectionString);
    //    db.SetConnectionString(gsConnectionString);

//    dbTest.IsHorseExempt("Dear Demi");
    //    db.OpenSQLConnection("benmessne");

    return jsonString;
});

app.MapGet("api/getloggedinuser", () =>
{

    //string sUser = WindowsIdentity.GetCurrent().Name;
    string? sUser = GetWindowsUser();
    string sUser2 = (sUser == null) ? string.Empty : sUser;
    BackendClass.clsPDF pdf = new BackendClass.clsPDF();

    BackendClass.BedObject? jsonObj1 = new BackendClass.BedObject();


    jsonObj1.sLoggedInUser = sUser2;

    string jsonString = JsonSerializer.Serialize(jsonObj1);

    //pdf.CreatePDFPage();

    return jsonString;
});

app.MapGet("api/getbeds", () =>
{

    //string sUser = WindowsIdentity.GetCurrent().Name;
    string? sUser = GetWindowsUser();
    string sUser2 = (sUser == null) ? string.Empty : sUser;
    BackendClass.clsPDF pdf = new BackendClass.clsPDF();

    BackendClass.BedObject[]? jsonObj1 = null;


    BackendClass.DB db = new BackendClass.DB();
    BackendClass.clsForm dbTest = new BackendClass.clsForm(gsConnectionString);
    jsonObj1 = dbTest.GetBeds();

    if (jsonObj1.Length > 0)
    {
        jsonObj1[0].sLoggedInUser = sUser2;
    }

    string jsonString = JsonSerializer.Serialize(jsonObj1);

    //pdf.CreatePDFPage();

    return jsonString;
});


app.MapGet("api/getpatientsearch/{patientid}/{surname}/{firstname}/{address}/{city}/{postcode}/{medicare}/{phone}", 
    (string patientid, string surname, string firstname, string address, string city, string postcode, string medicare, string phone) =>
{

    //string sUser = WindowsIdentity.GetCurrent().Name;
    string? sUser = GetWindowsUser();
    string sUser2 = (sUser == null) ? string.Empty : sUser;

    BackendClass.PatientObject[]? jsonObj1 = null;

    if (patientid.Equals("^"))
        patientid = "";

    if (surname.Equals("^"))
        surname = "";

    if (firstname.Equals("^"))
        firstname = "";

    if (address.Equals("^"))
        address = "";

    if (city.Equals("^"))
        city = "";

    if (postcode.Equals("^"))
        postcode = "";

    if (medicare.Equals("^"))
        medicare = "";

    if (phone.Equals("^"))
        phone = "";

    BackendClass.DB db = new BackendClass.DB();
    BackendClass.clsForm dbForm = new BackendClass.clsForm(gsConnectionString);
    jsonObj1 = dbForm.GetPatientSearch(patientid, surname, firstname, address, city, postcode, medicare, phone);

    string jsonString = JsonSerializer.Serialize(jsonObj1);

    return jsonString;
});

app.MapGet("api/getpatient/{patientid:int}", (int patientid) =>
{

    //string sUser = WindowsIdentity.GetCurrent().Name;
    string? sUser = GetWindowsUser();
    string sUser2 = (sUser == null) ? string.Empty : sUser;

    BackendClass.PatientObject? jsonObj1 = null;


    BackendClass.DB db = new BackendClass.DB();
    BackendClass.clsForm dbForm = new BackendClass.clsForm(gsConnectionString);
    jsonObj1 = dbForm.GetPatient(patientid);

    string jsonString = JsonSerializer.Serialize(jsonObj1);

    return jsonString;
});

app.MapGet("api/getnextofkin/{patientid:int}/{formid:int}/{reportid:int}", (int patientid, int formid, int reportid) =>
{

    //string sUser = WindowsIdentity.GetCurrent().Name;
    string? sUser = GetWindowsUser();
    string sUser2 = (sUser == null) ? string.Empty : sUser;

    BackendClass.NextOfKinObject? jsonObj1 = null;


    BackendClass.DB db = new BackendClass.DB();
    BackendClass.clsForm dbForm = new BackendClass.clsForm(gsConnectionString);
    jsonObj1 = dbForm.GetNextOfKin(patientid, formid, reportid);

    string jsonString = JsonSerializer.Serialize(jsonObj1);

    return jsonString;
});

app.MapGet("api/getform/{patientid:int}/{formid:int}", (int patientid, int formid) =>
{

    //string sUser = WindowsIdentity.GetCurrent().Name;
    string? sUser = GetWindowsUser();
    string sUser2 = (sUser == null) ? string.Empty : sUser;

    BackendClass.QuestionObject[]? jsonObj1 = null;


    BackendClass.DB db = new BackendClass.DB();
    BackendClass.clsForm dbTest = new BackendClass.clsForm(gsConnectionString);
    jsonObj1 = dbTest.GetPatientForm(patientid, formid);

    string jsonString = JsonSerializer.Serialize(jsonObj1);

    return jsonString;
});

app.MapPost("api/save",  (TestInfo[] jsonin) =>
{
    //string sUser = WindowsIdentity.GetCurrent().Name; //This gets the server user (IIS user) not the windows user
    string? sUser = GetWindowsUser();
/*    HttpContext? httpContextAccessor1 = httpContextAccessor.HttpContext;
    IIdentity? identity;

    if (httpContextAccessor1 != null)
    {
        identity = httpContextAccessor1.User.Identity;
        if (identity != null)
            sUser = identity.Name; //This gets the windows user
    }
*/
    TestInfo[] jsontocompute = jsonin;

    return Results.Ok();
});

app.MapPost("api/savehandover", (BackendClass.BedObject[] jsonin) =>
{
    string? sUser = GetWindowsUser();
    BackendClass.DB db = new BackendClass.DB();
    BackendClass.clsForm dbTest = new BackendClass.clsForm(gsConnectionString);
    BackendClass.BedSaveObject[] objSave = new BackendClass.BedSaveObject[jsonin.Length];
    bool bReturn;

    for (int i = 0; i < jsonin.Length; i++)
    {
        BackendClass.BedObject bed = jsonin[i];
        BackendClass.BedSaveObject bedsave = new BackendClass.BedSaveObject();
        bedsave = dbTest.SetHandover(bed);
        objSave[i] = bedsave;
    }

    string jsonString = JsonSerializer.Serialize(objSave);

    return jsonString;

//    return Results.Ok();
});

app.MapPost("api/saveform", (BackendClass.QuestionSaveObject[] jsonin) =>
{
    string? sUser = GetWindowsUser();
    BackendClass.DB db = new BackendClass.DB();
    BackendClass.clsForm dbTest = new BackendClass.clsForm(gsConnectionString);
    BackendClass.QuestionSaveResultObject[] objSave = new BackendClass.QuestionSaveResultObject[jsonin.Length];
    bool bReturn;
    bool bNewForm = false;
    int iReportId = -1;

    for (int i = 0; i < jsonin.Length; i++)
    {
        BackendClass.QuestionSaveObject question = jsonin[i];

        if (i == 0)
        {
            if (question.ReportId < 0)
            {
                iReportId = dbTest.SetFormReport(question.FormId, question.PatientId, question.FormDate);
                bNewForm = true;
                question.ReportId = iReportId;
            }
            else
            {
                iReportId = question.ReportId;
            }
        }
        else
            question.ReportId = iReportId;

        BackendClass.QuestionSaveResultObject questionsave = new BackendClass.QuestionSaveResultObject();
        questionsave = dbTest.SetFormQuestion(sUser, bNewForm, question);
        objSave[i] = questionsave;
        //objSave[i] = new BackendClass.QuestionSaveResultObject();
        //objSave[i].bReturn = true;
        //objSave[i].iReportId = jsonin[i].ReportId;
    }

    string jsonString = JsonSerializer.Serialize(objSave);

    return jsonString;

    //    return Results.Ok();
});

app.MapPost("api/saveformnextofkin", (BackendClass.NextOfKinObject jsonin) =>
{
    string? sUser = GetWindowsUser();
    BackendClass.DB db = new BackendClass.DB();
    BackendClass.clsForm dbTest = new BackendClass.clsForm(gsConnectionString);

    BackendClass.NextOfKinObject nextofkin = jsonin;
    BackendClass.NextOfKinSaveObject noksave = new BackendClass.NextOfKinSaveObject();
    noksave = dbTest.SetNextOfKin(nextofkin.iPatientId, nextofkin.iFormId, nextofkin.iReportId, nextofkin.sName, nextofkin.sAddress, nextofkin.sPhone);

    string jsonString = JsonSerializer.Serialize(noksave);

    return jsonString;

    //    return Results.Ok();
});


app.MapGet("api/getformdpf", () =>
{

    //string sUser = WindowsIdentity.GetCurrent().Name;
    string? sUser = GetWindowsUser();
    string sUser2 = (sUser == null) ? string.Empty : sUser;
    BackendClass.clsPDF pdf = new BackendClass.clsPDF();

    BackendClass.BedObject? jsonObj1 = new BackendClass.BedObject();


    jsonObj1.sLoggedInUser = sUser2;

    string jsonString = JsonSerializer.Serialize(jsonObj1);

    pdf.CreatePDFPage();

    return jsonString;
});

string? GetWindowsUser()
{
    string? sUser = "";
    HttpContext? httpContextAccessor1 = httpContextAccessor.HttpContext;
    IIdentity? identity;

    if (httpContextAccessor1 != null)
    {
        identity = httpContextAccessor1.User.Identity;
        if (identity != null)
            sUser = identity.Name; //This gets the windows user
    }

    return sUser;

}


app.Run();



