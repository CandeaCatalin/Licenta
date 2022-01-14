using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Domain.Schema
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [JsonIgnore]
        public string Password { get; set; }
        public string Email { get; set; }
        public Queue Queue { get; set; }
        public PhysicalQueue PhysicalQueue { get; set; }
        public DateTime CreatedTime { get; set; }
        public bool IsActive { get; set; } = false;
        public UserRole UserRole { get; set; }
    }
}
