using Domain.Data.Models;
using EF.Models;
using System;

namespace Domain.Data.Repositories
{
    public class EventLogRepository : IEventLogRepository
    {
        private readonly QueueManagerContext _context;

        public EventLogRepository(QueueManagerContext context)
        {
            _context = context;
        }
        public bool logEvent(string Message, EventLogType type)
        {
            try
            {
                _context.EventLog.Add(new Schema.EventLog { EventCategoryId = ((int)type), Value = Message });
                _context.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                _context.EventLog.Add(new Schema.EventLog { EventCategoryId = ((int)type), Value = "Couldn't log event!" });
                _context.SaveChanges();
                return false;
            }

        }
    }
}
