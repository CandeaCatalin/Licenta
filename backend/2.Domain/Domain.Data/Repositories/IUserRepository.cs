using Domain.Schema;

namespace Domain.Data.Repositories
{
    public interface IUserRepository
    {
        User Create(User user);
        User GetByEmail(string email);
        User GetById(int id);
        void UpdateImage(int userId,byte[] image);
        User UpdateUser(User user, string newPassword);
        void VerifyRegistration(int userId);
    }
}
