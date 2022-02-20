using System;
using System.Collections.Generic;

namespace Domain.Schema
{
    public class PhysicalQueue
    {
        public PhysicalQueue()
        {
            Users = new HashSet<User>();
            UsersToQueues = new HashSet<UsersToQueues>();

        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int QueueId { get; set; }
        public Queue Queue { get; set; }
        public ICollection<User> Users { get; set; }
        public DateTime CreatedTime { get; set; }
        public TimeSpan EstimatedTime { get; set; }

        public ICollection<UsersToQueues> UsersToQueues { get; set; }
    }
}
