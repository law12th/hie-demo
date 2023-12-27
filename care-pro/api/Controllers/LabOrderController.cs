using api.Config;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LabOrderController : Controller
    {
        private readonly KafkaProducer _kafkaProducer;

        public LabOrderController()
        {
            _kafkaProducer = new KafkaProducer(KafkaConfig.BootstrapServer, KafkaConfig.TopicOne);
        }

        [HttpPost(Name = "lab-order")]

        public async Task<IActionResult> Create([FromBody] LabOrder labOrder)
        {
            await _kafkaProducer.ProduceAsync(JsonConvert.SerializeObject(labOrder));

            return Ok("lab order created");
        }
    }
}
