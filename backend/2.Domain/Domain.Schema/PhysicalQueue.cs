using System;

namespace Domain.Schema
{
    public class PhysicalQueue
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Queue Queue { get; set; }
        public DateTime CreatedTime { get; set; }
        public TimeSpan EstimatedTime { get; set; }
    }
}
