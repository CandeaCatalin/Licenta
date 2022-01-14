using Domain.Schema;

namespace Domain.Data.Repositories
{
    public interface IQueueRepository
    {
        public Queue Create(Queue queue);
        public Queue GetByName(string name);
        public Queue GetById(int id);


    }
}
