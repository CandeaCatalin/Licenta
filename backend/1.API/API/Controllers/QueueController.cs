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
        private readonly IQueueRepository _queueRepository;
        private readonly IUserRepository _userRepository;
        private readonly JwtService _jwtService;

        public QueueController(IQueueRepository repository, IUserRepository userRepository, JwtService jwtService)
        {
            _queueRepository = repository;
            _userRepository = userRepository;
            _jwtService = jwtService;
        }
        [HttpGet("get")]
        public IActionResult GetQueues()
        {
            if (_jwtService.CheckIfUserIsLogged(_userRepository, Request) == null)
            {
                return Unauthorized();
            }
            else
            {
                try
                {
                    List<Queue> queues = _queueRepository.GetQueues();
                    return Ok(new { queues = queues });
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
        [HttpPost("add")]
        public IActionResult Add( [FromBody] CreateQueueDto  dto) 
        {
            if (_jwtService.CheckIfUserIsLogged(_userRepository, Request) == null)
            {
                return Unauthorized();
            }
            else
            {
                try
                {
                    Queue queue = new Queue
                    {
                        Name = dto.Name,
                        Description = dto.Description,
                    };
                    ICollection<PhysicalQueue> physicalQueues = new List<PhysicalQueue>();
                    foreach (CreatePhysicalQueueDto physicalQueueDto in dto.PhysicalQueues)
                    {
                        PhysicalQueue physicalQueue = new PhysicalQueue
                        {
                            Name = physicalQueueDto.Name,
                            Description = physicalQueueDto.Description
                        };
                        physicalQueues.Add(physicalQueue);
                    }
                    queue = _queueRepository.Create(queue, physicalQueues);
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
        
        [HttpPost("delete")]
        public IActionResult DeleteQueue([FromBody] int queueId)
        {
            if (_jwtService.CheckIfUserIsLogged(_userRepository, Request) == null)
            {
                return Unauthorized();
            }
            else
            {
                try
                {
                    _queueRepository.DeleteQueue(queueId);
                    return Ok();
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
        [HttpPost("edit")]
        public IActionResult EditQueue([FromBody] EditQueueDto dto)
        {
            if (_jwtService.CheckIfUserIsLogged(_userRepository, Request) == null)
            {
                return Unauthorized();
            }
            else
            {
                try
                {
                    Queue queue = new Queue
                    {
                        Id = dto.Id,
                        Name = dto.Name,
                        Description = dto.Description,
                    };
                    ICollection<PhysicalQueue> physicalQueues = new List<PhysicalQueue>();
                    foreach (EditPhysicalQueueDto physicalQueueDto in dto.PhysicalQueues)
                    {
                        PhysicalQueue physicalQueue = new PhysicalQueue
                        {
                            Name = physicalQueueDto.Name,
                            Description = physicalQueueDto.Description,
                            Id = physicalQueueDto.Id
                        };
                        physicalQueues.Add(physicalQueue);
                    }
                    Queue editedQueue = _queueRepository.Edit(queue, physicalQueues);

                    return Ok(editedQueue);
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
}
