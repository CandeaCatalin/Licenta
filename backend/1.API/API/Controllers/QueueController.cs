using System;
using System.Collections.Generic;
using API.Dtos.Queue;
using API.Services;
using Domain.Data.Repositories;
using Domain.Schema;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QueueController : ControllerBase
    {
        private readonly IQueueRepository _repository;
        private readonly JwtService _jwtService;

        public QueueController(IQueueRepository repository, JwtService jwtService)
        {
            _repository = repository;
            _jwtService = jwtService;
        }

        [HttpPost("Add")]
        public IActionResult Add( [FromBody] CreateQueueDto  dto) 
        {
            try
            {
                Queue queue = new Queue
                {
                    Name = dto.Name,
                    Description = dto.Description,
                };
                ICollection<PhysicalQueue> physicalQueues = new List<PhysicalQueue>();
                foreach(CreatePhysicalQueueDto physicalQueueDto in dto.PhysicalQueues)
                {
                    PhysicalQueue physicalQueue = new PhysicalQueue
                    {
                        Name = physicalQueueDto.Name,
                        Description = physicalQueueDto.Description
                    };
                    physicalQueues.Add(physicalQueue);
                }
                queue = _repository.Create(queue, physicalQueues);
                if (queue == null)
                {
                    return BadRequest(new { message = "Queue already exists!" });
                }

                return Ok(queue);
            }
            catch (ArgumentException e)
            {
                return BadRequest(new { message = e.Message });
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }
    }
}
