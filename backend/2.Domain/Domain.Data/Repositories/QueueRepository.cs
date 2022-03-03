using System;
using System.Collections.Generic;
using System.Linq;
using Domain.Schema;
using EF.Models;
using Microsoft.EntityFrameworkCore;

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

        public List<Queue> GetQueues()
        {
            return _context.Queues.Include(Queue => Queue.PhysicalQueues).ToList();
        }
        public bool DeleteQueue(int queueId)
        {
            try
            {
                Queue deletedQueue = GetById(queueId);
                if (deletedQueue == null)
                {
                    return true;
                }
                _context.Queues.Remove(deletedQueue);
                _context.SaveChanges();
                return true;
            }
            catch(Exception)
            {
                return false;
            }
            
        }

        public Queue Edit(Queue queue, ICollection<PhysicalQueue> physicalQueues)
        {
            
                if (string.IsNullOrEmpty(queue.Name))
                    throw new ArgumentException("Name is empty!");
                if (string.IsNullOrEmpty(queue.Description))
                    throw new ArgumentException("Description is empty!");
                if (GetById(queue.Id) == null)
                    throw new ArgumentException("Queue does not exist!");
                CheckPhysicalQueuesFields(physicalQueues);
                Queue editedQueue = GetById(queue.Id);
                editedQueue.Name = queue.Name;
                editedQueue.Description = queue.Description;
                _context.Queues.Update(editedQueue);
                List<PhysicalQueue> editedPhysicalQueues = _context.PhysicalQueues.Where(epq =>epq.QueueId == queue.Id).ToList();
                foreach(PhysicalQueue epq in editedPhysicalQueues)
                {
                    PhysicalQueue editedPhysicalQueue = physicalQueues.FirstOrDefault(pq => epq.Id == pq.Id);
                    if(editedPhysicalQueue != null)
                    {
                        epq.Name = editedPhysicalQueue.Name;
                        epq.Description = editedPhysicalQueue.Description;
                        _context.PhysicalQueues.Update(epq);
                        physicalQueues.Remove(editedPhysicalQueue);
                    }
                    else
                    {
                    _context.PhysicalQueues.Remove(epq);
                    }
                }
                foreach(PhysicalQueue pq in physicalQueues)
            {
                pq.Id = 0;
            }
                AddPhysicalQueues(queue.Id, physicalQueues);

            _context.SaveChanges();
                return GetById(queue.Id);  
            
        }
    }
}
