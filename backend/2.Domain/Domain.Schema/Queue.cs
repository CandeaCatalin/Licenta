using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Schema
{
    public class Queue
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
