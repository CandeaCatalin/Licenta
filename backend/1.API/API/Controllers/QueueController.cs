using API.Dtos.Queue;
using Domain.Data.Models;
using Domain.Data.Repositories;
using Domain.Schema;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/[controller]")]

    [Authorize]
    [ApiController]
    public class QueueController : ControllerBase
    {
        private readonly IQueueRepository _queueRepository;
        private readonly IEventLogRepository _LogRepository;

        public QueueController(IQueueRepository repository, IUserRepository userRepository, IEventLogRepository logRepository)
        {
            _queueRepository = repository;
            _LogRepository = logRepository;
        }
        [HttpGet("get")]
        public IActionResult GetQueues()
        {
            try
            {
                List<Queue> queues = _queueRepository.GetQueues();
                return Ok(queues);
            }
            catch (ArgumentException e)
            {
                _LogRepository.logEvent($"Couldn't get queues. Error: {e.Message} InnerException:{e.InnerException}", EventLogType.Error);
                return BadRequest(new { message = e.Message });
            }
            catch (Exception e)
            {
                _LogRepository.logEvent($"Couldn't get queues. Error: {e.Message} InnerException:{e.InnerException}", EventLogType.Error);
                return BadRequest(new { message = e.Message });
            }
        }
        [HttpPost("add")]
        public IActionResult Add([FromBody] CreateQueueDto dto)
        {

            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int userId = 0;
                if (identity != null)
                {
                    IEnumerable<Claim> claims = identity.Claims;
                    userId = int.Parse(claims.ElementAt(0).Value);
                }
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
                _LogRepository.logEvent($"Queue: {queue.Name}, id: {queue.Id} was added by user with id:{userId}", EventLogType.Success);
                return Ok(queue);
            }
            catch (ArgumentException e)
            {
                return BadRequest(new { message = e.Message });
            }
            catch (Exception e)
            {
                _LogRepository.logEvent($"Couldn't create queue. Error: {e.Message} InnerException:{e.InnerException}", EventLogType.Error);
                return BadRequest(new { message = e.Message });
            }

        }

        [HttpPost("delete")]
        public IActionResult DeleteQueue([FromBody] int queueId)
        {

            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int userId = 0;
                if (identity != null)
                {
                    IEnumerable<Claim> claims = identity.Claims;
                    userId = int.Parse(claims.ElementAt(0).Value);
                }
                _queueRepository.DeleteQueue(queueId);
                _LogRepository.logEvent($"Queue: {queueId} was deleted by user with id:{userId}!", EventLogType.Success);
                return Ok();
            }
            catch (ArgumentException e)
            {
                return BadRequest(new { message = e.Message });
            }
            catch (Exception e)
            {
                _LogRepository.logEvent($"Couldn't delete queue. Error: {e.Message} InnerException:{e.InnerException}", EventLogType.Error);

                return BadRequest(new { message = e.Message });
            }

        }
        [HttpPost("edit")]
        public IActionResult EditQueue([FromBody] EditQueueDto dto)
        {

            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int userId = 0;
                if (identity != null)
                {
                    IEnumerable<Claim> claims = identity.Claims;
                    userId = int.Parse(claims.ElementAt(0).Value);
                }
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
                _LogRepository.logEvent($"Queue: {queue.Id} was edited by user with id:{userId}", EventLogType.Success);
                return Ok(editedQueue);
            }
            catch (ArgumentException e)
            {
                return BadRequest(new { message = e.Message });
            }
            catch (Exception e)
            {
                _LogRepository.logEvent($"Couldn't edit queue. Error: {e.Message} InnerException:{e.InnerException}", EventLogType.Error);
                return BadRequest(new { message = e.Message });
            }

        }
        [HttpPost("AddUserToQueue")]
        public IActionResult AddUserToQueue(AddUserToQueueDto dto)
        {
            try
            {
                int id = _queueRepository.AddUserToQueue(dto.QueueId, dto.UserId);
                _LogRepository.logEvent($"User with Id = {dto.UserId} was added into the Queue:{dto.QueueId}", EventLogType.Success);
                return Ok(new { message = "Success", status = 1, id = id });
            }
            catch (Exception e)
            {
                _LogRepository.logEvent($"Couldn't add user to queue. Error: {e.Message} InnerException:{e.InnerException}", EventLogType.Error);
                return Ok(new { message = "Failure", status = 0 });
            }
        }
        [HttpPost("PassUserInQueue")]
        public IActionResult PassUserInQueue(PassUserInQueueDto dto)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int userId = 0;
                if (identity != null)
                {
                    IEnumerable<Claim> claims = identity.Claims;
                    userId = int.Parse(claims.ElementAt(0).Value);
                }
                int userPassedId = _queueRepository.PassUserInQueue(dto.PhysicalQueueId);
                _LogRepository.logEvent($"User with Id: {userPassedId} was passed in the queue: {dto.PhysicalQueueId} by admin with Id:{userId}", EventLogType.Success);
                return Ok();
            }
            catch (Exception e)
            {
                _LogRepository.logEvent($"Couldn't pass user in queue. Error: {e.Message} InnerException:{e.InnerException}", EventLogType.Error);
                return BadRequest();
            }
        }
    }
}
