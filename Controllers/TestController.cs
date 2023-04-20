using Asp.Versioning;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cannon.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    public class TestController : ControllerBase
    {
        private readonly ILogger<AppController> _logger;

        public TestController(ILogger<AppController> logger)
        {
            _logger = logger;
        }

        [Route("api/{v:apiVersion}/[controller]/add")]
        [HttpGet]
        public OkObjectResult AddNewTest()
        {
            return new OkObjectResult("Ok");
        }
    }
}
