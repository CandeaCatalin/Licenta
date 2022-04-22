using Domain.Schema;


namespace Domain.Data.Repositories
{
    public interface IPhysicalQueueRepository
    {
        public PhysicalQueue Get(int id);
        public PhysicalQueue GetById(int id);
        public PhysicalQueue GetByUtqId(int id);
        public bool LeaveQueue(int userId);
        public string GetNextUser(int pqId);

    }
}
