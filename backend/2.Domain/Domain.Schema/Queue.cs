using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Schema
{
    public class Queue
    {
        public int Id { get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
