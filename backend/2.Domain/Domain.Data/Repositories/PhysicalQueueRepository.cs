using Domain.Schema;
using EF.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace Domain.Data.Repositories
{



    public class PhysicalQueueRepository : IPhysicalQueueRepository
    {
        private readonly QueueManagerContext _context;
        public PhysicalQueueRepository(QueueManagerContext context)
        {
            _context = context;
        }

        public PhysicalQueue Get(int id)
        {
            PhysicalQueue physicalQueue = GetById(id);
            if (physicalQueue == null)
            {
                throw new Exception("Queue does not exist!");
            }
            return physicalQueue;
        }
        public PhysicalQueue GetById(int id)
        {

            PhysicalQueue pq = _context.PhysicalQueues.FirstOrDefault(pq => pq.Id == id);
            Queue queue = _context.Queues.FirstOrDefault(q => q.PhysicalQueues.Contains(pq));
            pq.Queue = queue;
            return pq;
        }

        public PhysicalQueue GetByUserId(int id)
        {

            UsersToQueues utq = _context.UsersToQueues.FirstOrDefault(utq => utq.UserId == id && utq.IsPassed == false);
            if (utq == null)
            {
                throw new Exception("User not in queue");
            }

            PhysicalQueue pq = _context.PhysicalQueues.Find(utq.PhysicalQueueId);
            Queue queue = _context.Queues.FirstOrDefault(q => q.PhysicalQueues.Contains(pq));
            pq.Queue = queue;
            return pq;
        }

        public TimeSpan GetEstimatedTime(int id)
        {
            PhysicalQueue myQueue = GetById(id);
            TimeSpan estimatedTime = new TimeSpan(myQueue.EstimatedTime);
            return estimatedTime;
        }

        public string GetNextUser(int pqId)
        {
            UsersToQueues usersToQueues = _context.UsersToQueues.FirstOrDefault(utq => utq.PhysicalQueueId == pqId && utq.IsPassed == false);
            if (usersToQueues != null)
            {
                User nextUser = _context.Users.Find(usersToQueues.UserId);
                return nextUser.FirstName + " " + nextUser.LastName;
            }
            return "";

        }

        public int LeaveQueue(int userId)
        {
            UsersToQueues removedUTQ = _context.UsersToQueues.FirstOrDefault(utq => (utq.UserId == userId && utq.IsPassed == false));
            int physicalQueueId = removedUTQ.PhysicalQueueId;
            _context.UsersToQueues.Remove(removedUTQ);
            _context.SaveChanges();
            return physicalQueueId;
        }
    }
}
