using System;
using System.Collections.Generic;
using API.Dtos.Queue;
using API.Services;
using Domain.Data.Repositories;
using Domain.Schema;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]

    [Authorize]
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
                try
                {
                    List<Queue> queues = _queueRepository.GetQueues();
                    return Ok( queues );
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
        [HttpPost("add")]
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
        
        [HttpPost("delete")]
        public IActionResult DeleteQueue([FromBody] int queueId)
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
        [HttpPost("edit")]
        public IActionResult EditQueue([FromBody] EditQueueDto dto)
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
        [HttpPost("AddUserToQueue")]
        public IActionResult AddUserToQueue(AddUserToQueueDto dto)
        {
            try
            {
                _queueRepository.AddUserToQueue(dto.QueueId, dto.UserId);
                return Ok(new { message="Success", status =1 });
            }catch(Exception e)
            {
                return Ok(new { message ="Failure", status = 0 });
            }
        }
        [HttpPost("PassUserInQueue")]
        public IActionResult PassUserInQueue(PassUserInQueueDto dto)
        {
            try
            {
                _queueRepository.PassUserInQueue(dto.PhysicalQueueId);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
    }
}
