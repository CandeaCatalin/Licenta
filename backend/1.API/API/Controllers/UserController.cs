using System;
using API.Dtos.User;
using API.Services;
using Domain.Data.Repositories;
using Domain.Schema;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly JwtService _jwtService;

        public UserController(IUserRepository repository, JwtService jwtService)
        {
            _repository = repository;
            _jwtService = jwtService;
        }

        [HttpGet("get")]
        public IActionResult GetUser()
        {
            User user = _jwtService.CheckIfUserIsLogged(_repository, Request);
            if (user == null)
            {
                return Unauthorized();
            }
            else
                return Ok(user);
        }

        [HttpPost("delete")]
        public IActionResult DeleteUser(DeleteUserDto dto)
        {
            try
            {
                _repository.Delete(dto.Email);
                return Ok(new { message = dto.Email + " was deleted!" });
            }
            catch (Exception e)
            {
                return Ok(new { message = e.Message });
            }
        }
    }
}
