using Domain.Schema;


namespace Domain.Data.Repositories
{
    public interface IPhysicalQueueRepository
    {
        public PhysicalQueue Get(int id);
        public PhysicalQueue GetById(int id);
        public string GetNextUser(int pqId);

    }
}
