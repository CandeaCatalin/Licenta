using System;

namespace Domain.Schema
{
    public class EventLog
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public EventCategory EventCategory { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
