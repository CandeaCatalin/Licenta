using System.Collections.Generic;

namespace Domain.Schema
{
    public class UserRole
    {
        public UserRole()
        {
            Users = new HashSet<User>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<User> Users { get; set; }
    }
}
