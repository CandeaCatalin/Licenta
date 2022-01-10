namespace Domain.Schema
{
    public class UsersMappedToQueue
    {
        public int Id { get; set; }
        public Queue Queue { get; set; }
        public int QueueId { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}
