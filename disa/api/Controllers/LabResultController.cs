using api.Config;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LabResultController : Controller
    {
        private readonly KafkaProducer _kafkaProducer;

        public LabResultController()
        {
            _kafkaProducer = new KafkaProducer(KafkaConfig.BootstrapServer, KafkaConfig.TopicOne);
        }

        [HttpPost(Name = "lab-result")]
        public async Task<IActionResult> Send([FromBody] LabResults labResults)
        {
            await _kafkaProducer.ProduceAsync(JsonConvert.SerializeObject(labResults));

            return Ok("lab results sent");
        }
    }
}
