using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Schema
{
    public class Queue
    {
        public Queue()
        {
            PhysicalQueues = new HashSet<PhysicalQueue>();
            Users = new HashSet<User>();
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedTime { get; set; }
        public ICollection<PhysicalQueue> PhysicalQueues { get; set; }
        public ICollection<User> Users { get; set; }

    }
}
