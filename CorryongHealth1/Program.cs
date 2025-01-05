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



app.MapGet("api/testget/{id:int}", (int id) =>
{

    //string sUser = WindowsIdentity.GetCurrent().Name;
    string? sUser = GetWindowsUser();
    string sUser2 = (sUser ==null) ? string.Empty : sUser;

    var jsonObj1 = new BackendClass.BaseJsonObject();
        jsonObj1.name = "ouput";
        jsonObj1.value = sUser2;
    
    string jsonString = JsonSerializer.Serialize(jsonObj1);

    BackendClass.DB db = new BackendClass.DB();
    BackendClass.clsTest dbTest = new BackendClass.clsTest(gsConnectionString);
//    db.SetConnectionString(gsConnectionString);

    dbTest.IsHorseExempt("Dear Demi");
//    db.OpenSQLConnection("benmessne");

    return jsonString;
});

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
    BackendClass.clsTest dbTest = new BackendClass.clsTest(gsConnectionString);
    //    db.SetConnectionString(gsConnectionString);

//    dbTest.IsHorseExempt("Dear Demi");
    //    db.OpenSQLConnection("benmessne");

    return jsonString;
});

app.MapGet("api/getstatetracks/{state}", (string state) =>
{

    //string sUser = WindowsIdentity.GetCurrent().Name;
    string? sUser = GetWindowsUser();
    string sUser2 = (sUser == null) ? string.Empty : sUser;

    BackendClass.StateTrackObject[]? jsonObj1 = null;


    BackendClass.DB db = new BackendClass.DB();
    BackendClass.clsTest dbTest = new BackendClass.clsTest(gsConnectionString);
    jsonObj1 = dbTest.GetTracks(state);

    string jsonString = JsonSerializer.Serialize(jsonObj1);

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
    BackendClass.clsTest dbTest = new BackendClass.clsTest(gsConnectionString);
    jsonObj1 = dbTest.GetBeds();

    if(jsonObj1.Length > 0)
    {
        jsonObj1[0].sLoggedInUser = sUser2;
    }

    string jsonString = JsonSerializer.Serialize(jsonObj1);

    //pdf.CreatePDFPage();

    return jsonString;
});

app.MapGet("api/getform/{patientid:int}/{formid:int}", (int patientid, int formid) =>
{

    //string sUser = WindowsIdentity.GetCurrent().Name;
    string? sUser = GetWindowsUser();
    string sUser2 = (sUser == null) ? string.Empty : sUser;

    BackendClass.QuestionObject[]? jsonObj1 = null;


    BackendClass.DB db = new BackendClass.DB();
    BackendClass.clsTest dbTest = new BackendClass.clsTest(gsConnectionString);
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
    BackendClass.clsTest dbTest = new BackendClass.clsTest(gsConnectionString);
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
    BackendClass.clsTest dbTest = new BackendClass.clsTest(gsConnectionString);
    BackendClass.QuestionSaveResultObject[] objSave = new BackendClass.QuestionSaveResultObject[jsonin.Length];
    bool bReturn;

    for (int i = 0; i < jsonin.Length; i++)
    {
        BackendClass.QuestionSaveObject question = jsonin[i];
        BackendClass.QuestionSaveResultObject questionsave = new BackendClass.QuestionSaveResultObject();
        questionsave = dbTest.SetFormQuestionHandover(sUser, question);
        objSave[i] = questionsave;
        //objSave[i] = new BackendClass.QuestionSaveResultObject();
        //objSave[i].bReturn = true;
        //objSave[i].iReportId = jsonin[i].ReportId;
    }

    string jsonString = JsonSerializer.Serialize(objSave);

    return jsonString;

    //    return Results.Ok();
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



