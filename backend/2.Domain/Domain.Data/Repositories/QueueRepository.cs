using System;
using System.Collections.Generic;
using System.Linq;
using Domain.Schema;
using EF.Models;


namespace Domain.Data.Repositories
{
    public class QueueRepository : IQueueRepository
    {
        private readonly QueueManagerContext _context;

        public QueueRepository(QueueManagerContext context)
        {
            _context = context;
        }

        public Queue Create(Queue queue, ICollection<PhysicalQueue> physicalQueues)
        {
            if (string.IsNullOrEmpty(queue.Name))
                throw new ArgumentException("Name is empty!");
            if (string.IsNullOrEmpty(queue.Description))
                throw new ArgumentException("Description is empty!");
            if (GetByName(queue.Name) != null)
            {
                return null;
            }
            CheckPhysicalQueuesFields(physicalQueues);
            _context.Queues.Add(queue);
            _context.SaveChanges();
            AddPhysicalQueues(GetByName(queue.Name).Id, physicalQueues);
            return GetByName(queue.Name);
        }

        public Queue GetByName(string name)
        {
            return _context.Queues.FirstOrDefault(q => q.Name == name);
        }

        public Queue GetById(int id)
        {
            return _context.Queues.Find(id);
        }
        private void AddPhysicalQueues(int queueId, ICollection<PhysicalQueue> physicalQueues)
        {
            foreach (PhysicalQueue physicalQueue in physicalQueues)
            {
                physicalQueue.QueueId = queueId;
                _context.PhysicalQueues.Add(physicalQueue);
            }
            _context.SaveChanges();
        }
        private void CheckPhysicalQueuesFields(ICollection<PhysicalQueue> physicalQueues)
        {
            foreach (PhysicalQueue physicalQueue in physicalQueues)
            {
                if (string.IsNullOrEmpty(physicalQueue.Name))
                    throw new ArgumentException("Location name is empty!");
                if (string.IsNullOrEmpty(physicalQueue.Description))
                    throw new ArgumentException("Location description is empty!");
            }
        }
    }
}
