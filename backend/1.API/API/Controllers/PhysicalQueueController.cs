using API.Services;
using Domain.Data.Repositories;
using Domain.Schema;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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
        [HttpGet("getByUsersToQueues")]
        public IActionResult GetPhysicalQueueByUsersToQueues(int id)
        {
            try
            {
                if (id == 0)
                    throw new Exception("The queue does not exist");
                PhysicalQueue physicalQueue = _physicalQueueRepository.GetByUtqId(id);
                return Ok( new { physicalQueue = physicalQueue});
            }

            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }
    }
}
