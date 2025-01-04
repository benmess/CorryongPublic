using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Globalization;

namespace CorryongHealth1.Pages
{
    public class BedModel : PageModel
    {
//        public int Id { get; set; }

        public TestInfo testInfo = new TestInfo();

        private readonly ILogger<BedModel> _logger;

        public BedModel(ILogger<BedModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
            string dateTime = DateTime.Now.ToString("d", new CultureInfo("en-AU"));
            ViewData["TimeStamp"] = dateTime + " AEST";
//            string sHelp = ViewData["help"].ToString();
        }


    }

    public class TestInfo
    {
        public int Id { get; set; }
        public string? TestText { get; set; }
    }

}