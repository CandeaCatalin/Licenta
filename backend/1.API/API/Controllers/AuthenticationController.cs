using System;
using API.Dtos.Authentication;
using API.Services;
using Domain.Data.Repositories;
using Domain.Schema;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost("/user/register")]
        public IActionResult RegisterUser(RegisterUserDto dto)
        {
            if (dto.Password != dto.ConfirmPassword)
            {
                return Ok(new { message = "Passwords must match!" });
            }

            User user = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Email = dto.Email.ToLower(),
                UserRoleId = 1
            };
            if (string.IsNullOrEmpty(dto.Password))
            {
                user.Password = null;
            }

            try
            {
                User returnedUser = _repository.Create(user);
                string jwt = _jwtService.Generate(returnedUser.Id);
                Response.Cookies.Append("jwt", jwt, new CookieOptions
                {
                    HttpOnly = true
                });
                MailService mailService = new MailService();
                mailService.sendEmail(returnedUser.Email,
                    "Hello. In order to confirm your registration please access " +
                    "https://localhost:5001/api/Authentication/activateAccount?userId=" + returnedUser.Id.ToString(),
                    "Confirm registration!");

                return Created("success", returnedUser);
            }
            catch (ArgumentException e)
            {
                return Ok(new { message = e.Message });
            }
            catch (Exception e)
            {
                return Ok(new { message = e });
            }
        }

        [HttpPost("/admin/register")]
        public IActionResult RegisterAdmin(RegisterAdminDto dto)
        {
            if (dto.Password != dto.ConfirmPassword)
            {
                return Ok(new { message = "Passwords must match!" });
            }

            User user = new User
            {
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
                User returnedUser = _repository.Create(user, true);
                string jwt = _jwtService.Generate(returnedUser.Id);
                Response.Cookies.Append("jwt", jwt, new CookieOptions
                {
                    HttpOnly = true
                });


                return Created("success", returnedUser);
            }
            catch (ArgumentException e)
            {
                return Ok(new { message = e.Message });
            }
            catch (Exception e)
            {
                return Ok(new { message = e });
            }
        }

        [HttpPost("/user/login")]
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
            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true
            });
            return Ok(new { user = user });
        }

        [HttpPost("/admin/login")]
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

            if (user.IsActive == false)
            {
                return BadRequest(new { message = "The account must be activated!" });
            }

            string jwt = _jwtService.Generate(user.Id);
            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true
            });
            return Ok(new { user = user });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
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
