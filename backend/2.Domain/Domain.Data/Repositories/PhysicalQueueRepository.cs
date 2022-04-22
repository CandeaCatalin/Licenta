using Domain.Schema;
using EF.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
            if(physicalQueue == null)
            {
                throw new Exception("Queue does not exist!");
            }
            return physicalQueue;
        }
        public PhysicalQueue GetById(int id)
        {

            PhysicalQueue pq = _context.PhysicalQueues.FirstOrDefault(pq => pq.Id == id );
            Queue queue = _context.Queues.FirstOrDefault(q => q.PhysicalQueues.Contains(pq));
            pq.Queue = queue;
            return pq;
        }

        public PhysicalQueue GetByUtqId(int id)
        {
            int physicalQueueId = _context.UsersToQueues.Find(id).PhysicalQueueId;
            return _context.PhysicalQueues.Find(physicalQueueId);
        }

        public string GetNextUser(int pqId)
        {
            UsersToQueues usersToQueues = _context.UsersToQueues.FirstOrDefault(utq => utq.PhysicalQueueId == pqId && utq.IsPassed == false);
            if(usersToQueues != null) {
                User nextUser = _context.Users.Find(usersToQueues.UserId);
                return nextUser.FirstName + " " + nextUser.LastName;
            }
            return "";
            
        }
    }
}
