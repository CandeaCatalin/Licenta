using System;
using System.Collections.Generic;
using System.Linq;
using Domain.Schema;
using EF.Models;

namespace Domain.Data.Repositories.Queue
{
    public class QueueRepository : IQueueRepository
    {
        private readonly QueueManagerContext _context;

        public QueueRepository(QueueManagerContext context)
        {
            _context = context;
        }

        public int Create(int userId)
        {
            QueueToUserCreated queueToUserCreated =
                _context.QueueToUsersCreated.FirstOrDefault((q) => q.UserId == userId);
            if (queueToUserCreated != null)
            {
                throw new ArgumentException("Queue already exists!");
            }

            Schema.Queue newQueue = new Schema.Queue();
            _context.Queues.Add(newQueue);
            _context.SaveChanges();
            QueueToUserCreated newQueueToUserCreated = new QueueToUserCreated
            {
                UserId = userId,
                QueueId = newQueue.Id
            };
            _context.QueueToUsersCreated.Add(newQueueToUserCreated);
            _context.SaveChanges();
            return newQueue.Id;
        }

        public void Delete(int queueId)
        {
            QueueToUserCreated queueToUserCreated =
                _context.QueueToUsersCreated.FirstOrDefault((q) => q.QueueId == queueId);
            if (queueToUserCreated == null)
            {
                throw new ArgumentException("Queue does not exist!");
            }

            Schema.Queue queue = _context.Queues.Find(queueId);
            if (queue == null)
            {
                throw new ArgumentException("Queue does not exist!");
            }

            queue.EndTime = DateTime.Now;
            _context.Queues.Update(queue);
            _context.QueueToUsersCreated.Remove(queueToUserCreated);
            IQueryable<UsersMappedToQueue> usersMappedToQueue =
                _context.UsersMappedToQueue.Where((q) => q.QueueId == queueId);
            _context.UsersMappedToQueue.RemoveRange(usersMappedToQueue);
            _context.SaveChanges();
        }
    }
}
