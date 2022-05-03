using API.Dtos.User;
using Domain.Data.Models;
using Domain.Data.Repositories;
using Domain.Schema;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly IEventLogRepository _LogRepository;


        public UserController(IUserRepository repository, IEventLogRepository logRepository)
        {
            _LogRepository = logRepository;
            _repository = repository;
        }

        [Authorize]
        [HttpGet("get")]
        public IActionResult GetUser()
        {
            return Ok(_repository.GetById(int.Parse(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier))));
        }

        [HttpDelete]
        public IActionResult DeleteUser(DeleteUserDto dto)
        {
            try
            {
                User user = _repository.Delete(dto.Id);
                _LogRepository.logEvent($"User with Id ={ user.Id} and email = {user.Email} was deleted!", EventLogType.Success);
                return Ok(new { message = "Deleted!" });
            }
            catch (Exception e)
            {
                _LogRepository.logEvent($"User with Id = {dto.Id} couldn't be deleted! Error:{e.Message}, Inner exception: {e.InnerException}", EventLogType.Error);
                return Ok(new { message = e.Message });
            }
        }

    }
}
