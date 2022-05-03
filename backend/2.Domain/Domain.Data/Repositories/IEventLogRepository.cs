using Domain.Data.Models;

namespace Domain.Data.Repositories
{
    public interface IEventLogRepository
    {

        public bool logEvent(string Message, EventLogType type);
    }
}
