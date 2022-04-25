using API.Dtos.Queue;
using API.Services;
using Domain.Data.Repositories;
using Domain.Schema;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class PhysicalQueueController : ControllerBase
    {
        private readonly IPhysicalQueueRepository _physicalQueueRepository;
        private readonly IUserRepository _userRepository;
        private readonly JwtService _jwtService;
        public PhysicalQueueController(IPhysicalQueueRepository repository, IUserRepository userRepository, JwtService jwtService)
        {
            _physicalQueueRepository = repository;
            _userRepository = userRepository;
            _jwtService = jwtService;
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

                    PhysicalQueue physicalQueue = _physicalQueueRepository.GetByUserId(int.Parse(claims.ElementAt(0).Value));
                    TimeSpan et = _physicalQueueRepository.GetEstimatedTime(physicalQueue.Id);
                    return Ok(new { physicalQueue = physicalQueue, estimatedTime= et.ToString(@"hh\:mm\:ss")});
                }
                return BadRequest();
            }

            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }
            [HttpPost("leavePhysicalQueue")]
        public IActionResult LeavePhysicalQueue(LeavePhysicalQueueDto dto)
        {
            try
            {
                _physicalQueueRepository.LeaveQueue(dto.UserId);
                return Ok();
            }

            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }
        [HttpGet("GetEstimatedTime")]
        public IActionResult GetEstimatedTime(int id)
        {
            try
            {
                TimeSpan estimatedTime = _physicalQueueRepository.GetEstimatedTime(id);
                return Ok(estimatedTime.ToString(@"hh\:mm\:ss"));
            }catch(Exception e)
            {
                return BadRequest();
            }
        }
    }
}
