using API.Services;
using Domain.Data.Repositories;
using Domain.Schema;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
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
        // GET: api/<PhysicalQueueController>

        [HttpGet("get")]
        public IActionResult GetPhysicalQueue(int id)
        {
            if (_jwtService.CheckIfUserIsLogged(_userRepository, Request) == null)
            {
                return Unauthorized();
            }
            else
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
        }      
    }
}
