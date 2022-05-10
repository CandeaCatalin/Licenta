using Domain.Schema;
using EF.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

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

            if (string.IsNullOrEmpty(user.FirstName))
            {
                throw new FormatException("FirstName is invalid");
            }

            if (string.IsNullOrEmpty(user.LastName))
            {
                throw new FormatException("LastName is invalid");
            }

            if (GetByEmail(user.Email) != null)
            {
                throw new FormatException("Email already exists");
            }

            if (string.IsNullOrEmpty(user.Email) || new System.Net.Mail.MailAddress(user.Email) == null)
            {
                throw new FormatException("Email is invalid");
            }
            if (string.IsNullOrEmpty(user.Password))
            {
                throw new FormatException("Password is invalid");
            }


            _context.Users.Add(user);
            _context.SaveChanges();

            return GetByEmail(user.Email);
        }


        public User GetByEmail(string email)
        {
            return _context.Users.Include(u => u.UserRole)
                .FirstOrDefault(u => u.Email == email.ToLower());
        }

        public User Login(string email, bool isAdmin = false)
        {
            return _context.Users.Include(u => u.UserRole)
                .FirstOrDefault(u => u.Email == email.ToLower() && isAdmin == (u.UserRoleId == 1) &&u.IsActive == true);
        }

        public User Delete(int Id)
        {
            User user = GetById(Id);
            if (user == null)
            {
                throw new Exception(message: "User not found");
            }

            _context.Users.Remove(user);
            _context.SaveChanges();
            return user;
        }

        public User GetById(int id)
        {
            User user = _context.Users.Include(u => u.UserRole)
                .FirstOrDefault(u => u.Id == id);
            user.UsersToQueues = _context.UsersToQueues.FirstOrDefault(utq => utq.UserId == id && utq.IsPassed == false);
            user.UsersToQueuesId = user.UsersToQueues?.Id;
            return user;
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
