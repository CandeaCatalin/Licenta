using Domain.Schema;
using System.Collections.Generic;

namespace Domain.Data.Repositories
{
    public interface IQueueRepository
    {

        public Queue Create(Queue queue, ICollection<PhysicalQueue> physicalQueues);
        public Queue Edit(Queue queue, ICollection<PhysicalQueue> physicalQueues);
        public Queue GetByName(string name);
        public Queue GetById(int id);
        public List<Queue> GetQueues();
        public bool DeleteQueue(int queueId);


    }
}
