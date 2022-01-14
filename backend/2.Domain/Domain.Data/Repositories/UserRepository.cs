using System;
using System.Linq;
using Domain.Schema;
using EF.Models;
using Microsoft.EntityFrameworkCore;

namespace Domain.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly QueueManagerContext _context;

        public UserRepository(QueueManagerContext context)
        {
            _context = context;
        }

        public User Create(User user, bool isAdmin = false)
        {
            if (isAdmin == false)
            {
                if (string.IsNullOrEmpty(user.FirstName))
                {
                    throw new ArgumentException("FirstName is invalid");
                }

                if (string.IsNullOrEmpty(user.LastName))
                {
                    throw new ArgumentException("LastName is invalid");
                }
            }

            if (string.IsNullOrEmpty(user.Password))
            {
                throw new ArgumentException("Password is invalid");
            }

            if (string.IsNullOrEmpty(user.Email) || new System.Net.Mail.MailAddress(user.Email) == null)
            {
                throw new ArgumentException("Email is invalid");
            }

            _context.Users.Add(user);
            _context.SaveChanges();

            return GetByEmail(user.Email);
        }

        public User CreateAdmin(User user)
        {
            throw new NotImplementedException();
        }

        public User GetByEmail(string email)
        {
            return _context.Users.Include(u => u.Queue).Include(u => u.PhysicalQueue).Include(u => u.UserRole)
                .FirstOrDefault(u => u.Email == email.ToLower());
        }

        public User Login(string email, bool isAdmin = false)
        {
            return _context.Users.Include(u => u.Queue).Include(u => u.PhysicalQueue).Include(u => u.UserRole)
                .FirstOrDefault(u => u.Email == email.ToLower() && isAdmin == (u.UserRoleId == 2));
        }

        public bool Delete(string email)
        {
            User user = GetByEmail(email);
            if (user == null)
            {
                throw new Exception(message: "User not found");
            }

            _context.Users.Remove(user);
            _context.SaveChanges();
            return true;
        }

        public User GetById(int id)
        {
            return _context.Users.Include(u => u.Queue).Include(u => u.PhysicalQueue).Include(u => u.UserRole)
                .FirstOrDefault(u => u.Id == id);
        }

        public void UpdateImage(int userId, byte[] image)
        {
            throw new System.NotImplementedException();
        }

        public User UpdateUser(User user, string newPassword)
        {
            throw new System.NotImplementedException();
        }

        public void VerifyRegistration(int userId)
        {
            User user = GetById(userId);
            user.IsActive = true;
            _context.Users.Update(user);
            _context.SaveChanges();
        }
    }
}
