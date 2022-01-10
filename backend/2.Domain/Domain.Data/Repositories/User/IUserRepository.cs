namespace Domain.Data.Repositories.User
{
    public interface IUserRepository
    {
        Schema.User Create(Schema.User user);
        Schema.User GetByEmail(string email);
        Schema.User GetById(int id);
        void UpdateImage(int userId,byte[] image);
        Schema.User UpdateUser(Schema.User user, string newPassword);
        void VerifyRegistration(int userId);
    }
}
