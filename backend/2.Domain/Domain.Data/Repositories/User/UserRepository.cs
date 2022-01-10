using System;
using System.Linq;
using EF.Models;
using Microsoft.EntityFrameworkCore;

namespace Domain.Data.Repositories.User
{
    public class UserRepository : IUserRepository
    {

        private readonly QueueManagerContext _context;

        public UserRepository(QueueManagerContext context)
        {
            _context = context;
        }

        public Schema.User Create(Schema.User user)
        {
            if (string.IsNullOrEmpty(user.FirstName))
            {
                throw new ArgumentException ("FirstName is invalid");
            }

            if (string.IsNullOrEmpty(user.LastName))
            {
                throw new ArgumentException ("LastName is invalid");
            }

            if (string.IsNullOrEmpty(user.Password))
            {
                throw new ArgumentException ("Password is invalid");
            }

            if (string.IsNullOrEmpty(user.Email) || new System.Net.Mail.MailAddress(user.Email) == null)
            {
                throw new ArgumentException ("Email is invalid");
            }

            _context.Users.Add(user);
            _context.SaveChanges();

            return GetByEmail(user.Email);
        }

        public Schema.User GetByEmail(string email)
        {
            return _context.Users.Include(u=>u.Queue).FirstOrDefault(u => u.Email == email.ToLower());
        }

        public Schema.User GetById(int id)
        {
            return _context.Users.Include(u => u.Queue).FirstOrDefault(u => u.Id == id);
        }

        public void UpdateImage(int userId, byte[] image)
        {
            throw new System.NotImplementedException();
        }

        public Schema.User UpdateUser(Schema.User user, string newPassword)
        {
            throw new System.NotImplementedException();
        }

        public void VerifyRegistration(int userId)
        {
            Schema.User user = GetById(userId);
            user.IsActive = true;
            _context.Users.Update(user);
            _context.SaveChanges();
        }
    }
}
