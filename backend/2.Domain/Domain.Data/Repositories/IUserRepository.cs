using Domain.Schema;

namespace Domain.Data.Repositories
{
    public interface IUserRepository
    {
        User Create(User user, bool isAdmin = false);
        User GetByEmail(string email);
        User GetById(int id);
        User Login(string email, bool isAdmin = false);
        void UpdateImage(int userId, byte[] image);
        User UpdateUser(User user, string newPassword);
        void VerifyRegistration(int userId);
    }
}
