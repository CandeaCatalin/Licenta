using System;
using System.Collections.Generic;
using System.Data;
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
            return _context.Queues.Select(q => new Queue
            {
                Id = q.Id,
                Name = q.Name,
                CreatedTime = q.CreatedTime,
                Description = q.Description,
                PhysicalQueues = q.PhysicalQueues.Select(pq => new PhysicalQueue
                {
                    Id = pq.Id,
                    Name = pq.Name,
                    Description = pq.Description,
                    CreatedTime = pq.CreatedTime,
                    EstimatedTime = pq.EstimatedTime,
                    QueueId = q.Id,
                    Queue = q,
                }),
            }).FirstOrDefault(q => q.Name == name);
        }

        public Queue GetById(int id)
        {
            return _context.Queues.Select(q => new Queue
            {
                Id = q.Id,
                Name = q.Name,
                CreatedTime = q.CreatedTime,
                Description = q.Description,
                PhysicalQueues = q.PhysicalQueues.Select(pq => new PhysicalQueue
                {
                    Id = pq.Id,
                    Name = pq.Name,
                    Description = pq.Description,
                    CreatedTime = pq.CreatedTime,
                    EstimatedTime = pq.EstimatedTime,
                    QueueId = q.Id,
                    Queue = q,
                }),
            }).FirstOrDefault(q => q.Id == id);
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
            return _context.Queues.Select(q => new Queue
            {
                Id = q.Id,
                Name = q.Name,
                CreatedTime = q.CreatedTime,
                Description = q.Description,
                PhysicalQueues = q.PhysicalQueues.Select(pq => new PhysicalQueue
                {
                    Id = pq.Id,
                    Name = pq.Name,
                    Description = pq.Description,
                    CreatedTime = pq.CreatedTime,
                    EstimatedTime = pq.EstimatedTime,
                    Queue = q,
                }),
            }).ToList();
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
                List<PhysicalQueue> oldPhyisicalQueues = _context.Queues.Find(queue.Id).PhysicalQueues.ToList();
                List<int> oldPhysicalQueuesIds = oldPhyisicalQueues.Select(pq => pq.Id).ToList();

                List<UsersToQueues> OldUsersToQueues = _context.UsersToQueues.AsNoTracking().Where(utq => oldPhysicalQueuesIds.Contains(utq.PhysicalQueueId) && utq.IsPassed == false).ToList();
            // _context.UsersToQueues.RemoveRange(OldUsersToQueues);

            _context.UsersToQueues.RemoveRange(_context.UsersToQueues.Where(utq => oldPhysicalQueuesIds.Contains(utq.PhysicalQueueId)));
            foreach (PhysicalQueue epq in oldPhyisicalQueues)
            {
                PhysicalQueue editedPhysicalQueue = physicalQueues.FirstOrDefault(pq => epq.Id == pq.Id);
                if (editedPhysicalQueue != null)
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
            foreach (PhysicalQueue pq in physicalQueues)
            {
                pq.Id = 0;
            }
            AddPhysicalQueues(queue.Id, physicalQueues);

            _context.SaveChanges();
            List<PhysicalQueue> newPhysicalQueue = _context.PhysicalQueues.Where(pq => pq.QueueId == queue.Id).ToList();
            List<int> newPhysicalQueueIds = newPhysicalQueue.Select(pq => pq.Id).ToList();

            RealocateUsersInQueues(OldUsersToQueues, newPhysicalQueueIds);

            return GetById(queue.Id);

        }
        public void AddUserToQueue(int queueId, int userId)
        {
            var list = _context.UsersToQueues.FromSqlInterpolated($"[dbo].[GetUsersQueue] {queueId}").ToList();
            if (list.Find(utq => utq.UserId == userId) != null)
            {
                throw new ArgumentException("User already in a queue!");
            }
            if(_context.Users.Find(userId) == null)
            {
                throw new ArgumentException("User does not exist!");
            }
            if(GetById(queueId) == null)
            {
                throw new ArgumentException("Queue does not exist!");
            }
            List<PhysicalQueue> physicalQueues = _context.PhysicalQueues.Where(pq => pq.QueueId == queueId).ToList();
            int pqIdWithLessUsers = physicalQueues[0].Id;
            int minimumUsers = int.MaxValue;
            foreach(PhysicalQueue physicalQueue in physicalQueues)
            {
                int countUsers = list.Count(c => c.PhysicalQueueId == physicalQueue.Id);
                if (minimumUsers > countUsers)
                {
                    pqIdWithLessUsers = physicalQueue.Id;
                    minimumUsers = countUsers;
                }
            }
            UsersToQueues newUsersToQueues = new()
            {
                PhysicalQueueId = pqIdWithLessUsers,
                UserId = userId,
                IsPassed = false,
            };
            _context.UsersToQueues.Add(newUsersToQueues);
            _context.SaveChanges();
        }
        public UsersToQueues GetNextInQueue(int physicalQueueId)
        {
            return _context.UsersToQueues.FirstOrDefault(utq => utq.PhysicalQueueId == physicalQueueId && utq.IsPassed == false);
        }
        public void PassUserInQueue( int physicalQueueId)
        {
            UsersToQueues passedUserInQueue = GetNextInQueue(physicalQueueId);
            if(passedUserInQueue == null)
            {
                throw new ArgumentException("Queue is empty!");
            }
            passedUserInQueue.IsPassed = true;
            passedUserInQueue.TimePassed = DateTime.Now;
      
            _context.UsersToQueues.Update(passedUserInQueue);
            UsersToQueues prevPassedUserInQueue = _context.UsersToQueues.OrderByDescending(utq => utq.Id).FirstOrDefault(utq => utq.PhysicalQueueId == physicalQueueId && utq.IsPassed == true);
            PhysicalQueue physicalQueue = _context.PhysicalQueues.Find(physicalQueueId);
            if(prevPassedUserInQueue == null)
            {
                physicalQueue.EstimatedTime = (passedUserInQueue.TimePassed - new TimeSpan(0)).Ticks;
            }else                 
                physicalQueue.EstimatedTime = (physicalQueue.EstimatedTime + (passedUserInQueue.TimePassed.Subtract(prevPassedUserInQueue.TimePassed)).Ticks)/2;
            
                
            _context.PhysicalQueues.Update(physicalQueue);
            _context.SaveChanges();
        }
        public void RealocateUsersInQueues(List<UsersToQueues> oldUsersToQueues, List<int> newPhysicalQueuesIds)
        {
            foreach(UsersToQueues utq in oldUsersToQueues)
            {
            UsersToQueues newUsersToQueues = new()
            {
                PhysicalQueueId = newPhysicalQueuesIds[oldUsersToQueues.IndexOf(utq) % newPhysicalQueuesIds.Count],
                UserId = utq.UserId,
                IsPassed = false,
            };
                _context.UsersToQueues.Add(newUsersToQueues);
            }
            _context.SaveChanges();
        }
    }
}
