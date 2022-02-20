using System;
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
        public IActionResult Add(CreateQueueDto dto)
        {
            try
            {
                Queue queue = new Queue
                {
                    Name = dto.Name,
                    Description = dto.Description,
                };
                queue = _repository.Create(queue);
                if (queue == null)
                {
                    return Ok(new { message = "Queue already exists!" });
                }

                return Ok(queue);
            }
            catch (ArgumentException e)
            {
                return Ok(new { message = e.Message });
            }
            catch (Exception e)
            {
                return Ok(new { message = e.Message });
            }
        }
    }
}
