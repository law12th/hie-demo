using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;
using api.Models;
using Newtonsoft.Json;

namespace api.Utils
{
    public class WebSocketHandler
    {
        private readonly ConcurrentDictionary<string, WebSocket> _clients = new();

        public async Task OnConnected(WebSocket webSocket)
        {
            var clientId = Guid.NewGuid().ToString();

           _clients.TryAdd(clientId, webSocket);

           Console.WriteLine($"Client {clientId} connected");
        }

        public async Task OnDisconnected(WebSocket webSocket)
        {
            var clientId = GetClientId(webSocket);

            if (_clients.TryRemove(clientId, out _))
            {
                Console.WriteLine($"Client {clientId} disconnected");
            }
        }

        public async Task Receive(WebSocket webSocket)
        {
            var buffer = new byte[1024 * 4];
            var clientId = GetClientId(webSocket);

            try
            {
                while (webSocket.State == WebSocketState.Open)
                {
                    var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

                    if (result.MessageType == WebSocketMessageType.Close)
                    {
                        await OnDisconnected(webSocket);
                        break;
                    }
                    else
                    {
                        var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                        Console.WriteLine($"Received message from client {clientId}: {message}");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error receiving message from client {clientId}: {ex.Message}");
            }
        }

        public async Task BroadcastMessage(LabResults message)
        {
            foreach (var client in _clients)
            {
                if (client.Value.State == WebSocketState.Open)
                {
                    try
                    {
                        await client.Value.SendAsync(
                            Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(message)),
                            WebSocketMessageType.Text,
                            true,
                            CancellationToken.None
                        );
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error broadcasting message to client {GetClientId(client.Value)}: {ex.Message}");
                    }
                }
            }
        }

        public string GetClientId(WebSocket webSocket)
        {
            return _clients.FirstOrDefault(x => x.Value == webSocket).Key;
        }
    }
}
