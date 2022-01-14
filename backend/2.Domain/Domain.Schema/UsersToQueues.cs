using System;

namespace Domain.Schema
{
    public class UsersToQueues
    {
        public int Id { get; set; }
        public User User { get; set; }
        public Queue Queue { get; set; }
        public PhysicalQueue PhysicalQueue { get; set; }
        public DateTime TimeAdded { get; set; }
        public DateTime TimePassed { get; set; }
        public bool IsPassed { get; set; }
}
}
