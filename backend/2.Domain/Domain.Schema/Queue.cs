using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Schema
{
    public class Queue
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Queue<User> User { get; set; } = new Queue<User>();
        public DateTime CreatedTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
