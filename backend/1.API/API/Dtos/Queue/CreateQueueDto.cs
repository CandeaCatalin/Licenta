using System.Collections.Generic;

namespace API.Dtos.Queue
{
    public class CreateQueueDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public List<CreatePhysicalQueueDto> PhysicalQueues { get; set; } = new List<CreatePhysicalQueueDto>();
    }
}
