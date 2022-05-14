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

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class PhysicalQueueController : ControllerBase
    {
        private readonly IPhysicalQueueRepository _physicalQueueRepository;
        private readonly IEventLogRepository _LogRepository;
        public PhysicalQueueController(IPhysicalQueueRepository repository, IEventLogRepository logRepository)
        {
            _physicalQueueRepository = repository;
            _LogRepository = logRepository;
        }

        [HttpGet("get")]
        public IActionResult GetPhysicalQueue(int id)
        {

            try
            {
                PhysicalQueue physicalQueue = _physicalQueueRepository.Get(id);
                return Ok(physicalQueue);
            }

            catch (Exception e)
            {
                _LogRepository.logEvent($"Couldn't get physical queue. Error: {e.Message} InnerException:{e.InnerException}", EventLogType.Error);
                return BadRequest(new { message = e.Message });
            }

        }
        [HttpPost("getNextUser")]
        public IActionResult GetNextUser(int id)
        {
            try
            {
                string userName = _physicalQueueRepository.GetNextUser(id);
                return Ok(new { userName = userName });
            }

            catch (Exception e)
            {
                _LogRepository.logEvent($"Couldn't get next user in queue. Error: {e.Message} InnerException:{e.InnerException}", EventLogType.Error);
                return BadRequest(new { message = e.Message });
            }
        }
        [HttpGet("getByUsersId")]
        public IActionResult GetPhysicalQueueByUserId()
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                if (identity != null)
                {
                    IEnumerable<Claim> claims = identity.Claims;
                    int userId = int.Parse(claims.ElementAt(0).Value);
                    PhysicalQueue physicalQueue = _physicalQueueRepository.GetByUserId(userId);
                    TimeSpan et = _physicalQueueRepository.GetEstimatedTime(physicalQueue.Id, userId);
                    return Ok(new { physicalQueue = physicalQueue, estimatedTime = et.ToString(@"hh\:mm\:ss") });
                }
                return BadRequest();
            }

            catch (Exception e)
            {
                _LogRepository.logEvent($"Couldn't get physical queue. Error: {e.Message} InnerException:{e.InnerException}", EventLogType.Error);
                return BadRequest(new { message = e.Message });
            }
        }
        [HttpPost("leavePhysicalQueue")]
        public IActionResult LeavePhysicalQueue(LeavePhysicalQueueDto dto)
        {
            try
            {
                int physicalQueueId = _physicalQueueRepository.LeaveQueue(dto.UserId);
                _LogRepository.logEvent($"User with Id: {dto.UserId} left the  physical queue with id :{physicalQueueId}", EventLogType.Success);
                return Ok();
            }

            catch (Exception e)
            {
                _LogRepository.logEvent($"Couldn't leave the queue. Error: {e.Message} InnerException:{e.InnerException}", EventLogType.Error);
                return BadRequest(new { message = e.Message });
            }
        }
        
    }
}
