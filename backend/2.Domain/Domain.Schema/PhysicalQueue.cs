using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Schema
{
    public class PhysicalQueue
    {
        public PhysicalQueue()
        {
            UsersToQueues = new HashSet<UsersToQueues>();

        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int QueueId { get; set; }
        public Queue Queue { get; set; }
        public DateTime CreatedTime { get; set; }
        public long EstimatedTime { get; set; }

        public ICollection<UsersToQueues> UsersToQueues { get; set; }
    }
}
