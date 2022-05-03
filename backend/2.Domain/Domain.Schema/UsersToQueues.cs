using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Schema
{
    public class UsersToQueues
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int PhysicalQueueId { get; set; }
        public PhysicalQueue PhysicalQueue { get; set; }
        public DateTime TimeAdded { get; set; }
        public DateTime TimePassed { get; set; }
        public bool IsPassed { get; set; } = false;
    }
}
