using Asp.Versioning;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cannon.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    public class AppController : ControllerBase
    {
        private readonly ILogger<AppController> _logger;

        public AppController(ILogger<AppController> logger)
        {
            _logger = logger;
        }

        [Route("api/{v:apiVersion}/[controller]/status")]
        [HttpGet]
        public OkObjectResult HealthCheck()
        {
            return new OkObjectResult("Ok");
        }
    }
}
