using System.Collections.Generic;

namespace Domain.Schema
{
    public class EventCategory
    {
        public EventCategory()
        {
            EventLogs = new HashSet<EventLog>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<EventLog> EventLogs { get; set; }
    }
}
