using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Services
{
    public class JwtService
    {
        private readonly string secureKey = "Licenta 2022 Candea Catalin";
        public string Generate(int id)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.UTF8.GetBytes(secureKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
              {
             new Claim(ClaimTypes.NameIdentifier, id.ToString())
              }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        public JwtSecurityToken Verify(string jwt)
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.ASCII.GetBytes(secureKey);
            tokenHandler.ValidateToken(jwt,
                                        new TokenValidationParameters
                                        {
                                            IssuerSigningKey = new SymmetricSecurityKey(key),
                                            ValidateIssuerSigningKey = true,
                                            ValidateIssuer = false,
                                            ValidateAudience = false
                                        },
                                        out SecurityToken validatedToken);
            return (JwtSecurityToken)validatedToken;
        }
    }
}
