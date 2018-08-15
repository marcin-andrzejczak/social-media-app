using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using website.DTOs;
using website.Helpers;
using website.Models;
using website.Services;

namespace website.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IUserService _userService;
        private readonly AppSettings _appSettings;
        private readonly UserManager<User> _userManager;

        public AuthController(IUserService userService, IOptions<AppSettings> appSettings, UserManager<User> userManager)
        {
            _userService = userService;
            _appSettings = appSettings.Value;
            _userManager = userManager;
        }
        
        [AllowAnonymous]
        [HttpPost("login")]
        public async  Task<IActionResult> Authenticate([FromBody] UserDto userDto)
        {
            var user = await _userService.Authenticate(userDto.Email, userDto.Password);
            if (user == null)
            {
                return BadRequest(new { message = "Username or password is incorrect" });
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ProfilePictureUrl = user.ProfilePicture != null ? user.ProfilePicture.Url : "/images/default_avatar.png",
                Token = tokenString
            });

        }

        [HttpGet("user")]
        public async Task<IActionResult> GetUserInfo()
        {
            User user = await _userService.GetById(User.Identity.Name);
            return Ok(new
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ProfilePictureUrl = user.ProfilePicture != null ? user.ProfilePicture.Url : "/images/default_avatar.png"
            });
        }
        
    }
}