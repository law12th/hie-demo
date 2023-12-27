using Confluent.Kafka;

namespace api.Config
{
    public class KafkaProducer
    {
        private readonly string _bootstrapServers;
        private readonly string _topicName;

        public KafkaProducer(string bootstrapServers, string topicName)
        {
            this._bootstrapServers = bootstrapServers;
            this._topicName = topicName;
        }

        public async Task ProduceAsync(string message)
        {
            var config = new ProducerConfig { BootstrapServers = _bootstrapServers };

            using var producer = new ProducerBuilder<Null, string>(config).Build();
            try
            {
                await producer.ProduceAsync(_topicName, new Message<Null, string> { Value = message });
            }
            catch (ProduceException<Null, string> ex)
            {
                Console.WriteLine($"Failed to produce message: {ex.Error.Reason}");
            }
        }
    }
}
