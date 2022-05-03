using Domain.Schema;
using System;

namespace Domain.Data.Repositories
{
    public interface IPhysicalQueueRepository
    {
        public PhysicalQueue Get(int id);
        public PhysicalQueue GetById(int id);
        public PhysicalQueue GetByUserId(int id);
        public int LeaveQueue(int userId);
        public string GetNextUser(int pqId);
        public TimeSpan GetEstimatedTime(int id);
    }
}
