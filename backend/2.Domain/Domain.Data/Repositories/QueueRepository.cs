using System;
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

        public Queue Create(Queue queue)
        {
            if (string.IsNullOrEmpty(queue.Name))
                throw new ArgumentException("Name is invalid!");
            if (string.IsNullOrEmpty(queue.Description))
                throw new ArgumentException("Description is invalid!");
            if (GetByName(queue.Name) != null)
            {
                return null;
            }
            _context.Queues.Add(queue);
            _context.SaveChanges();
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
    }
}
