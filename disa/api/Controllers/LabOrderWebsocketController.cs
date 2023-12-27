using System.Net.WebSockets;
using api.Config;
using api.Models;
using api.Utils;
using Confluent.Kafka;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace api.Controllers
{
    public class LabOrderWebsocketController : Controller
    {
        private readonly WebSocketHandler _webSocketHandler;
        private readonly IConsumer<string, string> _kafkaConsumer;

        public LabOrderWebsocketController(WebSocketHandler webSocketHandler)
        {
            _webSocketHandler = webSocketHandler;

            var consumerConfig = new ConsumerConfig
            {
                BootstrapServers = KafkaConfig.BootstrapServer,
                GroupId = KafkaConfig.GroupId,
                AutoOffsetReset = AutoOffsetReset.Earliest
            };

            _kafkaConsumer = new ConsumerBuilder<string, string>(consumerConfig).Build();
        }

        [HttpGet("/ws")]
        public async Task<IActionResult> GetLabOrders()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();

                await _webSocketHandler.OnConnected(webSocket);

                try
                {
                    await Consume(webSocket);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error in WebSocket controller: {ex.Message}");
                }

                await _webSocketHandler.Receive(webSocket);
            }

            return new StatusCodeResult(400);
        }

        private async Task Consume(WebSocket webSocket)
        {
            var clientId = _webSocketHandler.GetClientId(webSocket);

            try
            {
                _kafkaConsumer.Subscribe(KafkaConfig.TopicTwo);

                while (webSocket.State == WebSocketState.Open)
                {
                    var consumeResult = _kafkaConsumer.Consume();

                    if (consumeResult.Message != null)
                    {
                        var jsonString = consumeResult.Message.Value;
                        var jsonObject = JsonConvert.DeserializeObject<LabOrder>(jsonString);

                        if (jsonObject != null)
                        {
                            await _webSocketHandler.BroadcastMessage(jsonObject);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error {clientId}: {ex.Message}");
            }
            finally
            {
                _kafkaConsumer.Unsubscribe();

                await _webSocketHandler.OnDisconnected(webSocket);
            }
        }
    }
}
