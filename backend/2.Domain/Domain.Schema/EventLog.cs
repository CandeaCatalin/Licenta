using System;

namespace Domain.Schema
{
    public class EventLog
    {
        public int Id { get; set; }
        public string Value { get; set; }
        public int EventCategoryId { get; set; }

        public EventCategory EventCategory { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
