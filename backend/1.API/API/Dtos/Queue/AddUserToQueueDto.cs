using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos.Queue
{
    public class AddUserToQueueDto
    {
        public int UserId { get; set; }
        public int QueueId { get; set; }
    }
}
