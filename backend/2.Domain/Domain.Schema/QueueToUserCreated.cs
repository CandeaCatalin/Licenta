using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Schema
{
    public class QueueToUserCreated
    {
        public int Id { get; set; }
        public Queue Queue { get; set; }
        public int QueueId { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }

    }
}
