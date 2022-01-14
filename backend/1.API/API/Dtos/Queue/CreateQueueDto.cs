using System.Collections.Generic;

namespace API.Dtos.Queue
{
    public class CreateQueueDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        private List<CreatePhysicalQueueDto> PhyisicalQueues = new List<CreatePhysicalQueueDto>();
    }
}
