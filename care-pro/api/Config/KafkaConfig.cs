namespace api.Config
{
    public static class KafkaConfig
    {
        public static string BootstrapServer = "localhost:9092";
        public static string TopicOne = "lab_orders";
        public static string TopicTwo = "lab_results";
        public static string GroupId = "1D";
        
    }
}
