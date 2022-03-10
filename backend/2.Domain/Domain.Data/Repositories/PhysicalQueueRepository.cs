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
            return _context.PhysicalQueues.Include(pq => pq.Queue).FirstOrDefault(pq=>pq.Id == id);
        }
    }
}
