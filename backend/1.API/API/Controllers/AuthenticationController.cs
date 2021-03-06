using API.Dtos.Authentication;
using API.Services;
using Domain.Data.Repositories;
using Domain.Schema;
using Microsoft.AspNetCore.Mvc;
using System;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly JwtService _jwtService;

        public AuthenticationController(IUserRepository repository, JwtService jwtService)
        {
            _repository = repository;
            _jwtService = jwtService;
        }

        [HttpPost("user/register")]
        public IActionResult RegisterUser(RegisterUserDto dto)
        {
            if (dto.Password != dto.ConfirmPassword)
            {
                return BadRequest(new { message = "Passwords must match!" });
            }

            User user = new()
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Email = dto.Email.ToLower(),
                UserRoleId = 2,
                IsActive = true
            };
            if (string.IsNullOrEmpty(dto.Password))
            {
                user.Password = null;
            }

            try
            {
                User returnedUser = _repository.Create(user);
                string jwt = _jwtService.Generate(user.Id);
                return Created("success", new { jwt });
            }
            catch (FormatException e)
            {
                return BadRequest(new { message = e.Message });
            }
            catch (Exception)
            {
                return BadRequest(new { message = "Email already exists" });
            }
        }

        [HttpPost("admin/register")]
        public IActionResult RegisterAdmin(RegisterAdminDto dto)
        {
            if (dto.Password != dto.ConfirmPassword)
            {
                return BadRequest(new { message = "Passwords must match!" });
            }

            User user = new()
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Email = dto.Email.ToLower(),
                UserRoleId = 1,
                IsActive = false
            };
            if (string.IsNullOrEmpty(dto.Password))
            {
                user.Password = null;
            }

            try
            {
                User returnedUser = _repository.Create(user, true);
                string jwt = _jwtService.Generate(returnedUser.Id);

                return Ok(new { jwt });
            }
            catch (ArgumentException e)
            {
                return BadRequest(new { message = e.Message });
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpPost("user/login")]
        public IActionResult LoginUser(LoginDto dto)
        {
            User user = _repository.Login(dto.Email, false);
            if (user == null)
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }

            if (user.IsActive == false)
            {
                return BadRequest(new { message = "The account must be activated!" });
            }

            string jwt = _jwtService.Generate(user.Id);
            return Ok(new { user, jwt });
        }

        [HttpPost("admin/login")]
        public IActionResult LoginAdmin(LoginDto dto)
        {
            User user = _repository.Login(dto.Email, true);
            if (user == null)
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }

            string jwt = _jwtService.Generate(user.Id);
            return Ok(new { jwt });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            return Ok(new { message = "Logout Successful" });
        }

        [HttpGet("activateAccount")]
        public IActionResult ActivateAccount(int userId)
        {
            _repository.VerifyRegistration(userId);
            return Ok();
        }
    }
}
