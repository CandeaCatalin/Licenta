using System;
using System.IO;
using API.Services;
using Domain.Data.Repositories;
using Domain.Schema;
using Microsoft.AspNetCore.Http;
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

        [HttpGet("")]
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
    }
}
