using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Domain.Schema
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [JsonIgnore]
        public string Password { get; set; }
        public string Email { get; set; }
        public DateTime CreatedTime { get; set; }
        public bool IsActive { get; set; } = false;
        public int UserRoleId { get; set; }
        public UserRole UserRole { get; set; }
        public int? UsersToQueuesId { get; set; }
        public UsersToQueues UsersToQueues { get; set; }
        
    }
}
