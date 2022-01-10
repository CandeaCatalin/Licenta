using System;
using API.Dtos.Queue;
using API.Services;
using Domain.Data.Repositories.Queue;
using Domain.Data.Repositories.User;
using Domain.Schema;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QueueController :ControllerBase
    {
        private readonly IQueueRepository _queueRepository;
        private readonly IUserRepository _userRepository;
        private readonly JwtService _jwtService;

        public QueueController(IQueueRepository queueRepository,IUserRepository userRepository, JwtService jwtService)
        {
            _userRepository = userRepository;
            _queueRepository = queueRepository;
            _jwtService = jwtService;
        }
        [HttpPost("create")]
        public IActionResult Create(CreateQueueDto dto)
        {
            User user = _jwtService.CheckIfUserIsLogged(_userRepository, Request);
            if (user == null)
            {
                return Unauthorized();
            }

            try
            {
                int queueId = _queueRepository.Create(dto.UserId);
                return Ok( new {queueId = queueId});

            }
            catch (ArgumentException e)
            {
                return Ok(new { message = e.Message });
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpPost("delete")]
        public IActionResult Delete(DeleteQueueDto dto)
        {
            User user = _jwtService.CheckIfUserIsLogged(_userRepository, Request);
            if (user == null)
            {
                return Unauthorized();
            }

            try
            {
                _queueRepository.Delete(dto.QueueId);
                return Ok(new { message = "Queue Deleted Successfully!" });
            }
            catch (Exception e)
            {
                return Ok(new { message = e.Message});
            }
        }
    }
}
