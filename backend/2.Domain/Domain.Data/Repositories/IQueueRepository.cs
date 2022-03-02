using Domain.Schema;
using System.Collections.Generic;

namespace Domain.Data.Repositories
{
    public interface IQueueRepository
    {
        public Queue Create(Queue queue, ICollection<PhysicalQueue> physicalQueues);
        public Queue GetByName(string name);
        public Queue GetById(int id);


    }
}
