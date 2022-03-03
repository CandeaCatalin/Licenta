using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos.Queue
{
    public class EditQueueDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<EditPhysicalQueueDto> PhysicalQueues { get; set; } = new List<EditPhysicalQueueDto>();
    }
}
